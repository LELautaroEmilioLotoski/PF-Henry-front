import { getAuthToken } from "@/helpers/cookie.helper";
import { IReservationTable } from "@/components/specific/Employee/GetAllReservations/GetAllReservations";
import { IOrderResponse, IRegisterProps, IReservation, IUser, IUserDataUpdate } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getActiveUsers = async (): Promise<IUser[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${APIURL}users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener los usuarios activos");
  }

  const data: { data: IUser[] } = await res.json();
  return data.data;
};

export const updateAccount = async (
  id: string,
  userData: IUserDataUpdate
): Promise<IUserDataUpdate> => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${APIURL}users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const createNewEmployee = async (
  id: string,
  employeeData: IRegisterProps
): Promise<IRegisterProps> => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${APIURL}users/UpdateRole/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  return res.json();
};

export const getReservations = async (email: string): Promise<IReservation[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${APIURL}users/reservations/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getReservationsByEmail = async (email: string): Promise<IReservationTable[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${APIURL}users/reservations/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: { data: IReservationTable[] } = await res.json();
  return data.data;
};

export const getOrdersByEmail = async (email: string): Promise<IOrderResponse[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const res = await fetch(`${APIURL}users/orders/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: { data: IOrderResponse[] } = await res.json();
  return data.data;
};

export const uploadFile = async (file: File, email: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("No token provided");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${APIURL}users/${email}/upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al subir el archivo");
  }

  return response.json();
};