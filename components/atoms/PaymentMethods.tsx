// PaymentMethods.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CreditCard, DollarSign, Gift, Banknote, Building, X } from "lucide-react";
import type { Address } from "@/hooks/useAddressCookie";

interface PaymentMethodsProps {
  address?: Address | null;
  onChangeAddress?: () => void;
}

export default function PaymentMethods({ address, onChangeAddress }: PaymentMethodsProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const formatAddress = (a: Address) => {
    const parts = [];
    if (a.direccion) parts.push(a.direccion);
    if (a.barrio) parts.push(a.barrio);
    if (a.adicional) parts.push(a.adicional);
    const cityPart = [a.ciudad, a.departamento].filter(Boolean).join(" - ");
    if (cityPart) parts.push(cityPart);
    return parts.join(", ");
  };

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

  // mostrar bloque tipo documento sólo para cmr y falabella
  const mostrarDocumento = selected === "cmr" || selected === "falabella";

  const getTitle = (id: string | null) => {
    switch (id) {
      case "cmr": return "Tarjeta CMR";
      case "credito": return "Tarjeta de crédito";
      case "falabella": return "Débito Banco Falabella";
      case "debito": return "Tarjeta de débito";
      default: return "";
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">
        {/* Dirección */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              {address ? formatAddress(address) : "No hay dirección seleccionada"}
            </span>
          </div>
          <button onClick={onChangeAddress} className="text-sm text-blue-600 hover:underline">
            Cambiar
          </button>
        </div>

        {/* Agregar tarjeta */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Agregar tarjeta</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all border ${selected === item.id ? "border-blue-500" : "hover:border-gray-300"}`}
                onClick={() => handleCardClick(item.id)}
              >
                <CardContent className="flex items-center gap-3 py-3">
                  {item.icon}
                  <span>{item.label}</span>
                </CardContent>
              </Card>
            ))}

            {/* Gift Card */}
            <Card className="opacity-50">
              <CardContent className="flex items-center gap-3 py-3">
                <Gift className="w-4 h-4" />
                <span>Gift Card</span>
                <span className="ml-auto text-sm text-gray-500">No disponible</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Otras opciones */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Otras opciones</h2>
          <div className="space-y-2">
            <Card className="cursor-pointer hover:border-gray-300 transition-all">
              <CardContent className="flex items-center gap-3 py-3">
                <Banknote className="w-4 h-4" />
                <span>Débito desde cuenta corriente o ahorros</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-gray-300 transition-all">
              <CardContent className="flex items-center gap-3 py-3">
                <DollarSign className="w-4 h-4" />
                <span>Pago en efectivo</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-gray-300 transition-all">
              <CardContent className="flex items-center gap-3 py-3">
                <CreditCard className="w-4 h-4" />
                <span>Cupón de descuento</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Drawer / Modal lateral */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeDrawer}
            aria-hidden
          />

          {/* Panel derecho */}
          <aside
            className="fixed right-0 top-0 h-full w-full sm:w-[460px] bg-white z-50 shadow-lg transform transition-transform duration-300"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                {/* Puedes poner icono condicional si quieres */}
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded">
                  {/* icon pequeño */}
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

            <div className="p-6 space-y-6 overflow-auto h-[calc(100%-72px)]"> {/* ajuste alto para que quede dentro del panel */}
              <div>
                <label className="block text-sm text-gray-600">Número de tarjeta</label>
                <input className="w-full border-b py-3 focus:outline-none" placeholder="0000 0000 0000 0000" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600">Expiración</label>
                  <input className="w-full border-b py-3 focus:outline-none" placeholder="MM/AA" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Código de seguridad</label>
                  <input className="w-full border-b py-3 focus:outline-none" placeholder="CVV" />
                </div>
              </div>

              {mostrarDocumento && (
                <>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Tipo de documento (titular de la tarjeta)</label>
                    <div className="grid grid-cols-2 gap-4 items-end">
                      <div>
                        <select className="w-full border-b py-2 focus:outline-none">
                          <option>Cédula de Ciudadanía</option>
                          <option>Cédula de Extranjería</option>
                          <option>Pasaporte</option>
                        </select>
                      </div>

                      <div>
                        <input className="w-full border-b py-2 focus:outline-none" placeholder={selected === "cmr" ? "CC dueño de la tarjeta" : "Número de documento"} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div>
                <button
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-full text-lg"
                  onClick={() => {
                    // Lógica de envío o validación aquí
                    // por ahora solo cerramos
                    closeDrawer();
                  }}
                >
                  Agregar
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Validaremos tu tarjeta con un cobro único de $0 o $107 que será reembolsado.
                </p>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
