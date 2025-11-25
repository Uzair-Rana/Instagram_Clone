from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, Post, Media, Comment, Like, Follow
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import (
    PostSerializer,
    MediaSerializer,
    CommentSerializer,
    LikeSerializer,
    ProfileSerializer,
    FollowSerializer,
)


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def signup_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    full_name = request.data.get("full_name")

    if not username or not email or not password:
        return Response({"error": "username, email and password are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=(full_name or "")
    )

    # Create profile record (if you want a Profile entry right away)
    Profile.objects.create(user=user)

    # Create tokens
    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "message": "Signup successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token

    return Response({
        "success": True,
        "user_id": user.id,
        "access": str(access_token),  # Access token
        "refresh": str(refresh),  # Refresh token
    })

# ViewSets for other models (Post, Media, Comment, Like, Profile, Follow)
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    parser_classes = (MultiPartParser, FormParser)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
