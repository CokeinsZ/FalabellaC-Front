import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalle Producoto",
  description: "Detalle del producto seleccionado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
