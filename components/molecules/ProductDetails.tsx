"use client";

import Image from "next/image";
import { useProductDetail } from "@/hooks/useProductDetail";

interface Props {
  id: string;
}

export default function ProductDetail({ id }: Props) {
  const { producto, imagenes, loading, errorMsg } = useProductDetail(id);

  if (loading) return <p>Cargando producto...</p>;
  if (errorMsg) return <p className="text-red-500">Error: {errorMsg}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-lg shadow">
      {/* 📸 Galería */}
      <div>
        {imagenes.length > 0 ? (
          <div>
            <Image
              src={imagenes[0].url}
              alt={producto.nombre}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-96"
            />
            <div className="flex gap-3 mt-4">
              {imagenes.map((img, i) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={`Vista ${i}`}
                  width={100}
                  height={80}
                  className="rounded border object-cover w-20 h-20 cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No hay imágenes disponibles</p>
        )}
      </div>

      {/* 📄 Detalles */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{producto.nombre}</h1>
        <p className="text-gray-500">SKU: {producto.sku}</p>

        {/* ⭐ Mock rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★★★★☆</span>
          <span className="ml-2 text-sm text-gray-500">4.3 (4)</span>
        </div>

        {/* 💲 Precio */}
        <div className="mt-4">
          <p className="text-green-600 text-2xl font-semibold">
            ${producto.precio.toLocaleString()}
          </p>
        </div>

        {/* 📋 Especificaciones */}
        <div className="mt-6 border-t pt-4">
          <h2 className="font-semibold mb-2">Especificaciones principales</h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Tipo: Portátil</li>
            <li>Material: Plástico, Tela</li>
          </ul>
        </div>

        {/* 🛒 Botón */}
        <button className="mt-6 w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
          Agregar al Carro
        </button>
      </div>
    </div>
  );
}
