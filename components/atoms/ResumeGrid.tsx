"use client";
import Link from "next/link";
import React, { useState } from "react";


type Producto = {
id: number;
nombre: string;
precio: number;
cantidad: number;
imagen?: string;
};


type ResumeGridProps = {
title: string;
action: string;
ruta: string;
productos: Producto[];
total?: number;
onContinuar?: () => void;
};


export default function ResumeGrid({ title, action, ruta, productos, total: totalProp, onContinuar }: ResumeGridProps) {

  const [showResumen, setShowResumen] = useState(true);
  const total = typeof totalProp === "number" ? totalProp : productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="w-full md:w-80">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">Resumen de la {title}</h2>
      </div>

      <div className="bg-white rounded-xl shadow p-4 relative">
        <button
          onClick={() => setShowResumen((s) => !s)}
          className="absolute right-4 top-4 text-sm select-none"
          aria-label={showResumen ? "Ocultar resumen" : "Mostrar resumen"}
        >
          {showResumen ? "▾" : "▸"}
        </button>

        {showResumen ? (
          <>
            <div className="flex justify-between font-semibold">
              <span>Productos ({productos.length})</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <div className="mt-3 border-t pt-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Descuentos (0)</div>
                <div>
                  <button className="text-sm select-none" onClick={() => alert("No hay descuentos (puedes implementar).")}>▾</button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">No tienes descuentos aplicados.</div>
            </div>

            <div className="flex justify-between font-bold border-t pt-3 mt-3">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <Link href={ruta} onClick={() => onContinuar?.()} className="block mt-4 w-full bg-gray-800 text-center text-white py-2 rounded hover:bg-gray-700">
              {action}
            </Link>
          </>
        ) : (
          <p className="text-sm text-gray-500">Resumen oculto</p>
        )}
      </div>
    </div>
  );
}