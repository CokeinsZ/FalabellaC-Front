import { z } from "zod";

export const tipoPersonaSchema = z.object({
  tipoPersona: z.enum(["natural", "juridica"], {
    message: "Debes seleccionar un tipo de persona",
  }),
});

export const personasSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  tipoDocumento: z.string().min(1, "El tipo de documento es requerido"),
  numeroDocumento: z.string().min(1, "El número de documento es requerido"),
  correo: z.string().email("Correo electrónico inválido").min(1, "El correo es requerido"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 dígitos").regex(/^[0-9+\s()-]+$/, "El teléfono solo puede contener números y símbolos como +, -, (), espacios"),
});

export const empresaSchema = z.object({
  razonSocial: z.string().min(2, "Campo requerido"),
  nit: z.string().min(5, "NIT inválido"),
});

export const direccionSchema = z.object({
  ciudad: z.string().min(2, "Campo requerido"),
  direccion: z.string().min(2, "Campo requerido"),
});

export const declaracionesSchema = z.object({
  aceptaTerminos: z.boolean().refine((v) => v === true, "Debes aceptar los términos"),
});
