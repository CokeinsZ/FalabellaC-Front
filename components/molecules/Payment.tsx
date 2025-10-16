"use client";
import { useCart } from "@/hooks/useCart";
import ResumeGrid from "../atoms/ResumeGrid";
import CheckoutStepper from "../atoms/CheckoutStepper";

export default function Payment() {
    const { productos } = useCart();
    const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  return (
    <div>
        <CheckoutStepper currentStep={2} />
        <ResumeGrid title="Compra" action="Continuar" ruta="/checkout/Confirmation" productos={productos} total={total} onContinuar={() => null} />
    </div>
  );
}