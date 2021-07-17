from django.core import serializers
from django.template import loader
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from main.models import date, item,commande as _commande


@csrf_exempt
def adminApp(request):
    template = loader.get_template('adminApp.html')
    context = {}
    return HttpResponse(template.render(context, request))

@csrf_exempt
def adminAppCommande(request):
    template = loader.get_template('adminAppCommande.html')
    context = {}
    return HttpResponse(template.render(context, request))

@csrf_exempt
def adminApp_dateChanger(request):
    date.objects.all().delete()

    dates = request.POST.getlist('dates[]')
    for index, d in enumerate(dates):
        date.objects.create(range=str(d))

    available = date.objects.all()
    data = serializers.serialize('json', available)
    return HttpResponse(data, 'json')


@csrf_exempt
def adminApp_getAllItems(request):
    available = item.objects.filter()
    data = serializers.serialize('json', available)
    return HttpResponse(data, 'json')

@csrf_exempt
def adminApp_addItem(request):
    item.objects.create(
        name=request.POST['name'],
        img=request.POST['img'],
        type=request.POST['type'],
        price=request.POST['price'],
        unity=request.POST['unity'],
        desc=request.POST['desc'],
        moreDesc=request.POST['moreDesc'],
        dispo=request.POST['dispo']
    )
    return HttpResponse("ok")

@csrf_exempt
def adminApp_updateItem(request):
    item.objects.filter(pk=request.POST['pk']).update(
        name=request.POST['name'],
        img=request.POST['img'],
        type=request.POST['type'],
        price=request.POST['price'],
        unity=request.POST['unity'],
        desc=request.POST['desc'],
        moreDesc=request.POST['moreDesc'],
        dispo=request.POST['dispo']
    )
    return HttpResponse("ok")

@csrf_exempt
def adminApp_deleteItem(request):
    item.objects.filter(pk=request.POST['pk']).delete()
    return HttpResponse("ok")

@csrf_exempt
def adminApp_getCommandeList(request):
    available = _commande.objects.all()
    data = serializers.serialize('json', available)
    return HttpResponse(data, 'json')