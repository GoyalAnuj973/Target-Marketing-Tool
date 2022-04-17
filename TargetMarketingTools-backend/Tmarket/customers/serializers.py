from rest_framework import serializers
from .models import Customers


class CustomerSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'


class CustomerIdSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ('id', )