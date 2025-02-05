// 'use client';
// import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { IUser } from "@/interfaces/Types";

// interface IUserContextProps {
//   userNormal: IUser | null;
//   setUser: (user: IUser | null) => void;
//   token: string | null;
//   setToken: (token: string | null) => void;
//   logoutUser: () => void;
//   loading: boolean;
// }

// export const UserContext = createContext<IUserContextProps>({
//   userNormal: null,
//   setUser: () => {},
//   token: null,
//   setToken: () => {},
//   logoutUser: () => {},
//   loading: true
// });

// export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
//   const [userNormal, setUser] = useState<IUser | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true); // Nuevo estado de carga

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = Cookies.get("token");

//     console.log("🔹 Token almacenado en Cookies:", storedToken); // 🔹 Agregado para depuración
//     console.log("🔹 Usuario almacenado en localStorage:", storedUser); // 🔹 Agregado para depuración

//     // Verificar si existe un token almacenado
//     if (storedToken) {
//       setToken(storedToken);  // Actualiza el token en el contexto
//     } else {
//       const localToken = localStorage.getItem("token");
//       console.log("🔹 Token en localStorage:", localToken);
//       if (localToken) {
//         setToken(localToken);

//         fetch("http://localhost:3000/auth/validate-token", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json", // 🔹 Agregado: Asegura que el servidor reciba JSON
//             Authorization: `Bearer ${localToken}`,
//           },
//           credentials: "include",
//         })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Token inválido o expirado"); // 🔹 Modificado: Manejamos mejor los errores
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log("🔹 Respuesta de validación de token:", data); // 🔹 Agregado para depuración

//           if (data.isValid && data.payload) {
//             const userWithRoles: IUser = {
//               ...storedUser ? JSON.parse(storedUser) : {},
//               roles: data.payload.roles || [],
//             };
//             setUser(userWithRoles);
//             console.log("🔹 Usuario actualizado:", userWithRoles); // 🔹 Agregado para depuración
//           } else {
//             handleLogout();
//           }
//         })
//         .catch((error) => {
//           console.error("🔹 Error validando el token:", error.message); // 🔹 Modificado: Muestra el error real
//           handleLogout();
//         })
//         .finally(() => setLoading(false)); // 🔹 Indicamos que la carga terminó
//       } else {
//         console.warn("🔹 No se encontró token en localStorage."); // 🔹 Agregado para depuración
//         setUser(null);
//         setToken(null);
//         setLoading(false);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     console.warn("🔹 Cerrando sesión y eliminando datos."); // 🔹 Agregado para depuración
//     Cookies.remove("appSession");
//     Cookies.remove("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem(("backendToken"))
//     setUser(null);
//     setToken(null);
//     setLoading(false);
//     window.location.href = "/api/auth/logout";
//   };

//   const logoutUser = () => {
//     handleLogout();
//   };

//   return (
//     <UserContext.Provider value={{ userNormal, setUser, token, setToken, logoutUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // 🔹 Modificado: Validación para evitar errores si el contexto no está disponible
// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext debe usarse dentro de un UserContextProvider");
//   }

//   console.log("🔹 Token en useUserContext:", context.token); // 🔹 Agregado para depuración
//   console.log("🔹 Usuario en useUserContext:", context.userNormal); // 🔹 Agregado para depuración

//   return context;
// };

'use client';
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IUser } from "@/interfaces/Types";
 
interface IUserContextProps {
  userNormal: IUser | null;
  setUser: (user: IUser | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logoutUser: () => void;
}
 
export const UserContext = createContext<IUserContextProps>({
  userNormal: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  logoutUser: () => {}
});
 
export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userNormal, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = Cookies.get("token");
 
    if (storedToken) {
      setToken(storedToken);
      fetch("http://localhost:3000/auth/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isValid && data.payload) {
            setUser(storedUser ? JSON.parse(storedUser) : null);
          } else {
            handleLogout();
          }
        })
        .catch(() => {
          handleLogout();
        });
    } else {
      setUser(null);
      setToken(null);
    }
  }, []);
 
  const handleLogout = () => {
    Cookies.remove("appSession");
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    window.location.href = "/api/auth/logout";
  };
 
  const logoutUser = () => {
    handleLogout();
  };
 
 
  return (
    <UserContext.Provider value={{ userNormal, setUser, token, setToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
 
export const useUserContext = () => useContext(UserContext);