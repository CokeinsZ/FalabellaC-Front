// src/components/molecules/LatestProductsGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { LatestProductDTO } from "@/hooks/useLatestProducts";
import { LatestProductsGridToken } from "../../utils/Token";

interface Props {
  title: string;
  products: LatestProductDTO[];
}

export default function LatestProductsGrid({ title, products }: Props) {
  return (
    <section className={LatestProductsGridToken.section}>
      <h2 className={LatestProductsGridToken.title}>{title}</h2>
      <div className={LatestProductsGridToken.grid}>
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className={LatestProductsGridToken.card}
          >
            {p.img && (
              <Image
                src={p.img}
                alt={p.nombre}
                width={300}
                height={200}
                className={LatestProductsGridToken.image}
              />
            )}
            <h3 className={LatestProductsGridToken.name}>{p.nombre}</h3>
            <p className={LatestProductsGridToken.brand}>{p.marca}</p>
            <p className={LatestProductsGridToken.price}>
              ${p.precio.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
