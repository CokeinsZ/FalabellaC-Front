"use client";

import { FC } from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

interface FooterSection {
    title: string;
    links: { label: string; href: string }[];
    }

    interface FooterProps {
    sections: FooterSection[];
    }

    const Footer: FC<FooterProps> = ({ sections }) => {
    return (
        <footer className="bg-[#102A43] text-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map((section) => (
            <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                    <li key={link.label}>
                    <Link
                        href={link.href}
                        className="hover:underline hover:text-gray-300"
                    >
                        {link.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
            <div className="flex gap-4">
                <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
                <Link href="#">Términos y condiciones</Link>
                <Link href="#">Política de cookies</Link>
                <Link href="#">Política de privacidad</Link>
            </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500 pb-4">
            © TODOS LOS DERECHOS RESERVADOS <br />
            Falabella.com S.A.S. NIT 900.499.362-8. Calle 99 #14-49 Piso 9, Bogotá, Colombia
            </div>
        </div>
        </footer>
    );
};

export default Footer;
