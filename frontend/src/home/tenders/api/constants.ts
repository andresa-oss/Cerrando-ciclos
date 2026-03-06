export const TENDER_KEYS = {
  all: ['tenders'] as const,
  lists: () => [...TENDER_KEYS.all, 'list'] as const,
  list: (projectId: string) => [...TENDER_KEYS.lists(), { projectId }] as const,
  details: () => [...TENDER_KEYS.all, 'detail'] as const,
  detail: (projectId: string) => [...TENDER_KEYS.details(), projectId] as const,
}
