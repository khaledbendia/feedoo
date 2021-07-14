from django.db import models
# Create your models here.
class item(models.Model):
    name = models.CharField(max_length=100)
    img = models.CharField(max_length=300)
    type = models.CharField(max_length=100)
    price = models.IntegerField()
    unity = models.CharField(max_length=100)
    desc = models.CharField(max_length=200)
    moreDesc = models.CharField(max_length=200)
    dispo = models.IntegerField()

class date(models.Model):
    range = models.CharField(max_length=200)


class commande(models.Model):
    dateCommande = models.DateTimeField(auto_now_add=True)
    detail = models.TextField()