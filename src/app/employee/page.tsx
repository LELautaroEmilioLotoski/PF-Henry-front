"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmployeeHeader from "@/components/employee/employeeHeader/employeeHeader";


const EmployeePage = ({ children }: { children: React.ReactNode }) => {
  const { userNormal, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
 
    if (loading) return; // 🔹 No hacer nada mientras el contexto aún carga

    if (!userNormal) return;

    if (!userNormal || !userNormal.roles?.includes("worker") && !userNormal.roles?.includes("admin")) {
      router.push("/unauthorized"); // Si no tiene permisos, lo redirige
    } else {
      router.replace("/employee/inicio"); // Redirige automáticamente a /employee/inicio
    }
  }, [userNormal, loading, router]);

  // Mientras se valida el usuario, mostramos un loader
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex">
      <EmployeeHeader />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default EmployeePage;
