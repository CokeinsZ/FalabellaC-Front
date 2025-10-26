"use client";

import { useState } from "react";
import { Card as UICard, CardContent } from "@/components/ui/card"; // renombrado para evitar conflicto
import { CreditCard, Gift, Building, X } from "lucide-react";
import type { Address } from "@/hooks/useAddressCookie";
import { useDelivery } from "@/hooks/useDelivery";
import ChangeDir from "./ChangeDir";
import CardForm from "./CardForm"; // <-- importamos CardForm

interface PaymentMethodsProps {
  address?: Address | null;
  onChangeAddress?: () => void;
}

export default function PaymentMethods({ address }: PaymentMethodsProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const items = [
    { id: "cmr", label: "Tarjeta CMR", icon: <CreditCard className="w-4 h-4" /> },
    { id: "credito", label: "Tarjeta de crédito", icon: <CreditCard className="w-4 h-4" /> },
    { id: "falabella", label: "Débito Banco Falabella", icon: <Building className="w-4 h-4" /> },
    { id: "debito", label: "Tarjeta de débito", icon: <CreditCard className="w-4 h-4" /> },
  ];

  const handleCardClick = (id: string) => {
    setSelected(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    // opcional: limpiar selección si quieres
    // setSelected(null);
  };
  const {
    showDirectionModal,
    setShowDirectionModal,
    direcciones,
    fetchAll,
  } = useDelivery();


  const getTitle = (id: string | null) => {
    switch (id) {
      case "cmr": return "Tarjeta CMR";
      case "credito": return "Tarjeta de crédito";
      case "falabella": return "Débito Banco Falabella";
      case "debito": return "Tarjeta de débito";
      default: return "";
    }
  };

  // mapeo a "tipo" esperado por CardForm (ajusta si tu CardForm espera otros strings)
  const tipoParaCardForm = (id: string | null) => {
    if (!id) return "";
    if (id === "falabella") return "debito_falabella"; // tu CardForm usaba este tipo
    return id; // cmr, credito, debito
  };

  return (
    <>
      <div>
        {/* Dirección */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="8" r="2" fill="#fff" stroke="#374151" strokeWidth="1.2"/>
              </svg>
            </div>

            <div>
              {address ? (
                <p className="text-sm text-gray-500">
                  Dirección - <span className="text-gray-700 font-medium">
                    {address.direccion}
                    {address.adicional ? `, ${address.adicional}` : ""}
                    {address.barrio ? ` · ${address.barrio}` : ""}
                    {`, ${address.ciudad} · ${address.departamento}`}
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

        {/* Agregar tarjeta */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Agregar tarjeta</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <UICard
                key={item.id}
                className={`cursor-pointer transition-all border ${selected === item.id ? "border-blue-500" : "hover:border-gray-300"}`}
                onClick={() => handleCardClick(item.id)}
              >
                <CardContent className="flex items-center gap-3 py-3">
                  {item.icon}
                  <span>{item.label}</span>
                </CardContent>
              </UICard>
            ))}

            {/* Gift Card */}
            <UICard className="opacity-50">
              <CardContent className="flex items-center gap-3 py-3">
                <Gift className="w-4 h-4" />
                <span>Gift Card</span>
                <span className="ml-auto text-sm text-gray-500">No disponible</span>
              </CardContent>
            </UICard>
          </div>
        </div>
      </div>

      {/* Drawer / Modal lateral */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeDrawer}
            aria-hidden
          />

          <aside
            className="fixed right-0 top-0 h-full w-full sm:w-[460px] bg-white z-50 shadow-lg transform transition-transform duration-300"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded">
                  <CreditCard className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-lg font-medium">{getTitle(selected)}</h3>
              </div>

              <button
                onClick={closeDrawer}
                aria-label="Cerrar"
                className="p-2 rounded hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-auto h-[calc(100%-72px)]">
              {/* Aquí renderizamos CardForm y le pasamos tipo + onSaved */}
              <CardForm
                tipo={tipoParaCardForm(selected)}
                onSaved={() => {
                  // lo que ocurre cuando la tarjeta se guardó correctamente
                  closeDrawer();
                  setSelected(null);
                  // opcional: refrescar tarjetas, mostrar toast, etc.
                }}
              />
            </div>
          </aside>
        </>
      )}
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
    </>
  );
}
