"use client";
import React from "react";

type CheckoutStepperProps = {
  currentStep: number;
  labels?: string[];
};

export default function CheckoutStepper({ currentStep, labels = ["Carro", "Entrega", "Pago"] }: CheckoutStepperProps) {
  const steps = labels.map((label, idx) => ({ label, index: idx + 1 }));
  const total = Math.max(1, steps.length);
  const progressPercent = total === 1 ? 100 : Math.max(0, Math.min(100, ((currentStep - 1) / (total - 1)) * 100));

  return (
    <nav aria-label="Progreso del pedido" className="w-full">
      {/* Desktop only: single background line + progress + bubbles centered on the line */}
      <div className="relative py-6">
        {/* Fondo y barra de progreso */}
        <div className="absolute inset-0 flex items-center pointer-events-none" aria-hidden>
          <div className="w-full h-0.5 bg-gray-300" />
          <div
            className="absolute left-0 h-0.5"
            style={{ width: `${progressPercent}%`, top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="h-0.5 bg-gray-800 w-full" />
          </div>
        </div>

        {/* Burbujas distribuidas sobre la línea */}
        <div className="relative">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step) => {
              const isActive = step.index <= currentStep;
              return (
                <div key={step.index} className="flex flex-col items-center">
                  {/* Burbuja centrada verticalmente sobre la línea */}
                  <div
                    className={`relative top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 h-8 w-8 ${
                      isActive ? "bg-gray-800 border-gray-800 text-white" : "bg-gray-200 border-gray-300 text-"
                    }`}
                    aria-current={step.index === currentStep ? 'step' : undefined}
                  >
                    <span className="text-sm font-semibold">{step.index}</span>
                  </div>

                  {/* Label justo debajo de la línea */}
                  <div className={`mt-6 text-xs ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Ajustes menores para desktop spacing */
        @media (min-width: 640px) {
          nav > div { gap: 0.5rem; }
        }
      `}</style>
    </nav>
  );
}
