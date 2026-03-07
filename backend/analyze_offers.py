import os
import django
from decimal import Decimal
import warnings

warnings.filterwarnings('ignore')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solenium_backend.settings')
django.setup()

from projects.models import Project

def main():
    project = Project.objects.get(title='Obra civil - San Martín')
    j = project.limit_j297
    limit_down = j * Decimal('0.75')
    
    print(f"PEPC (J): {j}")
    print(f"Limit Down (-25%): {limit_down}")
    print("-" * 40)
    
    for offer in project.offers.all():
        print(f"Contractor: {offer.contractor_name}")
        print(f"  V (Direct Cost): {offer.total_budget_offered}")
        print(f"  Grand Total: {offer.grand_total_offered}")
        print(f"  Status: {offer.semaphore_color}")
        if offer.total_budget_offered < limit_down:
            print(f"  REASON: V < Limit Down ({offer.total_budget_offered} < {limit_down})")
        elif offer.total_budget_offered > project.limit_lm297 * Decimal('1.25'):
            print(f"  REASON: V > Limit Up")
        print("-" * 20)

if __name__ == '__main__':
    main()
