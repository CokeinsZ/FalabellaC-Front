// src/components/Cart.tsx
"use client";
import Image from "next/image";
import { useCart } from "@/libs/useCart";

export default function Cart() {
  const { productos, updateCantidad, removeProducto } = useCart();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Productos */}
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4">
          Carro ({productos.length} producto{productos.length !== 1 && "s"})
        </h2>

        {productos.map((p) => (
          <div key={p.id} className="flex items-center border-b py-4">
            {p.imagen && (
              <Image
                src={p.imagen}
                alt={p.nombre}
                width={80}
                height={80}
                className="mr-4 rounded"
              />
            )}

            <div className="flex-1">
              <h3 className="font-semibold">{p.nombre}</h3>
              <p className="text-sm">
                Subtotal: <span className="font-bold">
                  ${(p.precio * p.cantidad).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => updateCantidad(p.id, p.cantidad - 1)}
                className="px-2 text-lg"
              >
                -
              </button>
              <span className="px-2">{p.cantidad}</span>
              <button
                onClick={() => updateCantidad(p.id, p.cantidad + 1)}
                className="px-2 text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeProducto(p.id)}
              className="ml-4 text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="w-full md:w-64 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-4">Resumen de la orden</h2>
        <div className="flex justify-between mb-2">
          <span>Productos ({productos.length})</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
          Continuar compra
        </button>
      </div>
    </div>
  );
}
