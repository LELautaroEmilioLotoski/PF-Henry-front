import { getAuthToken } from "@/helpers/cookie.helper";
import { ApiResponse, IOrderResponse, IProduct } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchOrders = async (email: string): Promise<ApiResponse<IOrderResponse[]>> => {
  try {
    // Obtenemos el token de autenticación
    const token = getAuthToken();
    if (!token) {
      // Si el token es obligatorio, podemos lanzar un error
      throw new Error('No se encontró token de autenticación');
    }

    const res = await fetch(`${APIURL}users/orders/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error al obtener las órdenes: ${res.statusText}`);
    }

    const { data } = await res.json();
    if (!Array.isArray(data)) {
      return { data: [] };
    }

    return { data };
  } catch (error) {
    console.error("Error en fetchOrders:", error);
    throw error;
  }
};

export const fetchMenuItem = async (id: string): Promise<ApiResponse<IProduct>> => {
  try {
    // Obtenemos el token
    const token = getAuthToken();
    if (!token) {
      throw new Error('No se encontró token de autenticación');
    }

    const res = await fetch(`${APIURL}menu-items/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error al obtener el menú: ${res.statusText}`);
    }

    const data: ApiResponse<IProduct> = await res.json();
    return data;
  } catch (error) {
    console.error("Error en fetchMenuItem:", error);
    throw error;
  }
};

export const fetchCombo = async (id: string): Promise<ApiResponse<IProduct>> => {
  try {
    // Obtenemos el token
    const token = getAuthToken();
    if (!token) {
      throw new Error('No se encontró token de autenticación');
    }

    const res = await fetch(`${APIURL}combos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error al obtener el combo: ${res.statusText}`);
    }

    const data: ApiResponse<IProduct> = await res.json();
    return data;
  } catch (error) {
    console.error("Error en fetchCombo:", error);
    throw error;
  }
};