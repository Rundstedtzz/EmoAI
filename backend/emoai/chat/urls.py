from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path("", views.index, name="index"),
    path('chat_response/', views.chat_response, name='chat-response'),
]