// src/components/Cart.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { productos, updateCantidad, removeProducto } = useCart();

  const [showProductos, setShowProductos] = useState(true);
  const [showResumen, setShowResumen] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [saved, setSaved] = useState<typeof productos>([]);

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  useEffect(() => {

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);
  
  function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-menu-id]")) return;
      setOpenMenuId(null);
    }

  const handleEliminar = (id: number) => {
    if (confirm("¿Eliminar este producto del carrito?")) {
      removeProducto(id);
      setOpenMenuId(null);
    }
  };

  const onChangeCantidad = (id: number, nueva: number) => {
    if (nueva < 1) {
      removeProducto(id);
      return;
    }
    updateCantidad(id, nueva);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Carro ({productos.length} producto{productos.length !== 1 ? "s" : ""})</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 relative">
          <button
            onClick={() => setShowProductos((s) => !s)}
            className="absolute right-4 top-4 text-sm select-none"
            aria-label={showProductos ? "Ocultar productos" : "Mostrar productos"}
          >
            {showProductos ? "▾" : "▸"}
          </button>

          {showProductos ? (
            productos.length ? (
              productos.map((p) => (
                <div key={p.id} className="flex items-start gap-4 border-b py-4 last:border-b-0">
                  <div className="flex items-start gap-4 flex-1">
                    {p.imagen && (
                      <div className="w-20 h-20 flex-shrink-0">
                        <Image src={p.imagen} alt={p.nombre} width={80} height={80} className="rounded" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{p.nombre}</h3>
                      <p className="text-sm text-gray-600">Vendido por Falabella</p>

                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="font-semibold">${ (Number(p.precio || 0) * Number(p.cantidad || 0)).toLocaleString() }</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onChangeCantidad(p.id, p.cantidad - 1)}
                        className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100 hover:bg-black hover:text-white transition"
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <div className="px-3">{p.cantidad}</div>
                      <button
                        onClick={() => onChangeCantidad(p.id, p.cantidad + 1)}
                        className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100 hover:bg-black hover:text-white transition"
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <div className="relative" data-menu-id={p.id}>
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setOpenMenuId((cur) => (cur === p.id ? null : p.id));
                        }}
                        className="px-2 py-1"
                        aria-label="Abrir opciones"
                      >
                        ⋮
                      </button>

                      {openMenuId === p.id && (
                        <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded shadow z-50">
                          <button
                            className="w-full text-left px-3 py-2 hover:bg-gray-50"
                          >
                            Guardar después
                          </button>
                          <button
                            onClick={() => handleEliminar(p.id)}
                            className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hay productos en el carrito.</p>
            )
          ) : (
            <p className="text-sm text-gray-500">Sección de productos oculta</p>
          )}
        </div>

        {saved.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Guardados para después ({saved.length})</h3>
            <div className="bg-white rounded-xl shadow p-4">
              {saved.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{s.nombre}</p>
                    <p className="text-sm text-gray-600">${(s.precio * s.cantidad).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSaved((prev) => prev.filter((x) => x.id !== s.id));
                        alert("Implementa addProducto en tu hook para restaurar al carrito.");
                      }}
                      className="text-sm px-3 py-1 border rounded"
                    >
                      Mover al carrito
                    </button>
                    <button onClick={() => setSaved((prev) => prev.filter((x) => x.id !== s.id))} className="text-sm text-red-600">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-80">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Resumen de la orden</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4 relative">
          <button
            onClick={() => setShowResumen((s) => !s)}
            className="absolute right-4 top-4 text-sm select-none"
            aria-label={showResumen ? "Ocultar resumen" : "Mostrar resumen"}
          >
            {showResumen ? "▾" : "▸"}
          </button>

          {showResumen ? (
            <>
              <div className="flex justify-between font-semibold">
                <span>Productos ({productos.length})</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <div className="mt-3 border-t pt-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Descuentos (0)</div>
                  <div>

                    <button className="text-sm select-none" onClick={() => alert("No hay descuentos (puedes implementar).")}>
                      ▾
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">No tienes descuentos aplicados.</div>
              </div>

              <div className="flex justify-between font-bold border-t pt-3 mt-3">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
                Continuar compra
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">Resumen oculto</p>
          )}
        </div>
      </div>
    </div>
  );
}
