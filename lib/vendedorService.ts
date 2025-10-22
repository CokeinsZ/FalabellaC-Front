// Servicio para interactuar con la Edge Function de registro de vendedores
import { supabase } from "./supabaseClient";

export interface RegistroVendedorData {
  tipoPersona: "natural" | "juridica";
  personas: {
    nombre: string;
    apellido: string;
    tipoDocumento: string;
    numeroDocumento: string;
    correo: string;
    telefono: string;
  };
  empresa: {
    razonSocial: string;
    nit: string;
  };
}

export interface RegistroVendedorResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    vendedorId: string;
    isNewUser: boolean;
    passwordTemporal?: string; // Solo si es nuevo usuario
  };
  error?: string;
}

/**
 * Registra un nuevo vendedor usando la Edge Function de Supabase
 * @param data Datos del vendedor a registrar
 * @returns Respuesta con el resultado del registro
 */
export async function registrarVendedor(
  data: RegistroVendedorData
): Promise<RegistroVendedorResponse> {
  try {
    // Llamar a la Edge Function
    const { data: response, error } = await supabase.functions.invoke<RegistroVendedorResponse>(
      "register-seller",
      {
        body: data,
      }
    );

    if (error) {
      console.error("Error al llamar Edge Function:", error);
      return {
        success: false,
        message: "Error al comunicarse con el servidor",
        error: error.message || "Error al comunicarse con el servidor",
      };
    }

    if (!response) {
      return {
        success: false,
        message: "Sin respuesta del servidor",
        error: "No se recibió respuesta del servidor",
      };
    }

    return response;
  } catch (error) {
    console.error("Error inesperado al registrar vendedor:", error);
    return {
      success: false,
      message: "Error inesperado",
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

/**
 * Verifica si un vendedor existe por correo
 * @param correo Correo del vendedor
 * @returns True si existe, false si no
 */
export async function verificarVendedorExistente(correo: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("vendedores")
      .select("id")
      .eq("correo", correo)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 es "no rows returned"
      console.error("Error al verificar vendedor:", error);
    }

    return !!data;
  } catch (error) {
    console.error("Error al verificar vendedor:", error);
    return false;
  }
}

/**
 * Obtiene los datos de un vendedor por user_id
 * @param userId ID del usuario
 * @returns Datos del vendedor o null
 */
export async function obtenerVendedorPorUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("vendedores")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error al obtener vendedor:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error al obtener vendedor:", error);
    return null;
  }
}
