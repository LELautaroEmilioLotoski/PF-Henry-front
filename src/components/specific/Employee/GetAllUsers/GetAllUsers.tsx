"use client";

import { useUserContext } from "@/context/UserContext";  
import { useEffect } from "react";
import Cookies from "js-cookie";  
import EmployeeHeader from "@/components/specific/Employee/EmployeeHeader/EmployeeHeader";  

const GetAllUsers = ({ children }: { children: React.ReactNode }) => {
  const { userNormal } = useUserContext();  

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
     
      console.log("No hay token, la sesión podría estar cerrada.");
    } 

    if (!userNormal || (!userNormal.roles?.includes("worker") && !userNormal.roles?.includes("admin"))) {
      console.log("Usuario no autorizado.");
    }
  }, [userNormal]); 

  return (
    <div className="flex">
      <EmployeeHeader />  {/* Encabezado de la vista de empleados */}
      <main className="flex-grow p-4">{children}</main>  {/* Contenido principal */}
    </div>
  );
};

export default GetAllUsers;
