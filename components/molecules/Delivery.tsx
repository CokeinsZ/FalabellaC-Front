"use client";
import React from "react";
import { useCart } from "@/hooks/useCart";
import CheckoutStepper from "../atoms/CheckoutStepper";
import ResumeGrid from "../atoms/ResumeGrid";
import Direction from "../atoms/DirectionForm";
import DirectionA from "../atoms/DirectionA";
import DirectionB from "../atoms/DirectionB";
import { useDelivery } from "@/hooks/useDelivery";

export default function Delivery() {
  const { productos } = useCart();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const {
    loading,
    showDirectionModal,
    setShowDirectionModal,
    showA,
    setShowA,
    fetchAll,
  } = useDelivery();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Cargando...
      </div>
    );
  }

  return (
    <div className="relative">
      <CheckoutStepper currentStep={1} />

      {/* GRID PRINCIPAL */}
      <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda */}
        <div className="flex-1">
          {showA ? (
            <DirectionA
              onOpenAddress={() => setShowDirectionModal(true)}
              onShowDetails={() => setShowA(false)}
            />
          ) : (
            <DirectionB vendor="falabella" />
          )}
        </div>

        {/* Columna derecha */}
        <div className="w-full lg:w-1/3">
          <ResumeGrid
            title="Compra"
            action="Ir a pagar"
            ruta="/checkout/payment"
            productos={productos}
            total={total}
            onContinuar={() => null}
          />
        </div>
      </div>

      {showDirectionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-xl mx-4 rounded-lg shadow-xl overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h3 className="text-lg font-semibold">Ingresa tu dirección</h3>
              <button
                onClick={() => setShowDirectionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <Direction
                onSaved={async () => {
                  await fetchAll();
                  setShowDirectionModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
