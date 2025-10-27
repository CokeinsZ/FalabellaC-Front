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
      // 🧩 Obtener vendedor desde cookie
      const vendedor = getCookie("user_id");

      if (!vendedor) {
        throw new Error("No se encontró el vendedor en la cookie.");
      }

      // 🧩 Insertar en la tabla productos
      const { data, error } = await supabase
        .from("productos")
        .insert([
          {
            ...producto,
            vendedor, // 🔗 Asociar producto al vendedor actual
          },
        ])
        .select();

      if (error) throw error;

      setSuccessMsg("✅ Producto creado exitosamente.");
      return data;
    } catch (err: any) {
      console.error("Error al crear producto:", err);
      setErrorMsg(err.message || "Error desconocido al crear el producto.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    errorMsg,
    successMsg,
  };
}
