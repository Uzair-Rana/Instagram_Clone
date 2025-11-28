from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone

# Models
from .models import (
    Profile,
    Post,
    Media,
    Comment,
    Like,
    Follow,
    Story,
    StoryView
)

# Serializers
from .serializers import (
    PostSerializer,
    MediaSerializer,
    CommentSerializer,
    LikeSerializer,
    ProfileSerializer,
    FollowSerializer,
    UserSerializer,
    StorySerializer,
)


# ------------------------------
# AUTHENTICATION
# ------------------------------

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def signup_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    full_name = request.data.get("full_name")

    if not username or not email or not password:
        return Response(
            {"error": "username, email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=(full_name or "")
    )

    Profile.objects.get_or_create(user=user)

    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "message": "Signup successful",
        "user": UserSerializer(user).data,
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "username and password required"}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "user": UserSerializer(user).data,
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })



# ------------------------------
# ME / PROFILE
# ------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    user = request.user
    profile = user.profile

    return Response({
        "id": user.id,
        "username": user.username,
        "name": user.first_name,
        "email": user.email,
        "avatar": profile.avatar.url if profile.avatar else None,
    })



# ------------------------------
# STORIES
# ------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def stories_feed(request):
    """
    Returns stories grouped by user, and includes:
    - username
    - avatar
    - each story with file URL & viewed status
    """
    user = request.user
    now = timezone.now()

    following_ids = Follow.objects.filter(
        follower=user
    ).values_list("following_id", flat=True)

    stories = Story.objects.filter(
        user_id__in=list(following_ids) + [user.id],
        expires_at__gt=now
    ).order_by("user_id", "-created_at")

    grouped = {}

    for story in stories:
        uid = story.user.id
        viewed = StoryView.objects.filter(story=story, viewer=user).exists()

        if uid not in grouped:
            grouped[uid] = {
                "user_id": uid,
                "username": story.user.username,
                "avatar": story.user.profile.avatar.url if story.user.profile.avatar else None,
                "stories": []
            }

        grouped[uid]["stories"].append({
            "id": story.id,
            "url": story.file.url,
            "media_type": story.media_type,
            "viewed": viewed
        })

    return Response(list(grouped.values()))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_story(request):
    """
    Function-based endpoint for story upload.
    Ensures multipart parser is used (prevents 415).
    """
    user = request.user
    file = request.FILES.get("file")

    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    # Detect file type
    content_type = file.content_type or ""
    if content_type.startswith("image"):
        media_type = "image"
    elif content_type.startswith("video"):
        media_type = "video"
    else:
        return Response({"error": "Invalid file type"}, status=400)

    story = Story.objects.create(
        user=user,
        file=file,
        media_type=media_type,
    )

    return Response({
        "message": "Story uploaded successfully",
        "story_id": story.id,
        "media_type": story.media_type,
        "url": story.file.url
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_story_viewed(request, story_id):
    try:
        story = Story.objects.get(id=story_id)
    except Story.DoesNotExist:
        return Response({"error": "story not found"}, status=404)

    StoryView.objects.get_or_create(story=story, viewer=request.user)

    return Response({"success": True})



# ------------------------------
# FEED / POSTS
# ------------------------------
class PostViewSet(viewsets.ModelViewSet):
    """
    Post feed API supporting:
    - Fetch all posts with media, comments, likes
    - Create a new post dynamically with optional media
    """
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        """
        Save the post with the logged-in user as author.
        Supports optional media files uploaded with the post.
        """
        # Ensure author is set from the authenticated user (prevents NOT NULL errors)
        post = serializer.save(author=self.request.user)

        # Handle attached media (support "media" as array or single file)
        files = self.request.FILES.getlist("media")
        # if someone uses 'file' key instead, also handle that:
        if not files and "file" in self.request.FILES:
            files = [self.request.FILES.get("file")]

        for f in files:
            if not f:
                continue
            content_type = getattr(f, "content_type", "") or ""
            if content_type.startswith("image"):
                media_type = "image"
            elif content_type.startswith("video"):
                media_type = "video"
            else:
                # skip unsupported file types
                continue

            Media.objects.create(
                post=post,
                file=f,
                media_type=media_type
            )

# ------------------------------
# MEDIA
# ------------------------------

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)



# ------------------------------
# COMMENTS
# ------------------------------

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# ------------------------------
# LIKES
# ------------------------------

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# ------------------------------
# PROFILE
# ------------------------------

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]



# ------------------------------
# FOLLOW SYSTEM
# ------------------------------

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)



# ------------------------------
# STORY CRUD (UPLOAD VIA VIEWSET)
# ------------------------------

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Story.objects.filter(
            expires_at__gt=timezone.now()
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# ------------------------------
# PUBLIC STORIES (OPTIONAL)
# ------------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def all_stories(request):
    now = timezone.now()
    stories = Story.objects.filter(expires_at__gt=now)
    return Response(StorySerializer(stories, many=True).data)
