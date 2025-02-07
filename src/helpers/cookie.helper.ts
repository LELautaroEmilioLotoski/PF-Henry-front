import { toast } from "react-toastify";

export const getAuthToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    toast.error("No se encontró el token. Por favor, inicia sesión.");
    return null;
  }

  return token;
};
