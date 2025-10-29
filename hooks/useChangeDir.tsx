import { useMemo, useState } from "react";
import { setSelectedAddressCookie, removeSelectedAddressCookie } from "./useAddressCookie";
import type { Address } from "./useAddressCookie";
import { useAddresses } from "./useAddresses";

/**
 * Ahora expone openAddModal y setOpenAddModal.
 * handleAddNew abre el modal en vez de navegar.
 */
export function useChangeDir(initialAddresses: Address[] = []) {
  const { direcciones: globalAddresses, fetchAddresses, deleteAddress } = useAddresses();

  const [localAddresses, setLocalAddresses] = useState<Address[]>(initialAddresses ?? globalAddresses ?? []);
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    try {
      const cookieRaw = typeof window !== "undefined" ? localStorage.getItem("selectedAddress") : null;
      const cookie = cookieRaw ? JSON.parse(cookieRaw) : null;
      return cookie?.id ?? (initialAddresses?.[0]?.id ?? null);
    } catch {
      return initialAddresses?.[0]?.id ?? null;
    }
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const syncWithGlobal = async () => {
    const fetched = await fetchAddresses();
    setLocalAddresses(fetched ?? []);
  };

  const handleSelect = (onClose: () => void) => {
    if (!selectedId) {
      setError("Selecciona una dirección antes de continuar.");
      return;
    }
    const selected = localAddresses.find((a) => a.id === selectedId)!;
    setSelectedAddressCookie(selected);
    onClose();
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("¿Eliminar esta dirección?");
    if (!ok) return;
    setDeletingId(id);
    setError(null);
    try {
      const deleted = await deleteAddress(id);
      if (deleted) {
        setLocalAddresses((prev) => prev.filter((a) => a.id !== id));
        if (selectedId === id) {
          removeSelectedAddressCookie();
          const first = localAddresses.find((a) => a.id !== id);
          setSelectedId(first ? first.id : null);
        }
      } else {
        setError("Error al eliminar la dirección. Intenta de nuevo.");
      }
    } catch (e) {
      console.error(e);
      setError("Error inesperado al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddNew = () => {
    setOpenAddModal(true);
  };

  const state = useMemo(
    () => ({ localAddresses, selectedId, deletingId, error, openAddModal }),
    [localAddresses, selectedId, deletingId, error, openAddModal]
  );

  return {
    state,
    setLocalAddresses,
    setSelectedId,
    syncWithGlobal,
    handleSelect,
    handleDelete,
    handleAddNew,
    openAddModal,
    setOpenAddModal,
  };
}
