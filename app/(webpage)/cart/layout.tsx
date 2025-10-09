import type { Metadata } from "next";
import AuthGate from "../../../components/atoms/AuthGate";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Carrito de compras",
};

export default function WebpageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <AuthGate>{children}</AuthGate>;
}