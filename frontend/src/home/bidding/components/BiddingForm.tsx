import type { BiddingActivity } from '../types';

interface BiddingFormProps {
  activities?: BiddingActivity[];
}

export function BiddingForm({ activities = [] }: BiddingFormProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Formulario de Licitación</h2>
      <p className="text-gray-600 mb-6">
        A continuación, ingresa los valores unitarios para cada actividad del proyecto.
      </p>

      {activities.length === 0 ? (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded text-center text-gray-500">
          No hay actividades disponibles para cotizar en este momento.
        </div>
      ) : (
        <form className="space-y-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor Unitario
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Filas de actividades irán aquí */}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors"
            >
              Vista Previa de la Oferta
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
