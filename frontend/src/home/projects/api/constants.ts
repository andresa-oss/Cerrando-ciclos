export const PROJECT_KEYS = {
  all: ['projects'] as const,
  lists: () => [...PROJECT_KEYS.all, 'list'] as const,
  list: (filters: string) => [...PROJECT_KEYS.lists(), { filters }] as const,
  details: () => [...PROJECT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PROJECT_KEYS.details(), id] as const,
}
