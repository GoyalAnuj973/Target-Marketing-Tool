from rest_framework import serializers
from .models import *


class Usageserailizer(serializers.ModelSerializer):
    class Meta:
        model = Usage
        fields = '__all__'

class CartItemSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Cart_Items
        fields = '__all__'

class PurchasedItemSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Purchased_Items
        fields = '__all__'