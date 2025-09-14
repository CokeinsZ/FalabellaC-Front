// src/components/molecules/LatestProductsGrid.tsx
import Image from "next/image";
import { LatestProductDTO } from "@/hooks/useLatestProducts";

interface Props {
  title: string;
  products: LatestProductDTO[];
}

export default function LatestProductsGrid({ title, products }: Props) {
  return (
    <section className="px-8 py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
          >
            {p.img && (
              <Image
                src={p.img}
                alt={p.nombre}
                width={300}
                height={200}
                className="rounded-md object-cover w-full h-40"
              />
            )}
            <h3 className="mt-3 font-medium text-gray-800">{p.nombre}</h3>
            <p className="text-sm text-gray-500">{p.marca}</p>
            <p className="mt-1 text-green-600 font-semibold">
              ${p.precio.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
