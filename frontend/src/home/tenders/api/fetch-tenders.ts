import { queryOptions } from '@tanstack/react-query'
import { TENDER_KEYS } from './constants'
import type { TenderData } from '../types'

const MOCK_TENDER_DATA: Record<string, TenderData> = {
  'proj-001': {
    projectId: 'proj-001',
    items: [
      { id: '1', code: 'PRE-01', description: 'Localización y replanteo', unit: 'm2', quantity: 154.5, taxType: 'AIU' },
      { id: '2', code: 'EXC-01', description: 'Excavación manual en material común', unit: 'm3', quantity: 45.2, taxType: 'AIU' },
      { id: '3', code: 'CON-01', description: "Suministro e instalación de concreto f'c=3000 PSI", unit: 'm3', quantity: 12.5, taxType: 'AIU' },
      { id: '4', code: 'STE-01', description: 'Acero de refuerzo figurado 60000 PSI', unit: 'kg', quantity: 1250.0, taxType: 'AIU' },
      { id: '5', code: 'EQ-01', description: 'Suministro de bomba centrífuga 10HP', unit: 'und', quantity: 2.0, taxType: 'IVA_PLENO' },
      { id: '6', code: 'EQ-02', description: 'Tablero de control eléctrico para bombas', unit: 'und', quantity: 1.0, taxType: 'IVA_PLENO' },
      { id: '7', code: 'TUB-01', description: 'Suministro e instalación Tubería PVC 6"', unit: 'm', quantity: 120.0, taxType: 'AIU' },
    ]
  }
}

export const fetchTenderData = async (projectId: string): Promise<TenderData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  return MOCK_TENDER_DATA[projectId] || { projectId, items: [] }
}

export const tenderQueryOptions = (projectId: string) => queryOptions({
  queryKey: TENDER_KEYS.detail(projectId),
  queryFn: () => fetchTenderData(projectId),
})
