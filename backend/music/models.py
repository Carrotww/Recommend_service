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
    category = models.ManyToManyField(Category, related_name='music_category')
    music_url = models.CharField(max_length=200, null=True)
    youtube_url = models.CharField(max_length=200, null=True)
    music_image = models.ImageField(blank=True, upload_to='music_img/')
    singer = models.ForeignKey(Singer, on_delete=models.SET_NULL, related_name='music_singer', null=True)

    def __str__(self):
        return str(self.title)