import { ILoginProps, IRegisterProps, IUser } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (userData: IRegisterProps) => {
  const res = await fetch(`${APIURL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
};

export const login = async (userData: ILoginProps): Promise<IUser> => {
  const res = await fetch(`${APIURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data: IUser = await res.json();
  return data;
};