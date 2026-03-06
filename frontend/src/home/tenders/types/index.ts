export type TaxType = 'AIU' | 'IVA_PLENO' | 'EXENTO'

export interface BillOfQuantitiesItem {
  id: string
  code: string
  description: string
  unit: string
  quantity: number
  taxType: TaxType
}

export interface TenderData {
  projectId: string
  items: BillOfQuantitiesItem[]
}
