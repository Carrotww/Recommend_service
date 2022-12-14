from rest_framework import serializers
from music.models import Music, Singer, Category


class CategoryListSerializer(serializers.ModelSerializer): # 카테고리(tag) 
    class Meta:
        model = Category
        fields = ['category',]


class MusicStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = '__all__'

class testSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category',]

