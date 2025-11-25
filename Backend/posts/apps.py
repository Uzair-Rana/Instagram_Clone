# posts/apps.py
from django.apps import AppConfig

class PostsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'posts'

    def ready(self):
        # import signals so they are registered when Django starts
        try:
            import posts.signals  # noqa: F401
        except Exception:
            # avoid breaking startup if signals file has issues;
            # errors will still appear in logs when debugging
            pass
