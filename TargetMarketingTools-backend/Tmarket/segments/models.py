from django.db import models
from users.models import Users
from customers.models import Customers

# Create your models here.

class Segments(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    value = models.CharField(max_length=50)


    user = models.ForeignKey(Users,on_delete=models.CASCADE)
    customer = models.ManyToManyField(Customers)

    def __str__(self):
        return self.name



