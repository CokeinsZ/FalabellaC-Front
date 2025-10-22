interface StatusBadgeProps {
  isCompleted: boolean;
}

export default function StatusBadge({ isCompleted }: StatusBadgeProps) {
  return (
    <div className={`px-3 py-1 rounded-full text-sm ${
      isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
    }`}>
      {isCompleted ? 'Completado' : 'Pendiente'}
    </div>
  );
}
