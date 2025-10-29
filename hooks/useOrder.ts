import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { getSelectedAddressFromCookie } from "@/hooks/useAddressCookie";
import { getSelectedPaymentFromCookie } from "@/hooks/usePaymentCookie";
import { useCart } from "./useCart";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string; 
}

const saveOrderDetails = async (orden_id: number, productos: Producto[]) => {
  const detalles = productos.map((p) => ({
    orden_id,
    producto_id: p.id,
    cantidad: p.cantidad,
    precio_unit: p.precio,
  }));

  const { data, error } = await supabase
    .from("orden_detalle")
    .insert(detalles);

  if (error) {
    console.error("Error al guardar detalles de la orden:", error);
    throw error;
  }

  return data;
};

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

      await saveOrderDetails(insertData[0].id, productos);

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
