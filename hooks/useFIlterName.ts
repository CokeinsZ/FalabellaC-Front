import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type ResultadoBusqueda =
  | {
      tipo: "producto";
      id: number;
      nombre: string;
      marca: string | null;
      categoria_id: number;
      id_sub_categoria: number | null;
    }
  | {
      tipo: "categoria";
      id: number;
      nombre: string;
    }
  | {
      tipo: "subcategoria";
      id: number;
      nombre: string;
      categoria_id: number;
    };

export const useFilterName = (query: string) => {
  const [data, setData] = useState<ResultadoBusqueda[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      const normalized = query
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      try {
        const [productosRes, categoriasRes, subcategoriasRes] = await Promise.all([
          supabase
            .from("productos")
            .select("id, nombre, marca, categoria_id")
            .or(`nombre.ilike.%${normalized}%,marca.ilike.%${normalized}%`)
            .limit(5),

          supabase
            .from("categorias")
            .select("id, nombre")
            .ilike("nombre", `%${normalized}%`)
            .limit(5),

          supabase
            .from("sub_categorias")
            .select("id, nombre, id_categoria")
            .ilike("nombre", `%${normalized}%`)
            .limit(5),
        ]);

        if (productosRes.error || categoriasRes.error || subcategoriasRes.error) {
          console.error("Error en búsqueda:", {
            productos: productosRes.error,
            categorias: categoriasRes.error,
            subcategorias: subcategoriasRes.error,
          });
          throw new Error("Error en alguna de las consultas");
        }
        console.log("Fetched results:", {
          productos: productosRes.data,
          categorias: categoriasRes.data,
          subcategorias: subcategoriasRes.data,
        });
        // Combinar resultados con etiqueta "tipo"
        const productos =
          productosRes.data?.map((p) => ({
            tipo: "producto" as const,
            ...p,
          })) ?? [];

        const categorias =
          categoriasRes.data?.map((c) => ({
            tipo: "categoria" as const,
            ...c,
          })) ?? [];

        const subcategorias =
          subcategoriasRes.data?.map((s) => ({
            tipo: "subcategoria" as const,
            ...s,
          })) ?? [];

        setData([...categorias, ...subcategorias, ...productos] as ResultadoBusqueda[]);
      } catch (error) {
        console.error("Error general:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(debounce);
  }, [query]);


  return { data, loading };
};



