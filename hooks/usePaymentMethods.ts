import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getSelectedPaymentFromCookie, setSelectedPaymentCookie } from "./usePaymentCookie";
import type { CreditCard } from "./usePaymentCookie";

export function usePaymentMethods() {
  const [payments, setPayments] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: getUserData, error: getUserError } = await supabase.auth.getUser();
      if (getUserError || !getUserData?.user) {
        setPayments([]);
        return [];
      }

      const user = getUserData.user;
      const { data: paymentsData, error: payError } = await supabase
        .from("tarjetas_credito")
        .select("*")
        .eq("usuario_id", user.id);

      if (payError) {
        setError(payError.message);
        setPayments([]);
        return [];
      }

      setPayments(paymentsData ?? []);

      const cookie = getSelectedPaymentFromCookie();
      if (cookie) {
        const exists = (paymentsData ?? []).find((d: CreditCard) => d.id === cookie.id);
        if (exists) setSelectedPaymentCookie(exists);
      }

      return paymentsData ?? [];
    } catch (e) {
      console.error(e);
      setError("Error inesperado al traer los métodos de pago");
      setPayments([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePayment = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from("tarjetas_credito").delete().eq("id", id);
      if (error) throw error;
      setPayments((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, []);

  return {
    payments,
    setPayments,
    loading,
    error,
    fetchPayments,
    deletePayment,
  };
}
