import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { EVALUATION_KEYS } from './constants'

export const useCloseAndEvaluate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { data } = await api.post(`/api/v1/projects/${projectId}/close_and_evaluate/`)
      return data
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: EVALUATION_KEYS.detail(projectId) })
      // Consider invalidating Projects queries as well to update the project status
    },
  })
}
