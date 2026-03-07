import { queryOptions } from '@tanstack/react-query'
import { EVALUATION_KEYS } from './constants'
import type { EvaluationData } from '../types'
import { api } from '@/lib/axios'

interface BackendOffer {
  id: number;
  contractor_name: string;
  total_budget_offered: string;
  semaphore_color: string | null;
  ranking_position: number | null;
  deviation_percentage: string | null;
  status: string;
}

export const fetchEvaluationData = async (projectId: string): Promise<EvaluationData> => {
  const { data } = await api.get<BackendOffer[]>(`/api/v1/offers/?project=${projectId}`)
  
  const results = data.map(offer => ({
    contractorId: String(offer.id),
    contractorName: offer.contractor_name,
    economicOffer: parseFloat(offer.total_budget_offered),
    totalScore: offer.deviation_percentage ? parseFloat(offer.deviation_percentage) : 0, 
    rank: offer.ranking_position || 999,
    status: (offer.semaphore_color === 'VERDE' ? 'ADJUDICABLE' : 
             offer.semaphore_color === 'ROJO' ? 'RECHAZADA' : 'EN_REVISION') as 'ADJUDICABLE' | 'RECHAZADA' | 'EN_REVISION',
    criterias: []
  }))

  return { 
    projectId, 
    totalBudgetRange: 0, 
    results: results.sort((a, b) => a.rank - b.rank) 
  }
}

export const evaluationQueryOptions = (projectId: string) => queryOptions({
  queryKey: EVALUATION_KEYS.detail(projectId),
  queryFn: () => fetchEvaluationData(projectId),
})
