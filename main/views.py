import json

from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from django.shortcuts import render

# Create your views here.
from main.models import item, date, commande as _commande


@csrf_exempt
def index(request):
    template = loader.get_template('index.html')
    context = {}
    print(request.META['HTTP_USER_AGENT'])
    return HttpResponse(template.render(context, request))

@csrf_exempt
def commande(request):
    template = loader.get_template('commande.html')
    context = {}
    return HttpResponse(template.render(context, request))
@csrf_exempt
def validation(request):
    template = loader.get_template('validation.html')
    context = {}
    return HttpResponse(template.render(context, request))

@csrf_exempt
def getItems(request):
    if 'type' not in request.POST:
        available = item.objects.all()
    else:
        type = request.POST['type']
        available = item.objects.filter(type=type,dispo=1)
    data = serializers.serialize('json', available)
    return HttpResponse(data, 'json')
@csrf_exempt
def getPanierItems(request):
    panier = request.POST.getlist('panier[]')

    available = item.objects.filter(pk__in=panier)
    data = serializers.serialize('json', available)
    return HttpResponse(data, 'json')



@csrf_exempt
def addItem(request):

    item.objects.create(name="pomme de terre",img="https://firebasestorage.googleapis.com/v0/b/feedoo-8c622.appspot.com/o/pommeDeTerre.jpg?alt=media&token=6e22f807-2b4c-4fb4-be97-38e142d8d2e5"
                        , type="légume", price="80",unity="1 KG",desc="",moreDesc="950g à 1050g",dispo="1")
    return HttpResponse("ok")


@csrf_exempt
def getDates(request):
    available = date.objects.all()
    data = serializers.serialize('json', available)
    return HttpResponse(data, 'json')



@csrf_exempt
def getTotalPanier(request):
    pks = request.POST.getlist('pks[]')
    quantities = request.POST.getlist('quantities[]')

    available = item.objects.filter(pk__in=pks)
    sous_total = 0
    for av in available:
        for index,p in enumerate(pks):
            if(int(av.pk) == int(p)):

                sous_total += av.price * int(quantities[index])
    livraison = 300
    total = sous_total + livraison

    return HttpResponse(total)

@csrf_exempt
def sendRequest(request):
    comm = {}


    pks = request.POST.getlist('pks[]')
    quantities = request.POST.getlist('quantities[]')

    available = item.objects.filter(pk__in=pks)
    sous_total = 0

    produits = []
    for av in available:
        for index,p in enumerate(pks):
            if(int(av.pk) == int(p)):
                produit = {}
                produit["quantity"] = int(quantities[index])

                produit["pk"] = av.pk
                produit["name"]  = av.name
                produit["img"] =av.img
                produit["type"] =av.type
                produit["price"] =av.price
                produit["unity"] =av.unity
                produit["desc"] =av.desc
                produit["moreDesc"] =av.moreDesc
                produit["dispo"] =av.dispo


                produits.append(produit)
                sous_total += av.price * int(quantities[index])
    livraison = 300
    total = sous_total + livraison

    comm["sous_total"] = sous_total
    comm["livraison"] = livraison
    comm["total"] = total
    comm["produits"] = produits

    comm["nom"] = request.POST["nom"]
    comm["prenom"] = request.POST["prenom"]
    comm["telephone"] = request.POST["telephone"]
    comm["LngLat"] = request.POST.get("LngLat")
    comm["plusDeSpecification"] = request.POST["plusDeSpecification"]
    comm["date"] = request.POST["date"]

    _commande.objects.create(detail =str(comm))

    return HttpResponse(str(comm))

