"use client";

import Link from "next/link";
import React from "react";

const columns = [
  {
    title: "Te ayudamos",
    links: [
      "Venta telefónica",
      "Centro de ayuda",
      "Devoluciones y cambios",
      "Información legal",
      "Facturas",
      "Estado de mi pedido",
      "Formulario de reclamos",
      "Canal de integridad",
      "Defensoría Vendedores y Proveedores",
      "Cómo cuidamos tus datos",
      "Peticiones, quejas y reclamos",
      "https://www.sic.gov.co/",
      "Propiedad industrial",
    ],
  },
  {
    title: "Sé parte de falabella.com",
    links: [
      "Vende en falabella.com",
      "Nuestros inversionistas",
      "Trabaja en grupo Falabella",
      "Venta Empresa",
      "Proveedores",
    ],
  },
  {
    title: "Únete a nuestros programas",
    links: ["CMR Puntos", "Novios Falabella", "Club Bebé", "Club Hogar", "Fashion Club"],
  },
  {
    title: "Nuestras empresas",
    links: ["falabella.com", "Falabella", "Linio", "Homecenter", "Banco Falabella", "Seguros Falabella"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full text-gray-200">
      {/* Top big area */}
      <div className="bg-[#1f3744] px-6 md:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold mb-4">{col.title}</h3>
              <ul className="text-xs space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" aria-label={l} className="hover:underline">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0f2a36]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: social icons + small note */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3 items-center">
              {/* Facebook (SVG inline) */}
              <a aria-label="Facebook" href="#" className="p-2 rounded-full bg-[#19323f] hover:opacity-90">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.09 5.66 21.19 10.44 22v-7.02H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.78-3.88 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.19 22 17.09 22 12.07z" fill="white"/>
                </svg>
              </a>
              {/* Instagram (SVG inline) */}
              <a aria-label="Instagram" href="#" className="p-2 rounded-full bg-[#19323f] hover:opacity-90">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.4-3.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" fill="white"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Center: legal links */}
          <div className="flex gap-8 text-xs text-gray-300">
            <Link href="#" className="hover:underline">Términos y condiciones</Link>
            <Link href="#" className="hover:underline">Política de cookies</Link>
            <Link href="#" className="hover:underline">Política de privacidad</Link>
          </div>

          {/* Right: copyright */}
          <div className="text-xs text-gray-400">
            © TODOS LOS DERECHOS RESERVADOS <br className="md:hidden" />
            Falabella.com S.A.S. NIT 900.499.362-8. Calle 99 #14-49 Piso 9, Bogotá, Colombia
          </div>
        </div>

        {/* thin divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
          <hr className="border-t border-[#203e4a] opacity-60" />
        </div>
      </div>
    </footer>
  );
}
