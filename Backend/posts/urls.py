from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, MediaViewSet, CommentViewSet, LikeViewSet, ProfileViewSet, FollowViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'media', MediaViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'follows', FollowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
