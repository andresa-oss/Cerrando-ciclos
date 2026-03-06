from django.db import models

class Project(models.Model):
    STATUS_CHOICES = [
        ('DRAFT', 'Borrador'),
        ('PUBLISHED', 'Publicada'),
        ('CLOSED', 'Cerrada / Evaluación'),
        ('AWARDED', 'Adjudicada'),
    ]

    title = models.CharField(max_length=255, verbose_name="Nombre de la Licitación")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción General")
    location = models.CharField(max_length=255, verbose_name="Ubicación (Ciudad/Coordenadas)")
    
    # Fechas importantes
    publication_date = models.DateTimeField(null=True, blank=True, verbose_name="Fecha de Publicación")
    deadline = models.DateTimeField(verbose_name="Fecha Límite (Cierre) para Ofertas")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT', verbose_name="Estado")
    
    # Lo que solicitaste: El contratista asignado o que ganó la licitación.
    # Inicialmente está vacío hasta que el motor de evaluación decida el ganador.
    awarded_contractor_name = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        verbose_name="Nombre del Contratista Ganador"
    )

    # Cálculos Totales Oficiales Guardados (Opción B elegida por la Directora)
    official_budget = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Costo Directo PEPC (Suma Ítems)")
    official_aiu = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Total AIU ($)")
    official_iva = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Total IVA ($)")
    official_total = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Gran Total Estimado PEPC ($)")

    # Limites Técnicos definidos por Solenium para Semáforo (J297 y LM297)
    limit_j297 = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Límite Inferior (Casilla J297)")
    limit_lm297 = models.DecimalField(max_digits=20, decimal_places=2, default=0, verbose_name="Límite Superior (Casilla LM297)")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.get_status_display()}"

    def recalculate_totals(self):
        """
        Calcula matemáticamente el Costo Directo sumando la cantidad por el precio de todos
        los ítems. Luego lee los porcentajes del AIU para calcular el IVA y los Valores Nominales,
        registrándolos en la base de datos velozmente.
        """
        # Se importa localmente para evitar cruce/ciclo infinito de importación
        from decimal import Decimal
        from django.db.models import Sum, F
        
        # 1. Obtenemos el costo directo sumando: (Cantidad * Precio Oficial) de cada Ítem
        # La BD PostgreSQL hará este procesado matemático para que sea rapidísimo.
        items_total = self.items.aggregate(
            total=Sum(F('quantity') * F('official_unit_price'))
        )['total'] or Decimal('0.00')

        self.official_budget = items_total
        
        # 2. Si el proyecto tiene configurados porcentajes de A.I.U...
        if hasattr(self, 'aiu_definition'):
            aiu = self.aiu_definition
            admin_cost = items_total * (aiu.administration_percent / Decimal('100.00'))
            unforeseen_cost = items_total * (aiu.unforeseen_percent / Decimal('100.00'))
            utility_cost = items_total * (aiu.utility_percent / Decimal('100.00'))
            
            total_aiu = admin_cost + unforeseen_cost + utility_cost
            self.official_aiu = total_aiu
            
            # Condición de Solenium: IVA sobre la utilidad o IVA sobre todo pleno
            if aiu.iva_on_utility_only:
                iva_cost = utility_cost * (aiu.iva_percent / Decimal('100.00'))
            else:
                iva_cost = (items_total + total_aiu) * (aiu.iva_percent / Decimal('100.00'))
                
            self.official_iva = iva_cost
        else:
            self.official_aiu = Decimal('0.00')
            self.official_iva = Decimal('0.00')
            
        # 3. Sumar el Gran Total y Guardarlo para Siempre
        self.official_total = self.official_budget + self.official_aiu + self.official_iva
        self.save()

    def close_and_evaluate_offers(self):
        """
        1. Cierra el proyecto para no recibir más ofertas.
        2. Recalcula el semáforo para todas las ofertas recibidas.
        3. Clasifica el Top 3 basado en la menor desviación positiva/negativa que sea válida.
        """
        self.status = 'CLOSED'
        self.save()

        # Recalcular cada oferta
        for offer in self.offers.all():
            offer.calculate_totals_and_semaphore()
        
        # Determinar el Ranking. 
        # Criterio: Solo participan los VERDES y AMARILLOS. (Los rojos quedan descartados)
        valid_offers = self.offers.filter(semaphore_color__in=['VERDE', 'AMARILLO'])
        
        # Ordenamos del más económico al más caro (menor Costo Directo)
        ranked_offers = valid_offers.order_by('total_budget_offered')

        # Asignamos ranking: 1, 2, 3...
        position = 1
        for offer in ranked_offers:
            offer.ranking_position = position
            offer.save(update_fields=['ranking_position'])
            position += 1

