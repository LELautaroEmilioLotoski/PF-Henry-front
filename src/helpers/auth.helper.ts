import { AuthResponse, ILoginProps, IRegisterProps } from "@/interfaces/Types";
import Cookies from "js-cookie";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (
  userData: IRegisterProps
): Promise<AuthResponse> => {
  const res = await fetch(`${APIURL}auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  console.log(data);

  return data;
};

export const login = async (userData: ILoginProps): Promise<AuthResponse> => {
  const res = await fetch(`${APIURL}auth/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    console.log("error al iniciar sesion");
  }

  const data: AuthResponse = await res.json();
  return data;
};

export const signUpWithAuth0 = async (userData: {
  auth0Id: string;
  name: string;
  email: string;
  isComplete: boolean;
}) => {
  const res = await fetch(`${APIURL}auth/signupWithAuth0`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    if (res.status === 400) {
      console.log("el usuario ya esta registrado");
    }
  }
};

export const signInWithAuth0 = async (userData: {
  auth0Id: string;
  name: string;
  email: string;
}) => {
  const res = await fetch(`${APIURL}auth/signInWithAuth0`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Error al enviar los datos al backend.");
  }

  const backendData = await res.json();
  Cookies.set("token", backendData.token);
  return backendData.user;
};

export const registerWorker = async (
  userData: IRegisterProps,
  token: string
): Promise<AuthResponse> => {
  const res = await fetch(`${APIURL}auth/signup/worker`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  console.log(data);

  return data;
};

export const validateToken = async (token: string) => {
  const res = await fetch(`${APIURL}auth/validate-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error validating token: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};
