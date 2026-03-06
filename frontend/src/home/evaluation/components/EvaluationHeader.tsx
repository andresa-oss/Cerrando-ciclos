import { BarChart3, Users, Scale, AlertOctagon } from 'lucide-react'
import type { EvaluationData } from '../types'

interface EvaluationHeaderProps {
  data: EvaluationData
}

export function EvaluationHeader({ data }: EvaluationHeaderProps) {
  const totalOffers = data.results.length
  const adjudicables = data.results.filter(r => r.status === 'ADJUDICABLE').length
  const rechazadas = data.results.filter(r => r.status === 'RECHAZADA').length

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4 border border-indigo-200">
          <BarChart3 size={14} className="text-indigo-500" />
          Fase de Adjudicación
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tablero Comparativo (Heatmap)
        </h1>
        <p className="text-slate-500 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
          Análisis multidimensional de las ofertas recibidas. Los puntajes se ponderan automáticamente según los TDR del proyecto.
        </p>
      </div>

      <div className="flex gap-4 shrink-0 overflow-x-auto pb-2 sm:pb-0">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[140px] flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Users size={14} /> Oferentes</span>
          <span className="text-3xl font-black text-slate-800 mt-1">{totalOffers}</span>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm min-w-[140px] flex flex-col justify-center">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5"><Scale size={14} /> Habilitadas</span>
          <span className="text-3xl font-black text-emerald-700 mt-1">{adjudicables}</span>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm min-w-[140px] flex flex-col justify-center">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center gap-1.5"><AlertOctagon size={14} /> Rechazadas</span>
          <span className="text-3xl font-black text-red-700 mt-1">{rechazadas}</span>
        </div>
      </div>
    </div>
  )
}
