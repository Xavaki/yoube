# example/views.py
import json
import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

def index(request):
    context = {}
    return render(request, 'interface/index.html', context)
