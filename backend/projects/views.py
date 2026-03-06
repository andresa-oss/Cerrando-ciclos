from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver o editar proyectos (licitaciones).
    """
    queryset = Project.objects.all().order_classes = '-created_at'
    # TODO: Add permissions later, for now allow anyone (since Dev 1 and 2 need to test)
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        return Project.objects.all().order_by('-created_at')

    @action(detail=True, methods=['post'])
    def close_and_evaluate(self, request, pk=None):
        """
        Ejecuta el Motor de Evaluación Semáforo para este proyecto específico.
        Solo se permite si el proyecto no estaba ya cerrado.
        """
        project = self.get_object()
        if project.status in ['CLOSED', 'AWARDED']:
            return Response({"error": "El proyecto ya fue cerrado y evaluado."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Corre el motor
        project.close_and_evaluate_offers()
        
        return Response({"message": f"Proyecto {project.title} cerrado y ofertas evaluadas exitosamente."})
