"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserFromToken } from "@/hooks/UseUserToken";
import { useSeller } from "@/hooks/useSeller";
import { useSellerProducts } from "@/hooks/useSellerProducts";

export default function SellerPage() {
  const { user } = useUserFromToken();
  const { seller, loading, errorMsg } = useSeller(user?.sub);
  const {
    productos,
    loading: loadingProductos,
    errorMsg: errorProductos,
  } = useSellerProducts();

  if (loading || loadingProductos)
    return <p className="text-center mt-8 text-gray-600">Cargando información...</p>;
  if (errorMsg) return <p className="text-red-500 text-center">{errorMsg}</p>;
  if (!seller) return <p className="text-center">No se encontró un vendedor registrado.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* 👤 Info del vendedor */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenido, {seller.nombre_tienda}
        </h1>
        <p className="text-gray-600">
          <strong>NIT:</strong> {seller.nit}
        </p>
        <p className="text-gray-600">
          <strong>Dirección:</strong> {seller.direccion || "No registrada"}
        </p>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* 🛍️ Productos publicados */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Productos publicados
        </h2>

        {errorProductos ? (
          <p className="text-red-500">{errorProductos}</p>
        ) : productos.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-600 mb-4">No tienes productos registrados aún.</p>
            <Link
              href="/seller/products/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Crear un nuevo producto
            </Link>
          </div>
        ) : (
          <>
            {/* 🧩 Grid de productos */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((p) => (
                <li
                  key={p.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col"
                >
                  <div className="relative w-full h-48 mb-3">
                    {p.img ? (
                      <Image
                        src={p.img}
                        alt={p.nombre}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-1">{p.nombre}</h3>
                  <p className="text-gray-600">
                    <strong>Precio:</strong>{" "}
                    {p.precio ? `$${p.precio.toLocaleString()}` : "Sin precio"}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Stock:</strong> {p.stock ?? 0}
                  </p>

                  <div className="mt-auto flex justify-between">
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
                </li>
              ))}
            </ul>

            {/* ➕ Botón crear nuevo producto */}
            <div className="text-center mt-8">
              <Link
                href="/seller/create"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Crear nuevo producto
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
