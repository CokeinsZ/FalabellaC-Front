"use client";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

import type { CreditCard } from "@/hooks/usePaymentCookie";
interface PaymentBProps {
  payments: CreditCard[];
}

export default function PaymentB({ payments }: PaymentBProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Tarjetas guardadas</h2>
      <div className="space-y-2">
        {payments.map((method) => (
          <UICard key={method.id} className="rounded-2xl shadow-sm border border-gray-200 p-4">
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Logo de la tarjeta - placeholder */}
                <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></div>
                {/* Información de la tarjeta */}
                <div>
                  <span className="text-sm text-gray-500">
                     {method.last4}
                  </span>
                </div>
              </div>
              {/* Icono de corazón */}
              <div>
                <Heart className="w-4 h-4 text-red-500" />
              </div>
            </CardContent>
          </UICard>
        ))}
      </div>
      {/* Botón para agregar nueva tarjeta */}
      <button className="mt-4 bg-white border border-gray-300 rounded-full py-2 px-4 flex items-center gap-2">
        <span className="text-sm text-gray-500">Agregar nueva tarjeta</span>
      </button>
    </div>
  );
}

