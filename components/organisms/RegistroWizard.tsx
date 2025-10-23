// components/RegistroWizard.jsx
"use client";
import { useRegistroStore } from "@/hooks/useRegistroStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasoPersonas from "./PasoPersonas";
import PasoEmpresa from "./PasoEmpresa";
import StepProgress from "@/components/molecules/StepProgress";
import { registrarVendedor, type RegistroVendedorData } from "@/lib/vendedorService";

const pasos = [
  { id: "personas", nombre: "Personas", componente: <PasoPersonas /> },
  { id: "empresa", nombre: "Empresa", componente: <PasoEmpresa /> },
];

export default function RegistroWizard() {
  const { pasoActual, puedeContinuar, setPaso, datos, reset } = useRegistroStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSiguiente = () => {
    if (pasoActual < pasos.length && puedeContinuar()) {
      setPaso(pasoActual + 1);
    }
  };

  const handleAnterior = () => {
    if (pasoActual > 1) {
      setPaso(pasoActual - 1);
    }
  };

  const handleFinalizar = async () => {
    if (!puedeContinuar()) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Preparar datos para enviar
      const registroData: RegistroVendedorData = {
        tipoPersona: datos.tipoPersona?.tipoPersona || "natural",
        personas: {
          nombre: datos.personas?.nombre || "",
          apellido: datos.personas?.apellido || "",
          tipoDocumento: datos.personas?.tipoDocumento || "",
          numeroDocumento: datos.personas?.numeroDocumento || "",
          correo: datos.personas?.correo || "",
          telefono: datos.personas?.telefono || "",
        },
        empresa: {
          razonSocial: datos.empresa?.razonSocial || "",
          nit: datos.empresa?.nit || "",
        },
      };

      console.log("Enviando registro de vendedor:", registroData);

      // Llamar al servicio
      const response = await registrarVendedor(registroData);

      if (response.success) {
        // Registro exitoso
        console.log("Registro exitoso:", response);
        
        // Resetear el formulario
        reset();
        
        // Redirigir a página de éxito con datos
        const params = new URLSearchParams({
          isNewUser: response.data?.isNewUser ? "true" : "false",
          email: registroData.personas.correo,
        });
        
        // Solo agregar password si es nuevo usuario y existe
        if (response.data?.isNewUser && response.data?.passwordTemporal) {
          params.append("password", response.data.passwordTemporal);
        }
        
        router.push(`/registro-seller/success?${params.toString()}`);
      } else {
        // Error en el registro
        console.error("Error en registro:", response.error);
        setError(response.error || "Error al registrar vendedor");
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setError("Error inesperado al procesar el registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pasoActualData = pasos[pasoActual - 1];

  return (
    <div className="min-h-screen bg-[#fafafa] py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#16323b] mb-3">
            ¡Millones de personas te están esperando!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Regístrate y comienza a vender en nuestro Marketplace
          </p>
          
          {/* Indicadores de pasos */}
          <StepProgress 
            steps={pasos} 
            currentStep={pasoActual}
            completedSteps={[]}
          />
        </div>

        {/* Solo muestra el componente del paso actual */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {pasoActualData.componente}
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleAnterior}
            disabled={pasoActual === 1 || isSubmitting}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Atrás
          </button>
          
          {pasoActual < pasos.length ? (
            <button
              type="button"
              onClick={handleSiguiente}
              disabled={!puedeContinuar() || isSubmitting}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalizar}
              disabled={!puedeContinuar() || isSubmitting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                "Finalizar Registro"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}