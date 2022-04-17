from django import views
from django.contrib import admin
from django.urls import path,include
from .views import SegmentViews


from .import views

urlpatterns = [

    path('getAllSegments/<int:user_id>', views.SegmentViews.getAllSegments),
    path('addSegments/<int:user_id>', views.SegmentViews.addSegmentForUser),
    path('getSegment/<int:segment_id>', views.SegmentViews.getSegments),
    path('removeSegment/<int:segment_id>', views.SegmentViews.removeSegment),
    

]
    
