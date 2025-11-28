from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import all_stories

from .views import (
    signup_view,
    login_view,
    PostViewSet,
    MediaViewSet,
    CommentViewSet,
    LikeViewSet,
    ProfileViewSet,
    FollowViewSet,
    StoryViewSet,
    stories_feed,
    mark_story_viewed,
    all_stories,
    me_view,
    create_story
)

router = DefaultRouter()

router.register(r"posts", PostViewSet)
router.register(r"media", MediaViewSet)
router.register(r"comments", CommentViewSet)
router.register(r"likes", LikeViewSet)
router.register(r"profiles", ProfileViewSet)
router.register(r"follows", FollowViewSet)

router.register(r"stories", StoryViewSet)

urlpatterns = [
    path("auth/signup/", signup_view),
    path("auth/login/", login_view),
    path("auth/refresh/", TokenRefreshView.as_view(), name="jwt_refresh"),
    path("stories/feed/", stories_feed),
    path("stories/create/", create_story),
    path("stories/view/<int:story_id>/", mark_story_viewed),
    path("stories/all/", all_stories),
    path("", include(router.urls)),
    path("auth/me/", me_view),
]
