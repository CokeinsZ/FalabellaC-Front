import { z } from "zod";

export const cardScheme = z.object({
  nombre_titular: z.string(),
  numero_enc: z.string().max(16),
  cvv_enc: z.string().max(3),
  expiracion: z.string().max(5),
  last4: z.string().max(4),
  usuario_id: z.string(),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
});