from django.urls import path
from music import views

urlpatterns = [
    path("music/", views.CategoryView.as_view(), name="category_view"),
]
