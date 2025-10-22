import { ReactNode } from "react";

interface FormCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function FormCard({ title, description, children, className = "" }: FormCardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 border border-gray-200 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
