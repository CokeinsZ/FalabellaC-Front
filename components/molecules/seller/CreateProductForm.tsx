"use client";

import { useState } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useCreateProductImage } from "@/hooks/useCreateProductImage";
import { useCategories } from "@/hooks/useCategories";

export default function CreateProductForm() {
  const { createProduct, loading, errorMsg, successMsg } = useCreateProduct();
  const { createImage } = useCreateProductImage();
  const { categories, loading: loadingCat } = useCategories();

  const [form, setForm] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    marca: "",
    categoria_id: "",
    destacado: false,
    imageUrl: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm({ ...form, [name]: target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productId = await createProduct({
      nombre: form.nombre,
      precio: Number(form.precio),
      stock: Number(form.stock),
      marca: form.marca,
      categoria_id: Number(form.categoria_id),
      destacado: form.destacado,
    });

    if (productId && form.imageUrl) {
      await createImage({
        producto_id: productId,
        url: form.imageUrl,
        orden: 1,
      });
    }
    if (productId && form.imageUrl2) {
      await createImage({
        producto_id: productId,
        url: form.imageUrl2,
        orden: 2,
      });
    }
    if (productId && form.imageUrl3) {
      await createImage({
        producto_id: productId,
        url: form.imageUrl3,
        orden: 3,
      });   
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">🛍️ Crear Producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="categoria_id"
          value={form.categoria_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {loadingCat ? (
            <option>Cargando...</option>
          ) : (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          )}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="destacado"
            checked={form.destacado}
            onChange={handleChange}
          />
          Producto destacado
        </label>

        <input
          name="imageUrl"
          placeholder="URL de la primera imagen"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="imageUrl2"
          placeholder="URL de la segunda imagen"
          value={form.imageUrl2}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="imageUrl3"
          placeholder="URL de la tercera imagen"
          value={form.imageUrl3}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear producto"}
        </button>
      </form>

      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
    </div>
  );
}

