"use client";
import Image from "next/image";

interface PromoCardProps {
  image: string;
  title: string;
  description: string;
}

export default function PromoCard({ image, title, description }: PromoCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
        <div className="w-60 h-60 overflow-hidden rounded-2xl shadow-md bg-white">
            <Image
            src={image}
            alt={title}
            width={240}
            height={240}
            className="object-cover w-full h-full"
        />
    </div>
    <h3 className="mt-3 text-lg font-medium text-gray-800">{title}</h3>
    {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
    )}
    </div>
  );
}
