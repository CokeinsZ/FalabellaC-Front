"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CardDTO } from "@/interfaces/card";
import { useCardForm } from "@/hooks/useCardForm";
import InputComponents from "./InputComponents";
import { useUserCard } from "@/hooks/useUserCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardScheme } from "@/schemas/card";

type Props = {
  tipo: string;
  onSaved?: () => void;
};

export default function CardForm({ tipo, onSaved }: Props) {
  const { mensaje, loading, saveCard } = useCardForm();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardDTO>({
    resolver: zodResolver(cardScheme),
  });
  const numero_enc = watch("numero_enc");

  const mostrarDocumento = tipo === "debito_falabella" || tipo === "cmr";
  const { getLast4, usuario_id, nombre_titular } = useUserCard<CardDTO>({ setValue });

  React.useEffect(() => {
    if(!numero_enc){
      setValue("last4", "");
      return;
    }
    const last4 = getLast4(numero_enc);
    if(last4){
      setValue("last4", last4, {shouldValidate: true, shouldDirty: true});
    }
  },[numero_enc, setValue, getLast4]);

  const onSubmit: SubmitHandler<CardDTO> = async (data) => {
    console.log("🚀 onSubmit SE EJECUTÓ");
    console.log("Datos completos (antes):", data);

    const last4 = getLast4(data.numero_enc);
    console.log("last4 calculado:", last4);

    const payload = {
      ...data,
      last4,
      usuario_id,      
      nombre_titular,
    };

    console.log("payload a enviar:", payload);
    const result = await saveCard(payload);
    console.log("result saveCard:", result);

    if (result?.ok) {
      reset();
      if (onSaved) onSaved();
    } else {
      console.error("Error guardando tarjeta", result);
    }
  };

  const onError = (errs: unknown) => {
    console.log("❌ ERRORES DE VALIDACIÓN:", errs);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="tarjeta-formulario space-y-4">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputComponents
            label="Expiración"
            typeElement="text"
            idElement="expiration"
            register={register("expiracion")}
          />
        </div>

        <div>
          <InputComponents
            label="Código de seguridad"
            typeElement="text"
            idElement="cvv"
            register={register("cvv_enc")}
          />
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
            </div>

            <div>
              <InputComponents
                label={tipo === "cmr" ? "CC dueño de la tarjeta" : "Número de documento"}
                typeElement="text"
                idElement="documentNumber"
                register={register("documentNumber")}
              />
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

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Errores de validación:</p>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </div>
        )}

        {mensaje && <p className="text-xs text-gray-500 mt-3">{mensaje}</p>}
        <p className="text-xs text-gray-500 mt-3">
          Validaremos tu tarjeta con un cobro único de $0 o $107 que será reembolsado.
        </p>
      </div>
    </form>
  );
}
