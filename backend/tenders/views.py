from rest_framework import viewsets
from .models import Item, AiuDefinition
from .serializers import ItemSerializer, AiuDefinitionSerializer

class AiuDefinitionViewSet(viewsets.ModelViewSet):
    queryset = AiuDefinition.objects.all()
    serializer_class = AiuDefinitionSerializer

class ItemViewSet(viewsets.ModelViewSet):
    """
    CRUD para leer, editar, o borrar filas del presupuesto oficial (PEPC).
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    
    # En proyectos la URL típicamente busca ítems específicos por "project_id"
    # Un filtro básico por si el Frontend quiere ver los items de la Licitación 5
    def get_queryset(self):
        queryset = Item.objects.all()
        project_id = self.request.query_params.get('project_id')
        if project_id is not None:
            queryset = queryset.filter(project_id=project_id)
        return queryset
