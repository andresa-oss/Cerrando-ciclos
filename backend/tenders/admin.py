from django.contrib import admin
from .models import AiuDefinition, Item

@admin.register(AiuDefinition)
class AiuDefinitionAdmin(admin.ModelAdmin):
    list_display = ('project', 'administration_percent', 'unforeseen_percent', 'utility_percent', 'iva_percent')
    search_fields = ('project__title',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('code', 'description', 'unit', 'quantity', 'official_unit_price', 'project')
    list_filter = ('project',)
    search_fields = ('code', 'description')
