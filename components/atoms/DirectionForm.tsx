"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponents from "../atoms/InputComponents";
import { directionScheme } from "@/schemas/direction";
import { DirectionDTO } from "@/interfaces/direction";
import { useDirectionForm } from "@/hooks/useDirectionForm";

type Props = {
  onSaved?: () => void;
};

export default function Direction({ onSaved }: Props) {
  const { mensaje, loading, saveDirection } = useDirectionForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DirectionDTO>({
    resolver: zodResolver(directionScheme),
  });

  const [selectedDept, setSelectedDept] = React.useState<string>("");
  const [ciudades, setCiudades] = React.useState<string[]>([]);

  React.useEffect(() => {
    const citiesByDepartment: Record<string, string[]> = {
      "Bogotá D.C.": ["Bogotá"],
      "Antioquia": ["Medellín", "Envigado", "Bello", "Itagüí"],
      "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"],
      "Cundinamarca": ["Soacha", "Fusagasugá", "Chía"],
      "Atlántico": ["Barranquilla", "Soledad"],
      "Bolívar": ["Cartagena"],
      "Santander": ["Bucaramanga", "Floridablanca"],
      "Nariño": ["Pasto"],
      "Norte de Santander": ["Cúcuta"],
      "Caldas": ["Manizales", "Villamaría"],
    };

    setCiudades(citiesByDepartment[selectedDept] || []);
  }, [selectedDept]);

  const onSubmit: SubmitHandler<DirectionDTO> = async (data) => {
    const result = await saveDirection(data);
    if (result.ok) {
      reset();
      if (onSaved) onSaved();
    }
  };

  const departamentos = [
    "Amazonas","Antioquia","Arauca","Atlántico","Bolívar","Boyacá","Caldas","Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba",
    "Cundinamarca","Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío",
    "Risaralda","San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada","Bogotá D.C.",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Departamento</label>
        <select
          id="departamento"
          className="w-full border rounded px-2 py-1"
          {...register("departamento")}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">-- Seleccione --</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.departamento && <p className="text-red-600 text-sm">{errors.departamento.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Ciudad</label>
        {ciudades.length > 0 ? (
          <select id="ciudad" className="w-full border rounded px-2 py-1" {...register("ciudad")}>
            <option value="">-- Seleccione --</option>
            {ciudades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : (
          <InputComponents label="Ingresa la Ciudad" typeElement="text" idElement="ciudad" register={register("ciudad")} />
        )}
        {errors.ciudad && <p className="text-red-600 text-sm">{errors.ciudad.message}</p>}
      </div>

      <InputComponents label="Barrio" typeElement="text" idElement="barrio" register={register("barrio")} />
      <InputComponents label="Dirección" typeElement="text" idElement="direccion" register={register("direccion")} />
      <InputComponents label="Complemento (opcional)" typeElement="text" idElement="adicional" register={register("adicional")} />

      <button type="submit" disabled={loading} className="w-full py-2 rounded bg-blue-600 text-white">
        {loading ? "Guardando..." : "Guardar dirección"}
      </button>

      {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
    </form>
  );
}
