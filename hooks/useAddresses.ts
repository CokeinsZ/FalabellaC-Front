import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getSelectedAddressFromCookie, setSelectedAddressCookie } from "./useAddressCookie";
import type { Address } from "./useAddressCookie";

export function useAddresses() {
  const [direcciones, setDirecciones] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: getUserData, error: getUserError } = await supabase.auth.getUser();
      if (getUserError || !getUserData?.user) {
        setDirecciones([]);
        return [];
      }

      const user = getUserData.user;
      const { data: direccionesData, error: dirError } = await supabase
        .from("direcciones")
        .select("*")
        .eq("usuario_id", user.id);

      if (dirError) {
        setError(dirError.message);
        setDirecciones([]);
        return [];
      }

      setDirecciones(direccionesData ?? []);

      const cookie = getSelectedAddressFromCookie();
      if (cookie) {
        const exists = (direccionesData ?? []).find((d: Address) => d.id === cookie.id);
        if (exists) setSelectedAddressCookie(exists);
      }

      return direccionesData ?? [];
    } catch (e) {
      console.error(e);
      setError("Error inesperado al traer direcciones");
      setDirecciones([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAddress = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from("direcciones").delete().eq("id", id);
      if (error) throw error;
      setDirecciones((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, []);

  return {
    direcciones,
    setDirecciones,
    loading,
    error,
    fetchAddresses,
    deleteAddress,
  };
}
