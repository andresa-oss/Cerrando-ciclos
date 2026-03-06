from django.db import models
from projects.models import Project

class AiuDefinition(models.Model):
    """
    Define los porcentajes de A.I.U. (Administración, Imprevistos, Utilidad)
    e IVA que aplican de manera global a un Proyecto específico.
    """
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='aiu_definition')
    
    # Porcentajes base definidos por Solenium/Ingenieros
    administration_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, verbose_name="% Administración")
    unforeseen_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, verbose_name="% Imprevistos")
    utility_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, verbose_name="% Utilidad")
    iva_percent = models.DecimalField(max_digits=5, decimal_places=2, default=19.00, verbose_name="% IVA (Sobre Utilidad o Pleno)")

    # Nos indica si el IVA aplica sobre la Utilidad o sobre el Total. 
    # Usualmente en contratos locales aplica sobre la Utilidad.
    iva_on_utility_only = models.BooleanField(default=True, verbose_name="¿El IVA aplica solo sobre la utilidad?")

    def __str__(self):
        return f"AIU - {self.project.title}"

class Item(models.Model):
    """
    Representa una "Fila" en el archivo de Presupuesto/Cantidades.
    Por ejemplo: "Excavación", "Concreto", etc.
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='items')
    
    # Información originada del import (Excel) de Solenium
    code = models.CharField(max_length=50, verbose_name="Código del Ítem (Ej: 1.1)")
    description = models.TextField(verbose_name="Descripción de la Actividad")
    unit = models.CharField(max_length=20, verbose_name="Unidad de Medida (Ej: m2, kg, un)")
    quantity = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Cantidad Total")
    
    # Presupuesto Oficial (PEPC) ingresado por los ingenieros interno de Solenium
    official_unit_price = models.DecimalField(max_digits=18, decimal_places=2, verbose_name="Valor Unitario PEPC (Oficial)")

    def calculate_official_total(self):
        """Método auxiliar interno para multiplicar Cantidad x Precio Unitario Oficial."""
        return self.quantity * self.official_unit_price

    def __str__(self):
        return f"{self.code} - {self.description} ({self.unit})"
