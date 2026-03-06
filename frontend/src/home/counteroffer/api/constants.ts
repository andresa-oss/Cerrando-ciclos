export const COUNTEROFFER_KEYS = {
  all: ['counteroffers'] as const,
  details: () => [...COUNTEROFFER_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...COUNTEROFFER_KEYS.details(), id] as const,
} as const;
