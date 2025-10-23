// components/PasoPersonas.jsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personasSchema } from "@/schemas/registroSeller";
import { useRegistroStore } from "@/hooks/useRegistroStore";
import { z } from "zod";
import { useEffect, useRef } from "react";
import FormAccordion from "@/components/molecules/FormAccordion";
import FormInput from "@/components/atoms/FormInput";
import FormSelect from "@/components/atoms/FormSelect";
import StatusIndicator from "@/components/molecules/StatusIndicator";

type FormData = z.infer<typeof personasSchema>;

export default function PasoPersonas() {
  const { datos, actualizarDatos, marcarAcordeonCompleto, acordeonesCompletos } = useRegistroStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(personasSchema),
    defaultValues: datos.personas,
    mode: "onChange"
  });

  // Usar ref para evitar re-renders infinitos
  const previousIsValid = useRef(isValid);
  const formData = watch();
  
  const onSubmit = (values: FormData) => {
    actualizarDatos("personas", values);
    marcarAcordeonCompleto("personas", true);
  };

  // Actualizar el estado de completado solo cuando cambia isValid
  useEffect(() => {
    if (previousIsValid.current !== isValid) {
      previousIsValid.current = isValid;
      marcarAcordeonCompleto("personas", isValid);
      if (isValid) {
        actualizarDatos("personas", formData);
      }
    }
  }, [isValid]);

  const esValido = isValid;

  const tipoDocumentoOptions = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "CE", label: "Cédula de Extranjería" },
    { value: "PASAPORTE", label: "Pasaporte" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Información de Personas</h2>
        <p className="text-gray-600">Completa la información de las personas responsables</p>
      </div>

      <FormAccordion
        title="Responsable de la empresa"
        description="Es la persona dueña del NIT y será el contacto principal de la cuenta en Falabella Seller Center."
        stepNumber={1}
        isValid={esValido}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nombre"
              placeholder="Ej: Juan"
              {...register("nombre")}
              error={errors.nombre?.message}
            />

            <FormInput
              label="Apellido"
              placeholder="Ej: Olivares"
              {...register("apellido")}
              error={errors.apellido?.message}
            />

            <FormSelect
              label="Tipo de documento"
              options={tipoDocumentoOptions}
              {...register("tipoDocumento")}
              error={errors.tipoDocumento?.message}
            />

            <FormInput
              label="Número de documento"
              placeholder="Ej: 123456789012"
              {...register("numeroDocumento")}
              error={errors.numeroDocumento?.message}
            />

            <FormInput
              label="Correo electrónico"
              type="email"
              placeholder="Ej: juan.olivares@email.com"
              {...register("correo")}
              error={errors.correo?.message}
            />

            <FormInput
              label="Número de teléfono"
              type="tel"
              placeholder="Ej: +57 300 123 4567"
              {...register("telefono")}
              error={errors.telefono?.message}
            />
          </div>
        </form>
      </FormAccordion>

      <StatusIndicator 
        isValid={esValido}
        validMessage="La información de personas está completa. Puedes continuar al siguiente paso."
        invalidMessage="Completa toda la información requerida para continuar."
      />
    </div>
  );
}