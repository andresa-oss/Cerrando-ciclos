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
import { CalendarDays, MapPin } from 'lucide-react'

const statusColors: Record<TenderStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  DRAFT: 'secondary',
  PUBLISHED: 'default',
  EVALUATING: 'destructive',
  CLOSED: 'outline',
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
    <Card className="hover:border-primary/50 transition-colors shadow-sm cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <Badge variant={statusColors[project.status]} className="shrink-0">
            {statusLabels[project.status]}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 mt-2 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center justify-between font-medium text-foreground">
            <span>Presupuesto Estimado:</span>
            <span>{formattedBudget}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground border-t mt-4 flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Cierre: {formattedDate}</span>
        </div>
        <span className="opacity-60">{project.owner}</span>
      </CardFooter>
    </Card>
  )
}
