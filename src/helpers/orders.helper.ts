import { IOrderEmployee } from "@/components/specific/Employee/GetAllOrders/GetAllOrders";
import { IOrderResponse } from "@/interfaces/Types";
import { getAuthToken } from "@/helpers/cookie.helper";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async (): Promise<IOrderEmployee[]> => {
    const token = getAuthToken();
    if (!token) throw new Error("No token provided");
   
    const res = await fetch(`${APIURL}orders/findAllActives`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data: { orders: IOrderEmployee[] } = await res.json();
    return data.orders;
  };
   
export const updateOrderStatus = async (
    orderId: string,
    status: string
): Promise<IOrderResponse> => {
    const token = getAuthToken();
    if (!token) throw new Error("No token provided");
   
    const res = await fetch(`${APIURL}orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
   
    const data: IOrderResponse = await res.json();
    return data;
};