from sys import api_version
from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
# Create your views here.


class UsageView:

    @api_view(['GET'])
    def getUsageOfSpecificUser(request,user_id):
        usage = Usage.objects.filter(user_id = user_id)
        usage_serializer = Usageserailizer(usage,many=True)
        return JsonResponse(usage_serializer.data,safe=False)

    @api_view(['GET'])
    def getUsageOfSpecificCustomerAndSpecificUser(request,user_id,customer_id):
        usage = Usage.objects.filter(user_id = user_id, customer_id = customer_id)
        usage_serializer = Usageserailizer(usage,many=True)
        return JsonResponse(usage_serializer.data,safe=False)

    @api_view(['GET'])
    def getCartItem(request):
        cart_items = Cart_Items.objects.all()
        print(cart_items)
        cart_item_serializer = CartItemSerailizer(cart_items,many=True)
        return JsonResponse(cart_item_serializer.data,safe=False)

    @api_view(['GET'])
    def getPurchasedItem(request):
        purchased_itmes = Purchased_Items.objects.all()
        purchased_itmes_serializer = PurchasedItemSerailizer(purchased_itmes,many=True)
        return JsonResponse(purchased_itmes_serializer.data,safe=False)

    @api_view(['GET'])
    def getCartItemOfUser(request,user_id):
        cart_itmes = Cart_Items.objects.filter(user_id = user_id)
        cart_itmes_serializer = CartItemSerailizer(cart_itmes,many=True)
        return JsonResponse(cart_itmes_serializer.data,safe=False)