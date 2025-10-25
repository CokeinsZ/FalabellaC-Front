"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UserMetadata {
  nombre?: string;
  apellidos?: string;
  email?: string;
  isSeller?: boolean;
}

interface UserToken {
  sub: string;
  email: string;
  user_metadata?: UserMetadata;
  [key: string]: any; // para los demás campos
}

export function useUserFromToken() {
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    try {
      const cookieString = document.cookie;
      const token = cookieString
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        console.warn("No se encontró el token en las cookies");
        return;
      }

      const decoded = jwtDecode<UserToken>(token);
      console.log("Usuario decodificado:", decoded);
      setUser(decoded);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }, []);

  return { user };
}



