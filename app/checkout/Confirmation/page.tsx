
import Link from "next/link";
import CheckoutStepper from "@/components/atoms/CheckoutStepper";

export default function ConfirmationPage() {
  return (
    <div className="relative">
      <CheckoutStepper currentStep={4} labels={["Carro", "Entrega", "Pago", "Confirmación"]} />

      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
          <p className="mt-2 text-gray-600">
            Hemos recibido tu pedido y está siendo procesado. Te notificaremos cuando esté en camino.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
            >
              Ver mis pedidos
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-50"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
