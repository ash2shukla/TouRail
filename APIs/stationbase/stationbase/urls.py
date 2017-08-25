from rest_framework.routers import DefaultRouter
from apibase.views import stationbaseViewSet,nearbybaseViewSet,commoditybaseViewSet,trnpfViewSet
from django.conf.urls import url
router=DefaultRouter()
router.register(r'stationbase',stationbaseViewSet,base_name="stationbase")
router.register(r'nearbybase',nearbybaseViewSet,base_name="nearbybase")
router.register(r'commoditybase',commoditybaseViewSet,base_name="commoditybase")
router.register(r'trnpf',trnpfViewSet,base_name="trnpf")
urlpatterns=router.urls
"""
from django.conf.urls import url
from django.contrib import admin
import apibase.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^baseFeed/',apibase.views.feedmebase),
    url(r'^commodityFeed/',apibase.views.feedmecommodity),
    url(r'^nearbyFeed/',apibase.views.feedmenearby),
    url(r'^trnpfFeed/',apibase.views.feedmetrnpf)
]
"""
