import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const UserDashboard = () => {
  const { user, isLoading, error } = useUser();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  return (
    <div className="">
      {user && (
        <div>
          <div>
            <h1 className="text-2xl">Datos del usuario</h1>
            <div className="p-52">
              <h2 className="text-2xl">Username: {user.name}</h2>
              <p>Email: {user.email}</p>
              <h3>NickName: {user.nickname}</h3>
              <button onClick={handleLogout}>Cerrar sesion</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
