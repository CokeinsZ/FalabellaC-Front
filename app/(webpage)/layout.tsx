import type { Metadata } from "next";
import Header from "@/components/organisms/header";

import FooterData from "@/components/organisms/FooterData";

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
      <div>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>
        <FooterData />
      </div>
    </>
  );
}
