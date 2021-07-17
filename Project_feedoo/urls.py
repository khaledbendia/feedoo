"""Project_feedoo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import adminApp
from main import views as main_views
from adminApp import views as adminApp_views
urlpatterns = [
    path('admin/', admin.site.urls),

    path('', main_views.index),
    path('commande/', main_views.commande),
    path('validation/', main_views.validation),


    path('getItems/', main_views.getItems),
    path('addItem/', main_views.addItem),
    path('getPanierItems/', main_views.getPanierItems),

    path('getDates/', main_views.getDates),


    path('getTotalPanier/', main_views.getTotalPanier),

    path('sendRequest/', main_views.sendRequest),



    ################
    path('adminApp/', adminApp_views.adminApp),
    path('adminAppCommande/', adminApp_views.adminAppCommande),

    path('adminApp_dateChanger/', adminApp_views.adminApp_dateChanger),
    path('adminApp_getAllItems/', adminApp_views.adminApp_getAllItems),
    path('adminApp_addItem/', adminApp_views.adminApp_addItem),

    path('adminApp_updateItem/', adminApp_views.adminApp_updateItem),
    path('adminApp_deleteItem/', adminApp_views.adminApp_deleteItem),



    path('adminApp_getCommandeList/', adminApp_views.adminApp_getCommandeList),

]
