from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import signup_view, PostViewSet, MediaViewSet, CommentViewSet, LikeViewSet, ProfileViewSet, FollowViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'media', MediaViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'follows', FollowViewSet)

urlpatterns = [
    path("auth/signup/", signup_view),
    path("auth/login/", TokenObtainPairView.as_view(), name="jwt_login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="jwt_refresh"),
    path("", include(router.urls)),
]
