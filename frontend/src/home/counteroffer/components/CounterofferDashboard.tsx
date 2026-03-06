import React, { useState } from 'react';
import {
  Trophy,
  TrendingDown,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitCounteroffer } from '../api/mutations';
import type { CounterofferData } from '../types';

interface CounterofferDashboardProps {
  data?: CounterofferData;
}

export function CounterofferDashboard({
  data = { rank: 2, currentOffer: 5000000, targetOffer: 4850000 }
}: CounterofferDashboardProps) {
  const [newOffer, setNewOffer] = useState<string>('');
  const { mutate: submitCounteroffer, isPending } = useSubmitCounteroffer();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setNewOffer(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const offerValue = parseInt(newOffer, 10);

    if (!offerValue || offerValue >= data.currentOffer) {
      toast.error('Tu nueva oferta debe ser menor a la oferta actual para mejorar tu posición.');
      return;
    }

    submitCounteroffer(
      { newTotal: offerValue },
      {
        onSuccess: () => {
          toast.success('¡Contraoferta radicada existosamente! Tu nueva posición está siendo calculada.', {
            icon: '🏆'
          });
          setNewOffer('');
        },
        onError: () => {
          toast.error('Ocurrió un error de validación criptográfica al radicar. Intenta nuevamente.');
        }
      }
    );
  };

  const differenceToTarget = data.currentOffer - data.targetOffer;
  const percentageToImprove = ((differenceToTarget / data.currentOffer) * 100).toFixed(2);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* Header Alerta */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900 rounded-2xl p-6 shadow-xl mb-8 border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="flex items-start gap-4 z-10">
          <div className="p-3 bg-red-500/20 text-red-400 rounded-xl shrink-0">
            <Clock className="animate-pulse" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Sala de Contraoferta <ShieldCheck size={20} className="text-emerald-400" />
            </h1>
            <p className="text-slate-400 mt-1 text-sm md:text-base">
              Felicidades, te encuentras en el <strong>TOP 3</strong>. Tienes 45 minutos para mejorar tu propuesta económica antes del cierre del sobre digital.
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 font-mono text-xl font-bold text-red-400 z-10 tracking-widest shadow-inner">
          44:59
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Tu Posición */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-indigo-300 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy size={100} className="text-indigo-600" />
          </div>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 z-10">Tu Ranking Actual</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-6xl font-black text-indigo-600 tracking-tighter">#{data.rank}</span>
            <span className="text-slate-400 font-medium">/ 15</span>
          </div>
          <div className="mt-4 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 z-10">
            Admisible
          </div>
        </div>

        {/* Oferta Actual */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Mi Oferta Actual</span>
            <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg"><TrendingDown size={18} /></span>
          </div>
          <span className="text-3xl lg:text-4xl font-black text-slate-800 font-mono tracking-tight break-all">
            ${data.currentOffer.toLocaleString()}
          </span>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-500" /> C.D. + A.I.U. Incluido
          </p>
        </div>

        {/* Oferta a Vencer / Puesto #1 */}
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 shadow-sm border border-indigo-100 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Posición #1 de Referencia</span>
            <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><Zap size={18} className="fill-indigo-600/20" /></span>
          </div>
          <span className="text-3xl lg:text-4xl font-black text-indigo-900 font-mono tracking-tight break-all">
            ${data.targetOffer.toLocaleString()}
          </span>
          <p className="text-xs text-indigo-700/80 mt-3 font-medium">
            Necesitas reducir un {percentageToImprove}% para alcanzar la Puntuación Económica del Puesto 1.
          </p>
        </div>

      </div>

      {/* Formulario de Contraoferta */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 border border-slate-200">
        <div className="mb-6 flex items-start gap-4">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0 mt-1">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Radicar Nuevo Valor Absoluto</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl">
              Estás a punto de modificar el valor total vinculante de tu oferta. El sistema aplicará un descuento lineal equivalente en porcentaje a todas y cada una de las actividades detalladas (Ítems) para que matemáticamente crucen con este nuevo Gran Total. Una vez emitido, <strong>no se puede deshacer.</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex-grow w-full">
            <label htmlFor="newOffer" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Nuevo Gran Total de Oferta ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">$</span>
              <input
                type="text"
                id="newOffer"
                value={newOffer ? parseInt(newOffer).toLocaleString() : ''}
                onChange={handlePriceChange}
                className="w-full h-14 pl-10 pr-4 text-2xl font-black font-mono text-slate-800 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal"
                placeholder="Ej. 4,750,000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!newOffer || isPending}
            className={`w-full lg:w-auto h-14 px-8 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 ${!newOffer
                ? 'bg-slate-300 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
              }`}
          >
            {isPending ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <TrendingDown size={20} className="stroke-[3px]" />
            )}
            <span>Presentar Contraoferta</span>
          </button>
        </div>
      </form>
    </div>
  );
}
