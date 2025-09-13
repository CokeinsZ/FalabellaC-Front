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
  const [imagenesProducto, setImagenesProducto] = useState<ImagenProducto[] | null>([]);
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
  };
  loadData();

}, [params]);

  if (loading) return <p>Cargando producto...</p>;
  if (errorMsg) return <p className="text-red-500">Error: {errorMsg}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
      <p className="text-gray-600">SKU: {producto.sku}</p>
      <p className="text-green-600 text-lg font-semibold mt-2">
        ${producto.precio.toLocaleString()}
      </p>
      <Image
        src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
        alt="Falabellla"
        width={120}
        height={40}
      />
    </div>
  );
}
