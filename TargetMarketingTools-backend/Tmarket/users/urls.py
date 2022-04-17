from django import views
from django.contrib import admin
from django.urls import path,include
from .views import UserView

from .import views

urlpatterns = [

    path('signup', UserView.signUp),
    path('login', UserView.login),
    path('user', UserView.getUser),
    path('logout', UserView.logout),
  
    

]
    
