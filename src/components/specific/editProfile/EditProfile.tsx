"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { updateAccount } from "@/helpers/auth.helper";

export default function EditProfileForm() {
  const [user, setUser] = useState({
    address: "",
    password:""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const getUserToken = localStorage.getItem("user");

    try {
      if (getUserToken) {
        const getUserData = JSON.parse(getUserToken);
        console.log(getUserData);
        
        const { id } = getUserData;
        const response = await updateAccount(id, user);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your personal information here</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Password</Label>
            <input
              id="password"
              name="password"
              value={user?.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <input
              id="address"
              name="address"
              value={user?.address}
              onChange={handleChange}
              type="text"
              placeholder="Your address"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
