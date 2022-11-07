from django.urls import path
from music import views

urlpatterns = [
    path("music/", views.CategoryView.as_view(), name="category_view"),
    path("tag_save/", views.Category_Database_view.as_view(), name="category_database_view"),
    path("music_search/", views.Category_search_view.as_view(), name="category_search_view"),
    # path("music_result/", views.Music_result_view.as_view(), name="music_result_view"),
]

