"use client";

import React from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import InputComponents from "../atoms/InputComponents";
import { loginScheme } from "@/schemas/login";
import { LoginDTO } from "@/interfaces/login";
import { LoginToken } from "../atoms/Token";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Login({ isOpen, onClose }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const [mensaje, setMensaje] = React.useState("");

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    const { user, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: user,
      password,
    });

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    if (authData.session?.access_token) {
      Cookies.set("token", authData.session.access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    }

    setMensaje("Iniciado sesión exitosamente.");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onClose();
  };

  return (
    <div className={LoginToken.overlay}>
      <div className={LoginToken.container}>
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className={LoginToken.closeButton}
        >
          ✕
        </button>

        <a
          href="https://www.falabella.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabella"
            width={100}
            height={24}
          />
        </a>

        <h2 className={LoginToken.title}>
          Inicia sesión para comprar
        </h2>

        <form className={LoginToken.title} onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <InputComponents
              label="Correo electrónico"
              typeElement="text"
              idElement="user"
              register={register("user")}
            />
            {errors.user && (
              <p className={LoginToken.inputError}>{errors.user.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <InputComponents
              label="Contraseña"
              typeElement="password"
              idElement="password"
              register={register("password")}
            />
            {errors.password && (
              <p className={LoginToken.inputError}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={LoginToken.submit}
          >
            Ingresar
          </button>
        </form>

        {mensaje && (
          <p className={LoginToken.message}>{mensaje}</p>
        )}

        <p className={LoginToken.registerWrapper}>
          ¿Aún no tienes cuenta?{" "}
          <a href="/SignUp" className={LoginToken.registerLink}>
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
