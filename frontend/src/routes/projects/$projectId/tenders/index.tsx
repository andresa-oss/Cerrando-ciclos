import { createFileRoute } from '@tanstack/react-router'
import { tenderQueryOptions } from '@/home/tenders/api/fetch-tenders'
import { useSuspenseQuery } from '@tanstack/react-query'
import { TenderHeader } from '@/home/tenders/components/TenderHeader'
import { BillOfQuantitiesForm } from '@/home/tenders/components/BillOfQuantitiesForm'

export const Route = createFileRoute('/projects/$projectId/tenders/')({
  loader: ({ context: { queryClient }, params: { projectId } }) => 
    queryClient.ensureQueryData(tenderQueryOptions(projectId)),
  component: TendersPage,
  pendingComponent: () => <div className="p-8 text-center text-slate-500 animate-pulse font-medium">Cargando matriz tributaria del proyecto...</div>,
})

function TendersPage() {
  const { projectId } = Route.useParams()
  const { data } = useSuspenseQuery(tenderQueryOptions(projectId))

  const handlePublish = () => {
    // In a real app we'd redirect or sync with backend here using a mutation
    console.log("Publishing tender data:", data)
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TenderHeader 
          projectId={projectId} 
          title="Adecuación Locativa y Mantenimiento Sede Principal"
          location="Medellín, Colombia"
        />
        
        <BillOfQuantitiesForm 
          initialData={data} 
          onSubmit={handlePublish}
        />
      </div>
    </div>
  )
}
