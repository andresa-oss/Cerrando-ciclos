from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContractorOfferViewSet, ItemPricingViewSet

router = DefaultRouter()
router.register(r'offers', ContractorOfferViewSet, basename='offer')
router.register(r'pricing', ItemPricingViewSet, basename='pricing')

urlpatterns = [
    path('', include(router.urls)),
]
