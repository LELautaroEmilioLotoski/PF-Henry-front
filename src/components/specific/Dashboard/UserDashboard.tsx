"use client"
import React, { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";

const UserDashboard = () => {
  const { userNormal, token, setUser, setToken, logoutUser } = useUserContext();

  useEffect(() => {
    if (token && !userNormal) {
      fetch("http://localhost:3000/auth/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isValid && data.payload) {
            fetch(`http://localhost:3000/users/${data.payload.id}`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            })
              .then((res) => res.json())
              .then((userData) => {
                if (userData && userData.data) {
                  setUser(userData.data);
                }
              })
              .catch(() => {
                setUser(null);
                setToken(null);
                logoutUser();
              });
          } else {
            setUser(null);
            setToken(null);
            logoutUser();
          }
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          logoutUser();
        });
    }
  }, [token, userNormal, setUser, setToken, logoutUser]);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/api/auth/logout";
  };

  if (!userNormal) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl">Datos del usuario</h1>
      {userNormal && (
        <div className="p-4 m-4">
          <h2 className="text-xl">Nombre: {userNormal.name}</h2>
          <p>Dirección: {userNormal.address}</p>
          <p>Email: {userNormal.email}</p>
          <p>Imagen: <img src={userNormal.image_url} alt="User Image" width={100} /></p>
          <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white">Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;