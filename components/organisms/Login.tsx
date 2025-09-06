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
      setMensaje("❌ Error: " + error.message);
      return;
    }

    if (authData.session?.access_token) {
      Cookies.set("token", authData.session.access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    }

    setMensaje("✅ Iniciado sesión exitosamente.");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

        <h2 className="text-xl font-semibold mb-4">
          Inicia sesión para comprar
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <InputComponents
              label="Correo electrónico"
              typeElement="text"
              idElement="user"
              register={register("user")}
            />
            {errors.user && (
              <p className="text-red-500 text-sm">{errors.user.message}</p>
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#343e49] text-white py-2 rounded-md"
          >
            Ingresar
          </button>
        </form>

        {mensaje && (
          <p className="text-sm text-center mt-4 text-gray-700">{mensaje}</p>
        )}

        <p className="text-sm text-center mt-4">
          ¿Aún no tienes cuenta?{" "}
          <a href="/SignUp" className="text-blue-600 underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
