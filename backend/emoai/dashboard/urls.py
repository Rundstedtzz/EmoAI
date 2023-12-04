from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('<str:username>/', views.user_dashboard, name='user_dashboard')
]
