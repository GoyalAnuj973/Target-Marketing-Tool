from django import views
from django.contrib import admin
from django.urls import path,include
from .views import CampaignView


from .import views

urlpatterns = [

    path('getCampaignOfUser/<int:user_id>', views.CampaignView.getCampaignsOfSpecificUser),
    path('getCampaignOfSegments/<int:segment_id>', views.CampaignView.getCampaignsForSpecificSegment),
    path('createCampaign/', views.CampaignView.createCampaign),
    path('sendmsg/', views.CampaignView.test),
    path('removeCampaign/<int:campaign_id>', views.CampaignView.removeCampaign),
    

]
    
