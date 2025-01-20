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

export const UserContext = createContext<IUserContextProps>( {
  userNormal: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  logoutUser: () => {}
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userNormal, setUser] = useState<IUser | null>(JSON.parse(localStorage.getItem("user") || "null"));
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/auth/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isValid && data.payload) {
            setToken(token);

            fetch(`http://localhost:3000/users/${data.payload.id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            })
              .then((res) => res.json())
              .then((userData) => {
                if (userData && userData.data) {
                  setUser(userData.data);
                  localStorage.setItem("user", JSON.stringify(userData.data));
                }
              })
              .catch(() => {
                setUser(null);
                Cookies.remove("token");
                setToken(null);
              });
          } else {
            setUser(null);
            setToken(null);
            Cookies.remove("token");
            localStorage.removeItem("user");
          }
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          Cookies.remove("token");
          localStorage.removeItem("user");
        });
    }
  }, [token]);

  const logoutUser = () => {
    Cookies.remove("token");
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userNormal, setUser, token, setToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);