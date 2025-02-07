import { IReservationTable } from "@/components/specific/Employee/GetAllReservations/GetAllReservations";
import { IReservation } from "@/interfaces/Types";
import { getAuthToken } from "@/helpers/cookie.helper";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const reservation = async (id: string, userData: IReservation): Promise<IReservation> => {
  const token = getAuthToken();
  if (!token) return Promise.reject("No se encontró el token. Por favor, inicia sesión.");

  const res = await fetch(`${APIURL}reservations/create/${id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const cancelledReservation = async (id: string): Promise<IReservation> => {
  const token = getAuthToken();
  if (!token) return Promise.reject("No se encontró el token. Por favor, inicia sesión.");

  const res = await fetch(`${APIURL}reservations/cancelled/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getAllReservations = async (): Promise<IReservationTable[]> => {
  const token = getAuthToken();
  if (!token) return Promise.reject("No se encontró el token. Por favor, inicia sesión.");

  const res = await fetch(`${APIURL}reservations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: { data: IReservationTable[] } = await res.json();
  return data.data;
};

export const updateReservationStatus = async (id: string, status: string): Promise<IReservation> => {
  const token = getAuthToken();
  if (!token) return Promise.reject("No se encontró el token. Por favor, inicia sesión.");

  const res = await fetch(`${APIURL}reservations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};
