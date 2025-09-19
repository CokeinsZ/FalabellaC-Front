"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegistroFalabella() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, apellidos },
      },
    });

    if (error) {
      setMensaje("❌ Error: " + error.message);
    } else {
      setMensaje("✅ Registro exitoso. Revisa tu correo para confirmar.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-3xl grid md:grid-cols-2 gap-10">
        {/* Formulario */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Inicia sesión o regístrate para comprar
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Ingresa tus datos personales y disfruta de una experiencia de compra
            más rápida.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Correo</label>
              <input
                type="email"
                placeholder="Ingresa un correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Nombre</label>
              <input
                type="text"
                placeholder="Ingresa un nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Apellidos</label>
              <input
                type="text"
                placeholder="Ingresa apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700"
            >
              Regístrate
            </button>
          </form>

          {mensaje && (
            <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
          )}
        </div>

        {/* Beneficios */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">Beneficios falabella.com</h3>
            <ul className="text-sm text-gray-600 space-y-2 mt-3">
              <li>📦 Recibir notificaciones en tiempo real de tus pedidos.</li>
              <li>🧾 Revisar tus boletas online.</li>
              <li>⭐ Guardar medios de pago y direcciones favoritas.</li>
              <li>
                🎁 Ser parte de{" "}
                <span className="font-semibold">CMR Puntos</span>, el mejor
                programa de beneficios.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Beneficios CMR Puntos</h3>
            <ul className="text-sm text-gray-600 space-y-2 mt-3">
              <li>🎫 Canje de productos, experiencias, viajes y Gift Cards.</li>
              <li>💸 Promociones especiales, cupones de descuento y más.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

