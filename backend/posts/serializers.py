from rest_framework import serializers
from posts.models import Post, Comment
from users.models import User


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Comment
        exclude = ("post", )


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("content",)


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    comment_post = CommentSerializer(many=True)
    likes = serializers.StringRelatedField(many=True)

    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Post
        fields = '__all__'


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("title","image","content","user")


class PostListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comment_post.count()

    class Meta:
        model = Post
        fields = ("pk", "title", "image", "updated_at", "user", "likes_count", "comments_count", "content",)

class PostputSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    def get_likes_count(self, obj):
        return obj.likes.count()

    class Meta:
        model = Post
        fields = ("pk", "title", "image", "updated_at", "user", "likes_count")

