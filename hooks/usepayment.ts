import { useCallback, useEffect, useState } from "react";
import { usePaymentMethods } from "./usePaymentMethods";
import { getSelectedPaymentFromCookie, setSelectedPaymentCookie } from "./usePaymentCookie";
import type { CreditCard } from "./usePaymentCookie";

export function usePayment() {
  const { payments, fetchPayments, setPayments, loading: loadingAddresses } = usePaymentMethods();
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showA, setShowA] = useState(true);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [currentAddress, setCurrentAddress] = useState<CreditCard | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);

    const fetched = await fetchPayments();
    setPayments(fetched ?? []);

    const has = Array.isArray(fetched) && fetched.length > 0;
    setShowPaymentModal(!has);
    setShowA(!has);

    const cookie = getSelectedPaymentFromCookie();
    if (cookie) {
      const exists = (fetched ?? []).find((d: CreditCard) => d.id === cookie.id);
      if (exists) {
        setCurrentAddress(exists);
        setSelectedId(exists.id);
        setSelectedPaymentCookie(exists);
        console.log("cookie seleccionada:", exists);
      } else {
        setCurrentAddress(cookie);
        setSelectedId(cookie.id);
      }
    } else if ((fetched ?? []).length > 0) {
      setCurrentAddress((fetched ?? [])[0]);
      setSelectedId((fetched ?? [])[0].id);
      setSelectedPaymentCookie((fetched ?? [])[0]);
    } else {
      setCurrentAddress(null);
      setSelectedId(undefined);
    }

    setLoading(false);
  }, [fetchPayments, setPayments]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const onSelected = (id?: string) => {
    setSelectedId(id);
    const found = (payments ?? []).find((d) => d.id === id);
    if (found) {
      setCurrentAddress(found);
      setSelectedPaymentCookie(found);
    }
  };

  return {
    loading: loading || loadingAddresses,
    showPaymentModal,
    setShowPaymentModal,
    showA,
    setShowA,
    payments,
    currentAddress,
    selectedId,
    setSelectedId: onSelected,
    fetchAll,
  };
}
