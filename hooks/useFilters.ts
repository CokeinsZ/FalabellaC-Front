import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface ProductoDTO {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
  destacado: boolean;
  calificacion: number;
  categoria_id: number;
  id_sub_categoria: number;
  img?: string;
}

export interface FiltrosProps {
  categoria_id?: number;
  subcategoria_id?: number;
  nombre?: string;
  precio_min?: number;
  precio_max?: number;
  stock_min?: number;
  destacado?: boolean;
  calificacion_min?: number;
}

export const useFilters = (filtros: FiltrosProps) => {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchProductos = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      let query = supabase
        .from("productos")
        .select(`
          *,
          imagenes_producto!inner (
            url
          )
        `)
        .eq("imagenes_producto.orden", 0);

      // Aplicar filtros dinámicamente
      if (filtros.categoria_id) query = query.eq("categoria_id", filtros.categoria_id);
      if (filtros.subcategoria_id) query = query.eq("id_sub_categoria", filtros.subcategoria_id);
      if (filtros.nombre) {
        const nombre = filtros.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        query = query.or(`marca.ilike.%${nombre}%,nombre.ilike.%${nombre}%`);
      }
      if (filtros.precio_min !== undefined && filtros.precio_min !== null) query = query.gte("precio", filtros.precio_min);
      if (filtros.precio_max !== undefined && filtros.precio_max !== null) query = query.lte("precio", filtros.precio_max);
      if (filtros.stock_min !== undefined && filtros.stock_min !== null) query = query.gte("stock", filtros.stock_min);
      if (filtros.destacado !== undefined && filtros.destacado !== null) query = query.eq("destacado", filtros.destacado);
      if (filtros.calificacion_min !== undefined && filtros.calificacion_min !== null) query = query.gte("calificacion", filtros.calificacion_min);

      query = query.order("nombre");

      const { data, error } = await query;

      if (error) throw error;

      // Mapear productos con su imagen principal
      const mapped = (data || []).map((p) => ({
        ...p,
        img: p.imagenes_producto?.[0]?.url || "",
      }));

      setProductos(mapped);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Error fetching productos"
      );
      console.error("Error fetching productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [filtros]);

  return { productos, loading, errorMsg };
};