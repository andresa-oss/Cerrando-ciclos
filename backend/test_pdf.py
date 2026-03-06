import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from offers.models import Offer, OfferItem, OfferStatus
from offers.services.pdf_generator import generate_offer_pdf

def run_test():
    print("Iniciando prueba de creación de Oferta y generación de PDF...")
    
    # Create test user
    user, created = User.objects.get_or_create(username='test_contractor', defaults={'email': 'test@example.com'})
    print(f"Usuario contratista creado/obtenido: {user.username}")

    # Create dummy offer
    offer, o_created = Offer.objects.get_or_create(
        contractor=user, 
        tender_id=1,
        defaults={'status': OfferStatus.SUBMITTED}
    )
    # Ensure it's submitted for the test
    if not o_created and offer.status != OfferStatus.SUBMITTED:
        offer.status = OfferStatus.SUBMITTED
        offer.save()
    
    print(f"Oferta {offer.id} para licitación {offer.tender_id} preparada.")

    # Create items if they don't exist
    if o_created or not offer.items.exists():
        OfferItem.objects.create(offer=offer, activity_name="Excavación mecánica", unit_price=15000.50, observation="Terreno rocoso")
        OfferItem.objects.create(offer=offer, activity_name="Concreto estructural", unit_price=350000.00, observation="-")
        print("Ítems de prueba añadidos.")
    
    # Generate PDF
    print("Llamando a WeasyPrint para generar el PDF...")
    try:
        pdf_bytes = generate_offer_pdf(offer)
        with open('oferta_test.pdf', 'wb') as f:
            f.write(pdf_bytes)
        print("¡Éxito! PDF generado y guardado como 'oferta_test.pdf' de tamaño:", len(pdf_bytes), "bytes")
    except Exception as e:
        print("Error generando el PDF:", str(e))

if __name__ == '__main__':
    run_test()
