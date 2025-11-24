from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, Post, Media, Comment, Like, Follow
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['POST'])
def signup_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    # Check if username already exists
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    # Create the user
    user = User.objects.create_user(username=username, email=email, password=password)
    Profile.objects.create(user=user)  # Create a profile for the user

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token

    # Return tokens in response
    return Response({
        "success": True,
        "message": "Signup successful",
        "access": str(access_token),  # Access token
        "refresh": str(refresh),  # Refresh token
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
