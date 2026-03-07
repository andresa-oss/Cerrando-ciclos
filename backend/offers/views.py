from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from .models import ContractorOffer, ItemPricing
from .serializers import ContractorOfferSerializer, ItemPricingSerializer
from .pdf_generator import render_to_pdf

class ContractorOfferViewSet(viewsets.ModelViewSet):
    """
    Ruta para la Gestión Integral de Ofertas Globales de los Contratistas.
    El Frontend creará el Cascarón principal aquí una vez ingresa el Contratista.
    """
    queryset = ContractorOffer.objects.all().order_by('-created_at')
    serializer_class = ContractorOfferSerializer

    # Añadimos un pequeño buscador para que el Admin filtre las Ofertas
    # de un Proyecto específico: `?project=1`
    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        """
        Descarga la constancia en formato PDF con la Página 1 (AIU)
        y la Página 2 (IVA pleno) de acuerdo a la solicitud de Solenium.
        """
        offer = self.get_object()
        
        # En caso de que se necesiten subtotales para mostrar
        subtotal_aiu = offer.total_budget_offered + offer.total_aiu_offered

        context = {
            'offer': offer,
            'subtotal_aiu': subtotal_aiu,
        }

        pdf = render_to_pdf('offers/pdf_offer.html', context)
        if pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            filename = f"Oferta_{offer.id}_{offer.contractor_name}.pdf"
            content = f"attachment; filename={filename}"
            response['Content-Disposition'] = content
            return response
        return Response({"error": "No pudimos generar el PDF"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ItemPricingViewSet(viewsets.ModelViewSet):
    """
    Endpoint masivo donde el Contratista guarda (DRAFT/Borrador) 
    o actualiza sus precios por actividad (Item a Item).
    """
    queryset = ItemPricing.objects.all()
    serializer_class = ItemPricingSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        offer_id = self.request.query_params.get('offer_id')
        if offer_id:
            queryset = queryset.filter(offer_id=offer_id)
        return queryset
