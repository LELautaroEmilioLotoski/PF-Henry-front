'use client'

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
  logoutUser: () => {},
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userNormal, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    
    if (storedToken) {
      fetch("/api/auth/validate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {          
          if (data.user) {
            setUser(data.user);  // Establecer el usuario
            setToken(data.token);  // Establecer el token            
          }
        })
        .catch(() => {
          setUser(null);
          setToken(null);
        });

        if(storedToken) console.log(userNormal);
        
    }
  }, []);

  const logoutUser = () => {
    Cookies.remove("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ userNormal, setUser, token, setToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useUserContext = () => useContext(UserContext);
