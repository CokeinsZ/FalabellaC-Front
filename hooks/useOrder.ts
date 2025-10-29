import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { getSelectedAddressFromCookie } from "@/hooks/useAddressCookie";
import { getSelectedPaymentFromCookie } from "@/hooks/usePaymentCookie";
import { useCart } from "./useCart";

export function useOrder() {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const { productos } = useCart();
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const saveOrder = async () => {
    setMensaje("");
    setLoading(true);

    try {
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

      const direccion_id = getSelectedAddressFromCookie()?.id ?? null;

      const metodo_pago = getSelectedPaymentFromCookie()?.id ?? null;

      const payload = {
        usuario_id: user.id,
        direccion_id,
        metodo_pago,
        total: total,
        estado: "pendiente",
      };

      const { data: insertData, error: insertError } = await supabase
        .from("ordenes")
        .insert([payload])
        .select();

      console.log("Supabase insert response:", { insertData, insertError });

      if (insertError) {
        setMensaje("Error al guardar: " + (insertError.message || JSON.stringify(insertError)));
        return { ok: false, error: insertError };
      }

      setMensaje("Orden guardada correctamente.")
      return { ok: true, data: insertData };
    } catch (err: unknown) {
      console.error("Error inesperado al guardar:", err);
      setMensaje("Error inesperado al guardar.");
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { mensaje, loading, saveOrder };
}
