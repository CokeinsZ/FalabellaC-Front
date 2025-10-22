"use client";
import { useRegistroStore } from "@/hooks/useRegistroStore";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { tipoPersonaSchema } from "@/schemas/registroSeller";
import InfoSidebar from "@/components/molecules/InfoSidebar";
import NoticeBox from "@/components/molecules/NoticeBox";
import RegistroInicioForm from "@/components/organisms/RegistroInicioForm";

type FormData = z.infer<typeof tipoPersonaSchema>;

export default function PasoInicio() {
  const { datos, actualizarDatos, setPaso } = useRegistroStore();
  const router = useRouter();

  const onSubmit = (values: FormData) => {
    actualizarDatos("tipoPersona", values);
    setPaso(1); // Reiniciar al paso 1
    router.push("/registro-seller/form");
  };

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 px-6 lg:px-10">
        {/* Lado izquierdo */}
        <div className="lg:col-span-4">
          <InfoSidebar />
        </div>

        {/* Lado derecho */}
        <div className="lg:col-span-8 space-y-8">
          <header>
            <h1 className="text-3xl font-extrabold text-[#1a2d34]">
              ¡Millones de personas te están esperando!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Regístrate y comienza a vender en nuestro Marketplace
            </p>
          </header>

          <NoticeBox />

          <RegistroInicioForm 
            onSubmit={onSubmit}
            defaultValues={{
              tipoPersona: datos.tipoPersona?.tipoPersona as "natural" | "juridica" | undefined,
            }}
          />
        </div>
      </div>
    </section>
  );
}
