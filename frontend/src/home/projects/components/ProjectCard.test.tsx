import { render, screen } from '@testing-library/react'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../types'

const mockProject: Project = {
  id: 'test-1',
  title: 'Test Project',
  description: 'Test description',
  status: 'PUBLISHED',
  location: 'Medellin',
  estimatedBudget: 1000000,
  submissionDeadline: '2026-10-10T00:00:00.000Z',
  createdAt: '2026-03-01T00:00:00.000Z',
  owner: 'Test Owner',
}

describe('ProjectCard', () => {
  it('renders correctly with PUBLISHED status', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Publicada')).toBeInTheDocument()
  })

  it('renders correctly with EVALUATING status', () => {
    render(<ProjectCard project={{ ...mockProject, status: 'EVALUATING' }} />)
    expect(screen.getByText('En Evaluación')).toBeInTheDocument()
  })

  it('formats currency properly', () => {
    render(<ProjectCard project={mockProject} />)
    // using generic matcher since exact space char can vary across node versions
    expect(screen.getByText(/1\.000\.000/)).toBeInTheDocument()
  })
})
