import { createFileRoute } from '@tanstack/react-router'
import { CounterofferDashboard } from '../home/counteroffer/components/CounterofferDashboard'

export const Route = createFileRoute('/counteroffer')({
  component: CounterofferPage,
})

function CounterofferPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -ml-32 -mt-32 w-96 h-96 rounded-full bg-slate-200 blur-3xl opacity-50 pointer-events-none"></div>

      {/* Navigation Header mockup */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/LogoSolenium.png" alt="Solenium Logo" className="h-8 w-auto object-contain" />
            <span className="font-black text-slate-900 tracking-tighter text-2xl" style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}>
              S.O.S GISE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Conexión Encriptada
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-xs font-bold text-slate-600">CO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="relative z-10 py-8">
        <CounterofferDashboard />
      </main>
    </div>
  )
}
