"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import ResumeGrid from "../atoms/ResumeGrid";
import CheckoutStepper from "../atoms/CheckoutStepper";
import PaymentMethods from "../atoms/PaymentMethods";
import { getSelectedAddressFromCookie } from "@/hooks/useAddressCookie";
import PaymentOthers from "../atoms/PaymentOthers";
import { useOrder } from "@/hooks/useOrder";

export default function Payment() {
  const { productos } = useCart();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const direccion = getSelectedAddressFromCookie();

  const { saveOrder, loading, mensaje } = useOrder();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleContinuar = async () => {
    setLocalError(null);
    const result = await saveOrder();
    if (result?.ok) {
      
    } else {
      const errMsg =
        result?.error ?? mensaje ?? "No se pudo crear la orden";
      setLocalError(String(errMsg));
      console.error("Error creando orden:", result);
    }
  };

  return (
    <div className="relative">
      <CheckoutStepper currentStep={2} />

      <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8 px-4">
        {/* Columna izquierda */}
        <div className="flex-1">
          <PaymentMethods address={direccion} onChangeAddress={() => null} />

          {/* Otras opciones */}
          <PaymentOthers />
        </div>

        {/* Columna derecha */}
        <div className="w-full lg:w-1/3">
          <ResumeGrid
            title="Compra"
            action={loading ? "Procesando..." : "Continuar"}
            ruta="/checkout/Confirmation"
            productos={productos}
            total={total}
            onContinuar={handleContinuar}
          />

          {/* Mensajes */}
          {localError && (
            <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {localError}
            </div>
          )}
          {mensaje && !localError && (
            <div className="mt-3 text-sm text-gray-600">{mensaje}</div>
          )}
        </div>
      </div>
    </div>
  );
}

