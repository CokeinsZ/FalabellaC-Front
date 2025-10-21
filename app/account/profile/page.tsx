import { cookies } from "next/headers";
import jwt from     "jsonwebtoken";
import { redirect } from "next/navigation";


interface UserToken {
  id: string;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phone?: string;
  email: string;
}

export default async function ProfilePage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  const decoded = token ? jwt.decode(token) : null;

  if (!token) {
    redirect("/login"); 
  }

  let user: UserToken | null = null;

  try {
    user = jwt.decode(token) as UserToken | null;
  } catch (error) {
    console.error("Error al decodificar token:", error);
    redirect("/login");
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-6">Hola, {user.name}</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Menú lateral */}
          <aside className="space-y-3 border-r pr-6">
            <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-black">
              🧍 Datos personales
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-black">
              📍 Direcciones
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-black">
              💳 Medios de pago
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-black">
              💰 Datos para reembolso
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-black">
              ⚙️ Configurar mi cuenta
            </button>
            <button className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium">
              ⏻ Cerrar sesión
            </button>
          </aside>

          {/* Datos personales */}
          <section className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Datos personales</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre y apellidos</p>
                <p className="font-medium text-gray-800">
                  {user.name} {user.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Tipo de documento</p>
                <p className="font-medium text-gray-800">
                  {user.documentType} {user.documentNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Celular</p>
                <p className="font-medium text-gray-800">
                  {user.phone ?? "Sin información"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Correo</p>
                <p className="font-medium text-gray-800">
                  {user.email ?? "Sin información"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
