from rest_framework import serializers
from .models import Offer, OfferItem, OfferStatus
from django.utils import timezone

class OfferItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferItem
        fields = ['id', 'activity_name', 'unit_price', 'observation']

class OfferSerializer(serializers.ModelSerializer):
    items = OfferItemSerializer(many=True, read_only=True)
    contractor = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Offer
        fields = ['id', 'contractor', 'tender_id', 'status', 'created_at', 'updated_at', 'submitted_at', 'items']
        read_only_fields = ['status', 'created_at', 'updated_at', 'submitted_at', 'contractor']

    def create(self, validated_data):
        validated_data['contractor'] = self.context['request'].user
        return super().create(validated_data)
