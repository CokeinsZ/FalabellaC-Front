"use client";

import Carousel from "@/components/organisms/carousel";
import Offers from "@/components/organisms/Offers";
import TopSales from "@/components/molecules/topSales";
import CategoriesGrid from "@/components/molecules/CategoriesGrid";

import { useTopSellingProducts } from "@/hooks/useTopSellingProducts";
import { useCategories } from "@/hooks/useCategories";
import { useLatestProducts } from "@/hooks/useLatestProducts";
import LatestProductsGrid from "@/components/molecules/LatestProductsGrid";

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

  const {
    latestProducts,
    loading: latestLoading,
    errorMsg: latestError,
  } = useLatestProducts();

  return (
    <div>
      <Carousel />

      {/* Top Sales */}
      {!productsLoading && !productsError && topSellingProducts.length > 0 && (
        <TopSales title="Top Sales" products={topSellingProducts} />
      )}

      {/* Categories */}
      {!categoriesLoading && !categoriesError && categories.length > 0 && (
        <CategoriesGrid title="Categorías" categories={categories} />
      )}

      {/* Latest Products */}
      {!latestLoading && !latestError && latestProducts.length > 0 && (
        <LatestProductsGrid title="Lo último" products={latestProducts} />
      )}

      <Offers />
    </div>
  );
}
