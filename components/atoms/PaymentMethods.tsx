"use client";
import type { Address } from "@/hooks/useAddressCookie";
import { useDelivery } from "@/hooks/useDelivery";
import { usePayment } from "@/hooks/usePayment";
import ChangeDir from "./ChangeDir";
import PaymentA from "./PaymentA";
import PaymentB from "./PaymentB";

interface PaymentMethodsProps {
  address?: Address | null;
  onChangeAddress?: () => void;
}

export default function PaymentMethods({ address }: PaymentMethodsProps) {
  const {
    showDirectionModal,
    setShowDirectionModal,
    direcciones,
    fetchAll,
  } = useDelivery();

  const { payments, showA } = usePayment();

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
        {/* Aquí decidimos si renderizar PaymentA o PaymentB */}
        {showA ? <PaymentA onCardSaved={() => {}} /> : <PaymentB payments={payments} />}
      </div>
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
