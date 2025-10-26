import { z } from "zod";

export const cardScheme = z.object({
  id: z.string(),
  nombre_titular: z.string(),
  numero_enc: z.string(),
  cvv_enc: z.string(),
  expiracion_month: z.string(),
  expiracion_year: z.string(),
  last4: z.string(),
  usuario_id: z.string(),
});