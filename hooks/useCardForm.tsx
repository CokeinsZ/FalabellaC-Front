import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { CardDTO } from "@/interfaces/card";

export function useCardForm() {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const saveCard = useCallback(async (data: CardDTO) => {
    setMensaje("");
    setLoading(true);
    try {
      // Intentamos obtener la sesión/usuario desde supabase
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("getUser error:", userError);
        setMensaje("No se pudo obtener el usuario.");
        return { ok: false, error: userError };
      }

      const user = userData?.user;
      if (!user) {
        setMensaje("No hay usuario autenticado.");
        return { ok: false };
      }

      const usuario_id = typeof data.usuario_id !== "undefined" ? data.usuario_id : user.id;
 
      const payload = {
        ...data,
        usuario_id,
      };

      console.log("Inserting payload to supabase:", payload);

      const { data: insertData, error: insertError } = await supabase
        .from("tarjetas_credito")
        .insert([payload])
        .select(); // pide que devuelvan la(s) fila(s)

      console.log("Supabase insert response:", { insertData, insertError });

      if (insertError) {
        // PostgREST normalmente entrega message y details
        setMensaje("Error al guardar: " + (insertError.message || JSON.stringify(insertError)));
        return { ok: false, error: insertError };
      }

      setMensaje("Tarjeta guardada correctamente.");
      return { ok: true, data: insertData };
    } catch (err: unknown) {
      console.error("Error inesperado al guardar:", err);
      setMensaje("Error inesperado al guardar.");
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  return { mensaje, loading, saveCard };
}
