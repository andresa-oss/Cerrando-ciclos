import os
from io import BytesIO
from django.template.loader import get_template
from django.http import HttpResponse
from xhtml2pdf import pisa

def render_to_pdf(template_src, context_dict={}):
    """
    Función de utilidad que toma una plantilla HTML y datos,
    y devuelve un archivo PDF formateado localmente en RAM.
    """
    template = get_template(template_src)
    html  = template.render(context_dict)
    
    result = BytesIO()
    # Convertir HTML a PDF
    pdf = pisa.pisaDocument(BytesIO(html.encode("utf-8")), result, encoding='utf-8')
    
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None
