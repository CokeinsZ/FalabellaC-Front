import Image from "next/image";

export interface ProductCardDTO {
  id: number | string;
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating?: number;
  img: string;
}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  oldPrice,
  discount,
  rating,
  img,
}: ProductCardDTO) {
  return (
    <div
      key={id}
      className="border rounded-2xl p-4 flex flex-col items-center bg-white hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      {/* Imagen */}
      
      <div className="w-36 h-36 relative mb-3">
        <Image src={img} alt={name} fill className="object-contain" />
      </div>

      {/* Marca */}
      {brand && <h3 className="text-xs text-gray-500">{brand}</h3>}

      {/* Nombre */}
      <p className="text-sm font-medium text-center line-clamp-2">{name}</p>

      {/* Precios */}
      <div className="mt-2 text-center">
        <span className="text-red-600 font-bold block">
          ${price.toLocaleString("es-CO")}
        </span>
        {oldPrice && (
          <span className="text-gray-400 line-through text-xs">
            ${oldPrice.toLocaleString("es-CO")}
          </span>
        )}
      </div>

      {/* Descuento */}
      {discount && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded mt-1">
          {discount}
        </span>
      )}

      {/* Rating */}
      {rating && (
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-xs ml-1">{rating}</span>
        </div>
      )}
    </div>
  );
}
