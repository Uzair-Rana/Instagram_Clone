from django.contrib import admin
from .models import Profile, Post, Comment

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'created_at')
    search_fields = ('author__username', 'caption')

admin.site.register(Profile)
admin.site.register(Comment)
