import React from 'react';
import type { CounterofferData } from '../types';

interface CounterofferDashboardProps {
  data?: CounterofferData;
}

export function CounterofferDashboard({ data }: CounterofferDashboardProps) {
  if (!data) return <div className="p-6 text-center text-gray-500">Cargando datos de contraoferta...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-slate-50 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Panel de Contraoferta</h2>
      <p className="text-slate-600 mb-8">
        Actualmente te encuentras en el top 3 de este proceso. Puedes ajustar tu oferta para mejorar tu posición.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-indigo-100 flex flex-col items-center justify-center">
          <span className="text-sm text-indigo-500 font-semibold uppercase tracking-wider mb-1">Tu Posición</span>
          <span className="text-4xl font-black text-indigo-700">#{data.rank}</span>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">Oferta Actual</span>
          <span className="text-2xl font-bold text-slate-800">${data.currentOffer.toLocaleString()}</span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-emerald-100 flex flex-col items-center justify-center">
          <span className="text-sm text-emerald-500 font-semibold uppercase tracking-wider mb-1">Oferta a Superar</span>
          <span className="text-2xl font-bold text-emerald-600">${data.targetOffer.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Ajustar Oferta</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="newOffer" className="block text-sm font-medium text-slate-700 mb-1">Nuevo Valor Total</label>
            <input 
              type="number" 
              id="newOffer" 
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
              placeholder="Ej. 4750000"
            />
          </div>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors">
            Enviar Nueva Oferta
          </button>
        </div>
      </div>
    </div>
  );
}
