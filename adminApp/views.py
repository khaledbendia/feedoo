from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def index(request):
    return HttpResponse("HELLO")