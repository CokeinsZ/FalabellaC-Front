"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CheckIcon from "@/components/atoms/CheckIcon";

export default function RegistroExitosoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const isNewUser = searchParams.get("isNewUser") === "true";
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    // Opcional: Redirigir después de unos segundos
    const timer = setTimeout(() => {
      // router.push("/login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icono de éxito */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            ¡Registro Exitoso!
          </h1>

          {/* Mensaje */}
          <p className="text-lg text-gray-600 mb-6">
            {isNewUser 
              ? "Tu cuenta de vendedor ha sido creada exitosamente."
              : "Tu solicitud para convertirte en vendedor ha sido vinculada a tu cuenta existente."}
          </p>

          {/* Credenciales - Solo si es nuevo usuario */}
          {isNewUser && password && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 text-left">
              <h2 className="font-bold text-green-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                </svg>
                Tus Credenciales de Acceso
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-green-800 block mb-1">
                    Usuario (Correo):
                  </label>
                  <div className="bg-white rounded-lg px-4 py-2 border border-green-200">
                    <code className="text-sm text-gray-900">{email}</code>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-green-800 block mb-1">
                    Contraseña Temporal:
                  </label>
                  <div className="bg-white rounded-lg px-4 py-2 border border-green-200 flex items-center justify-between">
                    <code className="text-sm text-gray-900 font-mono">
                      {passwordVisible ? password : "••••••••••••••••"}
                    </code>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="text-green-600 hover:text-green-700 p-1"
                        title={passwordVisible ? "Ocultar" : "Mostrar"}
                      >
                        {passwordVisible ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={handleCopyPassword}
                        className="text-green-600 hover:text-green-700 p-1"
                        title="Copiar"
                      >
                        {copied ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-green-800 bg-green-100 rounded-lg p-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p>
                  <strong>Importante:</strong> Guarda esta contraseña en un lugar seguro. 
                  Te recomendamos cambiarla la primera vez que inicies sesión.
                </p>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-blue-900 mb-3">
              {isNewUser ? "Próximos pasos:" : "Información:"}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Inicia sesión con tus credenciales</li>
              <li>Cambia tu contraseña temporal por una segura</li>
              <li>Completa tu perfil de vendedor</li>
              <li>¡Comienza a vender!</li>
            </ol>
          </div>

          {/* Información de contacto */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>¿Tienes preguntas?</strong><br />
              Contáctanos en: <a href="mailto:vendedores@falabella.com" className="underline">vendedores@falabella.com</a>
            </p>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/home")}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Ir al Inicio
            </button>
            
            <button
              onClick={() => router.push("/account")}
              className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Ir a Mi Cuenta
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-500">
            {isNewUser 
              ? "Tu cuenta ha sido creada. Recuerda cambiar tu contraseña al iniciar sesión."
              : "El proceso de aprobación puede tomar entre 2 a 5 días hábiles."}
          </p>
        </div>
      </div>
    </div>
  );
}
