from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Users(AbstractUser):
    email = models.CharField(max_length=30, unique =True)
    username = models.CharField(max_length=30, unique =True)
    password = models.CharField(max_length=120)
    companyName = models.CharField(max_length=20)
    # USERNAME_FIELD = ''
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
