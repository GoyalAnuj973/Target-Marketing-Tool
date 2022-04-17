from django import views
from django.contrib import admin
from django.urls import path,include
from .views import CustomerView


from .import views

urlpatterns = [

    path('getCustomer/', views.CustomerView.getCustomer),
    path('getCustomerOfUser/<int:user_id>', views.CustomerView.getCustomerOfUser),

]
    
