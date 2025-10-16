"use client";
import PromoCard from "@/components/atoms/PromoCard";
import FeatureIcon from "@/components/atoms/FeatureIcon";
import { Truck, ShoppingBag, MapPin, RotateCcw, Package } from "lucide-react";

export default function BotSection() {
    const promos = [
        {
        image: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltce17c346a081b8d1/65e8af8d6f950c61798c6f67/Ecosistema01-CMR-dk-LMS.jpg?auto=webp&disable=upscale&quality=70&width=1280/images/cmr1.png",
        title: "Abre tu CMR",
        description: "¡Solicita tu CMR 100% online y te devolvemos $45.000!",
        },
        {
        image: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt67139e7668315f28/67ee9d927166281f950f4f03/Ecosistema02-OU-dk-LMS.webp?auto=webp&disable=upscale&quality=70&width=1280",
        title: "Oportunidades Únicas",
        description: "Cientos de descuentos exclusivos.",
        },
        {
        image: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt811c0eab43a4d252/67ee9d92f41b9c0bc9a87846/Ecosistema03-Puntos-dk-LMS.webp?auto=webp&disable=upscale&quality=70&width=1280",
        title: "Acumula CMR Puntos",
        description: "Inscríbete gratis y acumula puntos.",
        },
        {
        image: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt6b1356e86c2a2e28/67ee9d92d199ef4da6a367f6/Ecosistema04-Cat-dk-LMS.webp?auto=webp&disable=upscale&quality=70&width=1280/images/cmr4.png",
        title: "¡Compra ya!",
        description: "Miles de productos nuevos con hasta 50% de descuento.",
        },
    ];

    const features = [
        {
        Icon: Truck,
        text: "Envíos gratis en miles de productos a partir de $149.000",
        },
        { Icon: ShoppingBag, text: "Comienza a vender en falabella.com" },
        { Icon: MapPin, text: "Compra y recoge en tienda" },
        { Icon: RotateCcw, text: "Gestiona tus cambios y devoluciones" },
        { Icon: Package, text: "Sigue tus compras y pedidos" },
    ];

    return (
        <div className="flex flex-col items-center gap-10 py-10">
        {/* Promociones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {promos.map((promo, idx) => (
            <PromoCard key={idx} {...promo} />
            ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
            {features.map((feature, idx) => (
            <FeatureIcon key={idx} {...feature} />
            ))}
        </div>
        </div>
    );
    }
