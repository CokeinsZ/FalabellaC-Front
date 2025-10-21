"use client";

import React, { useEffect } from "react";
import { useChangeDir } from "@/hooks/useChangeDir";
import type { Address } from "@/hooks/useAddressCookie";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  adresses: Address[];
}

export default function ChangeDir({ isOpen, onClose, adresses }: Props) {
  const {
    state,
    setLocalAddresses,
    setSelectedId,
    handleSelect,
    handleDelete,
    handleAddNew,
  } = useChangeDir(adresses);

  useEffect(() => {
    setLocalAddresses(adresses ?? []);
  }, [adresses, setLocalAddresses]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="change-dir-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <header className="mb-4 flex items-center justify-between">
          <h3 id="change-dir-title" className="text-lg font-semibold">Cambiar dirección</h3>
          <button onClick={onClose} aria-label="Cerrar" className="text-sm px-2 py-1">✕</button>
        </header>

        {state.error && <div className="mb-3 rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">{state.error}</div>}

        <div className="space-y-3 max-h-72 overflow-auto">
          {state.localAddresses.length === 0 ? (
            <div className="text-sm text-gray-600">No hay direcciones guardadas.</div>
          ) : (
            state.localAddresses.map((addr) => (
              <label
                key={addr.id}
                className={`flex items-start justify-between gap-3 rounded-md border p-3 ${state.selectedId === addr.id ? "border-black shadow-sm" : "border-gray-200"}`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={state.selectedId === addr.id}
                    onChange={() => setSelectedId(addr.id)}
                    className="mt-1"
                    aria-checked={state.selectedId === addr.id}
                  />
                  <div className="text-sm">
                    <div className="font-medium">
                      {addr.direccion}
                      {addr.adicional ? `, ${addr.adicional}` : ""}
                    </div>
                    <div className="text-xs text-gray-600">
                      {addr.barrio ? `${addr.barrio} · ` : ""}
                      {addr.ciudad}, {addr.departamento}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(addr.id);
                    }}
                    disabled={state.deletingId === addr.id}
                    aria-label={`Eliminar dirección ${addr.direccion}`}
                    className="text-sm px-2 py-1"
                  >
                    {state.deletingId === addr.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </label>
            ))
          )}
        </div>

        <footer className="mt-6 flex items-center justify-between gap-3">
          <button onClick={() => { handleAddNew(); onClose(); }} className="text-sm underline" aria-label="Agregar nueva dirección">
            Agregar nueva dirección
          </button>

          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-md border px-4 py-2 text-sm">Cancelar</button>
            <button onClick={() => handleSelect(onClose)} disabled={!state.selectedId} className="rounded-full bg-black px-6 py-2 text-sm text-white disabled:opacity-60">
              Seleccionar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
