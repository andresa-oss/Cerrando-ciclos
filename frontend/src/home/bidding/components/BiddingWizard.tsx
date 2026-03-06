import React, { useState } from 'react';
import { BiddingForm } from './BiddingForm';
import { BiddingPreview } from './BiddingPreview';

export function BiddingWizard() {
  const [step, setStep] = useState<'form' | 'preview' | 'success'>('form');
  const [directCost, setDirectCost] = useState(0);

  const handleFormSubmit = (values: Record<string, number>) => {
    // Calculamos el costo directo sumando los subtotales de los valores diligenciados
    // activities mockup for now:
    const mockActivities = [
      { id: 'ACT-001', name: 'Excavación manual en material común', quantity: 154.5 },
      { id: 'ACT-002', name: "Suministro e instalación de concreto f'c=3000 PSI", quantity: 45.2 },
      { id: 'ACT-003', name: 'Acero de refuerzo figurado 60000 PSI', quantity: 1250.0 },
      { id: 'ACT-004', name: 'Muro en ladrillo tolete común (e=0.15m)', quantity: 85.0 },
    ];
    
    let total = 0;
    mockActivities.forEach(act => {
      const val = values[act.id] || 0;
      total += val * act.quantity;
    });

    setDirectCost(total);
    setStep('preview');
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-6 ring-8 ring-emerald-50">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Cotización Radicada Exitosamente</h2>
        <p className="text-lg text-slate-600 max-w-lg mb-8">
          Tu oferta ha sido encriptada y enviada a la bóveda segura del proyecto. Recibirás un correo electrónico con el certificado digital de radicación.
        </p>
        <button 
          onClick={() => window.location.href = '/'} // Navegación hardcoded temporal
          className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors shadow-lg"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      {step === 'form' ? (
        <BiddingForm onSubmit={handleFormSubmit} />
      ) : (
        <BiddingPreview 
          directCostTotal={directCost} 
          onBack={() => setStep('form')} 
          onSuccess={() => setStep('success')} 
        />
      )}
    </div>
  );
}
