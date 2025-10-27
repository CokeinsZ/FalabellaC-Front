"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface ProductoDTO {
  id: number;
  nombre: string;
  precio?: number;
  stock?: number;
  img?: string;
}

/**
 * Hook que obtiene los productos del vendedor (según la cookie `user_id`)
 * e incluye la imagen principal de cada producto.
 */
export function useSellerProducts() {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ✅ Función auxiliar para leer cookies
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = getCookie("user_id");

      if (!userId) {
        setErrorMsg("No se encontró el ID del vendedor en las cookies.");
        return;
      }

      setLoading(true);
      setErrorMsg("");

      try {
        // 🛒 Obtener productos del vendedor
        const { data: productosData, error: productosError } = await supabase
          .from("productos")
          .select("id, nombre, precio, stock")
          .eq("vendedor", userId)
          .order("id", { ascending: false });

        if (productosError) throw productosError;

        if (!productosData || productosData.length === 0) {
          setProductos([]);
          return;
        }

        // 🖼️ Obtener imágenes principales (orden = 0)
        const ids = productosData.map((p) => p.id);
        const { data: imagenesData, error: imagenesError } = await supabase
          .from("imagenes_producto")
          .select("producto_id, url")
          .in("producto_id", ids)

        if (imagenesError) throw imagenesError;

        // 🗺️ Crear un mapa de imágenes
        const imageMap: Record<number, string> = {};
        imagenesData?.forEach((img) => {
          imageMap[img.producto_id] = img.url;
        });

        // 🔄 Combinar productos + imagen correspondiente
        const productosConImagen = productosData.map((p) => ({
          ...p,
          img: imageMap[p.id] || "",
        }));

        setProductos(productosConImagen);
      } catch (err: any) {
        console.error("Error al obtener productos:", err.message);
        setErrorMsg("Error al obtener los productos del vendedor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
  }, []);

  return { productos, loading, errorMsg };
}


