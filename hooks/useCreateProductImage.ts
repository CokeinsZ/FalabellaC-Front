"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface createProductImage {
  producto_id: number;
  url: string;
  orden?: number;
}

export function useCreateProductImage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const createImage = async (image: createProductImage) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase
        .from("imagenes_producto")
        .insert([image]);

      if (error) throw error;

      setSuccessMsg("🖼️ Imagen agregada correctamente.");
      return true;
    } catch (err: any) {
      console.error("Error al agregar imagen:", err);
      setErrorMsg(err.message || "Error desconocido al agregar la imagen.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createImage,
    loading,
    errorMsg,
    successMsg,
  };
}
