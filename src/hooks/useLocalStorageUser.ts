import { IUserHook } from "@/interfaces/Menu-item.interfaces";
import { useState, useEffect } from "react";

export const useLocalStorageUser = () => {
  const [user, setUser] = useState<IUserHook | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData) as IUserHook);
    }
  }, []);

  const setUserData = (data: IUserHook) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return { user, setUserData };
};