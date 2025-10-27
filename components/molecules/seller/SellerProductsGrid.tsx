"use client";

import Link from "next/link";
import ProductCard from "@/components/atoms/productCard";

export function SellerProductsGrid({ productos }: { productos: any[] }) {
  return (
    <div className="p-6">
      {productos.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-4">No tienes productos registrados aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((p) => (
            <div
              key={p.id}
              className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <ProductCard
                id={p.id}
                name={p.nombre}
                brand={p.marca}
                price={p.precio}
                img={p.img }
              />

              <div className="flex justify-between p-3 border-t border-gray-100">
                <Link
                  href={`/seller/products/edit/${p.id}`}
                  className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </Link>
                <button
                  onClick={() => console.log("Eliminar producto", p.id)}
                  className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ➕ Botón crear nuevo producto */}
      <div className="text-center mt-8">
        <Link
          href="/seller/create"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Crear nuevo producto
        </Link>
      </div>
    </div>
  );
}
