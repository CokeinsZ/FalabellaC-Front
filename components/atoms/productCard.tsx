import Image from "next/image";
import { ProductCardToken } from "../../utils/Token";
import Link from "next/link";

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
    <div className={ProductCardToken.container}>
      <div className={`${ProductCardToken.imageWrapper} relative w-full aspect-square`}>
        <Link href={`/products/${id}`} className="absolute inset-0 z-10">
          <span className="sr-only">Ver producto {name}</span>
        </Link>

        {typeof img === "string" && img !== "" ? (
          <Image
            src={img}
            alt={name || "Producto sin nombre"}
            fill
            className={ProductCardToken.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded-lg flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      {brand && <h3 className={ProductCardToken.brand}>{brand}</h3>}
      <p className={ProductCardToken.name}>{name}</p>

      <div className={ProductCardToken.pricesWrapper}>
        <span className={ProductCardToken.price}>
          ${price.toLocaleString("es-CO")}
        </span>
        {oldPrice && (
          <span className={ProductCardToken.oldPrice}>
            ${oldPrice.toLocaleString("es-CO")}
          </span>
        )}
      </div>

      {discount && <span className={ProductCardToken.discount}>{discount}</span>}

      {rating && (
        <div className={ProductCardToken.ratingWrapper}>
          <span className={ProductCardToken.star}>★</span>
          <span className={ProductCardToken.rating}>{rating}</span>
        </div>
      )}
    </div>
  );
}

