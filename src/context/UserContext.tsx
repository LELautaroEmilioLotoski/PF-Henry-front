'use client';
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IUser } from "@/interfaces/Types";
import { validateToken } from "@/helpers/auth.helper"; // Importa la función del helper

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

      // Usamos la función del helper para validar el token
      validateToken(storedToken)
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