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
            logoutUser();
          }
        })
        .catch(() => {
          logoutUser();
        });
    } else {
      logoutUser();
    }
  }, []);
  

  const logoutUser = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ userNormal, setUser, token, setToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);