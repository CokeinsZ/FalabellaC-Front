import { z } from "zod";


function expiryIsValid(expiryRaw: string) {
  const raw = expiryRaw.trim();
  const m = raw.match(/^(\d{2})[\/\-]?(?:\d{2}|\d{4})$/);
  if (!m) return false;
  const mm = parseInt(m[1], 10);
  if (mm < 1 || mm > 12) return false;

  const yearPart = raw.replace(/^(\d{2})[\/\-]?/, "");
  const year = yearPart.length === 2 ? 2000 + parseInt(yearPart, 10) : parseInt(yearPart, 10);

  const expDate = new Date(year, mm, 0, 23, 59, 59, 999);
  const now = new Date();
  return expDate >= now;
}

export const cardScheme = z.object({
  nombre_titular: z.string().min(2, "Nombre del titular requerido"),


  numero_enc: z
    .string()
    .transform((s) => s.replace(/\s|-/g, ""))
    .refine((s) => /^\d{13,19}$/.test(s), { message: "El número debe tener entre 13 y 19 dígitos" }),

  cvv_enc: z
    .string()
    .trim()
    .refine((s) => /^\d{3,4}$/.test(s), { message: "CVV debe tener 3 o 4 dígitos" }),


  expiracion: z
    .string()
    .trim()
    .refine((s) => /^(\d{2})[\/\-]?(?:\d{2}|\d{4})$/.test(s), {
      message: "Formato expiración inválido — usa MM/YY o MM/YYYY",
    })
    .refine((s) => expiryIsValid(s), { message: "La tarjeta está vencida" }),

  last4: z
    .string()
    .trim()
    .refine((s) => /^\d{4}$/.test(s), { message: "last4 debe ser 4 dígitos" }),

  usuario_id: z.string().uuid({ message: "usuario_id debe ser UUID" }),

  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
});
