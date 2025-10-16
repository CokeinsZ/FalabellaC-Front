"use client";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
    Icon: LucideIcon;
    text: string;
}

export default function FeatureIcon({ Icon, text }: FeatureIconProps) {
    return (
        <div className="flex flex-col items-center text-center w-40">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 mb-2">
            <Icon size={28} />
        </div>
        <p className="text-sm text-gray-700">{text}</p>
        </div>
    );
}
