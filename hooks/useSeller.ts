"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SellerDTO {
  id_usuario: string;
  nit: number;
  nombre_tienda?: string;
  direccion?: string;
  pais?: string;
  tipo_persona?: string;
}

/**
 * Hook que busca un vendedor por su id_usuario (proveniente del token)
 * y guarda el user_id y nit en cookies si lo encuentra.
 */
export function useSeller(userId?: string) {
  const [seller, setSeller] = useState<SellerDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      if (!userId) return;

      setLoading(true);
      setErrorMsg("");

      try {
        const { data, error, status } = await supabase
          .from("vendedor")
          .select("id_usuario, nit, nombre_tienda, direccion, pais, tipo_persona")
          .eq("id_usuario", userId)
          .maybeSingle(); // 👈 evita error cuando no hay datos

        if (error && status !== 406) throw error;

        if (data) {
          // Guardar en cookies
          document.cookie = `user_id=${data.id_usuario}; path=/; max-age=86400;`;
          document.cookie = `nit=${data.nit}; path=/; max-age=86400;`;

          setSeller(data);
        } else {
          setErrorMsg("No se encontró el vendedor para este usuario.");
        }
      } catch (err: any) {
        console.error("Error al obtener vendedor:", err.message);
        setErrorMsg(err.message || "Error al obtener vendedor.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [userId]);

  return { seller, loading, errorMsg };
}
