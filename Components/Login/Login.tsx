"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { isLoading } = useUser();

  if (isLoading) return null;
  return (
    <div>
      <h2 className="flex justify-center items-center">
        Inicia sesión para continuar
      </h2>
      <a href="/api/auth/login" className="flex justify-center items-center p-52">Login</a>
    </div>
  );
}
