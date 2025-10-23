"use client";

import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import { useCategoryName } from "@/hooks/UseCategoryName";
import ProductCard from "@/components/atoms/productCard";
interface CategoryProductsProps {
  categoryId: string;
}

export function CategoryProducts({ categoryId }: CategoryProductsProps) {
  const { productos, loading: loadingProducts, errorMsg: productError } =
    useProductsByCategory(categoryId);

  const { categoryName, loading: loadingCategory, errorMsg: categoryError } =
    useCategoryName(categoryId);

  if (loadingProducts || loadingCategory)
    return <p className="p-6 text-gray-500">Cargando productos...</p>;

  if (productError || categoryError)
    return (
      <p className="p-6 text-red-500">
        Error: {productError || categoryError}
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {categoryName || "Categoría"}
      </h1>

      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos en esta categoría.</p>
      ) : (
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.nombre}
              brand={p.marca}
              price={p.precio}
              img={p.img || "/placeholder.png"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

