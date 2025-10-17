"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClient";
import Cookies from "js-cookie";
import { useCart } from "@/hooks/useCart";
import ResumeGrid from "../atoms/ResumeGrid";
import CheckoutStepper from "../atoms/CheckoutStepper";
import Direction from "../atoms/DirectionForm";

export default function Delivery() {
  const { productos } = useCart();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const [showDirection, setShowDirection] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkUserAddress = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          // si no hay sesión, no mostramos el modal
          setShowDirection(false);
          setLoading(false);
          return;
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setShowDirection(false);
          setLoading(false);
          return;
        }

        const { data: direcciones, error: dirError } = await supabase
          .from("direcciones")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (dirError) {
          console.error("Error verificando dirección:", dirError);
        }

        // Si el usuario NO tiene dirección registrada, mostrar la ventana
        setShowDirection(!(direcciones && direcciones.length > 0));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkUserAddress();
  }, []);

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

      {/* Contenido principal */}
      <ResumeGrid
        title="Compra"
        action="Ir a pagar"
        ruta="/checkout/payment"
        productos={productos}
        total={total}
        onContinuar={() => null}
      />

      {/* Ventana de dirección */}
      {showDirection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-xl mx-4 rounded-lg shadow-xl overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h3 className="text-lg font-semibold">Ingresa tu dirección</h3>
              <button
                onClick={() => setShowDirection(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <Direction
                onSaved={() => {
                  setShowDirection(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
