"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAccount } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";

export default function AddToAddress() {
  const [direccion, setDireccion] = useState({
    address: ""
  });

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDireccion((prev) => ({ ...prev, address: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dirección enviada:", direccion);

    // const userData = localStorage.getItem("user");
    // const id = userData?.id;
    // console.log(id);
    
    // const datos = userData?.email
    // try {
    //     const response = await updateAccount(id, datos)
    //     console.log(response);
    //     router.push("/profile")
        
    // } catch (error) {
    //     console.log(error);
        
    // }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Ingresa tu dirección para continuar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calle">Dirección</Label>
              <Input
                id="calle"
                name="calle"
                value={direccion.address}
                onChange={handleChange}
                placeholder="Ej: Av. Siempre Viva"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
