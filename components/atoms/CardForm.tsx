"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardScheme } from "@/schemas/card";
import { CardDTO } from "@/interfaces/card";
import { useCardForm } from "@/hooks/useCardForm";
import InputComponents from "./InputComponents"; // ajusta la ruta si es necesario

type Props = {
  tipo: string;
  onSaved?: () => void;
};

export default function CardForm({ tipo, onSaved }: Props) {
  const { mensaje, loading, saveCard } = useCardForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardDTO>({
    resolver: zodResolver(cardScheme),
  });

  const mostrarDocumento = tipo === "debito_falabella" || tipo === "cmr";

  const onSubmit: SubmitHandler<CardDTO> = async (data) => {
    const payload = { ...data, tipo };

    const result = await saveCard(payload); // ajusta si saveCard espera otro shape
    if (result?.ok) {
      reset();
      if (onSaved) onSaved();
    } else {
      console.error("Error guardando tarjeta", result);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tarjeta-formulario space-y-4">
      <h3 className="text-lg font-medium">
        {tipo === "credito" && "Tarjeta de crédito"}
        {tipo === "debito" && "Tarjeta de débito"}
        {tipo === "debito_falabella" && "Débito Banco Falabella"}
        {tipo === "cmr" && "Tarjeta CMR"}
      </h3>

      <div>
        <InputComponents
          label="Número de tarjeta"
          typeElement="text"
          idElement="number"
          register={register("numero_enc")}
        />
        {errors.numero_enc && <p className="text-xs text-red-500 mt-1">{(errors.number as unknown)?.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputComponents
            label="Expiración"
            typeElement="text"
            idElement="expiration"
            register={register("expiration")}
          />
          {errors.expiration && <p className="text-xs text-red-500 mt-1">{(errors.expiration)?.message}</p>}
        </div>

        <div>
          <InputComponents
            label="Código de seguridad"
            typeElement="text"
            idElement="cvv"
            register={register("cvv_enc")}
          />
          {errors.cvv_enc && <p className="text-xs text-red-500 mt-1">{(errors.cvv_enc)?.message}</p>}
        </div>
      </div>

      {mostrarDocumento && (
        <div>
          <label className="block text-sm text-gray-600 mb-2">Tipo de documento (titular de la tarjeta)</label>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <InputComponents
                label="Tipo documento"
                typeElement="text"
                idElement="documentType"
                listValues={[
                  { value: "cc", label: "Cédula de Ciudadanía" },
                  { value: "ce", label: "Cédula de Extranjería" },
                  { value: "pass", label: "Pasaporte" },
                ]}
                register={register("documentType")}
              />
              {errors.documentType && <p className="text-xs text-red-500 mt-1">{(errors.documentType as unknown)?.message}</p>}
            </div>

            <div>
              <InputComponents
                label={tipo === "cmr" ? "CC dueño de la tarjeta" : "Número de documento"}
                typeElement="text"
                idElement="documentNumber"
                register={register("documentNumber")}
              />
              {errors.documentNumber && <p className="text-xs text-red-500 mt-1">{(errors.documentNumber as unknown)?.message}</p>}
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          className={`w-full py-3 rounded-full text-lg ${loading ? "bg-gray-300 text-gray-600" : "bg-gray-200 text-gray-700"}`}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Agregar"}
        </button>

        {mensaje && <p className="text-xs text-gray-500 mt-3">{mensaje}</p>}
        <p className="text-xs text-gray-500 mt-3">
          Validaremos tu tarjeta con un cobro único de $0 o $107 que será reembolsado.
        </p>
      </div>
    </form>
  );
}
