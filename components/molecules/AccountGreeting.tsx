// components/molecules/AccountGreeting.tsx
"use client";

import { useUserCard } from "@/hooks/useUserCard";

export default function AccountGreeting() {
  const { name } = useUserCard();

  return (
    <h1 className="text-2xl font-bold text-gray-900">Hola, {name}</h1>
  );
}