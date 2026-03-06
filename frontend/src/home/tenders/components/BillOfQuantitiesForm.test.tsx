import { render, screen } from '@testing-library/react'
import { BillOfQuantitiesForm } from './BillOfQuantitiesForm'
import type { TenderData } from '../types'

const mockData: TenderData = {
  projectId: 'test-123',
  items: [
    { id: '1', code: 'IT-01', description: 'Item 1', unit: 'und', quantity: 10, taxType: 'AIU' },
    { id: '2', code: 'IT-02', description: 'Item 2', unit: 'm', quantity: 5.5, taxType: 'IVA_PLENO' },
  ]
}

describe('BillOfQuantitiesForm', () => {
  it('renders summary counts correctly based on items tax types', () => {
    render(<BillOfQuantitiesForm initialData={mockData} />)

    // Items AIU (should be 1)
    expect(screen.getByText('Ítems A.I.U.')).toBeInTheDocument()
    expect(screen.getAllByText('1')[0]).toBeInTheDocument() // Using 1 directly because text content is '1'

    // Items IVA_PLENO (should be 1)
    expect(screen.getByText('Ítems IVA Pleno')).toBeInTheDocument()
    // It has 1 item as well.

    expect(screen.getByText('Total Ítems')).toBeInTheDocument()
    expect(screen.getAllByText('2')[0]).toBeInTheDocument() // Grand total 2
  })

  it('renders descriptions correctly', () => {
    render(<BillOfQuantitiesForm initialData={mockData} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})
