'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { IUser, AuthResponse } from "@/interfaces/Types";

export const UserContext = createContext({
  user: null as IUser | null,
  token: null as string | null,
  setUser: (authData: AuthResponse) => {},
  logoutUser: () => {},
});

export const useUserContext = () => useContext(UserContext);  // Custom hook

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");
    if (localUser && localToken) {
      setUser(JSON.parse(localUser));
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  const setUserData = ({ data }: AuthResponse) => {
    setUser(data.user);
    setToken(data.token);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, setUser: setUserData, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};