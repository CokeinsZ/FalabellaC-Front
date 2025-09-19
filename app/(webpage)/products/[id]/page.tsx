import ProductDetail from "@/components/molecules/ProductDetails";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <ProductDetail id={params.id} />;
}
