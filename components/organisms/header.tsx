"use client";
import React , {useState} from "react";
import { Search, ShoppingCart, Heart, Menu } from "lucide-react";
import Image from "next/image";
import LocationBar from "../molecules/LocationBar";
import Login from "./Login";
import { HeaderToken } from "../../utils/Token";
import PromoBar from "../atoms/PromoBar";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import SearchSuggestions from "../molecules/SearchSuggestions";


export default function Header() {

   const [isLoginOpen, setIsLoginOpen] = useState(false);

   const productos = useCart((state) => state.productos);
   const totalItems = productos.reduce((acc, p) => acc + p.cantidad, 0);

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
    <header className={HeaderToken.container}>
      {/* Barra superior con logos */}
      <div className={HeaderToken.topBar}>
        <a
          href="https://www.falabella.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src= "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabella"
            width={100}
            height={10}
          />
        </a>

        <a
          href="https://www.homecenter.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src = "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg"
            alt="Homecenter"
            width={100}
            height={10}
          />
        </a>

        <a
          href="https://www.linio.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src= "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blta5a44443cc0e501c/63b6ff659233961262fbd64c/logo-linio.svg"
            alt="Linio"
            width={100}
            height={10}
          />
        </a>
      </div>

      {/* Barra principal */}
      <div className={HeaderToken.mainBar}>
        {/* Logo Falabella principal */}
        <div className={HeaderToken.logoWrapper}>
          <Link href="/home">
            <Image
            src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabellla"
            width={120}
            height={40}
            />
          </Link>
          
        </div>

        {/* Menú y buscador */}
        <SearchSuggestions />

        {/* Acciones */}
          <div className={HeaderToken.actionsWrapper}>
          <button
            className={HeaderToken.loginButton}
            onClick={() => setIsLoginOpen(true)}
          >
            Hola, Inicia sesión
          </button>
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

      <LocationBar {...location} />
      <PromoBar />

        {isLoginOpen && (
        <Login  isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}

    </header>
  );
}