export const EVALUATION_KEYS = {
  all: ['evaluation'] as const,
  details: () => [...EVALUATION_KEYS.all, 'detail'] as const,
  detail: (projectId: string) => [...EVALUATION_KEYS.details(), projectId] as const,
}
