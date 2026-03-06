import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/LogoSolenium.png" alt="Solenium Logo" className="h-12 w-auto object-contain drop-shadow-sm" />
          <span className="font-black text-slate-900 tracking-tighter text-4xl" style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}>
            GISE
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Portal Integrado de Licitaciones</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Workspace under construction for Hackathon
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
          <a 
            href="/bidding" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto"
          >
            Módulo de Licitación
          </a>
          <a 
            href="/counteroffer" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-800 font-bold hover:bg-slate-50 hover:border-slate-300 transition shadow-sm w-full sm:w-auto"
          >
            Sala de Contraofertas
          </a>
        </div>
      </div>
    </div>
  )
}
