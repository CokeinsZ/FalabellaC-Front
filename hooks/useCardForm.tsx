import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Cookies from "js-cookie";
import type { CardDTO } from "@/interfaces/card";

export function useCardForm() {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const saveCard = useCallback(async (data: CardDTO) => {
    setMensaje("");
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) {
        setMensaje("No se encontró sesión. Por favor inicia sesión.");
        return { ok: false };
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMensaje("No se pudo obtener el usuario.");
        return { ok: false };
      }

      const { error: insertError } = await supabase.from("tarjetas_credito").insert([
        {
          ...data,
        },
      ]);

      if (insertError) {
        setMensaje("Error al guardar: " + insertError.message);
        return { ok: false };
      }

      setMensaje("Tarjeta guardada correctamente.");
      return { ok: true };
    } catch (err) {
      console.error(err);
      setMensaje("Error inesperado al guardar.");
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { mensaje, loading, saveCard };
}
