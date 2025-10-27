"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface CreateProductImageDTO {
  producto_id: number;
  url: string;
  orden?: number;
}

export function useCreateProductImage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const createProductImage = async (image: CreateProductImageDTO) => {
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const { error } = await supabase.from("imagenes_producto").insert([image]);

      if (error) throw error;

      setSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al crear la imagen";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return { createProductImage, loading, errorMsg, success };
}

