from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, AiuDefinitionViewSet
from .parsers import ExcelUploadView

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')
router.register(r'aiu', AiuDefinitionViewSet, basename='aiu')

urlpatterns = [
    path('', include(router.urls)),
    path('upload-excel/', ExcelUploadView.as_view(), name='upload-excel'),
]
