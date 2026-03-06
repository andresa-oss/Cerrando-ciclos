import { queryOptions } from '@tanstack/react-query'
import { EVALUATION_KEYS } from './constants'
import type { EvaluationData } from '../types'

const MOCK_EVALUATION_DATA: Record<string, EvaluationData> = {
  'proj-001': {
    projectId: 'proj-001',
    totalBudgetRange: 50000000,
    results: [
      {
        contractorId: 'c1',
        contractorName: 'Constructora Alfa S.A.S',
        economicOffer: 48500000,
        totalScore: 92.5,
        rank: 1,
        status: 'ADJUDICABLE',
        criterias: [
          { id: 'econ', name: 'Oferta Económica', weight: 50, score: 100, weightedScore: 50 },
          { id: 'tech', name: 'Experiencia Técnica', weight: 30, score: 85, weightedScore: 25.5 },
          { id: 'fin', name: 'Capacidad Financiera', weight: 20, score: 85, weightedScore: 17 },
        ]
      },
      {
        contractorId: 'c2',
        contractorName: 'Consorcio Vial Andino',
        economicOffer: 49800000,
        totalScore: 88.0,
        rank: 2,
        status: 'ADJUDICABLE',
        criterias: [
          { id: 'econ', name: 'Oferta Económica', weight: 50, score: 90, weightedScore: 45 },
          { id: 'tech', name: 'Experiencia Técnica', weight: 30, score: 90, weightedScore: 27 },
          { id: 'fin', name: 'Capacidad Financiera', weight: 20, score: 80, weightedScore: 16 },
        ]
      },
      {
        contractorId: 'c3',
        contractorName: 'Ingeniería Omega Ltda',
        economicOffer: 51200000,
        totalScore: 78.5,
        rank: 3,
        status: 'EN_REVISION',
        criterias: [
          { id: 'econ', name: 'Oferta Económica', weight: 50, score: 75, weightedScore: 37.5 },
          { id: 'tech', name: 'Experiencia Técnica', weight: 30, score: 70, weightedScore: 21 },
          { id: 'fin', name: 'Capacidad Financiera', weight: 20, score: 100, weightedScore: 20 },
        ]
      },
      {
        contractorId: 'c4',
        contractorName: 'Infraestructuras del Valle',
        economicOffer: 55000000,
        totalScore: 55.0,
        rank: 4,
        status: 'RECHAZADA',
        criterias: [
          { id: 'econ', name: 'Oferta Económica', weight: 50, score: 40, weightedScore: 20 },
          { id: 'tech', name: 'Experiencia Técnica', weight: 30, score: 50, weightedScore: 15 },
          { id: 'fin', name: 'Capacidad Financiera', weight: 20, score: 100, weightedScore: 20 },
        ]
      }
    ]
  }
}

export const fetchEvaluationData = async (projectId: string): Promise<EvaluationData> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  return MOCK_EVALUATION_DATA[projectId] || { projectId, totalBudgetRange: 0, results: [] }
}

export const evaluationQueryOptions = (projectId: string) => queryOptions({
  queryKey: EVALUATION_KEYS.detail(projectId),
  queryFn: () => fetchEvaluationData(projectId),
})
