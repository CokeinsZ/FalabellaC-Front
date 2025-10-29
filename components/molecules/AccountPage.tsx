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

export default function PerfilPage() {
  const pathname = usePathname();

  const topTabs = [
    { name: "Mis compras", icon: <ShoppingBag size={18} />, href: "/account/orders" },
    { name: "Mi perfil", icon: <User size={18} />, href: "/account" },
    { name: "Ayuda", icon: <CircleHelp size={18} />, href: "/account/help" },
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

  return (
    <div className="min-h-screen col-span-2">
      <div className="max-w-6xl mx-auto p-6">
        {/* Encabezado y barra superior */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">Hola, daniel</h1>

          <div className="flex bg-white rounded-xl shadow divide-x divide-gray-100 overflow-hidden w-fit">
            {topTabs.map((tab) => {
              const active = pathname === tab.href || (tab.href === "/account" && pathname === "/account");
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition ${
                    active
                      ? "text-lime-600 border-b-2 border-lime-500 bg-lime-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex gap-6 ">
          {/* Panel lateral */}
          <aside className="w-72 bg-white rounded-2xl shadow p-4">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm hover:bg-gray-50 transition ${
                    pathname === item.href
                      ? "border-lime-500 bg-lime-50 text-lime-600 font-medium"
                      : "border-transparent text-gray-700"
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
          </aside>

        </div>
      </div>
    </div>
  );
}
