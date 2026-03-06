from django.db import models
from django.contrib.auth.models import User

class OfferStatus(models.TextChoices):
    DRAFT = 'DRAFT', 'Borrador'
    SUBMITTED = 'SUBMITTED', 'Enviada'

class Offer(models.Model):
    contractor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='offers', help_text="Contratista dueño de la oferta")
    tender_id = models.IntegerField(help_text="ID de la Licitación")
    status = models.CharField(max_length=20, choices=OfferStatus.choices, default=OfferStatus.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('contractor', 'tender_id')

    def __str__(self):
        return f"Oferta {self.id} (Licitación {self.tender_id}) - {self.status}"

class OfferItem(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='items')
    activity_name = models.CharField(max_length=255, help_text="Nombre de la actividad cobrada")
    unit_price = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    observation = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.activity_name}: ${self.unit_price}"
