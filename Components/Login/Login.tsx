"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  if (isLoading) return null;
  return (
    <div>
      {user ? (
        <>
          <h1 className="flex justify-center items-center">
            Has iniciado sesión!
          </h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <h2 className="flex justify-center items-center">
            Inicia sesión para continuar
          </h2>
          <a href="/api/auth/login">Login</a>
        </>
      )}
    </div>
  );
}
