"use client";
import { useCart } from "@/hooks/useCart";
import ResumeGrid from "../atoms/ResumeGrid";
import CheckoutStepper from "../atoms/CheckoutStepper";
import PaymentMethods from "../atoms/PaymentMethods";
import { getSelectedAddressFromCookie } from "@/hooks/useAddressCookie";
export default function Payment() {
    const { productos } = useCart();
    const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const direccion = getSelectedAddressFromCookie();
  return (
    <div>
        <CheckoutStepper currentStep={2} />
        <PaymentMethods address={direccion} onChangeAddress={() => null} />
        <ResumeGrid title="Compra" action="Continuar" ruta="/checkout/Confirmation" productos={productos} total={total} onContinuar={() => null} />
    </div>
  );
}