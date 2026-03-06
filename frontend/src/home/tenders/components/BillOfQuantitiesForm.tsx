import { useState, useMemo } from 'react'
import { Save, AlertTriangle, FileSpreadsheet, SendHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { TenderData, BillOfQuantitiesItem, TaxType } from '../types'

interface BillOfQuantitiesFormProps {
  initialData: TenderData
  onSubmit?: (data: TenderData) => void
}

export function BillOfQuantitiesForm({ initialData, onSubmit }: BillOfQuantitiesFormProps) {
  const [items, setItems] = useState<BillOfQuantitiesItem[]>(initialData.items)

  const handleItemChange = (itemId: string, field: keyof BillOfQuantitiesItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, [field]: value }
        }
        return item
      })
    )
  }

  const { aiuCount, ivaCount, exentoCount, totalItems } = useMemo(() => {
    let aiu = 0
    let iva = 0
    let exento = 0
    items.forEach((i) => {
      if (i.taxType === 'AIU') aiu++
      else if (i.taxType === 'IVA_PLENO') iva++
      else if (i.taxType === 'EXENTO') exento++
    })
    return { aiuCount: aiu, ivaCount: iva, exentoCount: exento, totalItems: items.length }
  }, [items])

  const handleSave = () => {
    toast.success('Cambios guardados localmente')
  }

  const handleSubmit = () => {
    const invalidItems = items.filter((i) => isNaN(parseFloat(i.quantity.toString())) || i.quantity < 0)
    if (invalidItems.length > 0) {
      toast.error('Existen ítems con cantidades inválidas o negativas. Por favor corrige antes de publicar.')
      return
    }

    toast.loading('Publicando cantidades al oferente...', { id: 'publish-tender' })
    setTimeout(() => {
      toast.success('¡Cantidades publicadas y pliegos liberados!', { id: 'publish-tender' })
      onSubmit?.({ ...initialData, items })
    }, 1200)
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border text-center p-4 rounded-xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Ítems</p>
          <p className="text-3xl font-black text-slate-800">{totalItems}</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 text-center p-4 rounded-xl shadow-sm">
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Ítems A.I.U.</p>
          <p className="text-3xl font-black text-indigo-700">{aiuCount}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 text-center p-4 rounded-xl shadow-sm">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Ítems IVA Pleno</p>
          <p className="text-3xl font-black text-emerald-700">{ivaCount}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 text-center p-4 rounded-xl shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ítems Exentos</p>
          <p className="text-3xl font-black text-slate-700">{exentoCount}</p>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-4 mb-6">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-bold">Responsabilidad Técnica</p>
          <p>La correcta categorización de IVA vs AIU es fundamental para el cruce de ofertas y el cálculo final del costo. Verifica la matriz tributaria del proyecto.</p>
        </div>
      </div>

      {/* Main Datagrid Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900 border-b border-slate-800 text-white uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">#</th>
                <th className="px-6 py-4 w-32">Código</th>
                <th className="px-6 py-4 min-w-[300px]">Descripción</th>
                <th className="px-6 py-4 w-24 text-center">Und.</th>
                <th className="px-6 py-4 w-48 text-right">Cantidad de Obra</th>
                <th className="px-6 py-4 w-56">Categoría de Impuesto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-center align-middle font-medium text-slate-400 border-r border-slate-100">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-3 align-middle font-mono font-medium text-indigo-600">
                    {item.code}
                  </td>
                  <td className="px-6 py-3 align-middle">
                    <span className="font-semibold text-slate-800 whitespace-normal line-clamp-2" title={item.description}>
                      {item.description}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center align-middle font-medium text-slate-500">
                    {item.unit}
                  </td>
                  <td className="px-6 py-3 align-middle relative group">
                    <Input
                      type="number"
                      step="any"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                      className="text-right font-mono font-bold text-slate-800 h-10 w-full group-hover:border-indigo-400 focus-visible:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-3 align-middle">
                    <Select
                      value={item.taxType}
                      onValueChange={(val) => handleItemChange(item.id, 'taxType', val as TaxType)}
                    >
                      <SelectTrigger className="h-10 w-full font-semibold focus:ring-indigo-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AIU" className="font-semibold text-indigo-700">Sobre A.I.U.</SelectItem>
                        <SelectItem value="IVA_PLENO" className="font-semibold text-emerald-700">IVA Pleno</SelectItem>
                        <SelectItem value="EXENTO" className="font-semibold text-slate-600">Exento</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
              
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    No hay ítems cargados en el pliego de condiciones.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col sm:flex-row justify-end items-center gap-4">
          <button 
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Save size={18} />
            Guardar Borrador
          </button>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            Publicar Licitación
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
