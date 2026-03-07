import { createFileRoute } from '@tanstack/react-router'
import { projectsQueryOptions } from '@/home/projects/api/fetch-projects'
import { ProjectsDashboard } from '@/home/projects/components/ProjectsDashboard'
import { Suspense } from 'react'

export const Route = createFileRoute('/projects/')({
  loader: ({ context: { queryClient } }) => 
    queryClient.ensureQueryData(projectsQueryOptions()),
  component: ProjectsPage,
  pendingComponent: () => <div className="p-8 text-center text-muted-foreground">Cargando tablero...</div>,
})

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-slate-200 bg-white px-8 py-8 sticky top-0 z-10 shadow-sm shadow-slate-200/50">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Tablero de Licitaciones</h1>
          <p className="text-slate-500 mt-2 font-medium">
            Gestión centralizada de proyectos activos e históricos
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <Suspense fallback={null}>
          <ProjectsDashboard />
        </Suspense>
      </main>
    </div>
  )
}
