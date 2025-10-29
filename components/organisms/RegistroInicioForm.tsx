"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tipoPersonaSchema } from "@/schemas/registroSeller";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Image from "next/image";

type FormData = z.infer<typeof tipoPersonaSchema>;

interface RegistroInicioFormProps {
  onSubmit: (values: FormData) => void;
  defaultValues?: Partial<FormData>;
}

export default function RegistroInicioForm({ onSubmit, defaultValues }: RegistroInicioFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(tipoPersonaSchema),
    defaultValues,
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h3 className="text-2xl font-medium text-[#2b3b45] text-center mb-6">
        ¿Dónde vas a vender?
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* País */}
        <div>
          <label className="text-sm font-medium text-gray-700">País</label>
          <div className="mt-3 border-b border-gray-200 pb-3 flex items-center gap-3">
            <Image
              src="https://flagcdn.com/w20/co.png"
              alt="Colombia"
              className="w-6 h-4 rounded-sm"
              width={20}
              height={14}
            />
            <span className="text-gray-700">Colombia</span>
          </div>
        </div>

        {/* Tipo de persona */}
        <div>
          <label className="text-sm font-medium text-gray-700">Tipo de persona</label>
          <div className="mt-3 relative">
            <select
              {...register("tipoPersona")}
              className="appearance-none w-full border-0 border-b border-gray-200 focus:border-gray-400 outline-none py-3 bg-transparent"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="natural">Persona Natural</option>
              <option value="juridica">Persona Jurídica</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#4b5563"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {errors.tipoPersona && (
            <p className="text-red-500 text-sm mt-1">{errors.tipoPersona.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#444d57] text-white px-10 py-3 rounded-full text-lg font-semibold shadow hover:scale-105 transition-transform"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}
