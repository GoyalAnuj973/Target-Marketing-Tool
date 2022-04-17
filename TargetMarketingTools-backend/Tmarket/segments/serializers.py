from rest_framework import serializers


from .models import Segments
from customers.serializers import CustomerSerailizer
from customers.models import Customers

class Segmentserailizer(serializers.ModelSerializer):
    class Meta:
        model = Segments
        fields = '__all__'




class SegmentsCustomererailizer(serializers.ModelSerializer):
    customers_id = CustomerSerailizer(read_only=True, many=True)
    class Meta:
        model = Segments
        fields = ('customers_id',)
        depth =1
        # fields = '__all__'


# class PostSerializer(serializers.ModelSerializer):
#     customer = CustomerSerailizer(read_only=True, many=True)

#     class Meta:
#         model = Post
#         fields = ('tag', 'text',)       