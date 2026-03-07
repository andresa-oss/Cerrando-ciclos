from rest_framework import serializers
from .models import Item, AiuDefinition

class AiuDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiuDefinition
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    official_total = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'

    def get_official_total(self, obj):
        # Envía al frontend el Precio Total calculado automáticamente
        return obj.calculate_official_total()
