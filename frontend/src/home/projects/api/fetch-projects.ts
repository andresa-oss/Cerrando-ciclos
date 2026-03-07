import { queryOptions } from '@tanstack/react-query'
import { PROJECT_KEYS } from './constants'
import type { Project } from '../types'
import { api } from '@/lib/axios'

interface BackendProject {
  id: number
  title: string
  description: string
  location: string
  status: string
  official_budget: string
  deadline: string
  created_at: string
}

const mapProject = (bp: BackendProject): Project => ({
  id: String(bp.id),
  title: bp.title,
  description: bp.description || '',
  status: bp.status as Project['status'],
  location: bp.location,
  estimatedBudget: parseFloat(bp.official_budget || '0'),
  submissionDeadline: bp.deadline,
  createdAt: bp.created_at,
  owner: 'Solenium',
})

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/api/v1/projects/')
  const results = data.results || data
  if (Array.isArray(results)) {
    return results.map(mapProject)
  }
  console.warn("Unexpected API response format:", data)
  return []
}

export const fetchProjectById = async (id: string): Promise<Project> => {
  const { data } = await api.get<BackendProject>(`/api/v1/projects/${id}/`)
  return mapProject(data)
}

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: PROJECT_KEYS.lists(),
    queryFn: () => fetchProjects(),
  })

export const projectDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => fetchProjectById(id),
  })
