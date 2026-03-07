import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Project, type TenderStatus } from '../types'
import { CalendarDays, MapPin, ArrowRight, BarChart3, ClipboardList } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const statusColors: Record<TenderStatus, string> = {
  DRAFT: 'bg-slate-100 text-slate-500 border-slate-200',
  PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  EVALUATING: 'bg-amber-50 text-amber-700 border-amber-100',
  CLOSED: 'bg-slate-800 text-white border-slate-900',
}

const statusLabels: Record<TenderStatus, string> = {
  DRAFT: 'Borrador',
  PUBLISHED: 'Publicada',
  EVALUATING: 'En Evaluación',
  CLOSED: 'Cerrada',
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = format(new Date(project.submissionDeadline), "d 'de' MMMM, yyyy", {
    locale: es,
  })

  // Format currency
  const formattedBudget = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(project.estimatedBudget)

  return (
    <Card className="overflow-hidden border-slate-200/60 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 bg-white group/card">
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Badge className={`font-black text-[10px] uppercase tracking-widest border ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </Badge>
          <div className="p-2 bg-slate-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
        <CardTitle className="text-xl font-extrabold text-slate-800 tracking-tight">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-sm text-slate-500 leading-relaxed font-medium">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <MapPin size={14} />
            </div>
            <span className="text-sm font-semibold truncate">{project.location || 'Ubicación por definir'}</span>
          </div>
          
          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 group-hover/card:bg-indigo-50/30 group-hover/card:border-indigo-100 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Presupuesto PEPC</span>
              <span className="text-lg font-black text-slate-900">{formattedBudget}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link 
              to="/projects/$projectId/tenders" 
              params={{ projectId: project.id }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              <ClipboardList size={14} /> Cantidades
            </Link>
            <Link 
              to="/projects/$projectId/evaluation" 
              params={{ projectId: project.id }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 active:scale-95"
            >
              <BarChart3 size={14} /> Evaluar
            </Link>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 text-[10px] text-slate-400 border-t border-slate-50 flex items-center justify-between py-4 px-6 bg-slate-50/30">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
          <CalendarDays size={12} className="text-indigo-500" />
          <span>Cierre: {formattedDate}</span>
        </div>
        <span className="font-black text-slate-300">SOLENIUM</span>
      </CardFooter>
    </Card>
  )
}

