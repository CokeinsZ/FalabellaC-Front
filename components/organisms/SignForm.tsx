"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabaseClient";

import { SignDTO } from "@/interfaces/Sign";
import { signScheme } from "@/schemas/Sign";
import { RegistroToken } from "../atoms/Token";
import InputComponents from "../atoms/InputComponents";

export default function SignForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignDTO>({
    resolver: zodResolver(signScheme),
  });

  const [mensaje, setMensaje] = React.useState("");

  const onSubmit: SubmitHandler<SignDTO> = async ({
    email,
    password,
    nombre,
    apellidos,
  }) => {
    setMensaje("");

    const { error } = await supabase.auth.signUp({
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
      reset();
    }
  };

  return (
    <div className={RegistroToken.container}>
      <div className={RegistroToken.card}>
        <h2 className={RegistroToken.title}>
          Inicia sesión o regístrate para comprar
        </h2>
        <p className={RegistroToken.subtitle}>
          Ingresa tus datos personales y disfruta de una experiencia de compra
          más rápida.
        </p>

        <form className={RegistroToken.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <InputComponents
            label="Correo"
            typeElement="text"
            idElement="email"
            register={register("email")}
          />
          {errors.email && (
            <p className={RegistroToken.message}>{errors.email.message}</p>
          )}

          {/* Nombre */}
          <InputComponents
            label="Nombre"
            typeElement="text"
            idElement="nombre"
            register={register("nombre")}
          />
          {errors.nombre && (
            <p className={RegistroToken.message}>{errors.nombre.message}</p>
          )}

          {/* Apellidos */}
          <InputComponents
            label="Apellidos"
            typeElement="text"
            idElement="apellidos"
            register={register("apellidos")}
          />
          {errors.apellidos && (
            <p className={RegistroToken.message}>{errors.apellidos.message}</p>
          )}

          {/* Password */}
          <InputComponents
            label="Contraseña"
            typeElement="password"
            idElement="password"
            register={register("password")}
          />
          {errors.password && (
            <p className={RegistroToken.message}>{errors.password.message}</p>
          )}

          <button
            type="submit"
            className={RegistroToken.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Regístrate"}
          </button>
        </form>

        {mensaje && <p className={RegistroToken.message}>{mensaje}</p>}

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
