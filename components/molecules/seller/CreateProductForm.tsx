"use client";

import { useState } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useCategories } from "@/hooks/useCategories";

export default function CreateProductPage() {
  const { createProduct, loading, errorMsg, successMsg } = useCreateProduct();
  const { categories, loading: loadingCats } = useCategories();

  const [formData, setFormData] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    marca: "",
    categoria_id: 0,
    destacado: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === "checkbox" ? target.checked : target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-xl">
      <h1 className="text-xl font-bold mb-4">Crear nuevo producto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Marca */}
        <div>
          <label className="block font-semibold mb-1">Marca</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block font-semibold mb-1">Categoría</label>
          <select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Seleccionar categoría</option>
            {loadingCats ? (
              <option disabled>Cargando...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Destacado */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="destacado"
            checked={formData.destacado}
            onChange={handleChange}
          />
          <label>¿Destacado?</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creando..." : "Crear producto"}
        </button>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
      </form>
    </div>
  );
}

