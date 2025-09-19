"use client";

import Image from "next/image";
import { useProductDetail } from "@/hooks/useProductDetail";
import { ProductDetailToken } from "../atoms/Token";

interface Props {
  id: string;
}

export default function ProductDetail({ id }: Props) {
  const { producto, imagenes, loading, errorMsg } = useProductDetail(id);

  if (loading) return <p>Cargando producto...</p>;
  if (errorMsg) return <p className="text-red-500">Error: {errorMsg}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div className={ProductDetailToken.container}>
      {/* 📸 Galería */}
      <div>
        {imagenes.length > 0 ? (
          <div>
            <Image
              src={imagenes[0].url}
              alt={producto.nombre}
              width={600}
              height={400}
              className={ProductDetailToken.mainImage}
            />
            <div className="flex gap-3 mt-4">
              {imagenes.map((img, i) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={`Vista ${i}`}
                  width={100}
                  height={80}
                  className={ProductDetailToken.thumbnailImg}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No hay imágenes disponibles</p>
        )}
      </div>

      {/* 📄 Detalles */}
      <div>
        <h1 className={ProductDetailToken.title}>{producto.nombre}</h1>
        <p className={ProductDetailToken.sku}>SKU: {producto.sku}</p>

        {/* ⭐ Mock rating */}
        <div className={ProductDetailToken.rating}>
          <span className={ProductDetailToken.stars}>★★★★☆</span>
          <span className={ProductDetailToken.ratingText}>4.3 (4)</span>
        </div>

        {/* 💲 Precio */}
        <div className={ProductDetailToken.priceContainer}>
          <p className={ProductDetailToken.price}>
            ${producto.precio.toLocaleString()}
          </p>
        </div>

        {/* 📋 Especificaciones */}
        <div className={ProductDetailToken.specsContainer}>
          <h2 className={ProductDetailToken.specsTitle}>Especificaciones principales</h2>
          <ul className={ProductDetailToken.specsList}>
            <li>Tipo: Portátil</li>
            <li>Material: Plástico, Tela</li>
          </ul>
        </div>

        {/* 🛒 Botón */}
        <button className={ProductDetailToken.button}>
          Agregar al Carro
        </button>
      </div>
    </div>
  );
}
