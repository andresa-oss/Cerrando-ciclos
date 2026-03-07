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
    <div className="flex h-[calc(100vh-9rem)] flex-col bg-slate-50/50">
      <div className="flex-1 overflow-x-auto p-4 md:p-6 lg:p-8">
        <div className="flex gap-4 min-w-max pb-4">
          {COLUMNS.map((column) => {
            const columnProjects = projects.filter((p) => p.status === column.id)
            
            return (
              <div key={column.id} className="w-[380px] shrink-0 bg-slate-100/40 rounded-3xl p-6 flex flex-col max-h-full border border-slate-200/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-slate-800 text-xl tracking-tight uppercase text-xs">{column.title}</h3>
                  <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-black text-slate-500 shadow-sm">
                    {columnProjects.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 snap-y pb-4 scrollbar-hide">
                  {columnProjects.map((project) => (
                    <div key={project.id} className="snap-start">
                       <ProjectCard project={project} />
                    </div>
                  ))}
                  
                  {columnProjects.length === 0 && (
                    <div className="text-center py-12 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
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
