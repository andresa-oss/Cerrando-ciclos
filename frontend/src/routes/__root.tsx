import { createRootRouteWithContext, Outlet, Link, useRouterState } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import type { QueryClient } from '@tanstack/react-query'
import { Home } from 'lucide-react'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    const state = useRouterState()
    const isHome = state.location.pathname === '/'

    return (
      <div className="min-h-screen relative">
        <Outlet />
        {!isHome && (
          <div className="fixed bottom-6 right-6 z-50">
            <Link 
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all font-bold text-sm border border-white/10"
            >
              <Home size={18} />
              Panel Principal
            </Link>
          </div>
        )}
        <Toaster />
      </div>
    )
  },
})
