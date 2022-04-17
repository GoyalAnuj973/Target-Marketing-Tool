from rest_framework import serializers
from .models import *


class CampaignSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Campaigns
        fields = '__all__'
