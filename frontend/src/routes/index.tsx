import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Briefcase,
  ClipboardList,
  BarChart3,
  SendHorizontal,
  TrendingDown,
  LayoutDashboard
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const modules = [
    {
      title: 'Tablero de Proyectos',
      description: 'Gestión Kanban de licitaciones activas e históricas.',
      to: '/projects',
      icon: <LayoutDashboard className="text-indigo-600" size={28} />,
      role: 'Interno'
    },
    {
      title: 'Cantidades de Obra',
      description: 'Matriz técnica de cantidades e impuestos (AIU/IVA).',
      to: '/projects/proj-001/tenders',
      icon: <ClipboardList className="text-emerald-600" size={28} />,
      role: 'Interno'
    },
    {
      title: 'Tablero de Evaluación',
      description: 'Heatmap comparativo y matriz de adjudicación.',
      to: '/projects/proj-001/evaluation',
      icon: <BarChart3 className="text-amber-600" size={28} />,
      role: 'Interno'
    },
    {
      title: 'Módulo de Licitación',
      description: 'Wizard seguro para radicación de ofertas económicas.',
      to: '/bidding',
      icon: <SendHorizontal className="text-blue-600" size={28} />,
      role: 'Contratista'
    },
    {
      title: 'Sala de Contraoferta',
      description: 'Mejora de ranking en tiempo real para proponentes.',
      to: '/counteroffer',
      icon: <TrendingDown className="text-rose-600" size={28} />,
      role: 'Contratista'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl w-full">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-4 border border-indigo-200">
            <Briefcase size={14} /> Solenium Platform v1.0
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Solenium Licitaciones</h1>
          <p className="text-slate-500 text-lg mt-3 max-w-2xl mx-auto">
            Panel principal de acceso a todos los módulos funcionales construidos para la hackathon.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.to}
              to={mod.to}
              className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 flex flex-col"
            >
              <div className="p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-indigo-50 transition-colors mb-6">
                {mod.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{mod.title}</h3>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${mod.role === 'Interno' ? 'bg-slate-100 text-slate-500' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                    {mod.role}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {mod.description}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                Ir al módulo <SendHorizontal size={14} />
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-center text-slate-400 text-sm font-medium">
          Hackathon Solenium • 2026 • Construcción de Futuro
        </footer>
      </div>
    </div>
  )
}
