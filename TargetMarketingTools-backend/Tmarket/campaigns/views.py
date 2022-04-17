from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
# Create your views here.


class CampaignView:

    @api_view(['GET'])
    def getCampaignsOfSpecificUser(request,user_id):
        campaign = Campaigns.objects.filter(user_id = user_id)
        campaign_serializer = CampaignSerailizer(campaign,many=True)
        return JsonResponse(campaign_serializer.data,safe=False)

    @api_view(['GET'])
    def getCampaignsForSpecificSegment(request,segment_id):
        campaign = Campaigns.objects.filter(segment_id = segment_id)
        campaign_serializer = CampaignSerailizer(campaign,many=True)
        return JsonResponse(campaign_serializer.data,safe=False)


    @api_view(['POST'])
    def createCampaign(request):
        serializer = CampaignSerailizer(data= request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data,safe=False)


    @api_view(['POST'])
    def test(request):
        import requests 
        print(request.data)
        # print('hi',request.data['segment'])
        if request.data['segment'] == 1:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/748f5d45ae93459585208ecf3be9f063/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        # https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/76b67d060dde4316968d4d7e70e2ae94/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a
        elif request.data['segment'] == 5:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/76b67d060dde4316968d4d7e70e2ae94/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        elif request.data['segment'] == 3:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/b5e86d587f35438e806c6c0dcb76cf75/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        elif request.data['segment'] == 2:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/a435e70c8d1743a4a9899ad8b58422e0/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        elif request.data['segment'] == 4:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/09e1f432044340ffb162fbe274ae9801/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        elif request.data['segment'] == 10:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/afe7af902cf444159b050da39f82531c/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        
        else:
            res = requests.post('https://deloitte.webhook.office.com/webhookb2/d0bc1cb2-9bea-470f-a46e-21e7fdfe1114@36da45f1-dd2c-4d1f-af13-5abe46b99921/IncomingWebhook/da947cbbae1e4918887baf53bd047529/50d6bf1b-a7bb-48e3-b631-b8e06b58ad3a',json=request.data)
        
        return JsonResponse({"msg" :res.text})



    
    @api_view(['DELETE'])
    def removeCampaign(request,campaign_id):
        campaign = Campaigns.objects.filter(id=campaign_id)
        campaign.delete()
        return JsonResponse({"msg":"Successfully deleted "})

    
    
