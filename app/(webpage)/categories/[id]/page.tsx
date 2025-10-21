"use client";
import {CategoryProducts} from "@/components/molecules/CategoryProducts";
import { useParams } from "next/navigation";
import { use } from "react";

export default function CategoryPage() {
  const { id } = useParams();
  return <CategoryProducts categoryId={id as string} />;
}

