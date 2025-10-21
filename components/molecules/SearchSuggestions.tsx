"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useFilterName } from "@/hooks/useFIlterName";
import { HeaderToken } from "../../utils/Token";
import Link from "next/link";

export default function SearchSuggestions() {
  const [query, setQuery] = useState("");
  const { data, loading } = useFilterName(query);

  const hasResults = data.length > 0;
  const isActive = query.trim().length > 0;

  return (
    <div className="relative w-full md:w-auto">
      {/* 🔍 Barra de búsqueda */}
      <div className={`${HeaderToken.searchWrapper} transition-all duration-300`}>
        <input
          type="text"
          placeholder="Buscar en falabella.com"
          className={HeaderToken.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={HeaderToken.searchButton}>
          <Search size={20} />
        </button>
      </div>

      {/* 🧠 Sugerencias */}
      {isActive && (
        <div
          className={`absolute left-0 right-0 top-full mt-2 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto border transition-all duration-300 ${
            hasResults
              ? "bg-black text-white border-gray-700"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          {loading && (
            <p className="p-4 text-gray-400 text-sm">Buscando resultados...</p>
          )}

          {!loading && !hasResults && (
            <p className="p-4 text-gray-500 text-sm">
              No se encontraron coincidencias.
            </p>
          )}

          {!loading && hasResults && (
            <div className="divide-y divide-gray-800">
              {/* 🏷️ Categorías */}
              {data.some((d) => d.tipo === "categoria") && (
                <div className="p-3">
                  <h4 className="text-sm font-semibold mb-2 text-gray-300">
                    Categorías
                  </h4>
                  <ul className="space-y-1">
                    {data
                      .filter((d) => d.tipo === "categoria")
                      .map((cat) => (
                        <li key={`cat-${cat.id}`}>
                          <Link
                            href={`/categories/${cat.id}`}
                            className="block px-2 py-1 rounded hover:bg-gray-800 text-sm text-white"
                          >
                            {cat.nombre}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* 🧩 Subcategorías */}
              {data.some((d) => d.tipo === "subcategoria") && (
                <div className="p-3">
                  <h4 className="text-sm font-semibold mb-2 text-gray-300">
                    Subcategorías
                  </h4>
                  <ul className="space-y-1">
                    {data
                      .filter((d) => d.tipo === "subcategoria")
                      .map((sub) => (
                        <li key={`sub-${sub.id}`}>
                          <Link
                            href={`/subcategories/${sub.id}`}
                            className="block px-2 py-1 rounded hover:bg-gray-800 text-sm text-white"
                          >
                            {sub.nombre}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* 🛍️ Productos */}
              {data.some((d) => d.tipo === "producto") && (
                <div className="p-3">
                  <h4 className="text-sm font-semibold mb-2 text-gray-300">
                    Productos
                  </h4>
                  <ul className="space-y-1">
                    {data
                      .filter((d) => d.tipo === "producto")
                      .map((p) => (
                        <li key={`prod-${p.id}`}>
                          <Link
                            href={`/products/${p.id}`}
                            className="block px-2 py-1 rounded hover:bg-gray-800 text-sm text-white"
                          >
                            <span className="font-medium">{p.nombre}</span>
                            {p.marca && (
                              <span className="text-gray-400 text-xs ml-2">
                                {p.marca}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
