"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  User,
  CreditCard,
  Lock,
  List,
  Monitor,
  LogOut,
  Landmark,
  ShoppingBag,
  CircleHelp,
} from "lucide-react";
import { useUserCard } from "@/hooks/useUserCard";

export default function AccountSidebar() {
  const pathname = usePathname();
  const { name } = useUserCard();

  const topTabs = [
    { 
      name: "Mis compras", 
      icon: <ShoppingBag size={20} />, 
      href: "/account/orders" 
    },
    { 
      name: "Mi perfil", 
      icon: <User size={20} />, 
      href: "/account" 
    },
    { 
      name: "Ayuda", 
      icon: <CircleHelp size={20} />, 
      href: "/account/help" 
    },
  ];

  const menuItems = [
    { name: "Datos personales", icon: <User size={18} />, href: "/account/personal-data" },
    { name: "Direcciones", icon: <MapPin size={18} />, href: "/account/address" },
    { name: "Medios de pago", icon: <CreditCard size={18} />, href: "/account/payment-methods" },
    { name: "Datos para reembolso", icon: <Landmark size={18} />, href: "/account/refund-info" },
    { name: "Mis listas", icon: <List size={18} />, href: "/account/lists" },
    { name: "Configurar mi cuenta", icon: <Lock size={18} />, href: "/account/settings" },
    { name: "Dispositivos vinculados", icon: <Monitor size={18} />, href: "/account/linked-devices" },
    { name: "Pagar mi CMR", icon: <CreditCard size={18} />, href: "/account/cmr" },
    { name: "Cerrar sesión", icon: <LogOut size={18} />, href: "/logout" },
  ];

  // Función para determinar si una pestaña superior está activa
  const isTopTabActive = (tabHref: string) => {
    if (tabHref === "/account") {
      return pathname === "/account" || 
             (pathname.startsWith("/account/") && 
              !pathname.startsWith("/account/orders") && 
              !pathname.startsWith("/account/help"));
    }
    return pathname === tabHref || pathname.startsWith(tabHref + "/");
  };

  return (
    <div>
      {/* NOTA: El saludo se movió al layout */}
      
      {/* Pestañas superiores - CON RECUADRO Y LÍNEAS DE SEPARACIÓN */}
      <div className="flex bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
        {topTabs.map((tab, index) => {
          const active = isTopTabActive(tab.href);
          return (
            <div key={tab.name} className="flex-1 relative">
              {index > 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
              )}
              <Link
                href={tab.href}
                className={`
                  flex flex-col items-center py-3 transition-colors relative
                  ${active 
                    ? "text-gray-600" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <div className="mb-1">
                  {tab.icon}
                </div>
                <span className="text-xs font-medium">{tab.name}</span>
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#aad500]"></div>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Menú lateral - SOLO LAS OPCIONES EN UN RECUADRO */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <nav className="divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 text-sm transition-colors ${
                pathname === item.href
                  ? "text-[#aad500] font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === menuItems.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              <span className="text-gray-400">{">"}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}