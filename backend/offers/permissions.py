from rest_framework import permissions

class IsOfferOwner(permissions.BasePermission):
    """
    Permiso que asegura que solo el dueño (contratista) de la oferta pueda verla o editarla.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.contractor == request.user

class IsOfferModifiable(permissions.BasePermission):
    """
    Permiso que evita ediciones si la oferta ya fue enviada (SUBMITTED)
    o si la licitación ya cerró (placeholder para lógica futura).
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.status == 'DRAFT'
