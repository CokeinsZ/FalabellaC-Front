
interface Props {
  content: Record<string, unknown> | string;
}

export default function Table({ content }: Props) {
  return (
    <>
      {content && Object.entries(content).length > 0 ? (
        Object.entries(content).map(([k, v]) => (
          console.log(k),
          k === 'tt' ? null : (
            <div key={k} className="flex justify-between items-start py-3 px-2 bg-white even:bg-gray-200">
              <span className="font-medium text-gray-800 w-1/3">{k}</span>
              <span className="text-gray-700 w-2/3">{String(v)}</span>
            </div>
          )
        ))
      ) : (
        <p className="text-gray-500">Vacío.</p>
      )}
    </>
  );
}
