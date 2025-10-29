import Image from "next/image";

interface Props {
  content: Record<string, unknown> | string;
}

export default function Table({ content }: Props) {
  return (
    <div className={`grid grid-cols-${Object.entries(content).length-1} gap-2`}>
      {content && Object.entries(content).length > 0 ? (
        Object.entries(content).map(([k, v]) => (
          console.log(k),
          k === 'tt' ? null : (
            <Image key={k} src={v as string} alt={k} width={100} height={100} />
          )
        ))
      ) : (
        <p className="text-gray-500">Vacío.</p>
      )}
    </div>
  );
}
