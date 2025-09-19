import Image from "next/image";
import { ProductCardToken } from "../../utils/Token";

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
      className={ProductCardToken.container}
    >
      {/* Imagen */}
      
      <div className={ProductCardToken.imageWrapper}>
        <Image src={img} alt={name} fill className={ProductCardToken.image} sizes="auto" />
      </div>

      {/* Marca */}
      {brand && <h3 className={ProductCardToken.brand}>{brand}</h3>}

      {/* Nombre */}
      <p className={ProductCardToken.name}>{name}</p>

      {/* Precios */}
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

      {/* Descuento */}
      {discount && (
        <span className={ProductCardToken.discount}>
          {discount}
        </span>
      )}

      {/* Rating */}
      {rating && (
        <div className={ProductCardToken.ratingWrapper}>
          <span className={ProductCardToken.star}>★</span>
          <span className={ProductCardToken.rating}>{rating}</span>
        </div>
      )}
    </div>
  );
}
