"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserContext } from "@/context/UserContext";
import DashboardSidebar from "@/components/header/Header";

const UserDashboard = () => {
  const { user } = useUser();
  const { userNormal } = useUserContext();

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  return (
    <div className="flex justify-center bg-gray-100 py-10">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {user && (
          <div className="flex">
            <div>
              <DashboardSidebar />
            </div>
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mb-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-medium text-gray-600">
                  Username: <span className="text-gray-800">{user.name}</span>
                </h2>
                <p className="text-lg font-medium text-gray-600">
                  Email: <span className="text-gray-800">{user.email}</span>
                </p>
                <h3 className="text-lg font-medium text-gray-600">
                  Nickname:{" "}
                  <span className="text-gray-800">{user.nickname}</span>
                </h3>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
        {userNormal && (
          <div className="flex">
            <div>
              <DashboardSidebar />
            </div>

            <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Bienvenido, {userNormal.name}
              </h1>
              <div className="flex flex-col justify-between lg:flex-row gap-10">
                <div className="bg-gray-50 rounded-lg p-6 shadow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Tus datos personales
                  </h2>
                  <p className="text-lg font-medium text-gray-600">
                    Nombre:{" "}
                    <span className="text-gray-800">{userNormal.name}</span>
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    Dirección:{" "}
                    <span className="text-gray-800">{userNormal.address}</span>
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    Email:{" "}
                    <span className="text-gray-800">{userNormal.email}</span>
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    Imagen:{" "}
                    <span className="text-gray-800">
                      {userNormal.image_url}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
