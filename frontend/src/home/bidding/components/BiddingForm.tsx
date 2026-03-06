import React, { useState, useMemo } from 'react';
import { 
  Save, 
  AlertCircle, 
  Calculator,
  ChevronRight,
  Info,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';
import type { BiddingActivity } from '../types';

interface BiddingFormProps {
  activities?: BiddingActivity[];
  onSubmit?: (data: Record<string, number>) => void;
}

export function BiddingForm({ 
  activities = [
    { id: 'ACT-001', name: 'Excavación manual en material común', quantity: 154.5 },
    { id: 'ACT-002', name: "Suministro e instalación de concreto f'c=3000 PSI", quantity: 45.2 },
    { id: 'ACT-003', name: 'Acero de refuerzo figurado 60000 PSI', quantity: 1250.0 },
    { id: 'ACT-004', name: 'Muro en ladrillo tolete común (e=0.15m)', quantity: 85.0 },
  ],
  onSubmit 
}: BiddingFormProps) {
  const [unitValues, setUnitValues] = useState<Record<string, string>>({});
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const handleValueChange = (id: string, value: string) => {
    // Solo permitir números y un punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setUnitValues(prev => ({ ...prev, [id]: value }));
    }
  };

  // Calcular subtotales y total general
  const { subtotals, grandTotal } = useMemo(() => {
    let gTotal = 0;
    const subs: Record<string, number> = {};

    activities.forEach(act => {
      const val = parseFloat(unitValues[act.id]) || 0;
      const sub = val * act.quantity;
      subs[act.id] = sub;
      gTotal += sub;
    });

    return { subtotals: subs, grandTotal: gTotal };
  }, [activities, unitValues]);

  const progress = useMemo(() => {
    const filled = activities.filter(a => parseFloat(unitValues[a.id]) > 0).length;
    return Math.round((filled / (activities.length || 1)) * 100);
  }, [activities, unitValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (progress < 100) {
      alert("Por favor diligencia todos los valores unitarios antes de continuar.");
      return;
    }
    
    const parsedValues: Record<string, number> = {};
    Object.keys(unitValues).forEach(k => {
      parsedValues[k] = parseFloat(unitValues[k]) || 0;
    });
    
    onSubmit?.(parsedValues);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4 border border-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Formulario de Licitación Activo
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ingreso de Valores Unitarios
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
            Por favor, registra el costo unitario para cada actividad descrita en los pliegos. El sistema calculará automáticamente los subtotales para generar tu oferta final.
          </p>
          <div className="mt-5">
            <button
               type="button"
               onClick={() => document.getElementById('excel-upload')?.click()}
               className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold transition-colors border border-emerald-200 shadow-sm"
             >
              <Upload size={18} />
              Importar Precios via Excel
            </button>
            <input 
              type="file" 
              id="excel-upload" 
              className="hidden" 
              accept=".xlsx,.xls,.csv"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  // Simulando lectura y parseado del archivo
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: `Leyendo archivo ${file.name}...`,
                      success: '¡Precios importados correctamente! (Simulación)',
                      error: 'Error al interpretar el archivo de Excel',
                    }
                  );
                }
              }}
            />
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm shrink-0 w-full md:w-64">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-slate-700">Progreso</span>
            <span className="text-2xl font-black text-indigo-600">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Table Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">Item</th>
                <th className="px-6 py-4 min-w-[300px]">Descripción de Actividad</th>
                <th className="px-6 py-4 text-right">Cantidad</th>
                <th className="px-6 py-4 min-w-[200px]">Valor Unitario ($)</th>
                <th className="px-6 py-4 text-right min-w-[150px]">Subtotal ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-slate-700">
              {activities.map((act, idx) => (
                <tr 
                  key={act.id} 
                  className={`transition-colors duration-200 ${activeRow === act.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                  onFocus={() => setActiveRow(act.id)}
                  onBlur={() => setActiveRow(null)}
                >
                  <td className="px-6 py-5 text-center font-medium text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-slate-800 whitespace-normal line-clamp-2">
                        {act.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded-md w-fit">
                        {act.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-slate-600">
                    {act.quantity.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5 relative">
                    <div className={`flex items-center rounded-lg border-2 transition-all duration-200 ${
                      activeRow === act.id 
                        ? 'border-indigo-500 ring-4 ring-indigo-500/10' 
                        : 'border-slate-200 hover:border-slate-300'
                    } bg-white overflow-hidden`}>
                      <span className="px-3 text-slate-400 font-medium select-none">$</span>
                      <input
                        type="text"
                        value={unitValues[act.id] || ''}
                        onChange={(e) => handleValueChange(act.id, e.target.value)}
                        placeholder="0.00"
                        className="w-full py-2.5 pr-3 outline-none font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-normal bg-transparent"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-800 font-mono">
                    ${(subtotals[act.id] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer & Summary */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            <div className="flex items-start gap-4 text-sm text-slate-500 max-w-xl">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <Info size={20} />
              </div>
              <p className="leading-relaxed">
                Revisa cuidadosamente los valores antes de continuar. Al generar la vista previa, podrás añadir el porcentaje de Administración, Imprevistos y Utilidad (AIU) que aplique.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              {/* Grand Total Display */}
              <div className="flex flex-col items-end px-6 py-3 bg-white rounded-xl shadow-sm border border-slate-200 min-w-[240px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Calculator size={14} /> Total Costo Directo
                </span>
                <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                  ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  type="button" 
                  className="flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  <span>Guardar</span>
                </button>
                <button 
                  type="submit" 
                  disabled={progress < 100}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                    progress === 100 
                      ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/25 active:scale-[0.98]' 
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span>Vista Previa</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </form>
      
    </div>
  );
}
