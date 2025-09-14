'use client';

import TopSales from "@/components/molecules/topSales";
import Carousel from "@/components/organisms/carousel";
import Offers from "@/components/organisms/Offers";
import { useTopSellingProducts } from "@/hooks/useTopSellingProducts";

export default function Home() {
  const { topSellingProducts, loading, errorMsg } = useTopSellingProducts();

  return (
    <div>
      <Carousel />

      {loading && <p>Cargando productos...</p>}
      {!loading && errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {!loading && !errorMsg && topSellingProducts.length === 0 && (
        <p>No hay productos destacados disponibles.</p>
      )}
      {!loading && !errorMsg && topSellingProducts.length > 0 && (
        <TopSales title="Top Sales" products={topSellingProducts} />
      )}

      <Offers />
    </div>
  );
}

