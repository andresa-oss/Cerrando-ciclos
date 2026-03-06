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
      <header className="border-b bg-card px-8 py-4 sticky top-0 z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tablero de Licitaciones</h1>
          <p className="text-muted-foreground mt-1">
            Gestión de proyectos activos e históricos
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
