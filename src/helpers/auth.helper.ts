import { AuthResponse, ILoginProps, IRegisterProps, ICreateEmployee } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (userData: IRegisterProps) => {
  const res = await fetch(`${APIURL}auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
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

  const data: AuthResponse = await res.json(); // Ajustamos a la nueva estructura con el token y el user
  return data;
};

export const createNewEmployee = async (id: string, employeeData: ICreateEmployee) => {
  const res = await fetch(`${APIURL}users/UpdateRole/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  const data = await res.json();
  return data;
};