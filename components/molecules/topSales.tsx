import ProductCard from "@/components/atoms/productCard";
import { ProductCardDTO } from "@/components/atoms/productCard.type";

interface topSalesProps {
  title: string;
  products: ProductCardDTO[];
}

export default function topsales({
  title,
  products,
}: topSalesProps) {
  return (
    <section className="px-8 py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
