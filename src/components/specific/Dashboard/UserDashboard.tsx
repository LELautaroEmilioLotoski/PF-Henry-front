"use client";

import React from "react";
import { useUserContext } from "@/context/UserContext";
import DashboardSidebar from "@/components/header/Header";
import { useUser } from "@auth0/nextjs-auth0/client";

const UserDashboard = () => {
  const { userNormal, logoutUser } = useUserContext();
  const { user } = useUser();

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/api/auth/logout";
  };

  return (
    <div className="flex justify-center bg-gray-100 py-10">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {user ? (
          <div className="flex">
            <DashboardSidebar />
            <div className="bg-gray-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Tus datos personales
              </h2>
              <p className="text-lg font-medium text-gray-600">
                Name: <span className="text-gray-800">{user.name}</span>
              </p>
              <p className="text-lg font-medium text-gray-600">
                Email: <span className="text-gray-800">{user.email}</span>
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : userNormal ? (
          <div className="flex">
            <DashboardSidebar />
            <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Bienvenido, {userNormal.name}
              </h1>
              <div className="bg-gray-50 rounded-lg p-6 shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Tus datos personales
                </h2>
                <p className="text-lg font-medium text-gray-600">
                  Name: <span className="text-gray-800">{userNormal.name}</span>
                </p>
                <p className="text-lg font-medium text-gray-600">
                  Email:{" "}
                  <span className="text-gray-800">{userNormal.email}</span>
                </p>
                <p className="text-lg font-medium text-gray-600">
                  Address:{" "}
                  <span className="text-gray-800">{userNormal.address}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <h1 className="text-2xl font-semibold text-gray-800">
              No se encontró información del usuario.
            </h1>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
