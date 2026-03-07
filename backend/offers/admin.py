from django.contrib import admin
from .models import ContractorOffer, ItemPricing

@admin.register(ContractorOffer)
class ContractorOfferAdmin(admin.ModelAdmin):
    list_display = ('contractor_name', 'project', 'status', 'semaphore_color', 'ranking_position', 'grand_total_offered')
    list_filter = ('status', 'semaphore_color', 'project')
    search_fields = ('contractor_name', 'contractor_email')
    readonly_fields = ('deviation_percentage', 'semaphore_color', 'ranking_position', 'submitted_at')

@admin.register(ItemPricing)
class ItemPricingAdmin(admin.ModelAdmin):
    list_display = ('offer', 'item', 'contractor_unit_price')
    list_filter = ('offer__project',)
    search_fields = ('offer__contractor_name', 'item__code')
