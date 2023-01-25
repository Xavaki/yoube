# example/views.py
import json
import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


try:
    with open('interface/files/channel_objects.json', 'r') as file:
        channels = json.load(file)
except Exception as e:
    print(e)
    channels = {}


def index(request):
    context = {"channels" : channels}
    return render(request, 'interface/index.html', context)

def channel(request, channel_id):
    channel = channels[channel_id]
    context = { "channel" : channel }
    return render(request, 'interface/channel.html', context)

def video(request, channel_id, video_id): 
    video = [v for v in channels[channel_id]["videos"] if v["feed_attrs"]["yt_videoid"] == video_id][0]
    context = {"video" : video}
    return render(request, 'interface/video.html', context)
