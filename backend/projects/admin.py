from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'status', 'publication_date', 'deadline', 'official_total', 'limit_j297', 'limit_lm297')
    list_filter = ('status',)
    search_fields = ('title', 'awarded_contractor_name')
    readonly_fields = ('official_budget', 'official_aiu', 'official_iva', 'official_total')
