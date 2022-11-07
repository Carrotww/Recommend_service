from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("articles/", include("posts.urls")),
    path("users/", include("users.urls")),
    path("", include("music.urls")),
    # path("", include("posts.urls")),
]
