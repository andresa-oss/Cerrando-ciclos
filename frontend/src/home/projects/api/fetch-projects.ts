import { queryOptions } from '@tanstack/react-query'
import { PROJECT_KEYS } from './constants'
import type { Project } from '../types'

// Mock Data
const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Ampliación Planta de Tratamiento Norte',
    description: 'Obras civiles e instalación de equipos electromecánicos para la ampliación de capacidad a 500 LPS.',
    status: 'PUBLISHED',
    location: 'Zona Industrial Norte, Medellín',
    estimatedBudget: 4500000000,
    submissionDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    owner: 'Solenium Infra',
  },
  {
    id: 'proj-002',
    title: 'Pavimentación Vía Principal Sector Sur',
    description: 'Rehabilitación de malla vial y construcción de andenes en 5KM.',
    status: 'PUBLISHED',
    location: 'Sector Sur, Envigado',
    estimatedBudget: 1250000000,
    submissionDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    owner: 'Solenium Vías',
  },
  {
    id: 'proj-003',
    title: 'Construcción Centro Educativo Rural',
    description: 'Diseño y construcción de 10 aulas, placas polideportivas y áreas administrativas.',
    status: 'EVALUATING',
    location: 'Vereda El Llano, Rionegro',
    estimatedBudget: 3200000000,
    submissionDeadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Ended yesterday
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    owner: 'Solenium Obras Públicas',
  },
  {
    id: 'proj-004',
    title: 'Mantenimiento Red de Acueducto Fase II',
    description: 'Reposición de tubería de asbesto cemento por PVC y manijas de control.',
    status: 'DRAFT',
    location: 'Centro Histórico, Santa Fe de Antioquia',
    estimatedBudget: 850000000,
    submissionDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    owner: 'Solenium Aguas',
  },
  {
    id: 'proj-005',
    title: 'Modernización Subestación Eléctrica',
    description: 'Cambio de transformadores principales y obra civil asociada, incluyendo cuarto de celdas.',
    status: 'CLOSED',
    location: 'Parque Industrial, Copacabana',
    estimatedBudget: 8900000000,
    submissionDeadline: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // Ended 45 days ago
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    owner: 'Solenium Energía',
  },
]

// Simulated API Call
const fetchProjects = async (): Promise<Project[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return MOCK_PROJECTS
}

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: PROJECT_KEYS.lists(),
    queryFn: () => fetchProjects(),
  })
