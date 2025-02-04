"use client";

import { useUserContext } from "@/context/UserContext";
import EmployeeHeader from "@/components/employee/employeeHeader/employeeHeader";
import FileUploadComponent from "@/app/Cloudinary/page";

const EmployeeDashboard = () => {
  const { userNormal, logoutUser } = useUserContext();

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/api/auth/logout";
  };

  if (!userNormal) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <EmployeeHeader />

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center w-full p-10">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 flex">
          {/* Foto a la izquierda */}
          <div className="w-1/3 flex flex-col items-center">
            <FileUploadComponent userprops={userNormal} />
          </div>

          {/* Datos a la derecha */}
          <div className="w-2/3 flex flex-col justify-between p-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Bienvenido, {userNormal.name}
            </h1>
            <div className="bg-gray-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tus datos personales</h2>
              <p className="text-lg font-medium text-gray-600">
                <strong>Nombre:</strong> {userNormal.name}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <strong>Email:</strong> {userNormal.email}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <strong>Dirección:</strong> {userNormal.address || "No registrada"}
              </p>
            </div>

            {/* Botón de Cerrar Sesión abajo */}
            <div className="mt-auto flex justify-end">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
