"use client";
import ProductCard from "@/components/atoms/productCard";


export function SellerProductsGrid({ productos }: { productos: any[] }) {
  
  

  return (
    <div className="p-6">
      
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.nombre}
              brand={p.marca}
              price={p.precio}
              img={p.img || "/placeholder.png"}
            />
          ))}
        </div>
      )
    </div>
  );
}