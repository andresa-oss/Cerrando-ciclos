import { createFileRoute } from '@tanstack/react-router'
import { BiddingWizard } from '../home/bidding/components/BiddingWizard'

export const Route = createFileRoute('/bidding')({
  component: BiddingPage,
})

function BiddingPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none"></div>
      
      {/* Navigation Header mockup */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">S</span>
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">Solenium</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              Licitación ID: #PRJ-2026-004
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-xs font-bold text-slate-600">CO</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <main className="relative z-10">
        <BiddingWizard />
      </main>
    </div>
  )
}
