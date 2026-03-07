import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface CreateOfferPayload {
  project_id: string;
  contractor_name: string;
  contractor_email: string;
}

export const useSubmitOffer = () => {
  return useMutation({
    mutationFn: async (data: CreateOfferPayload) => {
      const payload = {
          project: data.project_id,
          contractor_name: data.contractor_name,
          contractor_email: data.contractor_email,
      }
      const response = await api.post('/api/v1/offers/', payload);
      return response.data;
    },
  });
};

interface SubmitPricingPayload {
  offer_id: number;
  item_id: number;
  contractor_unit_price: number;
  observation?: string;
}

export const useSubmitPricing = () => {
  return useMutation({
    mutationFn: async (data: SubmitPricingPayload) => {
      const payload = {
        offer: data.offer_id,
        item: data.item_id,
        contractor_unit_price: data.contractor_unit_price,
        observation: data.observation || ''
      }
      const response = await api.post('/api/v1/pricing/', payload);
      return response.data;
    },
  });
};

// Aliased to keep backwards compatibility with previous mockup
export const useSubmitBidding = useSubmitOffer;
