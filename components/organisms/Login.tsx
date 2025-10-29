"use client";

import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

import InputComponents from "../atoms/InputComponents";
import { loginScheme } from "@/schemas/login";
import { LoginDTO } from "@/interfaces/login";
import { LoginToken } from "../../utils/Token";

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

  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <button onClick={onClose} className={LoginToken.closeButton}>
          ✕
        </button>

        {/* Logo */}
        <div className={LoginToken.logo}>
          <Image
            src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabella"
            width={120}
            height={30}
          />
        </div>

        {/* Título */}
        <h2 className={LoginToken.title}>Inicia sesión para comprar</h2>

        {/* Formulario */}
        <form className={LoginToken.form} onSubmit={handleSubmit(onSubmit)}>
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
          <div className="relative">
            <InputComponents
              label="Contraseña"
              typeElement={showPassword ? "text" : "password"}
              idElement="password"
              register={register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-1 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className={LoginToken.inputError}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Recuperar contraseña */}
          <p className="text-[13px] text-gray-600 mt-2 leading-snug">
            ¿Olvidaste tu contraseña? No te preocupes, pide un código verificador
            por{" "}
            <a href="#" className="text-[#0071e3] hover:underline">
              correo
            </a>{" "}
            o{" "}
            <a href="#" className="text-[#0071e3] hover:underline">
              SMS
            </a>{" "}
            para cambiar tu contraseña.
          </p>

          {/* Botón submit */}
          <button type="submit" className={LoginToken.submit}>
            Ingresar
          </button>
        </form>

        {/* Mensaje */}
        {mensaje && <p className={LoginToken.message}>{mensaje}</p>}

        {/* Registro */}
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
