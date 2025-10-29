import type { Metadata } from "next";
import Header from "@/components/organisms/header";
import FooterData from "@/components/organisms/FooterData";
import AccountSidebar from "@/components/molecules/AccountSidebar";
import AccountGreeting from "@/components/molecules/AccountGreeting";

export const metadata: Metadata = {
  title: "Falabella-Clon",
  description: "Clon exacto de la tienda Falabella hecho para la Universidad Autónoma de Manizales con fines educativos.",
};

export default function webpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      
      {/* Contenedor para el saludo con ancho limitado */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-8">
        <AccountGreeting />
      </div>
      
      {/* Fondo gris que ocupa el 100% del ancho */}
      <div className="w-full bg-gray-100 py-6 mt-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AccountSidebar />
            </div>
            <main className="col-span-9 bg-white rounded-lg shadow-sm p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
      
      <FooterData />
    </>
  );
}