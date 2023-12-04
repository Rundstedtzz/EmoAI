from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('create/', views.create_virtual_friend, name='create_virtual_friend'),
    path('generate-avatar/', views.generate_virtual_friend_avatar, name='generate_virtual_friend_avatar'),
]