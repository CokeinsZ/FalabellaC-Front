import { useCallback, useEffect, useState } from "react";
import { useAddresses } from "./useAddresses";
import { getSelectedAddressFromCookie, setSelectedAddressCookie } from "./useAddressCookie";
import type { Address } from "./useAddressCookie";

/**
 * Hook principal para la pantalla de delivery / selección de dirección.
 * Expone: loading, direcciones, currentAddress, selectedId, pickup, delivery, fetchAll, showA, showDirectionModal, etc.
 */
export function useDelivery() {
  const { direcciones, fetchAddresses, setDirecciones, loading: loadingAddresses } = useAddresses();
  const [loading, setLoading] = useState(true);
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const [showA, setShowA] = useState(true);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  // Opciones de ejemplo (puedes cargar dinámicamente si lo necesitas)
  const pickup = [
    { id: "pickup-1", title: "Retira mañana", subtitle: "19 de oct. En FALABELLA LA CAROLA (1.6km)", meta: "Gratis" },
  ];

  const delivery = [
    { id: "delivery-1", title: "Llega el martes 21 de oct. de 8 a 20 h", price: "$ 13.200" },
    { id: "delivery-2", title: "Llega entre el martes 21 y miércoles 22 de oct.", price: "$ 11.000" },
  ];

  const fetchAll = useCallback(async () => {
    setLoading(true);

    const fetched = await fetchAddresses();
    setDirecciones(fetched ?? []);

    const has = Array.isArray(fetched) && fetched.length > 0;
    setShowDirectionModal(!has);
    setShowA(!has);

    // elegir dirección por cookie / primera / undefined
    const cookie = getSelectedAddressFromCookie();
    if (cookie) {
      const exists = (fetched ?? []).find((d: Address) => d.id === cookie.id);
      if (exists) {
        setCurrentAddress(exists);
        setSelectedId(exists.id);
        setSelectedAddressCookie(exists);
        console.log("cookie seleccionada:", exists);
      } else {
        setCurrentAddress(cookie);
        setSelectedId(cookie.id);
      }
    } else if ((fetched ?? []).length > 0) {
      setCurrentAddress((fetched ?? [])[0]);
      setSelectedId((fetched ?? [])[0].id);
      setSelectedAddressCookie((fetched ?? [])[0]);
    } else {
      setCurrentAddress(null);
      setSelectedId(undefined);
    }

    setLoading(false);
  }, [fetchAddresses, setDirecciones]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const onSelected = (id?: string) => {
    setSelectedId(id);
    const found = (direcciones ?? []).find((d) => d.id === id);
    if (found) {
      setCurrentAddress(found);
      setSelectedAddressCookie(found);
    }
  };

  return {
    loading: loading || loadingAddresses,
    showDirectionModal,
    setShowDirectionModal,
    showA,
    setShowA,
    direcciones,
    pickup,
    delivery,
    currentAddress,
    selectedId,
    setSelectedId: onSelected,
    fetchAll,
  };
}
