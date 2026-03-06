from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('awarded_contractor_name', 'status', 'created_at', 'updated_at')

    def validate(self, data):
        """
        Validaciones lógicas de negocio para las licitaciones impuestas por la Directora.
        """
        publication_date = data.get('publication_date')
        deadline = data.get('deadline')
        now = timezone.now()

        # 1. La fecha de límite no puede ser en el pasado
        if deadline and deadline < now:
            raise serializers.ValidationError({
                "deadline": "La fecha de cierre de la licitación no puede ser en el pasado."
            })

        if publication_date and deadline:
            # 2. La publicación no puede ser después del cierre
            if publication_date >= deadline:
                raise serializers.ValidationError({
                    "publication_date": "La fecha de publicación debe ser antes de la fecha límite (cierre)."
                })
            
            # 3. Mínimo 3 días entre la publicación y el cierre (regla de la Directora)
            if (deadline - publication_date) < timedelta(days=3):
                raise serializers.ValidationError({
                    "deadline": "Debe haber al menos 3 días de margen entre la publicación y el cierre para que los contratistas puedan cotizar."
                })

        return data
