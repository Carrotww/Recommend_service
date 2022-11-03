from django.urls import path
from music import views

urlpatterns = [
    path("music/", views.CategoryView.as_view(), name="category_view"),
    path("tag_save/", views.Category_Database_view.as_view(), name="category_database_view"),
]
