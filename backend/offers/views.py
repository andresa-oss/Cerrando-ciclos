from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.utils import timezone
from .models import Offer, OfferItem, OfferStatus
from .serializers import OfferSerializer, OfferItemSerializer
from .permissions import IsOfferOwner, IsOfferModifiable

class OfferViewSet(viewsets.ModelViewSet):
    serializer_class = OfferSerializer
    permission_classes = [IsOfferOwner, IsOfferModifiable]

    def get_queryset(self):
        return Offer.objects.filter(contractor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(contractor=self.request.user)

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        offer = self.get_object()
        if offer.status == OfferStatus.SUBMITTED:
            return Response({'detail': 'Offer already submitted.'}, status=status.HTTP_400_BAD_REQUEST)
        
        offer.status = OfferStatus.SUBMITTED
        offer.submitted_at = timezone.now()
        offer.save()
        return Response({'status': 'offer submitted'})

    @action(detail=True, methods=['get'])
    def pdf(self, request, pk=None):
        offer = self.get_object()
        if offer.status != OfferStatus.SUBMITTED:
            return Response({'detail': 'Offer must be submitted to generate PDF.'}, status=status.HTTP_400_BAD_REQUEST)
        
        from .services.pdf_generator import generate_offer_pdf
        pdf_bytes = generate_offer_pdf(offer)
        
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="oferta_solenium_{offer.id}.pdf"'
        return response

class OfferItemViewSet(viewsets.ModelViewSet):
    serializer_class = OfferItemSerializer
    permission_classes = [IsOfferOwner, IsOfferModifiable]

    def get_queryset(self):
        return OfferItem.objects.filter(offer__contractor=self.request.user)

    def perform_create(self, serializer):
        offer_id = self.request.data.get('offer')
        try:
            offer = Offer.objects.get(id=offer_id, contractor=self.request.user)
            serializer.save(offer=offer)
        except Offer.DoesNotExist:
            raise serializers.ValidationError('Offer not found or not accessible.')
