import pandas as pd
from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Item, Project

class ExcelUploadView(APIView):
    """
    Endpoint para subir un archivo Excel y crear masivamente los Ítems (cantidades).
    """
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        project_id = request.data.get('project')
        excel_file = request.FILES.get('file')

        if not project_id or not excel_file:
            return Response(
                {"error": "Debe proporcionar el ID del proyecto y un archivo Excel ('file')."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({"error": "El proyecto indicado no existe."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Leemos el Excel con pandas
            df = pd.read_excel(excel_file)
            
            # Limpieza básica: quitar filas donde falten datos clave
            df = df.dropna(subset=['codigo', 'descripcion', 'unidad', 'cantidad', 'precio_oficial'])
            
            items_to_create = []
            
            for index, row in df.iterrows():
                item = Item(
                    project=project,
                    code=str(row['codigo']),
                    description=str(row['descripcion']),
                    unit=str(row['unidad']),
                    quantity=Decimal(str(row['cantidad'])),
                    official_unit_price=Decimal(str(row['precio_oficial']))
                )
                items_to_create.append(item)
            
            # bulk_create guarda cientos de filas en la BD en un solo paso
            Item.objects.bulk_create(items_to_create)
            
            # Opción B: Ejecutamos el motor de sumatoria matemática de la Directora
            project.recalculate_totals()
            
            return Response(
                {"message": f"Se cargaron exitosamente {len(items_to_create)} ítems para el proyecto '{project.title}'."},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {"error": f"Error al procesar el archivo Excel: {str(e)}. Verifique que las columnas se llamen: codigo, descripcion, unidad, cantidad, precio_oficial."},
                status=status.HTTP_400_BAD_REQUEST
            )
