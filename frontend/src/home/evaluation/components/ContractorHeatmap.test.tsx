import { render, screen } from '@testing-library/react'
import { ContractorHeatmap } from './ContractorHeatmap'
import type { ContractorResult } from '../types'

const mockResults: ContractorResult[] = [
  {
    contractorId: 'c1',
    contractorName: 'Winner Co',
    economicOffer: 1000,
    totalScore: 95,
    rank: 1,
    status: 'ADJUDICABLE',
    criterias: [{ id: 'econ', name: 'Oferta', weight: 100, score: 95, weightedScore: 95 }]
  },
  {
    contractorId: 'c2',
    contractorName: 'Loser Co',
    economicOffer: 2000,
    totalScore: 60,
    rank: 2,
    status: 'RECHAZADA',
    criterias: [{ id: 'econ', name: 'Oferta', weight: 100, score: 60, weightedScore: 60 }]
  }
]

describe('ContractorHeatmap', () => {
  it('renders correctly colored score pills', () => {
    render(<ContractorHeatmap results={mockResults} />)
    
    // Winner should have emerald colors since score > 90
    expect(screen.getByText('Winner Co')).toBeInTheDocument()
    expect(screen.getByText('95')).toHaveClass('font-black')
    
    // Check that ADJUDICABLE status creates the correct badge
    expect(screen.getByText('Adjudicable')).toBeInTheDocument()
    // Loser should be RECHAZADA
    expect(screen.getByText('Rechazada')).toBeInTheDocument()
  })

  it('sorts results by rank correctly', () => {
    // Pass them intentionally out of order
    render(<ContractorHeatmap results={[mockResults[1], mockResults[0]]} />)
    
    // Query rows to ensure rank 1 is shown correctly
    const names = screen.getAllByText(/Winner Co|Loser Co/)
    expect(names[0].textContent).toBe('Winner Co')
  })
})
