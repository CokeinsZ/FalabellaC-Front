import type { Metadata } from "next";
import Header from "@/components/organisms/header";

import FooterData from "@/components/organisms/FooterData";
import PerfilPage from "@/components/molecules/AccountPage";

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
      <aside className="w-full md:w-1/4 border-r border-gray-200 p-4">
        <PerfilPage />
      </aside>
      <main className="">{children}</main>
      <FooterData />
    </>
  );
}
