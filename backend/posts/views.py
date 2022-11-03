from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from posts.serializers import PostCreateSerializer, PostListSerializer
from posts.models import Post

class ArticlesView(APIView):

    def get(self, request):
        post = Post.objects.all()
        serializer = PostListSerializer(post, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



    def post(self, request, format=None):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class ArticleDetailView(APIView):
    def get(self, request, post_id):
        post = Post.objects.get(id=post_id)
        serializer = PostListSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

  


    def put(self, request, post_id):
        post = Post.objects.all(id=post_id)
        if request.user == post.user:
            serializer = PostListSerializer(post)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors)
        else:
            return Response("권한이 없습니다.")


    def delete(self, request, post_id):
        post = Post.objects.all(id=post_id)
        if request.user == post.user:
            post.delete()
            return Response("삭제되었습니다!")
        else:
            return Response("권한이 없습니다.")
             

class CommentView (APIView):
    def get(self, request):
        pass


    def post(self, request):
        pass


class CommentDetailView (APIView):
    def put(self, request):
        pass


    def delete(self, request):
        pass

