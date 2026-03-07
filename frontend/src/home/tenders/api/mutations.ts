import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { TENDER_KEYS } from './constants'

export const useUploadExcel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ projectId, file }: { projectId: string; file: File }) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('project_id', projectId)

      const { data } = await api.post('/api/v1/tenders/upload-excel/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: TENDER_KEYS.detail(projectId) })
    },
  })
}

interface AIUPayload {
  project_id: string
  administration_percent: number
  unforeseen_percent: number
  utility_percent: number
  iva_percent: number
  iva_on_utility_only: boolean
}

export const useSaveAIU = () => {
  return useMutation({
    mutationFn: async (payload: AIUPayload) => {
      const { data } = await api.post('/api/v1/tenders/aiu/', payload)
      return data
    },
  })
}
