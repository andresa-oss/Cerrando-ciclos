import { useSuspenseQuery } from '@tanstack/react-query'
import { projectsQueryOptions } from '../api/fetch-projects'
import { ProjectCard } from './ProjectCard'

const COLUMNS = [
  { id: 'DRAFT', title: 'Borrador' },
  { id: 'PUBLISHED', title: 'Publicadas' },
  { id: 'EVALUATING', title: 'En Evaluación' },
  { id: 'CLOSED', title: 'Cerradas' },
] as const

export function ProjectsDashboard() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions())

  return (
    <div className="flexh-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-x-auto p-4 md:p-6 lg:p-8">
        <div className="flex gap-4 min-w-max pb-4">
          {COLUMNS.map((column) => {
            const columnProjects = projects.filter((p) => p.status === column.id)
            
            return (
              <div key={column.id} className="w-[350px] shrink-0 bg-muted/30 rounded-lg p-4 flex flex-col max-h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{column.title}</h3>
                  <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-medium text-muted-foreground">
                    {columnProjects.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 snap-y pb-2">
                  {columnProjects.map((project) => (
                    <div key={project.id} className="snap-start">
                       <ProjectCard project={project} />
                    </div>
                  ))}
                  
                  {columnProjects.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                      No hay proyectos
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
