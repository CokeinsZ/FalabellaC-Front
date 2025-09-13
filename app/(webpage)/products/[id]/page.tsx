"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
interface Producto {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
}

interface ImagenProducto {
  url: string;
  orden: number;
}

interface PageProps {
  params: Promise<{ id: string }>; // /products/[id]
}

export default function Page({ params }: PageProps) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [imagenesProducto, setImagenesProducto] = useState<ImagenProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const extractId = async () => {
    const resolvedParams = await params;
    return resolvedParams.id;
  }

  const fetchProducto = async (id: string) => {
      setLoading(true);

      const { data, error } = await supabase
        .from("productos")
        .select("id, sku, nombre, precio")
        .eq("id", Number(id))
        .maybeSingle(); 

      if (error) {
        setErrorMsg(error.message);
      } else {
        setProducto(data);
      }

      setLoading(false);
  };

  const fetchImagenes = async (id: string) => {
      setLoading(true);

      const { data, error } = await supabase
        .from("imagenes_producto")
        .select("url, orden")
        .eq("producto_id", Number(id));

      if (error) {
        setErrorMsg(error.message);
      } else {
        setImagenesProducto(data);
      }

      setLoading(false);
  };

  useEffect(() => {
  const loadData = async () => {
    const id = await extractId();
    fetchProducto(id);
    fetchImagenes(id);
  };
  loadData();

});

  if (loading) return <p>Cargando producto...</p>;
  if (errorMsg) return <p className="text-red-500">Error: {errorMsg}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;


  const imagenes = imagenesProducto.map((imagen, index) => (
    <Image
      key={index}
      src={imagen.url}
      alt="Imagen"
      width={100}
      height={100}
    />
  ));

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
      <p className="text-gray-600">SKU: {producto.sku}</p>
      <p className="text-green-600 text-lg font-semibold mt-2">
        ${producto.precio.toLocaleString()}
      </p>
      {imagenes}
    </div>
  );
}
