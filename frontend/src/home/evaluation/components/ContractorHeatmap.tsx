import { Trophy, TrendingDown, CheckCircle2, XCircle, Clock } from 'lucide-react'
import type { ContractorResult } from '../types'

interface ContractorHeatmapProps {
  results: ContractorResult[]
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200'
  if (score >= 75) return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200'
  return 'bg-red-100 text-red-800 border-red-200' // Fail
}

const getStatusBadge = (status: ContractorResult['status']) => {
  switch (status) {
    case 'ADJUDICABLE':
      return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-200"><CheckCircle2 size={12} /> Habilitada</span>
    case 'RECHAZADA':
      return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-100 italic opacity-70"><XCircle size={12} /> Rechazada</span>
    default:
      return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest border border-amber-100"><Clock size={12} /> En Revisión</span>
  }
}

export function ContractorHeatmap({ results }: ContractorHeatmapProps) {
  // Sort results by rank (which is effectively by totalScore descending)
  const sortedResults = [...results].sort((a, b) => a.rank - b.rank)

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-900 border-b border-slate-800 text-white uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 w-20 text-center">Ranking</th>
              <th className="px-6 py-4 min-w-[250px]">Razón Social (Proponente)</th>
              <th className="px-6 py-4 text-right">Oferta Económica</th>
              {/* Dynamic Criteria Headers - Assuming all have same criteria structure */}
              {sortedResults[0]?.criterias.map(c => (
                <th key={c.id} className="px-6 py-4 text-center">
                  {c.name} <span className="text-slate-400 font-normal lowercase ml-1">({c.weight}%)</span>
                </th>
              ))}
              <th className="px-6 py-4 text-center bg-indigo-900 border-l border-white/10">Puntaje Total</th>
              <th className="px-6 py-4 text-center">Estado Legal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedResults.map((contractor) => (
              <tr 
                key={contractor.contractorId} 
                className={`transition-colors ${contractor.rank === 1 ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}
              >
                {/* Ranking Column */}
                <td className="px-6 py-4 align-middle">
                  <div className="flex justify-center">
                    {contractor.rank === 1 && contractor.status !== 'RECHAZADA' ? (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-sm animate-pulse">
                        <Trophy size={20} className="fill-indigo-600/20" />
                      </div>
                    ) : contractor.status === 'RECHAZADA' ? (
                      <div className="px-2 py-1 rounded bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                        Desc.
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center border border-emerald-200">
                        #{contractor.rank}
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 align-middle">
                  <div className="font-bold text-slate-800">{contractor.contractorName}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">ID: {contractor.contractorId}</div>
                </td>

                <td className="px-6 py-4 align-middle text-right">
                  <span className="font-mono font-bold text-slate-700">
                    ${contractor.economicOffer.toLocaleString()}
                  </span>
                  {contractor.rank === 1 && (
                    <div className="text-[10px] text-indigo-600 font-semibold flex items-center justify-end gap-1 mt-1">
                      <TrendingDown size={10} /> Menor valor
                    </div>
                  )}
                </td>

                {/* Criteria Heatmap Columns */}
                {contractor.criterias.map(crit => (
                  <td key={crit.id} className="px-2 py-4 align-middle">
                    <div className={`mx-auto w-20 flex flex-col items-center justify-center p-2 rounded-lg border ${getScoreColor(crit.score)}`}>
                      <span className="text-lg font-black">{crit.score}</span>
                      <span className="text-[10px] font-semibold opacity-70 uppercase mt-0.5">{crit.weightedScore} pts</span>
                    </div>
                  </td>
                ))}

                {/* Total Score */}
                <td className="px-6 py-4 align-middle bg-indigo-50/30 border-l border-slate-100 text-center">
                  <span className="text-2xl font-black text-indigo-700">{contractor.totalScore.toFixed(1)}</span>
                  <span className="text-xs text-indigo-400 font-bold align-top ml-0.5">/100</span>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4 align-middle text-center">
                  {getStatusBadge(contractor.status)}
                </td>
              </tr>
            ))}

            {sortedResults.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No hay oferentes radicados para este proceso aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border-t border-slate-200 p-4 text-xs text-slate-500 text-center font-medium">
        Nota: La oferta económica de menor valor obtiene el 100% del puntaje económico. Las demás se calculan proporcional y linealmente según fórmula legal.
      </div>
    </div>
  )
}
