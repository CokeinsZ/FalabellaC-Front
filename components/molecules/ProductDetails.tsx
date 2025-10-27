"use client";
import Image from "next/image";
import { useProductDetail } from "@/hooks/useProductDetail";
import { ProductDetailToken } from "../../utils/Token";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
interface Props {
  id: string;
}

export default function ProductDetail({ id }: Props) {
  const { producto, imagenes, loading, errorMsg } = useProductDetail(id);
  const addProducto = useCart((s) => s.addProducto);
  
  const [cantidad, setCantidad] = useState(1);
  if (loading) return <p>Cargando producto...</p>;
  if (errorMsg) return <p className="text-red-500">Error: {errorMsg}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div className={ProductDetailToken.container}>
      {/* 📸 Galería */}
        <div className="flex flex-col items-center">
          {imagenes.length > 0 ? (
            <>
              <div className="relative w-full flex justify-center">
                <Image
                  src={imagenes[0].url}
                  alt={producto.nombre}
                  width={600}
                  height={400}
                  className="rounded-lg object-contain shadow-sm"
                />
                {/* Flechas de navegación (mock visual) */}
                <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">
                  ‹
                </button>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">
                  ›
                </button>
              </div>

              {/* Miniaturas */}
              <div className="flex justify-center gap-3 mt-4">
                {imagenes.map((img, i) => (
                  <Image
                    key={i}
                    src={img.url}
                    alt={`Vista ${i}`}
                    width={80}
                    height={80}
                    className="rounded-md border border-gray-200 hover:border-[#6f8500] cursor-pointer"
                  />
                ))}
              </div>

              {/* Texto de devolución */}
              <div className="mt-6 text-sm text-gray-600 border-t pt-4 text-center">
                <p>🔁 <span className="font-medium">Devolver es fácil y gratis</span></p>
                <p className="underline text-[#6f8500] cursor-pointer">Conoce nuestras garantías y derechos</p>
              </div>
            </>
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </div>

      {/* 📄 Detalles */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">{producto.nombre}</h1>
          <p className="text-sm text-gray-500">SKU: {producto.sku}</p>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            <span>★ ★ ★ ★ ☆</span>
            <span className="text-sm text-gray-600">1 opinión</span>
          </div>

          {/* 💲 Precio */}
          <div>
            <p className="text-3xl font-bold text-gray-900">
              ${producto.precio.toLocaleString()}
            </p>
            <p className="text-sm text-red-600 font-medium">-45%</p>
            <p className="text-sm text-gray-500 line-through">
              ${Math.round(producto.precio / 0.55).toLocaleString()}
            </p>
          </div>

          {/* 🚚 Disponibilidad */}
          <div className="bg-[#f5fbe5] p-3 rounded-md text-sm border border-[#aad500]/40">
            <p className="text-[#6f8500] font-medium">Llega mañana</p>
            <p className="text-gray-700">Retira desde 90 min</p>
          </div>

          {/* ➕ Cantidad */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCantidad((prev) => Math.max(prev - 1, 1))}
              className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100 hover:bg-[#6f8500] hover:text-white transition"
            >
              −
            </button>
            <span className="px-3">{cantidad}</span>
            <button
              onClick={() => setCantidad((prev) => prev + 1)}
              className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100 hover:bg-[#6f8500] hover:text-white transition"
            >
              +
            </button>
          </div>

          {/* 🛒 Botón */}
          <button
            className="bg-[#1a1a1a] text-white py-3 rounded-md font-semibold hover:bg-[#333] transition"
            onClick={() =>
              addProducto({ ...producto, cantidad: cantidad }, imagenes[0].url)
            }
          >
            Agregar al Carro
          </button>

          {/* 📋 Especificaciones */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Especificaciones principales
            </h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Producto: {producto.nombre}</li>
              <li>Material: Plástico, Tela</li>
              <li>Bluetooth: Sí</li>
              <li>Garantía: 1 año</li>
            </ul>
            <p className="mt-2 text-[#6f8500] text-sm cursor-pointer underline">
              Ver más especificaciones
            </p>
          </div>
        </div>

    </div>
  );
}
