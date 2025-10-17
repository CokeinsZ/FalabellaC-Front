"use client";
import React from "react";

type CheckoutStepperProps = {
  currentStep: number;
  labels?: string[];
};

export default function CheckoutStepper({ currentStep, labels = ["Carro", "Entrega", "Pago"] }: CheckoutStepperProps) {
  const steps = labels.map((label, idx) => ({ label, index: idx + 1 }));

  return (
    <nav aria-label="Progreso del pedido" className="w-full">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, i) => {
          const isActive = step.index <= currentStep; 
          const isCurrent = step.index === currentStep;

          return (
            <div key={step.index} className="flex-1 flex items-center">
              {i !== 0 && (
                <div className={`hidden sm:block h-0.5 flex-1 ${isActive ? "bg-gray-800" : "bg-gray-300"}`} />
              )}

              <div className="flex flex-col items-center w-20 sm:w-auto">
                <div
                  className={`relative flex items-center justify-center rounded-full border-2 shrink-0 h-8 w-8 ${isActive ? "bg-gray-800 border-gray-800 text-white" : "bg-white border-gray-300 text-gray-500"}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span className="text-sm font-semibold">{step.index}</span>
                </div>
                <div className={`mt-2 text-xs sm:text-sm ${isActive ? "text-gray-800" : "text-gray-400"}`}>{step.label}</div>

                {i !== steps.length - 1 && (
                  <div className={`sm:hidden absolute left-full ml-2 top-3 h-0.5 w-6 ${isActive ? "bg-gray-800" : "bg-gray-300"}`} />
                )}
              </div>

              {i === 0 && (null)}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @media (min-width: 640px) {
          nav > div {
            gap: 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
}