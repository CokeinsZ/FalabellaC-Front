import StepIndicator from "@/components/atoms/StepIndicator";

interface Step {
  id: string;
  nombre: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
}

export default function StepProgress({ steps, currentStep, completedSteps = [] }: StepProgressProps) {
  const progreso = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-6">
      {/* Indicadores de pasos */}
      <div className="flex justify-center mb-6">
        {steps.map((paso, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber) || currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div key={paso.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <StepIndicator 
                  stepNumber={stepNumber} 
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                />
                <span className={`mt-2 text-sm font-medium ${
                  isCurrent ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {paso.nombre}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-gray-300 mx-4 mb-6" />
              )}
            </div>
          );
        })}
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-xl mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progreso}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Paso {currentStep} de {steps.length}
      </p>
    </div>
  );
}
