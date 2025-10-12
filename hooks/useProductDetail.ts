"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Producto {
  id: number;
  marca: string;
  proveedor: string;
  proveedor_codigo: string;
  nombre: string;
  precio: number;
  descuento: number;
  especificaciones_principales: string;
  especificaciones: string;
  informacion_adicional: string;
  calificacion: number;
}

export interface ImagenProducto {
  url: string;
  orden: number;
}

export interface Comentarios {
  calificacion: number;
  comentario: string;
}

export interface CategoriaPath {
  id: number;
  nombre: string;
  tipo: 'categoria' | 'subcategoria';
}

export function useProductDetail(id: string) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [comentarios, setComentarios] = useState<Comentarios[]>([]);
  const [imagenes, setImagenes] = useState<ImagenProducto[]>([]);
  const [categoriaPath, setCategoriaPath] = useState<CategoriaPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Una sola consulta para obtener producto, proveedor, imágenes, comentarios y categorías
      const { data: prodData, error: prodError } = await supabase
        .from("productos")
        .select(`
          *,
          proveedores!inner (
            name,
            codigo
          ),
          imagenes_producto (
            url,
            orden
          ),
          comentarios (
            calificacion,
            comentario
          ),
          categorias (
            id,
            nombre
          ),
          sub_categorias (
            id,
            nombre,
            id_padre
          )
        `)
        .eq("id", Number(id))
        .maybeSingle();

      if (prodError) {
        setErrorMsg(prodError.message);
        setLoading(false);
        return;
      }

      if (!prodData) {
        setErrorMsg("Producto no encontrado");
        setLoading(false);
        return;
      }

      const proveedorData = prodData.proveedores;
      setProducto({
        ...prodData,
        proveedor: proveedorData ? proveedorData.name : "Desconocido",
        proveedor_codigo: proveedorData ? proveedorData.codigo : "N/A",
      });

      setImagenes(prodData.imagenes_producto || []);
      setComentarios(prodData.comentarios || []);

      // Construir el path de categorías
      const buildCategoryPath = async () => {
        const path: CategoriaPath[] = [];

        // 1. Agregar categoría principal
        if (prodData.categorias) {
          path.push({
            id: prodData.categorias.id,
            nombre: prodData.categorias.nombre,
            tipo: 'categoria'
          });
        }

        // 2. Construir jerarquía de subcategorías
        if (prodData.sub_categorias) {
          const subCatId = prodData.sub_categorias.id;
          const subCategorias: CategoriaPath[] = [];

          // Obtener todas las subcategorías para construir la jerarquía
          const { data: allSubCats, error: subCatError } = await supabase
            .from("sub_categorias")
            .select("id, nombre, id_padre")
            .eq("id_categoria", path[0].id);

          if (!subCatError && allSubCats) {
            // Función recursiva para construir el path desde el hijo hasta el padre
            const buildPath = (currentId: number): void => {
              const subCat = allSubCats.find(sc => sc.id === currentId);
              if (subCat) {
                subCategorias.unshift({
                  id: subCat.id,
                  nombre: subCat.nombre,
                  tipo: 'subcategoria'
                });
                
                // Si tiene padre, continuar subiendo
                if (subCat.id_padre !== null) {
                  buildPath(subCat.id_padre);
                }
              }
            };

            buildPath(subCatId);
            path.push(...subCategorias);
            console.log("Path de categorías:", path);
          }
        }

        setCategoriaPath(path);
      };

      await buildCategoryPath();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { producto, imagenes, loading, errorMsg, comentarios, categoriaPath };
}
