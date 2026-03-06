export const BIDDING_KEYS = {
  all: ['biddings'] as const,
  lists: () => [...BIDDING_KEYS.all, 'list'] as const,
  list: (filters: string) => [...BIDDING_KEYS.lists(), { filters }] as const,
  details: () => [...BIDDING_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BIDDING_KEYS.details(), id] as const,
} as const;
