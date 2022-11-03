from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from music.serializers import CategoryListSerializer
from music.models import Category
from music.last_fm_api import lookup_all_tags


class CategoryView(APIView):
    def get(self, request): # 곡/아티스트 tag 전체 조회
        category = Category.objects.all()
        print(category,"ddd")
        serializer = CategoryListSerializer(category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request): # 곡/아티스트 tag 목록 중 선택 (최대 5개)
        serializer = CategoryListSerializer(data=request.data) # 요청 데이터를 deserializer
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Category_Database_view(APIView):
    def get(self, request):
        all_tag = lookup_all_tags()
        
        for tag in all_tag:
            category = Category()
            category.category = tag
            category.save()

        return Response(status=status.HTTP_200_OK)


