'use client';

import TopSales from "@/components/molecules/topSales";
import Carousel from "@/components/organisms/carousel";
import Offers from "@/components/organisms/Offers";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ProductCardDTO } from "@/components/atoms/productCard.type";
import Error from "next/error";

interface ProductoBase {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  descuento?: number | null;
}

export default function Home() {

  const [topSellingProducts, setTopSellingProducts] = useState<ProductCardDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  
  const fetchProductosDestacados = async (): Promise<ProductoBase[]> => {
    const { data, error } = await supabase
      .from("productos")
      .select("id, nombre, marca, precio, descuento")
      .eq("destacado", true)
      .limit(5);
    if (error) throw error;
    return data || [];
  };

  const fetchMainImagesForProducts = async (ids: number[]): Promise<Record<number, string>> => {
    if (!ids.length) return {};
    const { data, error } = await supabase
      .from("imagenes_producto")
      .select("producto_id, url")
      .in("producto_id", ids)
      .eq("orden", 0);

    if (error) throw error;

    const producto_imagen: Record<number, string> = {};
    data?.forEach((fila) => { producto_imagen[fila.producto_id] = fila.url; });
    return producto_imagen;
  };

  const mapToProducto = (base: ProductoBase[], imagenes: Record<number, string>): ProductCardDTO[] => {
    return base.map(p => {
      return {
        id: p.id,
        name: p.nombre,
        brand: p.marca,
        oldPrice: p.precio,
        price: p.precio - (p.precio * (p.descuento ? p.descuento : 0)),
        discount: p.descuento ? `${(p.descuento * 100)}%` : "",
        rating: Math.floor(Math.random() * 5) + 1, // Simula rating entre 1 y 5
        img: imagenes[p.id] || ""
      };
    });
  };

  const fetchProductos = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const raw = await fetchProductosDestacados();
      const ids = raw.map(p => p.id);
      const imagenes = await fetchMainImagesForProducts(ids);
      const productos = mapToProducto(raw, imagenes);
      setTopSellingProducts(productos);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.toString() : 'Error obteniendo productos';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <Carousel />

      {loading && <p>Cargando productos...</p>}
      {!loading && errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
      {!loading && !errorMsg && topSellingProducts.length === 0 && (
        <p>No hay productos destacados disponibles.</p>
      )}
      {!loading && !errorMsg && topSellingProducts.length > 0 && (
        <TopSales title="Top Sales" products={topSellingProducts} />
      )}

      <Offers />
    </div>
  );
}
