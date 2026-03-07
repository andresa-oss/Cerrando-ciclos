import { queryOptions } from '@tanstack/react-query'
import { TENDER_KEYS } from './constants'
import type { TenderData } from '../types'

import { api } from '@/lib/axios'

export const fetchTenderData = async (projectId: string): Promise<TenderData> => {
  const { data } = await api.get(`/api/v1/tenders/items/?project_id=${projectId}`)
  // Assuming the backend returns an array of items
  return { projectId, items: data }
}

export const tenderQueryOptions = (projectId: string) => queryOptions({
  queryKey: TENDER_KEYS.detail(projectId),
  queryFn: () => fetchTenderData(projectId),
})
