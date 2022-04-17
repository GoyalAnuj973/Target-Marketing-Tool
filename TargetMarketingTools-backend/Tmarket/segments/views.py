from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework import status

from customers.serializers import *


from .models import Segments
from .serializers import Segmentserailizer
from .serializers import SegmentsCustomererailizer

from usage.serializers import Usageserailizer
from usage.models import Cart_Items, Usage,Purchased_Items

# Create your views here.


class SegmentViews:

    @api_view(['GET'])
    def  getAllSegments(request,user_id):
        segments = Segments.objects.filter(user = user_id )
        segments_serializer = Segmentserailizer(segments,many=True)
        print(segments_serializer)
        return JsonResponse(segments_serializer.data,safe=False)


    @api_view(['POST'])
    def addSegmentForUser(request,user_id):
        # segments = Segments.objects.filter(user = user_id )
        # segments_serializer = Segmentserailizer(segments,many=True)
        # return JsonResponse(segments_serializer.data,safe=False)
        # request.data._mutable = True
        request.data['user'] = int(user_id)
        

        col_name = request.data['type']
        col_value = request.data['value']

        if col_value == 'Male' or col_value == 'male':
            col_value = 'M'
        if col_value == 'Female' or col_value == 'Female':
            col_value = 'F'
        print(  col_name,col_value)
        filter={
            col_name : col_value
        }

        usage_table_cols = ['added_to_carts_count', 'cart_items', 'customer', 'customer_id', 'duration', 'id', 'purcharsed_items_count', 'purchased_items', 'user', 'user_id']
        customer_table_cols =['age', 'city', 'country', 'email', 'gender', 'id', 'occupation', 'phone', 'prefferedLanguage', 'segments', 'state', 'usage', 'user', 'username']
        cart_items_cols = ['idc', 'product_namec', 'quantityc', 'typec', 'usagec', 'usage_idc']
        product_items_cols = ['idp', 'product_namep', 'quantityp', 'typep', 'usagep', 'usage_idp']
        

        if col_name in product_items_cols:
            filter[col_name[:-1]] = filter.pop(col_name)
            purchased_item = Purchased_Items.objects.filter(**filter)
            usage_ids = purchased_item.values('usage_id')
            usage_ids_list=[]
            for i, c in enumerate(usage_ids):
                usage_ids_list.append(c['usage_id'])
            print(usage_ids_list)

            usage = Usage.objects.filter()
            usage_with_cust = usage.values('id','customer')
            print('usage',usage_with_cust)
            list = []

            for i , c in enumerate(usage_with_cust):
                if c['id'] in usage_ids_list:
                    list.append(c['customer'])
            
            print(list)
            request.data['customer'] = list

        if col_name in cart_items_cols:
            filter[col_name[:-1]] = filter.pop(col_name)
            cart_item = Cart_Items.objects.filter(**filter)
            usage_ids = cart_item.values('usage_id')
            usage_ids_list=[]
            for i, c in enumerate(usage_ids):
                usage_ids_list.append(c['usage_id'])
            print(usage_ids_list)

            usage = Usage.objects.filter()
            usage_with_cust = usage.values('id','customer')
            print('usage',usage_with_cust)
            list = []

            for i , c in enumerate(usage_with_cust):
                if c['id'] in usage_ids_list:
                    list.append(c['customer'])
            
            print(list)
            request.data['customer'] = list

        
        if col_name in usage_table_cols:
            usage = Usage.objects.filter( **filter )
            customers= usage.values('customer')
            list = []
            for i, c in enumerate(customers):
                list.append(c['customer'])

            
            print(list)
            # for ( x in stored_data):

            request.data['customer'] = list


        if col_name in customer_table_cols:
            print('no way')
            filter['user'] = int(user_id)
            customers = Customers.objects.filter( **filter ).values('id')
            list = []
            print(customers)
            for i, c in enumerate(customers):
                list.append(c['id'])


            request.data['customer'] = list



        segments_serializer = Segmentserailizer(data = request.data)
        
        if segments_serializer.is_valid():
                segments_serializer.save()
                return JsonResponse(segments_serializer.data, status=status.HTTP_201_CREATED)
        return  JsonResponse(segments_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    @api_view(['GET'])
    def getSegments(request,segment_id):
        segments = Segments.objects.filter(id = segment_id)
        segment_serializer = Segmentserailizer(segments,many = True)
        return JsonResponse(segment_serializer.data,safe=False)


    @api_view(['DELETE'])
    def removeSegment(request,segment_id):
        segment = Segments.objects.filter(id=segment_id)
        segment.delete()
        return JsonResponse({"msg":"Successfully deleted"})