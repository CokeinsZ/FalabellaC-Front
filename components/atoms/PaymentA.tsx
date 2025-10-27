"use client";
import { useState } from "react";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { CreditCard, Gift, Building, X } from "lucide-react";
import CardForm from "./CardForm";

interface PaymentAProps {
  onCardSaved: () => void;
}

export default function PaymentA({ onCardSaved }: PaymentAProps) {
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
  };

  const getTitle = (id: string | null) => {
    switch (id) {
      case "cmr": return "Tarjeta CMR";
      case "credito": return "Tarjeta de crédito";
      case "falabella": return "Débito Banco Falabella";
      case "debito": return "Tarjeta de débito";
      default: return "";
    }
  };

  const tipoParaCardForm = (id: string | null) => {
    if (!id) return "";
    if (id === "falabella") return "debito_falabella";
    return id;
  };

  return (
    <>
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
          <UICard className="opacity-50">
            <CardContent className="flex items-center gap-3 py-3">
              <Gift className="w-4 h-4" />
              <span>Gift Card</span>
              <span className="ml-auto text-sm text-gray-500">No disponible</span>
            </CardContent>
          </UICard>
        </div>
      </div>
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
              <CardForm
                tipo={tipoParaCardForm(selected)}
                onSaved={() => {
                  onCardSaved();
                  closeDrawer();
                }}
              />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
