"use client";

import { useUserFromToken } from "@/hooks/UseUserToken";
import { useSeller } from "@/hooks/useSeller";
import { useSellerProducts } from "@/hooks/useSellerProducts";
import { SellerProductsGrid } from "./SellerProductsGrid";


export default function SellerPage() {
  const { user } = useUserFromToken();
  const { seller, loading, errorMsg } = useSeller(user?.sub);
  const {
    productos,
    loading: loadingProductos,
    errorMsg: errorProductos,
  } = useSellerProducts();
  console.log("SellerPage - productos:", productos);
  if (loading || loadingProductos)
    return (
      <p className="text-center mt-8 text-gray-600">
        Cargando información...
      </p>
    );

  if (errorMsg)
    return <p className="text-red-500 text-center">{errorMsg}</p>;

  if (!seller)
    return <p className="text-center">No se encontró un vendedor registrado.</p>;

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
        ) : (
          <SellerProductsGrid productos={productos} />
        )}
      </div>
    </div>
  );
}

