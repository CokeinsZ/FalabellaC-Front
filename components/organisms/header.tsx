"use client";
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Heart, Menu } from "lucide-react";
import Image from "next/image";
import LocationBar from "../molecules/LocationBar";
import Login from "./Login";
import { HeaderToken } from "../../utils/Token";
import PromoBar from "../atoms/PromoBar";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import SearchSuggestions from "../molecules/SearchSuggestions";
import { useUserCard } from "@/hooks/useUserCard";

// 🧠 Nuevos hooks
import { useUserFromToken } from "@/hooks/UseUserToken";
import { useSeller } from "@/hooks/useSeller";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { user } = useUserFromToken(); // obtiene usuario desde el token
  const { seller, loading, errorMsg } = useSeller(user?.sub); // obtiene info del vendedor según el usuario

  // 🌀 Esto forza actualización de seller cuando cambia user
  useEffect(() => {
    if (user?.sub) {
      console.log("🟢 Usuario autenticado:", user.sub);
    }
    if (seller) {
      console.log("🏪 Vendedor cargado:", seller);
    }
  }, [user, seller]);

  const productos = useCart((state) => state.productos);
  const totalItems = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const { name } = useUserCard();

  const categories = [
    "Hot Sale",
    "Moda mujer",
    "Moda hombre",
    "Moda niños y bebés",
    "Tecnología",
    "Celulares y accesorios",
    "Electrohogar",
    "Tenis y zapatos",
    "Belleza y salud",
    "Accesorios de moda",
    "Niños y juguetes",
    "Muebles y organización",
    "Dormitorio",
    "Bebé",
    "Cocina y menaje",
  ];

  const location = {
    iconSrc:
      "https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt12bfc7a09b55ab55/6538d0cfd31953c6b30dbd57/gray_geofinder.svg",
    text: "Ingresa tu ubicación",
    rightLinks: [
      { label: "Vende en falabella.com", href: "/Vende-en-Falabella" },
      { label: "Tarjetas y cuentas", href: "#" },
      { label: "Novios", href: "#" },
      { label: "Ayuda", href: "#" },
    ],
  };

  return (
    <>
      <header className={HeaderToken.container}>
        {/* --- BARRA SUPERIOR --- */}
        <div className={HeaderToken.topBar}>
          <a
            href="https://www.falabella.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center ml-0 justify-center h-9 w-[133px] px-6 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors border-b-2 border-b-[#aad500]"
          >
            <Image
              src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
              alt="Falabella"
              width={100}
              height={20}
              className="!max-w-[95px] !h-auto object-contain"
            />
          </a>

          <a
            href="https://www.homecenter.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-9 w-[133px] px-6 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <Image
              src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg"
              alt="Homecenter"
              width={110}
              height={18}
              className="!max-w-[110px] !h-auto object-contain"
            />
          </a>

          <a
            href="https://www.linio.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-9 w-[133px] px-6 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <Image
              src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blta5a44443cc0e501c/63b6ff659233961262fbd64c/logo-linio.svg"
              alt="Linio"
              width={60}
              height={18}
              className="!max-w-[45px] !h-auto object-contain"
            />
          </a>
        </div>

        {/* --- BARRA PRINCIPAL --- */}
        <div className={HeaderToken.mainBar}>
          <div className={HeaderToken.logoWrapper}>
            <Link href="/home">
              <Image
                src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
                alt="Falabella"
                width={188}
                height={40}
                className="m-6"
              />
            </Link>
          </div>

          {/* --- ACCIONES --- */}
          <div className={HeaderToken.actionsWrapper}>
            <div className={HeaderToken.menuWrapper}>
              <button
                aria-label="Abrir menú"
                className={HeaderToken.menuButton}
                type="button"
                onClick={() => setIsSideMenuOpen(true)}
              >
                <Menu size={30} />
                <span className="mb-1 hidden md:inline">Menú</span>
              </button>

              <SearchSuggestions />

              {/* --- LOGIN Y DROPDOWN --- */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className={HeaderToken.loginButton}>
                  Hola,<br />
                  <span className="text-[20px] font-semibold text-[#1a1a1a]">
                    {!name ? "Inicia sesión" : name}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 -m-13 mt-2 w-60 h-52 bg-white rounded-md shadow-lg z-50 p-3 text-[#1a1a1a]">
                    <ul className="flex flex-col gap-2">
                      <li
                        className="m-2 mt-1 text-[#495867] hover:text-[#1a1a1a] cursor-pointer"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsLoginModalOpen(true);
                        }}
                      >
                        Inicia sesión
                      </li>
                      <li className="m-2 mt-1">
                        <Link
                          href="/SignUp"
                          className="text-[#495867] hover:text-[#1a1a1a] cursor-pointer block"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Regístrate
                        </Link>
                      </li>
                      <li className="m-2 mt-0">
                        <Link
                          href="/account"
                          className="text-[#495867] hover:text-[#1a1a1a] cursor-pointer block"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Mi cuenta
                        </Link>
                      </li>
                      <hr />
                      <li className="flex items-center gap-2 text-[#495867] hover:text-[#1a1a1a] mt-4 m-4 cursor-pointer">
                        <Image
                          src="https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt12bfc7a09b55ab55/6538d0cfd31953c6b30dbd57/gray_geofinder.svg"
                          alt="CMR Puntos"
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                        CMR Puntos
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <button className={HeaderToken.purchasesButton}>Mis compras</button>
              <Heart />
              <div className={HeaderToken.cartWrapper}>
                <Link href="/cart" className={HeaderToken.cartWrapper}>
                  <ShoppingCart />
                  <span className={HeaderToken.cartBadge}>{totalItems}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- BARRAS INFERIORES --- */}
        <LocationBar {...location} />
        <PromoBar />
        {isLoginModalOpen && (
          <Login
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      </header>

      {/* Fondo oscuro del dropdown */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 pointer-events-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", top: "150px" }}
            onClick={() => setIsDropdownOpen(false)}
          />
        </div>
      )}
    </>
  );
}
