"use client";

import React from "react";
import ChangeDir from "./ChangeDir";
import { useDelivery } from "@/hooks/useDelivery";

type Option = {
  id: string;
  title: string;
  subtitle?: string;
  price?: string;
  meta?: string;
};

interface Props {
  vendor: string;
}

export default function DirectionB({ vendor }: Props) {
  const {
    loading,
    showDirectionModal,
    setShowDirectionModal,
    direcciones,
    pickup,
    delivery,
    currentAddress,
    selectedId,
    setSelectedId,
    fetchAll,
  } = useDelivery();

  if (loading) return null; // puedes reemplazar por un loader si quieres

  return (
    <section className="max-w-3xl mx-auto p-4">
      {/* Address bar */}
      <div className="flex items-center justify-between gap-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
            {/* location pin svg */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="8" r="2" fill="#fff" stroke="#374151" strokeWidth="1.2"/>
            </svg>
          </div>

          <div>
            {currentAddress ? (
              <p className="text-sm text-gray-500">
                Dirección - <span className="text-gray-700 font-medium">
                  {currentAddress.direccion}
                  {currentAddress.adicional ? `, ${currentAddress.adicional}` : ""}
                  {currentAddress.barrio ? ` · ${currentAddress.barrio}` : ""}
                  {`, ${currentAddress.ciudad} · ${currentAddress.departamento}`}
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-500">No hay dirección seleccionada</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button className="underline" onClick={() => setShowDirectionModal(true)}>Cambiar</button>
          <button aria-label="info" className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11v4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7h.01" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Opciones (pickup & delivery) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="mb-4 text-sm text-gray-600">Vendido por <span className="font-semibold text-green-600 ml-1">{vendor}</span></div>

        {/* Pickup block */}
        <div className="mb-4 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 flex items-center justify-center">{/* icon */}</div>
            <div>
              <h4 className="text-sm font-medium">Retiro en un punto</h4>
            </div>
          </div>

          {pickup.length === 0 ? (
            <div className="text-sm text-gray-500">No hay puntos de retiro disponibles.</div>
          ) : (
            <div className="space-y-3">
              {pickup.map((opt: Option) => (
                <label key={opt.id} className="flex items-start justify-between p-3 rounded-lg border border-transparent hover:border-gray-100">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="direction-option"
                      checked={selectedId === opt.id}
                      onChange={() => setSelectedId(opt.id)}
                      className="mt-1"
                    />
                    <div>
                      <div className="text-sm font-medium text-green-700">{opt.title}</div>
                      {opt.subtitle && <div className="text-xs text-gray-500 mt-1">{opt.subtitle}</div>}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{opt.meta ?? ''}</div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Delivery block */}
        <div className="rounded-lg border border-gray-300 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 flex items-center justify-center">{/* icon */}</div>
            <div>
              <h4 className="text-sm font-medium">Envío a domicilio</h4>
            </div>
          </div>

          <div className="space-y-2">
            {delivery.map((opt: Option) => (
              <label key={opt.id} className={`flex items-center justify-between p-3 rounded-md border ${selectedId === opt.id ? 'border-gray-700' : 'border-transparent'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="direction-option"
                    checked={selectedId === opt.id}
                    onChange={() => setSelectedId(opt.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-sm">{opt.title}</div>
                    {opt.subtitle && <div className="text-xs text-gray-500 mt-1">{opt.subtitle}</div>}
                  </div>
                </div>

                <div className="text-sm text-gray-700">{opt.price ?? ''}</div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Modal ChangeDir */}
      {showDirectionModal && (
        <ChangeDir
          isOpen={showDirectionModal}
          onClose={async () => {
            setShowDirectionModal(false);
            await fetchAll();
          }}
          adresses={direcciones}
        />
      )}
    </section>
  );
}
