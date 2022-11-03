from django.db import models
from users.models import User

class Singer(models.Model):
    singer = models.CharField(max_length=50)

    def __str__(self):
        return str(self.singer)

class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return str(self.category)

class Music(models.Model):
    title = models.CharField(max_length=50)
    likes = models.ManyToManyField(User, related_name='music_likes')
    category = models.ManyToManyField(Category, related_name='music_catecory')
    singer = models.ForeignKey(Singer, on_delete=models.CASCADE, related_name='music_singer')

    def __str__(self):
        return str(self.title)