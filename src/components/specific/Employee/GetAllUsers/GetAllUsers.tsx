// "use client";

// import { useUserContext } from "@/context/UserContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import EmployeeHeader from "@/components/specific/Employee/EmployeeHeader/EmployeeHeader";


// const GetAllUsers = ({ children }: { children: React.ReactNode }) => {
//   const { userNormal } = useUserContext();
//   const router = useRouter();

//   useEffect(() => {
 
//     if (!userNormal) return;

//     if (!userNormal || !userNormal.roles?.includes("worker") && !userNormal.roles?.includes("admin")) {
//       router.push("/unauthorized"); // Si no tiene permisos, lo redirige
//     } else {
//       router.replace("/employee/inicio"); // Redirige automáticamente a /employee/inicio
//     }
//   }, [userNormal, router]);

//   // Mientras se valida el usuario, mostramos un loader
//   if (!userNormal) {
//     return <div className="flex justify-center items-center h-screen">Cargando...</div>;
//   }

//   return (
//     <div className="flex">
//       <EmployeeHeader />
//       <main className="flex-grow p-4">{children}</main>
//     </div>
//   );
// };

// export default GetAllUsers;


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