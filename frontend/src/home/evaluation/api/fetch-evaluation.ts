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
  
  const results = data.map(offer => {
    const deviation = parseFloat(offer.deviation_percentage || '0')
    
    // Improved Scoring Formula (0-100)
    // Closest to J297 (0% deviation) gets near 100
    let score = 0
    if (offer.semaphore_color === 'VERDE') {
      score = 90 + (10 - Math.abs(deviation) * 0.4) // High score for GREEN
    } else if (offer.semaphore_color === 'AMARILLO') {
      score = 70 + (20 - Math.abs(deviation) * 0.5) // Medium score for YELLOW
    } else {
      score = Math.max(0, 50 - Math.abs(deviation) * 0.2) // Low score for RED
    }

    const finalScore = Math.min(100, Math.max(0, score))

    return {
      contractorId: String(offer.id),
      contractorName: offer.contractor_name,
      economicOffer: parseFloat(offer.total_budget_offered),
      totalScore: finalScore,
      rank: offer.ranking_position || 999,
      status: (offer.semaphore_color === 'VERDE' ? 'ADJUDICABLE' : 
               offer.semaphore_color === 'ROJO' ? 'RECHAZADA' : 'EN_REVISION') as 'ADJUDICABLE' | 'RECHAZADA' | 'EN_REVISION',
      criterias: [
        {
          id: 'economic',
          name: 'Oferta Económica',
          weight: 100,
          score: Math.round(finalScore),
          weightedScore: Math.round(finalScore)
        }
      ]
    }
  })

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
