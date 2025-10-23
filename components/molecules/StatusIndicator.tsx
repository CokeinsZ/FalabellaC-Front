interface StatusIndicatorProps {
  isValid: boolean;
  validMessage?: string;
  invalidMessage?: string;
}

export default function StatusIndicator({ 
  isValid, 
  validMessage = "La información está completa.",
  invalidMessage = "Completa toda la información requerida para continuar."
}: StatusIndicatorProps) {
  return (
    <div className={`p-4 rounded-lg ${
      isValid ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
    }`}>
      <div className="flex items-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isValid ? 'bg-green-500' : 'bg-yellow-500'
        }`}>
          {isValid ? '✓' : '!'}
        </div>
        <p className={`ml-3 text-sm ${
          isValid ? 'text-green-800' : 'text-yellow-800'
        }`}>
          {isValid ? validMessage : invalidMessage}
        </p>
      </div>
    </div>
  );
}
