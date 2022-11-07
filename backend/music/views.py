from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from music.serializers import CategoryListSerializer, MusicStoreSerializer
from music.models import Category, Music, Singer
from music import last_fm_api
import random

class CategoryView(APIView):
    def get(self, request): # 곡/아티스트 tag 전체 조회
        category = Category.objects.all()
        # 12개
        serializer = CategoryListSerializer(category, many=True)
        # serializer에서 category data를 모두 가져옴
        random_tag = [x['category'] for x in serializer.data if x['category'] != '']
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
        search_list = request.data['category'].split(',') # 사용자가 선택한 tag
        search_result = last_fm_api.lookup_track_search(search_list) # tag 검색 결과
        searched_list = [{"singer": x[0], "title": x[1], "url": x[2], "youtube_url": x[3], "music_image": x[4]} for x in search_result] # tag 검색 결과 항목별(곡명, 아티스트, 곡 상세페이지 url)로 분리

        for se in search_result:
            singer = se[0]
            title = se[1]
            url = se[2]
            youtube_url = se[3]
            music_image = se[4]
            try:
                find_singer = Singer.objects.get(singer=singer)
            except:
                new_singer = Singer.objects.create(singer=singer)
                new_singer.save()
            try:
                find_singer = Singer.objects.get(singer=singer) # bring singer id object
                find_music = Music.objects.get(singer=find_singer, title=title)
            except:
                new_music = Music.objects.create(
                    singer=find_singer,
                    title=title,
                    music_url=url,
                    youtube_url=youtube_url,
                    music_image=music_image)
                new_music.save()
            
        return Response(searched_list, status=status.HTTP_200_OK)
        #     try:
        #         find_singer = Singer.objects.get(singer=singer)
        #     except:
        #         find_singer = None
        #     if find_singer is None:
        #         new_singer = Singer.objects.create(singer=singer)
        #         new_singer.save()
        #         try:
        #             find_singer = Singer.objects.get(singer=singer) # bring singer id object
        #             find_music = Music.objects.get(singer=find_singer, title=title)
        #         except:
        #             new_music = Music.objects.create(singer=new_singer, title=title, music_url=url, youtube_url=youtube_url)
        #             new_music.save()
            
        # return Response(searched_list, status=status.HTTP_200_OK)

        # # serializer = MusicStoreSerializer(Music, data=search_list)
        # # if serializer.is_valid():
        # #     serializer.save()
        # #     return Response(searched_list, status=status.HTTP_200_OK)
        # # else:
        # #     return Response(status=status.HTTP_400_BAD_REQUEST)