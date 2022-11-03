from rest_framework import serializers
from music.models import Music, Singer, Category

class CategorySerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    
    def get_category(self, obj):
        return obj.category.category
    
    class Meta:
        model = Category
        fields = '__all__'