"use client";

import { useState } from "react";
import { useUserAddresses } from "@/hooks/useUserAddress";
import { Button } from "@/components/ui/button";
import { Trash2, Star } from "lucide-react";

export default function UserAddresses() {
  const { addresses, loading, addAddress } = useUserAddresses();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    direccion: "",
    ciudad: "",
    departamento: "",
    barrio: "",
  });

  if (loading) return <p className="p-6">Cargando direcciones...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAddress(formData);
      setFormData({ direccion: "", ciudad: "", departamento: "", barrio: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Función placeholder para eliminar (no hace nada)
  const handleDelete = () => {
    console.log("Eliminar dirección - Función no implementada");
  };

  return (
    <div className="w-full">
      {/* Header solo con título */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#63615e' }}>Direcciones</h2>
      </div>

      {/* Formulario para agregar dirección */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Agregar nueva dirección</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                placeholder="Calle, número, apartamento, etc."
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departamento
              </label>
              <input
                type="text"
                placeholder="Departamento"
                value={formData.departamento}
                onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barrio
              </label>
              <input
                type="text"
                placeholder="Barrio"
                value={formData.barrio}
                onChange={(e) => setFormData({...formData, barrio: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              <Button 
                type="submit" 
                className="px-6 text-white"
                style={{ backgroundColor: '#343e48' }}
              >
                Guardar dirección
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de direcciones */}
      <div className="space-y-4">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr.direccion}
              className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <Star 
                  size={20} 
                  className="text-gray-400" 
                  fill="none"
                  stroke="currentColor"
                />
                <p className="text-base" style={{ color: '#63615e' }}>
                  {addr.direccion}, {addr.barrio}, {addr.ciudad}, {addr.departamento}
                </p>
              </div>
              <button 
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-600 transition-colors p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 text-lg mb-2">
              No tienes direcciones registradas
            </p>
            <p className="text-gray-400 text-sm">
              Agrega tu primera dirección para comenzar
            </p>
          </div>
        )}
      </div>

      {/* Botón Agregar dirección al final del contenido, abajo a la derecha */}
      <div className="flex justify-end mt-8">
        <Button
          className="rounded-full px-6 py-2 text-white"
          style={{ backgroundColor: '#343e48' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancelar" : "Agregar dirección"}
        </Button>
      </div>
    </div>
  );
}