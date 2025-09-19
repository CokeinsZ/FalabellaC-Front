"use client";

import Carousel from "@/components/organisms/carousel";
import Offers from "@/components/organisms/Offers";
import TopSales from "@/components/molecules/topSales";
import CategoriesGrid from "@/components/molecules/CategoriesGrid";
import LatestProductsGrid from "@/components/molecules/LatestProductsGrid";

import { useTopSellingProducts } from "@/hooks/useTopSellingProducts";
import { useCategories } from "@/hooks/useCategories";
import { useLatestProducts } from "@/hooks/useLatestProducts";
import { useStoreImages } from "@/hooks/useStoreImages";

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

  const {
    images,
    loading: imagesLoading,
    errorMsg: imagesError,
  } = useStoreImages();

  return (
    <div>
      {/* Carousel */}
      {imagesLoading ? (
        <p>Cargando imágenes...</p>
      ) : imagesError ? (
        <p className="text-red-500">{imagesError}</p>
      ) : (
        <Carousel title="Carousel" images={images} />
      )}

      {/* Top Sales */}
      {productsLoading ? (
        <p>Cargando productos...</p>
      ) : productsError ? (
        <p className="text-red-500">{productsError}</p>
      ) : (
        <TopSales title="Top Sales" products={topSellingProducts} />
      )}

      {/* Categories */}
      {categoriesLoading ? (
        <p>Cargando categorías...</p>
      ) : categoriesError ? (
        <p className="text-red-500">{categoriesError}</p>
      ) : (
        <CategoriesGrid title="Categorías" categories={categories} />
      )}

      {/* Latest Products */}
      {latestLoading ? (
        <p>Cargando lo último...</p>
      ) : latestError ? (
        <p className="text-red-500">{latestError}</p>
      ) : (
        <LatestProductsGrid title="Lo último" products={latestProducts} />
      )}

      <Offers />
    </div>
  );
}
