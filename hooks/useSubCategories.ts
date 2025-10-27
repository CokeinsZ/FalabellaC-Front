"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface SubCategoryDTO {
  id: number;
  name: string;
  img: string;
}

export function useSubCategories() {
  const [subCategories, setSubCategories] = useState<SubCategoryDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchSubCategories = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, nombre, imagen");

      if (error) throw error;

      const mapped: SubCategoryDTO[] =
        data?.map((c) => ({
          id: c.id,
          name: c.nombre,
          img: c.imagen,
        })) || [];

      setSubCategories(mapped);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching categories";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return { subCategories, loading, errorMsg, refetch: fetchSubCategories };
}
