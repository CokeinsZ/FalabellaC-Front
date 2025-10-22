import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/organisms/header";

export const metadata: Metadata = {
  title: "Vendedores - Falabella-Clon",
  description: "Clon de la tienda Falabella hecho para la Universidad Autónoma de Manizales con fines educativos.",
};

export default function webpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Header */}
      <header className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 text-sm text-gray-700">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabella logo"
            width={150}
            height={30}
            priority
          />
        </div>

        {/* Texto de ayuda */}
        <div className="flex items-center space-x-2">
          <p>
            ¿Necesitas ayuda para comprar?{" "}
            <span className="hidden sm:inline">Llámanos al</span>
          </p>
          <span className="font-semibold text-gray-900">
            +57 601 587 8002
          </span>
        </div>
      </div>
    </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </>
  );
}
