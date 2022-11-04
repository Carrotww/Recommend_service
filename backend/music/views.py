from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from music.serializers import CategoryListSerializer, MusicStoreSerializer
from music.models import Category, Music, Singer
from music import last_fm_api
import random
from pprint import pprint



class CategoryView(APIView):
    def get(self, request): # 곡/아티스트 tag 전체 조회
        category = Category.objects.all()
        # 12개
        serializer = CategoryListSerializer(category, many=True)
        # serializer에서 category data를 모두 가져옴
        random_tag = [x['category'] for x in serializer.data if x['category'] is not '']
        # category 가 빈 값이 아닌것들중에서 데이터를 가져옴
        random_tag = list(set(random_tag))
        # set() 으로 중복 처리를 해 준 후 list로 만들어줌
        random_tag = random.sample(random_tag, 12)
        send_tag = [{'category': x} for x in random_tag]
        # pprint(send_tag)
        return Response(send_tag, status=status.HTTP_200_OK)

    def post(self, request): # 곡/아티스트 tag 목록 중 선택 (최대 5개)
        serializer = CategoryListSerializer(data=request.data) # 요청 데이터를 deserializer
        
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Category_Database_view(APIView):
    def get(self, request):
        all_tag = last_fm_api.lookup_all_tags()
        
        for tag in all_tag:
            category = Category()
            category.category = tag
            category.save()

        return Response(status=status.HTTP_200_OK)

class Category_search_view(APIView):
    def post(self, request):
        search_list = request.data['category'].split(',')
        search_result = last_fm_api.lookup_track_search(search_list)

        searched_list = [{"singer": x[0], "title": x[1]} for x in search_result]

        for se in search_result:
            singer = se[0]
            title = se[1]
            print(singer, title)
            singer_model = Singer.objects.create(singer=singer)
            singer_model.save()
            music_model = Music.objects.create(singer=singer, title=title)
            music_model.save()
        
        return Response(searched_list, status=status.HTTP_200_OK)

        # serializer = MusicStoreSerializer(Music, data=search_list)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(searched_list, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)