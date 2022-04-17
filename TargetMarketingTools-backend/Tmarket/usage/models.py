from itertools import product
from django.db import models
from users.models import Users
from customers.models import Customers
from campaigns.models import Campaigns

# Create your models here.
class Usage(models.Model):
    
    duration = models.FloatField()
    added_to_carts_count = models.IntegerField()
    purcharsed_items_count = models.IntegerField()

    user = models.ForeignKey(Users,on_delete=models.CASCADE)
    customer = models.ForeignKey(Customers,on_delete=models.CASCADE)

   
   


class Cart_Items(models.Model):
    
    product_name = models.CharField(max_length=30)
    quantity = models.IntegerField()
    type = models.CharField(max_length=30)

    user = models.ForeignKey(Users,on_delete=models.CASCADE)
    usage = models.ForeignKey(Usage,on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name

   

    
class Purchased_Items(models.Model):
    
    product_name = models.CharField(max_length=30)
    quantity = models.IntegerField()
    type = models.CharField(max_length=30)

    campaign = models.ForeignKey(Campaigns,on_delete=models.SET_NULL, related_name='campaign',blank=True,null=True)
    usage = models.ForeignKey(Usage,on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name

    