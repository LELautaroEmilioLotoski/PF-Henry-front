"use client"
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserContext } from "@/context/UserContext"
 
const UserDashboard = () => {
  const { user, isLoading, error } = useUser();
  const { userNormal, token } = useUserContext();
  
  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

 
  return (
    <div>
      {user && (
        <div>
            <h1 className="text-2xl">Datos del usuario</h1>
          <div className="flex bg-red-400">
            <div className="bg-red-400">
              <h2 className="text-2xl">Username: {user.name}</h2>
              <p>Email: {user.email}</p>
              <h3>NickName: {user.nickname}</h3>
              <button onClick={handleLogout}>Cerrar sesion</button>
            </div>
          </div>
        </div>
      )}
      {userNormal && (
        <div>
          <h1>Datos del usuario:</h1>
          <p>Nombre: {userNormal.name}</p>
          <p>Direccion: {userNormal.address}</p>
          <p>Email: {userNormal.email}</p>
          <p>imagen: {userNormal.image_url}</p>
        </div>
      )}
    </div>
  );
};
 
export default UserDashboard;