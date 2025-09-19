"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface CategoryDTO {
  id: number;
  name: string;
  img: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchCategories = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, nombre, imagen");

      if (error) throw error;

      const mapped: CategoryDTO[] =
        data?.map((c) => ({
          id: c.id,
          name: c.nombre,
          img: c.imagen,
        })) || [];

      setCategories(mapped);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching categories";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, errorMsg, refetch: fetchCategories };
}
