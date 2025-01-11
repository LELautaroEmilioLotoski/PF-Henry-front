"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  return (
    <div>
      <h2 className="flex justify-center items-center">
        Inicia sesión para continuar
      </h2>
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
