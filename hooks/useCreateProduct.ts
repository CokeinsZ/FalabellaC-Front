"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface createProduct {
  sku?: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria_id?: number | null;
  marca?: string;
  destacado?: boolean;
  descuento?: number | null;
  proveedor?: string | null;
  proveedor_codigo?: string | null;
  calificacion?: number | null;
  especificaciones_principales?: Record<string, unknown> | null;
  especificaciones?: Record<string, unknown> | null;
  informacion_adicional?: Record<string, unknown> | null;
}

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const createProduct = async (producto: createProduct) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? decodeURIComponent(match[2]) : null;
    };

    try {
      const vendedor = getCookie("user_id");
      if (!vendedor) throw new Error("No se encontró el vendedor en la cookie.");

      const { data, error } = await supabase
        .from("productos")
        .insert([{ ...producto, vendedor }])
        .select("id");

      if (error) throw error;

      setSuccessMsg("✅ Producto creado exitosamente.");
      return data?.[0]?.id || null;
    } catch (err: any) {
      console.error("Error al crear producto:", err);
      setErrorMsg(err.message || "Error desconocido al crear el producto.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, errorMsg, successMsg };
}
