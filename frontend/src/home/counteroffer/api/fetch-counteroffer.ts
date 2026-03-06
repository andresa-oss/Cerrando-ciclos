import { queryOptions } from '@tanstack/react-query';
import { COUNTEROFFER_KEYS } from './constants';

const fetchCounterofferDetail = async (id: string) => {
  return { id, rank: 2, currentOffer: 5000000, targetOffer: 4800000 };
};

export const counterofferDetailQueryOptions = (offerId: string) => {
  return queryOptions({
    queryKey: COUNTEROFFER_KEYS.detail(offerId),
    queryFn: () => fetchCounterofferDetail(offerId),
  });
};
