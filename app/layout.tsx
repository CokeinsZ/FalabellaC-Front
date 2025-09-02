import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Falabella-Clon",
  description: "Clon exacto de la tienda Falabella hecho para la Universidad Autónoma de Manizales con fines educativos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
