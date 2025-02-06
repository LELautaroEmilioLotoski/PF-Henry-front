// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // ✅ Usar `next/navigation` en App Router
// import { useUser } from "@auth0/nextjs-auth0/client";
// import DashboardSidebar from "@/components/header/Header";
// import CloudinaryPage from "@/app/Cloudinary/page";
// import Cookies from "js-cookie";

// const ProfilePage = () => {
//   const router = useRouter();
//   const { user, isLoading, error } = useUser();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     if (!user) return;

//     const registerUserIfNeeded = async () => {
//       try {
//         const backendToken = Cookies.get("token");
//         console.log("estoy en el try");
        

//         if (!backendToken) {
//           const userData = {
//             auth0Id: user.sub,
//             name: user.name,
//             email: user.email,
//             isComplete: false,
//           };

//           console.log("estoy en el if");
          

//           const response = await fetch("http://localhost:3000/auth/signupWithAuth0", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData),
//           });

//           if (response.ok) {
//             console.log("Usuario registrado con éxito");
//           } else if (response.status === 400) {
//             console.log("El usuario ya está registrado.");
//           } else {
//             throw new Error("Error al registrar usuario.");
//           }
//         }
//       } catch (err) {
//         console.error("Error al registrar usuario:", err);
//       }
//     };

//     registerUserIfNeeded();
//   }, [user]);

//   useEffect(() => {
//     if (!user) return;

//     const sendTokenToBackend = async () => {
//       try {
//         const userData = { auth0Id: user.sub, name: user.name, email: user.email };
//         const response = await fetch("http://localhost:3000/auth/signInWithAuth0", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         });

//         if (response.ok) {
//           const backendData = await response.json();
//           localStorage.setItem("user", JSON.stringify(backendData.user));
//           Cookies.set("token", backendData.token);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error("Error al enviar los datos al backend:", error);
//       }
//     };

//     sendTokenToBackend();
//   }, [user]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push("/profile"); // ✅ Redirige solo cuando el usuario esté autenticado
//     }
//   }, [isAuthenticated, router]);

//   if (isLoading) {
//     return <div>Cargando...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const userDataLocalStorage = localStorage.getItem("user");
//   const userData = userDataLocalStorage ? JSON.parse(userDataLocalStorage) : null;
  

//   return (
//     <div className="flex">
//       <DashboardSidebar />
//       <div className="bg-gray-50 rounded-lg p-6 shadow">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Tus datos personales</h2>
//         <p className="text-lg font-medium text-gray-600">
//           Name: <span className="text-gray-800">{userData?.name || "No disponible"}</span>
//         </p>
//         <p className="text-lg font-medium text-gray-600">
//           Email: <span className="text-gray-800">{userData?.email || "No disponible"}</span>
//         </p>
//         <p className="text-lg font-medium text-gray-600">
//           Address: <span className="text-gray-800">{userData?.address || "No disponible"}</span>
//         </p>
//       </div>
//       <CloudinaryPage userprops={{ email: userData?.email, image_url: userData?.picture }} />
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Usar `next/navigation` en App Router
import { useUser } from "@auth0/nextjs-auth0/client";
import DashboardSidebar from "@/components/header/Header";
import Cookies from "js-cookie";
import Cloudinary from "../Cloudinary/Cloudinary";

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user) return;

    const registerUserIfNeeded = async () => {
      try {
        const backendToken = Cookies.get("token");
        console.log("estoy en el try");

        if (!backendToken) {
          const userData = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            isComplete: false,
          };

          console.log("estoy en el if");

          const response = await fetch(
            "http://localhost:3000/auth/signupWithAuth0",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            }
          );

          if (response.ok) {
            console.log("Usuario registrado con éxito");
          } else if (response.status === 400) {
            console.log("El usuario ya está registrado.");
          } else {
            throw new Error("Error al registrar usuario.");
          }
        }
      } catch (err) {
        console.error("Error al registrar usuario:", err);
      }
    };

    registerUserIfNeeded();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const sendTokenToBackend = async () => {
      try {
        const userData = {
          auth0Id: user.sub,
          name: user.name,
          email: user.email,
        };
        const response = await fetch(
          "http://localhost:3000/auth/signInWithAuth0",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          const backendData = await response.json();
          localStorage.setItem("user", JSON.stringify(backendData.user));
          Cookies.set("token", backendData.token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al enviar los datos al backend:", error);
      }
    };

    sendTokenToBackend();
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile"); // ✅ Redirige solo cuando el usuario esté autenticado
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userDataLocalStorage = localStorage.getItem("user");
  const userData = userDataLocalStorage
    ? JSON.parse(userDataLocalStorage)
    : null;

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="bg-gray-50 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tus datos personales
        </h2>
        <p className="text-lg font-medium text-gray-600">
          Name:{" "}
          <span className="text-gray-800">
            {userData?.name || "No disponible"}
          </span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Email:{" "}
          <span className="text-gray-800">
            {userData?.email || "No disponible"}
          </span>
        </p>
        <p className="text-lg font-medium text-gray-600">
          Address:{" "}
          <span className="text-gray-800">
            {userData?.address || "No disponible"}
          </span>
        </p>
      </div>
      {userData ? <Cloudinary /> : <h2>no se encontro cloudinary</h2>}
    </div>
  );
};

export default ProfilePage;
