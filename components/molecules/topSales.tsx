import ProductCard from "@/components/atoms/productCard";
import Link from "next/link";
import { TopSalesToken } from "../../utils/Token";

export interface ProductCardDTO {
  id: number | string;
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating?: number;
  img: string;
}

interface topSalesProps {
  title: string;
  products: ProductCardDTO[];
}

export default function TopSales({ title, products }: topSalesProps) {
  return (
    <section className={TopSalesToken.section}>
      <h2 className={TopSalesToken.title}>{title}</h2>

      <div className={TopSalesToken.grid}>
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <ProductCard {...p} />
          </Link>
        ))}
      </div>
    </section>
  );
}
