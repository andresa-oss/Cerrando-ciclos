export type TenderStatus = 'DRAFT' | 'PUBLISHED' | 'EVALUATING' | 'CLOSED'

export interface Project {
  id: string
  title: string
  description: string
  status: TenderStatus
  location: string
  estimatedBudget: number
  submissionDeadline: string // ISO date string
  createdAt: string // ISO date string
  owner: string
}
