// src/hooks/useUserCard.ts
"use client";
import { useEffect, useState, useCallback } from "react";
import { UseFormSetValue } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";

type UserCardInfo = {
  usuario_id: string;
  nombre_titular: string;
  email: string;
};

export function useUserCard<T extends Record<string, any> = any>(opts?: {
  setValue?: UseFormSetValue<T>;
}) {
  const [userInfo, setUserInfo] = useState<UserCardInfo>({
    usuario_id: "",
    nombre_titular: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      setLoading(true);
      try {
        const { data, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        const user = data?.user;
        if (!user) {
          if (mounted) setUserInfo({ usuario_id: "", nombre_titular: "", email: "" });
          setLoading(false);
          return;
        }

        // leer metadata desde user_metadata o raw_user_meta_data
        const meta: any = user.user_metadata || (user as any).raw_user_meta_data || {};

        const usuario_id = user.id;
        const email = user.email ?? meta.email ?? "";
        const nombre_titular =
          (`${meta.nombre ?? ""} ${meta.apellidos ?? ""}`.trim() ||
            meta.full_name ||
            email ||
            "Usuario") as string;

        const info = { usuario_id, nombre_titular, email };

        if (mounted) {
          setUserInfo(info);

          // si nos pasaron setValue (from react-hook-form), rellenamos el formulario
          if (opts?.setValue) {
            // casteos controlados para satisfacer a TS: la clave debe ser keyof T
            opts.setValue("usuario_id" as unknown as keyof T, usuario_id as any);
            opts.setValue("nombre_titular" as unknown as keyof T, nombre_titular as any);
          }
        }
      } catch (err: unknown) {
        console.error("Error en useUserCard:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadUser();
    return () => {
      mounted = false;
    };
  }, [opts]);

  const getLast4 = useCallback((numeroEnc?: string) => {
    if (!numeroEnc) return "";
    const digits = String(numeroEnc).replace(/\D/g, "");
    return digits.slice(-4);
  }, []);

  return { ...userInfo, loading, getLast4 };
}
