"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserFromToken } from "./UseUserToken";

export interface AddressDTO {

  direccion: string;
  ciudad: string;
  departamento: string;
  barrio: string;
}

export function useUserAddresses() {
  const { user } = useUserFromToken();
  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchAddresses = async () => {
    if (!user?.id && !user?.sub) return;
    const userId = user.sub;

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase
        .from("direcciones")
        .select("direccion, ciudad, departamento, barrio")
        .eq("usuario_id", userId); // 👈 campo que referencia al usuario

      if (error) throw error;

      setAddresses(data || []);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al obtener direcciones";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (newAddress: Omit<AddressDTO, "id">) => {
    if (!user?.id && !user?.sub) return;
    const userId = user.id || user.sub;

    try {
      const { data, error } = await supabase
        .from("direcciones")
        .insert([{ ...newAddress, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      setAddresses((prev) => [...prev, data]);
      return data;
    } catch (err) {
      console.error("Error al agregar dirección:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  return { addresses, loading, errorMsg, addAddress, refetch: fetchAddresses };
}
