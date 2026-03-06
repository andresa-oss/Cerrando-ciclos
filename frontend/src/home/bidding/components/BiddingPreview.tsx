import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  Calculator,
  ShieldAlert,
  Download
} from 'lucide-react';
import { useSubmitBidding } from '../api/mutations';
import { toast } from 'sonner';

interface BiddingPreviewProps {
  directCostTotal: number;
  onBack: () => void;
  onSuccess: () => void;
}

export function BiddingPreview({ directCostTotal, onBack, onSuccess }: BiddingPreviewProps) {
  const [aiuLevels, setAiuLevels] = useState({
    admin: 15,
    imprevistos: 5,
    utilidad: 5,
    iva: 19 // IVA sobre la utilidad
  });

  const { mutate: submitOffer, isPending } = useSubmitBidding();

  const handleAiuChange = (field: keyof typeof aiuLevels, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setAiuLevels(prev => ({ ...prev, [field]: num }));
    } else if (value === '') {
      setAiuLevels(prev => ({ ...prev, [field]: 0 }));
    }
  };

  const {
    adminValue,
    imprevistosValue,
    utilidadValue,
    aiuTotal,
    ivaValue,
    grandTotal
  } = useMemo(() => {
    const admin = directCostTotal * (aiuLevels.admin / 100);
    const impr = directCostTotal * (aiuLevels.imprevistos / 100);
    const util = directCostTotal * (aiuLevels.utilidad / 100);
    const totalAiu = admin + impr + util;
    const iva = util * (aiuLevels.iva / 100); // En colombia el IVA en obra civil normalmente es sobre la utilidad
    
    return {
      adminValue: admin,
      imprevistosValue: impr,
      utilidadValue: util,
      aiuTotal: totalAiu,
      ivaValue: iva,
      grandTotal: directCostTotal + totalAiu + iva
    };
  }, [directCostTotal, aiuLevels]);

  const handleFinalSubmit = () => {
    toast.loading("Procesando tu oferta en la bóveda segura...", { id: "submit-offer" });
    submitOffer(
      { directCostTotal, aiuLevels, grandTotal },
      {
        onSuccess: () => {
          toast.success("¡Oferta firmada y radicada exitosamente!", { id: "submit-offer" });
          onSuccess();
        },
        onError: () => {
          toast.error("Ocurrió un error al radicar la oferta. Intenta nuevamente.", { id: "submit-offer" });
        }
      }
    );
  };

  const handleDownloadPDF = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2500)), // Simular generación de PDF por el backend
      {
        loading: 'Generando tu borrador PDF con estampilla de tiempo...',
        success: '¡Borrador PDF generado y descargado exitosamente!',
        error: 'Error al generar el documento. Intenta más tarde.',
      }
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
        <button 
          onClick={onBack}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          title="Volver a la edición"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Resumen Estructurado de la Oferta
          </h1>
          <p className="text-slate-500 mt-1">
            Por favor, define los porcentajes AIU e IVA para tu propuesta económica.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: AIU Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calculator className="text-indigo-500" />
              Estructura A.I.U.
            </h3>
            
            <div className="space-y-5">
              {/* Administracion */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700">Administración (%)</label>
                  <span className="text-xs text-slate-400">Costos operativos de la empresa</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={aiuLevels.admin}
                    onChange={(e) => handleAiuChange('admin', e.target.value)}
                    className="w-24 px-3 py-2 text-right font-bold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <span className="w-32 text-right font-mono font-medium text-slate-600">
                    ${adminValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Imprevistos */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700">Imprevistos (%)</label>
                  <span className="text-xs text-slate-400">Riesgo asumido en la obra</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={aiuLevels.imprevistos}
                    onChange={(e) => handleAiuChange('imprevistos', e.target.value)}
                    className="w-24 px-3 py-2 text-right font-bold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <span className="w-32 text-right font-mono font-medium text-slate-600">
                    ${imprevistosValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Utilidad */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700">Utilidad (%)</label>
                  <span className="text-xs text-slate-400">Ganancia esperada del proyecto</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={aiuLevels.utilidad}
                    onChange={(e) => handleAiuChange('utilidad', e.target.value)}
                    className="w-24 px-3 py-2 text-right font-bold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <span className="w-32 text-right font-mono font-medium text-slate-600">
                    ${utilidadValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Separador */}
              <div className="my-4 border-t border-slate-200 border-dashed"></div>

              {/* IVA sobre Utilidad */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-indigo-900">I.V.A (%)</label>
                  <span className="text-xs text-indigo-600/70">Calculado única y exclusivamente sobre la utilidad</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={aiuLevels.iva}
                    onChange={(e) => handleAiuChange('iva', e.target.value)}
                    className="w-24 px-3 py-2 text-right font-bold text-indigo-900 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="w-32 text-right font-mono font-bold text-indigo-700">
                    ${ivaValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Legal Warning */}
          <div className="flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-sm leading-relaxed">
            <ShieldAlert className="shrink-0 mt-0.5 text-amber-500" size={20} />
            <p>
              <strong>Atención:</strong> Al finalizar este proceso, generarás un documento legal vinculante. 
              Cerciórate de que tus valores unitarios y porcentajes AIU sean consistentes con tu capacidad 
              técnica y financiera para ejecutar la obra a satisfacción.
            </p>
          </div>
        </div>

        {/* Right Column: Grand Total Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden sticky top-6">
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white/80 uppercase tracking-wider mb-8">
                Valor Total de la Propuesta
              </h3>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Costo Directo (C.D.)</span>
                  <span className="font-mono">${directCostTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Valor A.I.U. ({(aiuLevels.admin + aiuLevels.imprevistos + aiuLevels.utilidad).toFixed(1)}%)</span>
                  <span className="font-mono">${aiuTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>I.V.A ({aiuLevels.iva}% s/U)</span>
                  <span className="font-mono">${ivaValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className="my-6 border-t border-slate-700/50"></div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">A Pagar al Contratista</span>
                <span className="text-4xl lg:text-5xl font-black text-white font-mono tracking-tight leading-none">
                  ${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="p-4 bg-indigo-600/10 border-t border-white/5 space-y-3">
              <button 
                onClick={handleFinalSubmit}
                disabled={isPending}
                className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Radicando Oferta...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={24} />
                    <span>Firmar y Radicar Cotización</span>
                  </>
                )}
              </button>

              <button 
                onClick={handleDownloadPDF}
                className="w-full py-3 rounded-xl font-medium text-slate-300 bg-transparent hover:bg-white/5 border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>Descargar Borrador (PDF)</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
