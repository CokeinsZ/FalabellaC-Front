"use client";

import { useState } from "react";
import { useFilters, FiltrosProps } from "@/hooks/useFilters";
import Image from "next/image";

export default function PruebaFiltrosPage() {
  const [filtros, setFiltros] = useState<FiltrosProps>({});

  const { productos, loading, errorMsg } = useFilters(filtros);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nuevosFiltros: FiltrosProps = {};

    const categoriaId = formData.get("categoria_id") as string;
    const subcategoriaId = formData.get("subcategoria_id") as string;
    const nombre = formData.get("nombre") as string;
    const precioMin = formData.get("precio_min") as string;
    const precioMax = formData.get("precio_max") as string;
    const stockMin = formData.get("stock_min") as string;
    const destacado = formData.get("destacado") as string;
    const calificacionMin = formData.get("calificacion_min") as string;

    if (categoriaId) nuevosFiltros.categoria_id = Number(categoriaId);
    if (subcategoriaId) nuevosFiltros.subcategoria_id = Number(subcategoriaId);
    if (nombre) nuevosFiltros.nombre = nombre;
    if (precioMin) nuevosFiltros.precio_min = Number(precioMin);
    if (precioMax) nuevosFiltros.precio_max = Number(precioMax);
    if (stockMin) nuevosFiltros.stock_min = Number(stockMin);
    if (destacado) nuevosFiltros.destacado = destacado === "true";
    if (calificacionMin) nuevosFiltros.calificacion_min = Number(calificacionMin);

    setFiltros(nuevosFiltros);
  };

  const handleReset = () => {
    setFiltros({});
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prueba de Filtros</h1>

      {/* Formulario de filtros */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Categoría ID
            </label>
            <input
              type="number"
              name="categoria_id"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Subcategoría ID
            </label>
            <input
              type="number"
              name="subcategoria_id"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre/Marca
            </label>
            <input
              type="text"
              name="nombre"
              className="w-full border rounded px-3 py-2"
              placeholder="Buscar por nombre o marca"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Precio Mínimo
            </label>
            <input
              type="number"
              name="precio_min"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Precio Máximo
            </label>
            <input
              type="number"
              name="precio_max"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stock Mínimo
            </label>
            <input
              type="number"
              name="stock_min"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Destacado
            </label>
            <select
              name="destacado"
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Todos</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Calificación Mínima
            </label>
            <input
              type="number"
              name="calificacion_min"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 4"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Aplicar Filtros
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          >
            Limpiar Filtros
          </button>
        </div>
      </form>

      {/* Filtros actuales */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Filtros Actuales:</h2>
        <pre className="text-sm">{JSON.stringify(filtros, null, 2)}</pre>
      </div>

      {/* Resultados */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-xl">Cargando productos...</p>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Error: {errorMsg}</p>
        </div>
      )}

      {!loading && !errorMsg && (
        <>
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Productos encontrados: {productos.length}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                {producto.img && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={producto.img}
                      alt={producto.nombre}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {producto.nombre}
                </h3>
                <p className="text-gray-600 mb-2">{producto.marca}</p>
                <p className="text-xl font-bold text-blue-600 mb-2">
                  ${producto.precio.toLocaleString()}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Stock: {producto.stock}</span>
                  <span>⭐ {producto.calificacion}</span>
                </div>
                {producto.destacado && (
                  <span className="inline-block bg-yellow-400 text-xs px-2 py-1 rounded mt-2">
                    Destacado
                  </span>
                )}
              </div>
            ))}
          </div>

          {productos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500">
                No se encontraron productos con estos filtros
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
