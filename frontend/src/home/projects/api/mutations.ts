import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { PROJECT_KEYS } from './constants'

interface CreateProjectPayload {
  title: string
  description?: string
  location: string
  deadline: string
  limit_j297: number
  limit_lm297: number
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateProjectPayload) => {
      const { data } = await api.post('/api/v1/projects/', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() })
    },
  })
}
