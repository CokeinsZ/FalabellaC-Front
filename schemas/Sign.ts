import { z } from "zod";

export const signScheme = z.object({
  email: z
    .string()
    .email({ message: "Correo inválido" })
    .min(5, { message: "Se requiere mínimo 5 caracteres" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  nombre: z
    .string()
    .min(2, { message: "Ingresa mínimo 2 caracteres" })
    .max(50, { message: "Máximo 50 caracteres" }),
  apellidos: z
    .string()
    .min(2, { message: "Ingresa mínimo 2 caracteres" })
    .max(80, { message: "Máximo 80 caracteres" }),
});
