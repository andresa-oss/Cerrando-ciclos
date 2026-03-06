export interface ScoreCriteria {
  id: string
  name: string
  weight: number // Percentage weight (e.g. 40 for 40%)
  score: number // Base score 0-100
  weightedScore: number // score * (weight/100)
}

export interface ContractorResult {
  contractorId: string
  contractorName: string
  economicOffer: number
  criterias: ScoreCriteria[]
  totalScore: number
  rank: number
  status: 'ADJUDICABLE' | 'RECHAZADA' | 'EN_REVISION'
}

export interface EvaluationData {
  projectId: string
  totalBudgetRange: number
  results: ContractorResult[]
}
