import { ApiResponse, IOrderResponse, IProduct} from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchOrders = async (email: string): Promise<ApiResponse<IOrderResponse[]>> => {
  try {
    const res = await fetch(`${APIURL}users/orders/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error fetching orders: ${res.statusText}`);
    }

    const { data } = await res.json();

    if (!Array.isArray(data)) {
      return { data: [] };
    }

    return { data };
  } catch (error) {
    console.error("Error in fetchOrders:", error);
    throw error;
  }
};

export const fetchMenuItem = async (id: string): Promise<ApiResponse<IProduct>> => {
  try {
    const res = await fetch(`${APIURL}menu-items/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error fetching menu item: ${res.statusText}`);
    }

    const data: ApiResponse<IProduct> = await res.json();
    return data;
  } catch (error) {
    console.error("Error in fetchMenuItem:", error);
    throw error;
  }
};

export const fetchCombo = async (id: string): Promise<ApiResponse<IProduct>> => {
  try {
    const res = await fetch(`${APIURL}combos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error fetching combo: ${res.statusText}`);
    }

    const data: ApiResponse<IProduct> = await res.json();
    return data;
  } catch (error) {
    console.error("Error in fetchCombo:", error);
    throw error;
  }
};