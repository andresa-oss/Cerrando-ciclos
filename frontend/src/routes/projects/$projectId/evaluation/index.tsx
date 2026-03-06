import { createFileRoute } from '@tanstack/react-router'
import { evaluationQueryOptions } from '@/home/evaluation/api/fetch-evaluation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { EvaluationHeader } from '@/home/evaluation/components/EvaluationHeader'
import { ContractorHeatmap } from '@/home/evaluation/components/ContractorHeatmap'

export const Route = createFileRoute('/projects/$projectId/evaluation/')({
  loader: ({ context: { queryClient }, params: { projectId } }) => 
    queryClient.ensureQueryData(evaluationQueryOptions(projectId)),
  component: EvaluationPage,
  pendingComponent: () => <div className="p-8 text-center text-slate-500 animate-pulse font-medium">Calculando matriz de adjudicación...</div>,
})

function EvaluationPage() {
  const { projectId } = Route.useParams()
  const { data } = useSuspenseQuery(evaluationQueryOptions(projectId))

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EvaluationHeader data={data} />
        <ContractorHeatmap results={data.results} />
      </div>
    </div>
  )
}
