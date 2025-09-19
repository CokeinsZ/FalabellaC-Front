import ProductDetail from "@/components/molecules/ProductDetails";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  return <ProductDetail id={id} />;
}
