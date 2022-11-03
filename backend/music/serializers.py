from rest_framework import serializers
from music.models import Category


class CategoryListSerializer(serializers.ModelSerializer): # 카테고리(tag) 
    class Meta:
        model = Category
        fields = '__all__'