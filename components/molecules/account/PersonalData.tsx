"use client";

import { useUserFromToken } from "@/hooks/UseUserToken";

export default function UsuarioInfo() {
  const { user } = useUserFromToken();

  if (!user) return <p>Cargando usuario...</p>;

  const nombre = user.user_metadata?.nombre || "Sin nombre";
  const apellidos = user.user_metadata?.apellidos || "Sin apellidos";

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold text-lg">Tus datos</h2>
      <p>Nombre: {nombre}</p>
      <p>Apellidos: {apellidos}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
