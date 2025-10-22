"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { empresaSchema } from "@/schemas/registroSeller";
import { useRegistroStore } from "@/hooks/useRegistroStore";
import { z } from "zod";
import { useEffect, useRef } from "react";
import FormAccordion from "@/components/molecules/FormAccordion";
import FormInput from "@/components/atoms/FormInput";
import StatusIndicator from "@/components/molecules/StatusIndicator";

type FormData = z.infer<typeof empresaSchema>;

export default function PasoEmpresa() {
  const { datos, actualizarDatos, marcarAcordeonCompleto } = useRegistroStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: datos.empresa,
    mode: "onChange"
  });

  // Usar ref para evitar re-renders infinitos
  const previousIsValid = useRef(isValid);
  const formData = watch();
  
  const onSubmit = (values: FormData) => {
    actualizarDatos("empresa", values);
    marcarAcordeonCompleto("empresa", true);
  };

  // Actualizar el estado de completado solo cuando cambia isValid
  useEffect(() => {
    if (previousIsValid.current !== isValid) {
      previousIsValid.current = isValid;
      marcarAcordeonCompleto("empresa", isValid);
      if (isValid) {
        actualizarDatos("empresa", formData);
      }
    }
  }, [isValid]);

  const esValido = isValid;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Información de la Empresa</h2>
        <p className="text-gray-600">Completa la información de tu empresa</p>
      </div>

      <FormAccordion
        title="Datos de la Empresa"
        description="Proporciona la información legal de tu empresa para poder operar en el Marketplace."
        stepNumber={2}
        isValid={esValido}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Razón Social"
              placeholder="Ej: Mi Empresa S.A.S"
              {...register("razonSocial")}
              error={errors.razonSocial?.message}
            />

            <FormInput
              label="NIT"
              placeholder="Ej: 900123456-7"
              {...register("nit")}
              error={errors.nit?.message}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guardar información
            </button>
          </div>
        </form>
      </FormAccordion>

      <StatusIndicator 
        isValid={esValido}
        validMessage="La información de la empresa está completa. Puedes finalizar el registro."
        invalidMessage="Completa toda la información requerida para continuar."
      />
    </div>
  );
}
