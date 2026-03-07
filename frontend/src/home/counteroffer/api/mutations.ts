import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface CounterofferPayload {
  pricing_id: string | number;
  contractor_unit_price: number;
}

export const useSubmitCounteroffer = () => {
  return useMutation({
    mutationFn: async (data: CounterofferPayload) => {
      const response = await api.put(`/api/v1/pricing/${data.pricing_id}/`, {
        contractor_unit_price: data.contractor_unit_price,
      });
      return response.data;
    },
  });
};
