"use client";

import React from "react";

export default function DirectionA({
  onOpenAddress,
  onShowDetails,
}: {
  onOpenAddress?: () => void; // abrir modal para ingresar/editar dirección
  onShowDetails?: () => void; // cambiar a la vista detallada (DirectionB)
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Elige un tipo de entrega</h3>
      <div className="space-y-3">
        <button
          className="w-full text-left p-3 border rounded"
          onClick={() => {
            // por ejemplo: abrir modal para ingresar dirección para retiros
            onOpenAddress?.();
          }}
        >
          Retira tu pedido
        </button>

        <button
          className="w-full text-left p-3 border rounded"
          onClick={() => {
            // mostrar la vista más detallada (DirectionB) para elegir envíos
            onShowDetails?.();
          }}
        >
          Envío Express
        </button>

        <button
          className="w-full text-left p-3 border rounded"
          onClick={() => {
            onShowDetails?.();
          }}
        >
          Envío en fecha programada
        </button>

        <button
          className="w-full text-left p-3 border rounded"
          onClick={() => {
            onShowDetails?.();
          }}
        >
          Envío en rango de fechas
        </button>
      </div>
    </div>
  );
}
