interface StepIndicatorProps {
  stepNumber: number;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export default function StepIndicator({ stepNumber, isCompleted, isCurrent = false }: StepIndicatorProps) {
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
      isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
    }`}>
      {isCompleted ? (
        <span className="text-white text-sm">✓</span>
      ) : (
        <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
          {stepNumber}
        </span>
      )}
    </div>
  );
}
