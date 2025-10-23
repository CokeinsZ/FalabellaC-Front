import { ReactNode } from "react";
import StatusBadge from "@/components/atoms/StatusBadge";
import StepIndicator from "@/components/atoms/StepIndicator";

interface FormAccordionProps {
  title: string;
  description?: string;
  stepNumber: number;
  isValid: boolean;
  children: ReactNode;
}

export default function FormAccordion({ 
  title, 
  description, 
  stepNumber, 
  isValid, 
  children 
}: FormAccordionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <StepIndicator stepNumber={stepNumber} isCompleted={isValid} isCurrent={!isValid} />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <StatusBadge isCompleted={isValid} />
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
