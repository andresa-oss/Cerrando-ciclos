import os
import django
from decimal import Decimal
import warnings

warnings.filterwarnings('ignore')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solenium_backend.settings')
django.setup()

from projects.models import Project

def main():
    try:
        project = Project.objects.get(title='Obra civil - San Martín')
        
        new_pepc = Decimal('757506152.00')
        
        # In this project context, limit_j297 acts as the PEPC baseline for the semaphore
        project.limit_j297 = new_pepc
        # Let's set the upper limit slightly higher, e.g. +30%
        project.limit_lm297 = new_pepc * Decimal('1.3') 
        
        # Also update the official_budget field which might be used in the UI
        project.official_budget = new_pepc
        
        project.save()
        
        print(f"Updated Project: {project.title}")
        print(f"New PEPC (limit_j297): {project.limit_j297}")
        print(f"New Upper Limit (limit_lm297): {project.limit_lm297}")
        
        # Trigger re-evaluation of all offers
        print("Re-evaluating offers...")
        project.close_and_evaluate_offers()
        
        print("Evaluation complete.")
        for offer in project.offers.all():
            print(f"Contractor: {offer.contractor_name} | Total: {offer.grand_total_offered} | Semaphore: {offer.semaphore_color} | Rank: {offer.ranking_position}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()
