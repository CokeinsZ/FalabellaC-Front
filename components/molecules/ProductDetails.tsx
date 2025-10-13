"use client";
import Image from "next/image";
import Link from "next/link";
import { useProductDetail } from "@/hooks/useProductDetail";
import { ProductDetailToken } from "../../utils/Token";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import Table from "../atoms/Table";
import InfoComponent from "../atoms/InfoComponent";
import InfoImages from "../atoms/InfoImages";

interface Props {
  id: string;
}

export default function ProductDetail({ id }: Props) {
  const { producto, imagenes = [], loading, errorMsg, comentarios, categoriaPath } = useProductDetail(id);
  const addProducto = useCart((s) => s.addProducto);
  const [cantidad, setCantidad] = useState(1);
  const [selected, setSelected] = useState(0);

  if (loading) return <p className="p-6">Cargando producto...</p>;
  if (errorMsg) return <p className="text-red-500 p-6">Error: {errorMsg}</p>;
  if (!producto) return <p className="p-6">No se encontró el producto.</p>;

  // Parsear datos JSON
  const informacionAdicional = producto.informacion_adicional 
    ? (typeof producto.informacion_adicional === 'string' 
        ? JSON.parse(producto.informacion_adicional) as Record<string, Record<string, unknown>>
        : producto.informacion_adicional as Record<string, Record<string, unknown>>)
    : null;

  // Generar estrellas según la calificación
  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "⯨"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div>
    <div className={ProductDetailToken.container}>
      {/* Navegacion - Categorias */}
      <nav className={ProductDetailToken.nav_categories}>
        <Link href="/home" className={ProductDetailToken.category}>Home</Link>
        <span className={ProductDetailToken.category}>›</span>
        {categoriaPath.map((cat, i) => (
          <span key={cat.id}>
            <Link href="#" className={ProductDetailToken.category}>
              {cat.nombre}
            </Link>
            {i < categoriaPath.length - 1 && <span className={ProductDetailToken.category}>›</span>}
          </span>
        ))}
        
      </nav>

      {/* Columnas Principales */}
      <div className="grid grid-cols-12 gap-16 items-start">
        {/* 📸 Galería - Izquierda */}
        <div className="col-span-4">
          <div className="bg-white rounded shadow p-4">
            {/* Imagen Principal */}
            <div className="relative w-full h-[520px] flex items-center justify-center">
              <Image
                src={imagenes[ selected ]?.url}
                alt={producto.nombre}
                fill={false}
                width={640}
                height={520}
                className={ProductDetailToken.mainImage}
                priority
              />
            </div>

            {/* Imagenes secundarias */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {imagenes.length > 0 ? (
                imagenes.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`${ProductDetailToken.thumbnailImg} ${selected === i ? 'ring-2 ring-indigo-500' : 'border-gray-200'}`}
                  >
                    <Image src={img.url} alt={`thumb-${i}`} width={20} height={20} className={ProductDetailToken.thumbnailImg} />
                  </button>
                ))
              ) : (
                <div className="text-gray-500">No hay imágenes</div>
              )}
            </div>

            {/* Info de envíos y devoluciones */}
            <div className={ProductDetailToken.refunds}>
              <div>
                <div className="font-medium">Devolver es fácil y gratis</div>
                <Link className="text-xs" href="#">Conoce nuestras garantías y derechos.</Link>
              </div>
            </div>
          </div>
        </div>

        {/* 📄 Detalles - Derecha (aquí se divide internamente) */}
        <div className="col-span-8">
          {/* Título + códigos */}
          <div className="flex justify-between items-start pr-6">
            <h1 className="text-2xl font-semibold">{producto.nombre}</h1>
            <div className="text-sm text-gray-500 text-right">
              <div>Código: {producto.id ?? '—'}</div>
              <div>Cód. tienda: {producto.proveedor_codigo ?? '—'}</div>
            </div>
          </div>

          {/* Ratings */}
          <div className={ProductDetailToken.rating}>
            <div className={ProductDetailToken.stars}>{generateStars(producto.calificacion)}</div>
            <span className="text-sm text-gray-700">{producto.calificacion}</span>
            <Link href="#" className={ProductDetailToken.ratingText}>{comentarios.length || 1} opiniones</Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            {/* Vendedor, especificaciones, etc. */}
            <div>
              <div className="text-sm text-gray-600">Vendido por <strong>{producto.proveedor}</strong></div>

              <div className="mt-4 bg-gray-50 p-4 rounded border">
                <h2 className="font-medium">Especificaciones principales</h2>
                <ul className="mt-2 text-sm space-y-1">
                  {producto.especificaciones_principales ? (
                    Object.entries(producto.especificaciones_principales).map(([k, v]) => (
                      <li key={k} className="flex gap-2"><span className="font-semibold">{k}:</span><span>{String(v)}</span></li>
                    ))
                  ) : (
                    <li>No hay especificaciones principales</li>
                  )}
                </ul>
                <Link href="#" className="mt-3 inline-block text-sm text-indigo-600 underline">Ver más especificaciones</Link>
              </div>
            </div>

            {/* Precio, carrito y promo */}
            <div>
              <div className="sticky top-6 bg-white p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-semibold text-gray-800">${producto.precio?.toLocaleString() ?? '0'}</div>
                  <button aria-label="Favorito" className="p-2 rounded-full border text-gray-500 hover:bg-red-50">♥</button>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded w-max">Llega mañana</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded w-max">Retira desde 90 min</span>
                </div>

                {/* Cantidad */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => setCantidad((p) => Math.max(1, p - 1))}
                    aria-label="Restar"
                    className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-900 hover:text-white transition"
                  >
                    −
                  </button>
                  <div className="px-4">{cantidad}</div>
                  <button
                    onClick={() => setCantidad((p) => p + 1)}
                    aria-label="Sumar"
                    className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-900 hover:text-white transition"
                  >
                    +
                  </button>
                </div>

                {/* 🛒 Botón */}
                <button className={ProductDetailToken.button}
                  onClick={() => addProducto({...producto, cantidad : cantidad}, imagenes[0].url)}
                >
                  Agregar al Carro
                </button>

                {/* Promo CMR */}
                <div className="mt-4 border rounded p-3 text-sm flex items-center gap-3">
                  <div className="flex-none w-12 h-8 bg-green-600 text-white rounded flex items-center justify-center">CMR</div>
                  <div>
                    <div className="font-semibold">¿AÚN NO TIENES TU CMR?</div>
                    <div className="text-xs">Ábrela ahora y obtén $45.000 de descuento.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Especificaciones e información adicional */}
    <div className={ProductDetailToken.container}>
      <div className="grid grid-cols-4 gap-10">
        {/* 🧩 Columna izquierda: Especificaciones */}
        <div className="col-span-2 shadow">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-1">Especificaciones</h2>

          <div className="divide-y divide-gray-200">
            <Table content= {producto.especificaciones} />
          </div>
        </div>

        {/* 🪶 Columna derecha: Información adicional */}
        <div className="col-span-2 shadow">
          <div className="space-y-6">
            {informacionAdicional && Object.entries(informacionAdicional).length > 0 ? (
              Object.entries(informacionAdicional).map(([k, v]) => (
                <div key={k}>
                  <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-1">{k}</h2>
                  {
                    v.tt === 'tabla'
                      ? <Table content={v} />
                    : v.tt === 'info'
                      ? <InfoComponent content={v} />
                    : v.tt === 'imagen'
                      ? <InfoImages content={v} />
                    : null
                  }
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay especificaciones adicionales disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
