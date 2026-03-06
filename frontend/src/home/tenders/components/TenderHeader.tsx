import { MapPin, Briefcase } from 'lucide-react'

interface TenderHeaderProps {
  projectId: string
  title?: string
  location?: string
}

export function TenderHeader({
  projectId,
  title = 'Proyecto sin título',
  location = 'Ubicación no especificada',
}: TenderHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4 border border-slate-200">
          <Briefcase size={14} className="text-slate-500" />
          ID Proyecto: {projectId}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Carga de Cantidades de Obra
        </h1>
        <p className="text-slate-500 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
          Define el Cuadro de Cantidades y especifica la estructura impositiva aplicable para cada ítem.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm shrink-0 w-full md:w-auto min-w-[250px]">
        <h3 className="text-sm font-semibold text-slate-500 mb-1">Contexto del Proyecto</h3>
        <p className="font-bold text-slate-800 break-words">{title}</p>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
          <MapPin size={14} className="text-emerald-600 shrink-0" />
          {location}
        </div>
      </div>
    </div>
  )
}
