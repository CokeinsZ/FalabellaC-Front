import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface ProductCategoryDTO {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  img?: string;
}

export const useProductsByCategory = (categoriaId: string | number) => {
  const [productos, setProductos] = useState<ProductCategoryDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchProductos = async () => {
    if (!categoriaId) return;
    setLoading(true);
    setErrorMsg("");

    try {
      // 📦 Obtener productos de esa categoría
      const { data, error } = await supabase
        .from("productos")
        .select("id, nombre, marca, precio")
        .eq("categoria_id", categoriaId)
        .order("id", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        setProductos([]);
        setLoading(false);
        return;
      }

      // 🖼️ Obtener las imágenes principales (orden = 0)
      const ids = data.map((p) => p.id);
      const { data: imgs } = await supabase
        .from("imagenes_producto")
        .select("producto_id, url")
        .in("producto_id", ids)
        .eq("orden", 0);

      // 🗺️ Mapear imagen por producto_id
      const imageMap: Record<number, string> = {};
      imgs?.forEach((img) => {
        imageMap[img.producto_id] = img.url;
      });

      // 🔄 Combinar productos + imágenes
      const mapped = data.map((p) => ({
        ...p,
        img: imageMap[p.id] || "",
      }));

      setProductos(mapped);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Error cargando productos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [categoriaId]);

  return { productos, loading, errorMsg };
};
