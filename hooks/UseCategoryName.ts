import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useCategoryName = (categoryId: string) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryName = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const { data, error } = await supabase
          .from("categorias")
          .select("nombre")
          .eq("id", categoryId)
          .single();

        if (error) throw error;
        if (data?.nombre) setCategoryName(data.nombre);
      } catch (err: any) {
        setErrorMsg(err.message || "Error fetching category name");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryName();
  }, [categoryId]);

  return { categoryName, loading, errorMsg };
};
