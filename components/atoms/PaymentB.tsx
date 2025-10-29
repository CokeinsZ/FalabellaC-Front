"use client";
import { useCallback, useState } from "react";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Heart, X as XIcon } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import PaymentA from "./PaymentA";
import type { CreditCard } from "@/hooks/usePaymentCookie";

interface PaymentBProps {
  payments: CreditCard[];
}

export default function PaymentB({ payments }: PaymentBProps) {
  const { selectedId, setSelectedId, fetchAll } = usePayment();
  const { deletePayment } = usePaymentMethods();
  const [showAdd, setShowAdd] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
    },
    [setSelectedId]
  );

  const handleDelete = useCallback(
    async (e: React.MouseEvent, id: string) => {
      e.stopPropagation();

      try {
        setLoadingDeleteId(id);
        const success = await deletePayment(id);
        if (!success) {
          window.alert("No se pudo eliminar la tarjeta. Intenta de nuevo.");
          return;
        }

        if (selectedId === id) {
          setSelectedId(undefined);
        }

        await fetchAll();
      } finally {
        setLoadingDeleteId(null);
      }
    },
    [deletePayment, fetchAll, selectedId, setSelectedId]
  );

  // Abre el overlay/modal con PaymentA
  const goToAdd = useCallback(() => {
    setShowAdd(true);
  }, []);

  // Cierra el modal y refresca lista
  const closeAdd = useCallback(
    async (refresh = true) => {
      setShowAdd(false);
      if (refresh) await fetchAll();
    },
    [fetchAll]
  );

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Tarjetas guardadas</h2>
        <div className="space-y-2">
          {payments.map((method) => {
            const isSelected = selectedId === method.id;
            return (
              <UICard
                key={method.id}
                className={`rounded-2xl shadow-sm border p-4 cursor-pointer ${isSelected ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"}`}
                onClick={() => handleSelect(method.id)}
              >
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Logo placeholder */}
                    <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded" />

                    <div>
                      <div className="text-sm text-gray-500">{method.last4}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(method.id);
                      }}
                      aria-label={isSelected ? "Tarjeta seleccionada" : "Seleccionar tarjeta"}
                      className="p-1"
                    >
                      <Heart
                        className={`w-5 h-5 ${isSelected ? "text-red-500" : "text-gray-300 hover:text-red-400"}`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, method.id)}
                      aria-label="Eliminar tarjeta"
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <XIcon className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </CardContent>
              </UICard>
            );
          })}
        </div>

        <button
          onClick={goToAdd}
          className="mt-4 bg-white border border-gray-300 rounded-full py-2 px-4 flex items-center gap-2"
        >
          <span className="text-sm text-gray-500">Agregar nueva tarjeta</span>
        </button>
      </div>

      {/* Overlay / modal simple que sobrepone PaymentA */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* fondo semitransparente */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => closeAdd(false)} // clic fuera cierra sin refrescar
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-xl w-full mx-4 p-4 z-10">
            {/* botón cerrar */}
            <div className="flex justify-end">
              <button
                onClick={() => closeAdd(false)}
                className="text-sm text-gray-500 px-2 py-1"
                aria-label="Cerrar"
              >
                Cerrar
              </button>
            </div>

            {/* PaymentA debe llamar onCardSaved cuando termine */}
            <PaymentA
              onCardSaved={async () => {
                // cerramos y refrescamos
                await closeAdd(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
