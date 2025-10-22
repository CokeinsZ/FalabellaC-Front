"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { declaracionesSchema } from "@/schemas/registroSeller";
import { useRegistroStore } from "@/hooks/useRegistroStore";
import { z } from "zod";

type FormData = z.infer<typeof declaracionesSchema>;

export default function PasoDeclaraciones() {
  const { datos, actualizarDatos, reset, setPaso } = useRegistroStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(declaracionesSchema),
    defaultValues: datos.declaraciones,
  });

  const onSubmit = (values: FormData) => {
    actualizarDatos("declaraciones", values);
    alert("✅ Registro completado con éxito (datos guardados en localStorage)");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("aceptaTerminos")} />
        <label className="text-sm">
          Acepto los términos y condiciones para vender en Falabella.
        </label>
      </div>
      {errors.aceptaTerminos && (
        <p className="text-red-500 text-sm">{errors.aceptaTerminos.message}</p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setPaso(3)}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
        >
          Atrás
        </button>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Finalizar
        </button>
      </div>
    </form>
  );
}
