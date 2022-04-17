from django import views
from django.contrib import admin
from django.urls import path,include
from .views import UsageView


from .import views

urlpatterns = [

    path('getUsageOfUser/<int:user_id>', views.UsageView.getUsageOfSpecificUser),
    path('getUsageOfCustomer/<int:user_id>/<int:customer_id>', views.UsageView.getUsageOfSpecificCustomerAndSpecificUser),
    path('getCart/', views.UsageView.getCartItem),
    path('getPurchasedItem/', views.UsageView.getPurchasedItem),
    path('getCartItemsOfUser/<int:user_id>', views.UsageView.getCartItemOfUser),

]
    
