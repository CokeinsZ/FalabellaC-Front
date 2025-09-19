"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface storeImageDTO {
  id: number;
  name: string;
  img: string;
}

export function useStoreImages() {
  const [images, setImages] = useState<storeImageDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchImages = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase
        .from("tiendas")
        .select("id, nombre, imagen");

      if (error) throw error;
      const mapped: storeImageDTO[] =
        data?.map((c) => ({
          id: c.id,
          name: c.nombre,
          img: c.imagen,
        })) || [];

      setImages(mapped);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching categories";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, errorMsg, refetch: fetchImages };
}
