import { z } from "zod";

export const loginScheme = z.object({
  user: z.string()
         .email({ message: "Error en mail no sirve" })
         .min(5, { message: "Se requiere mínimo 5 caracteres" }),
  password: z.string()
         .min(5, { message: "Se requiere mínimo 5 caracteres" })
});


