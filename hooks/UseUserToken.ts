// hooks/useUserFromToken.ts
"use client";

import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth"; // o el contexto donde guardas el token

export function useUserFromToken() {
  const { token } = useAuth(); // asegúrate de que tu auth context exponga el token

  const user = useMemo(() => {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return {
        id: payload.sub,
        name: payload.name || "Sin nombre",
        lastName: payload.lastName || "",
        documentType: payload.documentType || "No definido",
        documentNumber: payload.documentNumber || "",
        phone: payload.phone || "Sin información",
        email: payload.email || "Sin información",
      };
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  }, [token]);

  return { user };
}
