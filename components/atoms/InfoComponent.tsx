
interface Props {
  content: Record<string, unknown> | string;
}

export default function InfoComponent({ content }: Props) {
  return (
    <>
      {content && Object.entries(content).length > 0 ? (
        Object.entries(content).map(([k, v]) => (
          k === 'tt' ? null : (
            <div key={k}>
                <h5 className="text-base font-medium mb-1">{String(k)}</h5>
                <p className="text-gray-700 text-sm leading-relaxed">
                    {String(v)}
                </p>
            </div>
          )
        ))
      ) : (
        <p className="text-gray-500">Vacío.</p>
      )}
    </>
  );
}
