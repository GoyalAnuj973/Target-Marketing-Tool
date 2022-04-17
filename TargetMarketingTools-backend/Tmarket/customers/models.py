from django.db import models
from users.models import Users

# Create your models here.

class Customers(models.Model):
    username = models.CharField(max_length=25)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    age =  models.IntegerField()  
    gender = models.CharField(max_length=1)
    country =  models.CharField(max_length=10)
    state =  models.CharField(max_length=10)  
    city =  models.CharField(max_length=10)
    prefferedLanguage = models.CharField(max_length=10)
    occupation  = models.CharField(max_length=10)


    user = models.ManyToManyField(Users)
    



    def __str__(self):
        return self.username

