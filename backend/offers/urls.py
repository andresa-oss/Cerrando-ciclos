from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OfferViewSet, OfferItemViewSet

router = DefaultRouter()
router.register(r'offers', OfferViewSet, basename='offer')
router.register(r'offer-items', OfferItemViewSet, basename='offer-item')

urlpatterns = [
    path('', include(router.urls)),
]
