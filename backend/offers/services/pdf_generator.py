from xhtml2pdf import pisa
from django.template.loader import render_to_string
import io

def generate_offer_pdf(offer):
    """
    Toma una instancia de Offer y la renderiza usando xhtml2pdf a un PDF
    retornando los bytes del archivo generado.
    """
    html_string = render_to_string('offers/pdf_template.html', {'offer': offer})
    
    pdf_buffer = io.BytesIO()
    # generar PDF
    pisa_status = pisa.CreatePDF(
       html_string, dest=pdf_buffer
    )
    
    if pisa_status.err:
        raise Exception(f"Error generando PDF: {pisa_status.err}")
        
    return pdf_buffer.getvalue()
