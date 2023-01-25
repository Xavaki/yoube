# example/views.py
import json
import os
from django.http import HttpResponse, JsonResponse


def index(request):
    try:
        with open('interface/files/channel_objects.json', 'r') as file:
            resp = json.load(file)
    except Exception as e:
        print(e)
        resp = {}
    return JsonResponse(resp)