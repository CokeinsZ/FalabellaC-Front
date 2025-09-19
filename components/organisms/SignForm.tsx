"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RegistroToken } from "../atoms/Token";

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
    <div className={RegistroToken.container}>
      <div className={RegistroToken.card}>
        {/* Formulario */}
        <div>
          <h2 className={RegistroToken.title}>
            Inicia sesión o regístrate para comprar
          </h2>
          <p className={RegistroToken.subtitle}>
            Ingresa tus datos personales y disfruta de una experiencia de compra
            más rápida.
          </p>

          <form className={RegistroToken.form} onSubmit={handleSubmit}>
            <div>
              <label className={RegistroToken.label}>Correo</label>
              <input
                type="email"
                placeholder="Ingresa un correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={RegistroToken.input}
                required
              />
            </div>

            <div>
              <label className={RegistroToken.label}>Nombre</label>
              <input
                type="text"
                placeholder="Ingresa un nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={RegistroToken.input}
              />
            </div>

            <div>
              <label className={RegistroToken.label}>Apellidos</label>
              <input
                type="text"
                placeholder="Ingresa apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className={RegistroToken.input}
              />
            </div>

            <div>
              <label className={RegistroToken.label}>Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={RegistroToken.input}
                required
              />
            </div>

            <button
              type="submit"
              className={RegistroToken.button}
            >
              Regístrate
            </button>
          </form>

          {mensaje && (
            <p className={RegistroToken.message}>{mensaje}</p>
          )}
        </div>

        {/* Beneficios */}
        <div className={RegistroToken.benefitsWrapper}>
          <div>
            <h3 className={RegistroToken.benefitsTitle}>Beneficios falabella.com</h3>
            <ul className={RegistroToken.benefitsList}>
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
            <h3 className={RegistroToken.benefitsTitle}>Beneficios CMR Puntos</h3>
            <ul className={RegistroToken.benefitsList}>
              <li>🎫 Canje de productos, experiencias, viajes y Gift Cards.</li>
              <li>💸 Promociones especiales, cupones de descuento y más.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

