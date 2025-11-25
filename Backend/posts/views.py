# posts/views.py
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, Post, Media, Comment, Like, Follow
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import (
    PostSerializer,
    MediaSerializer,
    CommentSerializer,
    LikeSerializer,
    ProfileSerializer,
    FollowSerializer,
    UserSerializer,  # added serializer to return user data
)

# -------------------------
# Signup (public)
# -------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])   # disable global auth for this route
def signup_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    full_name = request.data.get("full_name")

    # Basic required-field validation
    if not username or not email or not password:
        return Response(
            {"error": "username, email and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Unique checks
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Create user (password will be hashed by create_user)
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=(full_name or "")
    )

    # Ensure Profile exists (in case signals disabled) - safe to call always
    Profile.objects.get_or_create(user=user)

    # Create tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    user_data = UserSerializer(user).data

    return Response({
        "success": True,
        "message": "Signup successful",
        "user": user_data,             # id, username, email (useful for frontend)
        "access": access_token,
        "refresh": str(refresh),
    }, status=status.HTTP_201_CREATED)


# -------------------------
# Login (public)
# -------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    user_data = UserSerializer(user).data

    return Response({
        "success": True,
        "user": user_data,
        "access": access_token,
        "refresh": str(refresh),
    })


# -------------------------
# ViewSets for other models
# -------------------------
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
