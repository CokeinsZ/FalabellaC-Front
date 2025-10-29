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
import { useUserCard } from "@/hooks/useUserCard";


export default function Header() {

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
   const [activeCategory, setActiveCategory] = useState<string | null>(null);
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


   const productos = useCart((state) => state.productos);
   const totalItems = productos.reduce((acc, p) => acc + p.cantidad, 0);
   const {name} = useUserCard();

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
      {/* Barra superior con logos */}
      <div className={HeaderToken.topBar}>
        <a
          href="https://www.falabella.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ml-0 justify-center h-9 w-[133px] px-6 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors border-b-2 border-b-[#aad500]"
        >
          <Image
            src= "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
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
            src = "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg"
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
            src= "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blta5a44443cc0e501c/63b6ff659233961262fbd64c/logo-linio.svg"
            alt="Linio"
            width={60}
            height={18}
            className="!max-w-[45px] !h-auto object-contain"
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
            width={188}
            height={40}
            className="m-6"
            />
          </Link>
          
        </div>        

        {/* Acciones */}
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
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={HeaderToken.loginButton}
            >
              Hola,<br />
              <span className="text-[20px] font-semibold text-[#1a1a1a]">
                {!name ? "Inicia sesión" : name
                }
              </span>
            </button>

            {/* Dropdown hover */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 -m-13 mt-2 w-60 h-52 bg-white rounded-md shadow-lg z-50 p-3 text-[#1a1a1a]">
                <ul className="flex flex-col gap-2">
                  <li className="m-2 mt-1 text-[#495867] hover:text-[#1a1a1a] cursor-pointer"
                            onClick={() => {
                      setIsDropdownOpen(false);     // cierra el dropdown
                      setIsLoginModalOpen(true);    // abre el modal real
                  }}>Inicia sesión</li>
                  <li className="m-2 mt-1 text-[#495867] hover:text-[#1a1a1a] cursor-pointer">Regístrate</li>
                  <li className="m-2 mt-0 text-[#495867] hover:text-[#1a1a1a] cursor-pointer">Mi cuenta</li>
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

      {/* Menú lateral */}
{isSideMenuOpen && (
  <>
    {/* Fondo oscuro */}
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-40"
      onClick={() => setIsSideMenuOpen(false)}
    />

    {/* Panel lateral */}
    <div className="fixed top-0 left-0 h-full w-75 bg-white z-50 shadow-lg overflow-y-auto transition-transform duration-300 ease-out">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold text-[#495867]">¡Hola!</h2>
        <button
          onClick={() => setIsSideMenuOpen(false)}
          className="text-gray-600 hover:text-black"
        >
          ✕
        </button>
      </div>

      <ul className="p-4 space-y-2 text-[#1a1a1a] font-medium relative">
        {categories.map((cat) => (
          <li
            key={cat}
            onMouseEnter={() => setActiveCategory(cat)}
            onMouseLeave={() => setActiveCategory(null)}
            className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer transition-all
              ${activeCategory === cat ? "bg-[#f5fbe5] border-l-4 border-l-[#aad500] text-[#6f8500]" : "hover:bg-gray-50"}
            `}
          >
            {cat} <span>›</span>
          </li>
        ))}
      </ul>

    </div>
  </>
)}

    {/* Panel derecho dinámico */}
    {activeCategory && (
      <div className="absolute top-0 left-[320px] w-[903px] -ml-5 mt-15 h-full bg-white shadow-lg border-l border-gray-200 z-50">
        <div className="p-4 bg-[#d6ec9f] text-[#1a1a1a] font-bold flex items-center gap-2">
          <span className="text-[#6f8500] text-xl">🍀</span>
          {activeCategory}
        </div>
        <div className="p-6 text-gray-700">
          <p className="text-sm">Contenido de {activeCategory}...</p>
          <div className="mt-4 space-y-2">
            <p>- Subcategoría 1</p>
            <p>- Subcategoría 2</p>
            <p>- Subcategoría 3</p>
          </div>
        </div>
      </div>
    )}
      <LocationBar {...location} />
      <PromoBar />

        {isLoginModalOpen && (
          <Login isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        )}
    </header>
    {/* Fondo oscuro solo para el hover */}
    {isDropdownOpen && (
      <div
        className="fixed inset-0 z-40 pointer-events-none" // no bloquea el header
      >
        {/* capa visible y clicable fuera del header */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40 pointer-events-auto"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", top: '150px' }} // ajusta según la altura total de tu header
          onClick={() => setIsDropdownOpen(false)}
        />
      </div>
)}
    </>
  );
}