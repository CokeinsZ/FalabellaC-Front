"use client";

import TopSales from "@/components/molecules/topSales";
import Carousel from "@/components/organisms/carousel";
import Offers from "@/components/organisms/Offers";
import { useTopSellingProducts } from "@/hooks/useTopSellingProducts";
import { useCategories } from "@/hooks/useCategories";
import CategoriesGrid from "@/components/molecules/CategoriesGrid";

export default function Home() {
  const {
    topSellingProducts,
    loading: productsLoading,
    errorMsg: productsError,
  } = useTopSellingProducts();

  const {
    categories,
    loading: categoriesLoading,
    errorMsg: categoriesError,
  } = useCategories();

  return (
    <div>
      <Carousel />

      {/* Top Sales section */}
      {productsLoading ? (
        <p>Cargando productos...</p>
      ) : productsError ? (
        <p style={{ color: "red" }}>{productsError}</p>
      ) : topSellingProducts.length === 0 ? (
        <p>No hay productos destacados disponibles.</p>
      ) : (
        <TopSales title="Top Sales" products={topSellingProducts} />
      )}

      {/* Categories section */}
      {categoriesLoading ? (
        <p>Cargando categorías...</p>
      ) : categoriesError ? (
        <p className="text-red-500">{categoriesError}</p>
      ) : (
        <CategoriesGrid title="Categorías" categories={categories} />
      )}

      <Offers />
    </div>
  );
}
