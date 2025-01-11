"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";

const Home = () => {
  const { user, isLoading } = useUser();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  if (isLoading) return null;
  return (
    <div>
      {user ? (
        <>
          <h1>Has iniciado sesion correctamente</h1>
          <div className="mr-5">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <Link href="/Dashboard">Mi Perfil</Link>
          </div>
        </>
      ) : (
        <>
          <h1>Este es un home</h1>
          <Link href="/Login">Ir al login</Link>
        </>
      )}
    </div>
  );
};

export default Home;

