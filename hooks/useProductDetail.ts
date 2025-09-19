"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Producto {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
}

export interface ImagenProducto {
  url: string;
  orden: number;
}

export function useProductDetail(id: string) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [imagenes, setImagenes] = useState<ImagenProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: prodData, error: prodError } = await supabase
        .from("productos")
        .select("id, sku, nombre, precio")
        .eq("id", Number(id))
        .maybeSingle();

      if (prodError) {
        setErrorMsg(prodError.message);
        setLoading(false);
        return;
      }

      setProducto(prodData);

      const { data: imgData, error: imgError } = await supabase
        .from("imagenes_producto")
        .select("url, orden")
        .eq("producto_id", Number(id))
        .order("orden", { ascending: true });

      if (imgError) {
        setErrorMsg(imgError.message);
      } else {
        setImagenes(imgData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { producto, imagenes, loading, errorMsg };
}
