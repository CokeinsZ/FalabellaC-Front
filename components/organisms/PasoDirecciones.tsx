"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { direccionSchema } from "@/schemas/registroSeller";
import { useRegistroStore } from "@/hooks/useRegistroStore";
import { z } from "zod";

type FormData = z.infer<typeof direccionSchema>;

export default function PasoDirecciones() {
  const { datos, actualizarDatos, setPaso } = useRegistroStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(direccionSchema),
    defaultValues: datos.direcciones,
  });

  const onSubmit = (values: FormData) => {
    actualizarDatos("direcciones", values);
    setPaso(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium">Ciudad</label>
        <input {...register("ciudad")} className="w-full border rounded p-2" />
        {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Dirección</label>
        <input {...register("direccion")} className="w-full border rounded p-2" />
        {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion.message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setPaso(2)}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
        >
          Atrás
        </button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Siguiente
        </button>
      </div>
    </form>
  );
}
