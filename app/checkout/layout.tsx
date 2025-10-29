import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CheckoutHeader from "@/components/organisms/CheckoutHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
        {/* Header */}
        <CheckoutHeader />

        {/* Main Content */}
        <main className="mx-auto max-w-6xl p-6">{children}</main>
    </>
  );
}