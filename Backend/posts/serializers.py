# posts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Media, Comment, Like, Profile, Follow, Story, StoryView


# -------------------------
# USER + PROFILE NESTED SERIALIZERS
# -------------------------

class AuthorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["avatar"]


class UserSerializer(serializers.ModelSerializer):
    # ADD nested profile here
    profile = AuthorProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'profile')


# -------------------------
# MEDIA + COMMENTS + LIKES
# -------------------------

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


# -------------------------
# POST SERIALIZER (UPDATED!!)
# -------------------------

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    media = MediaSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


# -------------------------
# PROFILE + FOLLOW
# -------------------------

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'


# -------------------------
# STORIES
# -------------------------

class StoryViewSerializer(serializers.ModelSerializer):
    viewer_username = serializers.CharField(source="viewer.username", read_only=True)

    class Meta:
        model = StoryView
        fields = "__all__"


class StorySerializer(serializers.ModelSerializer):
    views_count = serializers.IntegerField(source="views.count", read_only=True)

    class Meta:
        model = Story
        fields = "__all__"


# -------------------------
# PROFILE UPDATE
# -------------------------

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["name", "avatar"]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]
