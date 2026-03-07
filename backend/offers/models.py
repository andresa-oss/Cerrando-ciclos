from django.db import models
from projects.models import Project
from tenders.models import Item

class ContractorOffer(models.Model):
    """
    Representa la propuesta económica global enviada por un Contratista
    para una Licitación específica.
    """
    STATUS_CHOICES = [
        ('DRAFT', 'Borrador (Editando)'),
        ('SUBMITTED', 'Enviada / Consolidada'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='offers')
    contractor_name = models.CharField(max_length=255, verbose_name="Nombre del Contratista / Razón Social")
    contractor_email = models.EmailField(verbose_name="Correo Electrónico del Contratista")
    
    # Valores Totales Ofertados por el Contratista
    total_budget_offered = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Costo Directo Ofertado")
    total_aiu_offered = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="AIU Ofertado")
    total_iva_offered = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="IVA Ofertado")
    grand_total_offered = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Gran Total Ofertado")

    # Resultados post-evaluación del motor (Mapa de Calor y Posición)
    deviation_percentage = models.DecimalField(max_digits=7, decimal_places=4, null=True, blank=True, verbose_name="% Desviación vs PEPC")
    semaphore_color = models.CharField(max_length=20, null=True, blank=True, verbose_name="Color Asignado (Verde, Naranja, Rojo)")
    ranking_position = models.IntegerField(null=True, blank=True, verbose_name="Posición en el Ranking (Top 3)")

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT', verbose_name="Estado de la Oferta")
    submitted_at = models.DateTimeField(null=True, blank=True, verbose_name="Fecha de Envío Final")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Oferta de {self.contractor_name} para {self.project.title} - {self.get_status_display()}"

    def calculate_totals_and_semaphore(self):
        """
        Calcula el Ofertado basándose en los ítems ingresados. Luego corre
        el Motor Semáforo según las reglas lógicas:
        V = Valor Costo Directo (Obras Civiles ofertadas)
        J = casilla J297
        LM = casilla LM297
        """
        from decimal import Decimal
        from django.db.models import Sum, F

        # 1. Sumamos las cantidades originales por los precios ofertados
        items_total = self.item_prices.aggregate(
            total=Sum(F('item__quantity') * F('contractor_unit_price'))
        )['total'] or Decimal('0.00')

        self.total_budget_offered = items_total
        
        # Asumiendo mismos porcentajes AIU e IVA para la oferta para hacerla comparable, 
        # o dejando que el frontend los envíe. Simplificaremos calculando sobre la oferta
        # el mismo % de IVA y AIU que tiene el PEPC para que la comparativa sea justa en Costo Directo.
        if hasattr(self.project, 'aiu_definition'):
            aiu = self.project.aiu_definition
            total_aiu = items_total * ((aiu.administration_percent + aiu.unforeseen_percent + aiu.utility_percent) / Decimal('100.00'))
            self.total_aiu_offered = total_aiu
            
            if aiu.iva_on_utility_only:
                util = items_total * (aiu.utility_percent / Decimal('100.00'))
                self.total_iva_offered = util * (aiu.iva_percent / Decimal('100.00'))
            else:
                self.total_iva_offered = (items_total + total_aiu) * (aiu.iva_percent / Decimal('100.00'))
        
        self.grand_total_offered = self.total_budget_offered + self.total_aiu_offered + self.total_iva_offered

        # --- MOTOR SEMÁFORO (Reglas de la Directora Dev 3) ---
        V = self.total_budget_offered  # Valor cotizado de las obras civiles
        J = self.project.limit_j297    # Límite referencial inferior
        L = self.project.limit_lm297   # Límite referencial superior

        if J > 0 and L > 0:
            # Desviación porcentual con respecto al PEPC base de la tabla (J297)
            # Puede ser positiva (más caro) o negativa (más barato)
            self.deviation_percentage = ((V - J) / J) * Decimal('100.00')

            d_25_down = J * Decimal('0.75')  # -25% de J297
            d_25_up = L * Decimal('1.25')    # +25% de LM297

            if V < d_25_down:
                # Más del 25% por debajo de J297 (Muy barato = Riesgo/Rojo)
                self.semaphore_color = 'ROJO'
            elif d_25_down <= V <= J:
                # Por debajo de J297 no excediendo el -25% (Ahorro óptimo = Verde)
                self.semaphore_color = 'VERDE'
            elif J < V <= d_25_up:
                # Entre J297 y LM297, y max hasta +25% por arriba de LM (Normal/Precaución = Amarillo)
                self.semaphore_color = 'AMARILLO'
            elif V > d_25_up:
                # Superior a LM297 por más de un 25% (Demasiado caro = Rojo)
                self.semaphore_color = 'ROJO'
        else:
            self.semaphore_color = 'SIN_LIMITES_PEPC'

        self.save()

class ItemPricing(models.Model):
    """
    Almacena el valor unitario específico que un contratista propuso
    para una sola actividad (Ítem) del listado de cantidades de obra.
    """
    offer = models.ForeignKey(ContractorOffer, on_delete=models.CASCADE, related_name='item_prices')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='received_prices')
    
    # El valor unitario ingresado por el contratista en el Frontend
    contractor_unit_price = models.DecimalField(max_digits=18, decimal_places=2, verbose_name="Precio Unitario Ofertado")
    
    # Observaciones o justificaciones del precio ingresadas por el contratista
    observation = models.TextField(blank=True, null=True, verbose_name="Observaciones (Contratista)")

    def calculate_offered_total(self):
        """Calcula matemáticamente el total parcial ofertado (Cantidad original de Solenium x Precio del Contratista)"""
        return self.item.quantity * self.contractor_unit_price

    def __str__(self):
        return f"Precio {self.contractor_unit_price} para {self.item.code} por {self.offer.contractor_name}"
