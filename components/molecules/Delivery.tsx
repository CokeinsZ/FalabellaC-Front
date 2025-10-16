"use client";
import { useCart } from "@/hooks/useCart";
import ResumeGrid from "../atoms/ResumeGrid";
import CheckoutStepper from "../atoms/CheckoutStepper";
export default function Delivery() {
    const { productos } = useCart();
    const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  return (
    <div>
        <CheckoutStepper currentStep={1} />
        <ResumeGrid title="Compra" action="Ir a pagar" ruta="/checkout/payment" productos={productos} total={total} onContinuar={() => null} />
    </div>
  );
}