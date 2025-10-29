"use client";
import { useEffect, useState, useCallback } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";

type UserCardInfo = {
  usuario_id: string;
  nombre_titular: string;
  email: string;
};

type UserCardFormFields = {
  usuario_id: string;
  nombre_titular: string;
};

export function useUserCard<T extends FieldValues = UserCardFormFields>(opts?: {
  setValue?: UseFormSetValue<T & UserCardFormFields>;
}) {
  const [userInfo, setUserInfo] = useState<UserCardInfo>({
    usuario_id: "",
    nombre_titular: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState<boolean>(false);

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
          setIsSeller(meta.isSeller);

          if (opts?.setValue) {
            const set = opts.setValue as UseFormSetValue<T & UserCardFormFields>;
            set("usuario_id" as Path<T & UserCardFormFields>, usuario_id as any);
            set("nombre_titular" as Path<T & UserCardFormFields>, nombre_titular as any);
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

  const name = (() => {
    const full = userInfo.nombre_titular||"invitado";
    return full.trim().split(/\s+/)[0];
  })();

  return { ...userInfo, loading, getLast4, name , isSeller };
}
