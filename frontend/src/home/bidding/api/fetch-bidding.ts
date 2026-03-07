import { queryOptions } from '@tanstack/react-query';
import { BIDDING_KEYS } from './constants';
import { api } from '@/lib/axios';

const fetchBiddingDetail = async (projectId: string) => {
  const [projectRes, itemsRes] = await Promise.all([
    api.get(`/api/v1/projects/${projectId}/`),
    api.get(`/api/v1/tenders/items/?project_id=${projectId}`)
  ])
  return { project: projectRes.data, items: itemsRes.data };
};

export const biddingDetailQueryOptions = (biddingId: string) => {
  return queryOptions({
    queryKey: BIDDING_KEYS.detail(biddingId),
    queryFn: () => fetchBiddingDetail(biddingId),
  });
};
