import { z } from "zod";

export const directionScheme = z.object({
    departamento: z.string(),
    ciudad: z.string(),
    barrio: z.string(),
    direccion: z.string(),
    adicional: z.string(),
});