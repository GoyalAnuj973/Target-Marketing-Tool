from django.db import models
from users.models import Users
from segments.models import Segments


# Create your models here.

class Campaigns(models.Model):
    name = models.CharField(max_length=100)
    msg = models.CharField(max_length=256)
    type = models.CharField(max_length=30)

    user = models.ForeignKey(Users,on_delete=models.CASCADE)
    segment = models.ForeignKey(Segments,on_delete=models.CASCADE)
    
  

    def __str__(self):
        return self.name
