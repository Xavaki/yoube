# example/urls.py
from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('channel/<str:channel_id>/', views.channel, name='channel'),
    path('channel/<str:channel_id>/video/<str:video_id>/', views.video, name='video')
]