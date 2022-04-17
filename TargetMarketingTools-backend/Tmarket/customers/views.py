from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import CustomerSerailizer
from .models import Customers
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
# Create your views here.

# class CustomerView(generics.ListAPIView):
#     queryset = Customers
#     serializer_class = CustomerSerailizer


class CustomerView:

    @api_view(['GET'])
    def getCustomer(request):
        cutomer = Customers.objects.all()
        customer_serializer = CustomerSerailizer(cutomer,many=True)
        return JsonResponse(customer_serializer.data,safe=False)

    @api_view(['GET'])
    def getCustomerOfUser(request,user_id):
        cutomer = Customers.objects.filter(user = user_id )
        customer_serializer = CustomerSerailizer(cutomer,many=True)
        return JsonResponse(customer_serializer.data,safe=False)