import { queryOptions } from '@tanstack/react-query';
import { BIDDING_KEYS } from './constants';

// Función para simular fetch de datos de licitación
const fetchBiddingDetail = async (id: string) => {
  // const { data } = await axios.get(`/api/biddings/${id}`);
  // return data;
  return { id, title: 'Simulated Bidding Data' };
};

export const biddingDetailQueryOptions = (biddingId: string) => {
  return queryOptions({
    queryKey: BIDDING_KEYS.detail(biddingId),
    queryFn: () => fetchBiddingDetail(biddingId),
  });
};
