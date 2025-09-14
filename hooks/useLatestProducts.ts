// src/hooks/useLatestProducts.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface LatestProductDTO {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  img?: string;
}

export const useLatestProducts = () => {
  const [latestProducts, setLatestProducts] = useState<LatestProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchLatestProducts = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase
        .from("productos")
        .select("id, nombre, marca, precio")
        .order("id", { ascending: false }) // ordena descendente
        .limit(8); // limitar a 8 productos

      if (error) throw error;

      // fetch de imágenes principales
      const ids = data?.map((p) => p.id) || [];
      const { data: imgs } = await supabase
        .from("imagenes_producto")
        .select("producto_id, url")
        .in("producto_id", ids)
        .eq("orden", 0);

      const imageMap: Record<number, string> = {};
      imgs?.forEach((img) => {
        imageMap[img.producto_id] = img.url;
      });

      const mapped = (data || []).map((p) => ({
        ...p,
        img: imageMap[p.id] || "",
      }));

      setLatestProducts(mapped);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Error fetching latest products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  return { latestProducts, loading, errorMsg };
};
