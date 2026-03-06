import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Solenium Licitaciones</h1>
        <p className="text-muted-foreground text-lg">
          Workspace under construction for Hackathon
        </p>
      </div>
    </div>
  )
}
