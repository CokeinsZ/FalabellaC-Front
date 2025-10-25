"use client";

import { useState } from "react";
import { useUserAddresses } from "@/hooks/useUserAddress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Mis direcciones
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <div
                key={addr.direccion}
                className="p-3 border rounded-md flex flex-col gap-1"
              >
                <p className="font-medium">{addr.direccion}</p>
                <p className="text-sm text-gray-600">
                  {addr.ciudad}, {addr.departamento}, {addr.barrio}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No tienes direcciones registradas.
            </p>
          )}

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : "Agregar dirección"}
          </Button>


        </CardContent>
      </Card>
    </div>
  );
}
