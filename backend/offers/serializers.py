from rest_framework import serializers
from .models import ContractorOffer, ItemPricing
from django.utils import timezone

class ItemPricingSerializer(serializers.ModelSerializer):
    offered_total = serializers.SerializerMethodField()

    class Meta:
        model = ItemPricing
        fields = '__all__'

    def get_offered_total(self, obj):
        return obj.calculate_offered_total()

    def validate(self, data):
        """Bloquea guardar precios unitarios si ya pasó el tiempo, SALVO para el Top 3."""
        offer = data.get('offer')
        if not offer and self.instance:
            offer = self.instance.offer
            
        if offer and offer.project:
            project = offer.project
            now = timezone.now()
            if project.deadline and project.deadline < now:
                # REGLA A: Excepción para el Top 3 (Contraofertas permitidas)
                if offer.ranking_position and offer.ranking_position <= 3:
                    pass
                else:
                    raise serializers.ValidationError({
                        "offer": "La Licitación cerró. No puedes modificar precios unitarios al no estar en el Top 3 de finalistas."
                    })
        return data


class ContractorOfferSerializer(serializers.ModelSerializer):
    item_prices = ItemPricingSerializer(many=True, read_only=True)

    class Meta:
        model = ContractorOffer
        fields = '__all__'
        read_only_fields = (
            'deviation_percentage', 
            'semaphore_color', 
            'ranking_position',
            'submitted_at',
            'created_at'
        )

    def validate(self, data):
        """
        Regla de Negocio Crítica de la Licitación:
        Ningún contratista puede enviar o actualizar una oferta si la
        Licitación ya cerró (superó la Fecha Límite).
        """
        project = data.get('project')
        # Si la oferta ya existe, leemos el proyecto de la instancia actual
        if not project and self.instance:
            project = self.instance.project

        # Solo validamos si existe un proyecto y estamos tratando de guardar (crear o actualizar)
        if project:
            now = timezone.now()
            # Validamos que la licitación no esté vencida
            if project.deadline and project.deadline < now:
                # REGLA A: Excepción para el Top 3
                if self.instance and self.instance.ranking_position and self.instance.ranking_position <= 3:
                    pass # Se le permite seguir guardando y actualizando
                else:
                    raise serializers.ValidationError({
                        "project": "La fecha límite (cierre) de esta Licitación ya ha expirado. Ofertas o modificaciones no permitidas."
                    })
        
        return data
