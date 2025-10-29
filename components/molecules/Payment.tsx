"use client";
import { useCart } from "@/hooks/useCart";
import ResumeGrid from "../atoms/ResumeGrid";
import CheckoutStepper from "../atoms/CheckoutStepper";
import PaymentMethods from "../atoms/PaymentMethods";
import { getSelectedAddressFromCookie } from "@/hooks/useAddressCookie";
import PaymentOthers from "../atoms/PaymentOthers";

export default function Payment() {
  const { productos } = useCart();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const direccion = getSelectedAddressFromCookie();

  return (
    <div className="relative">
      <CheckoutStepper currentStep={2} />

      {/* Contenedor principal: columna izquierda (métodos) + columna derecha (resumen) */}
      <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8 px-4">
        {/* Columna izquierda: PaymentMethods (ocupa el espacio restante) */}
        <div className="flex-1">
          <PaymentMethods address={direccion} onChangeAddress={() => null} />

          {/* Otras opciones */}
          <PaymentOthers />
        </div>

        {/* Columna derecha: ResumeGrid (ancho fijo en desktop, full width en móvil) */}
        <div className="w-full lg:w-1/3">
          <ResumeGrid
            title="Compra"
            action="Continuar"
            ruta="/checkout/Confirmation"
            productos={productos}
            total={total}
            onContinuar={() => null}
          />
        </div>
      </div>
    </div>
  );
}
