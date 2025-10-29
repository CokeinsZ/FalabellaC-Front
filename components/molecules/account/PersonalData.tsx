"use client";

import { useUserFromToken } from "@/hooks/UseUserToken";

export default function UsuarioInfo() {
  const { user } = useUserFromToken();

  if (!user) return <p className="p-6">Cargando usuario...</p>;

  const nombre = user.user_metadata?.nombre || "Sin nombre";
  const apellidos = user.user_metadata?.apellidos || "Sin apellidos";
  const tipoDocumento = "CC";
  const numeroDocumento = "Sin número";
  const celular = "Sin celular";

  return (
    <div className="w-full">
      {/* Título fuera del recuadro blanco */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#63615e' }}>Datos personales</h2>
      
      {/* Recuadro blanco con los datos */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-1">
          {/* Nombre y apellidos */}
          <div className="flex justify-between items-center py-4 px-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-base mb-1" style={{ color: '#828282' }}>Nombre y apellidos</p>
              <p className="text-base" style={{ color: '#c6c6c6' }}>{nombre} {apellidos}</p>
            </div>
            <button className="underline text-sm font-medium" style={{ color: '#777777' }}>
              Editar
            </button>
          </div>

          {/* Tipo de documento */}
          <div className="flex justify-between items-center py-4 px-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-base mb-1" style={{ color: '#828282' }}>Tipo de documento</p>
              <p className="text-base" style={{ color: '#c6c6c6' }}>{tipoDocumento} {numeroDocumento}</p>
            </div>
            <button className="underline text-sm font-medium" style={{ color: '#777777' }}>
              Editar
            </button>
          </div>

          {/* Celular */}
          <div className="flex justify-between items-center py-4 px-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-base mb-1" style={{ color: '#828282' }}>Celular</p>
              <p className="text-base" style={{ color: '#c6c6c6' }}>{celular}</p>
            </div>
            <button className="underline text-sm font-medium" style={{ color: '#777777' }}>
              Editar
            </button>
          </div>

          {/* Correo */}
          <div className="flex justify-between items-center py-4 px-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-base mb-1" style={{ color: '#828282' }}>Correo</p>
              <p className="text-base" style={{ color: '#c6c6c6' }}>{user.email}</p>
            </div>
            <button className="underline text-sm font-medium" style={{ color: '#777777' }}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}