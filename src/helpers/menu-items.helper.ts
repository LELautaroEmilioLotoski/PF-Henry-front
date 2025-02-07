import { getAuthToken } from "@/helpers/cookie.helper";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchMenuItems = async () => {
  const res = await fetch(`${APIURL}menu-items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching menu items: ${res.statusText}`);
  }

  return res.json();
};

export const fetchCombos = async () => {
  const res = await fetch(`${APIURL}combos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching combos: ${res.statusText}`);
  }

  return res.json();
};

export const createOrder = async (orderData) => {
  const token = getAuthToken();
  if (!token) return;

  const res = await fetch(`${APIURL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error(`Error creating order: ${res.statusText}`);
  }

  return res.json();
};

export const updatePaymentStatus = async (orderId) => {
  if (!orderId) throw new Error("Order ID is required to update payment status");

  const token = getAuthToken();
  if (!token) return;

  try {
    const response = await fetch(`${APIURL}orders/${orderId}/payment-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "paid" }),
    });

    const data = await response.json().catch(() => ({ message: response.statusText }));

    if (!response.ok) throw new Error(`Failed to update payment status: ${data.message || "Unknown error"}`);

    return data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};