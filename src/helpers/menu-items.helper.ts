
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
  
    const data = await res.json();
    return data;
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
  
    const data = await res.json();
    return data;
  };


  export const createOrder = async (orderData: {
    idUser: string;
    paymentMethod: "Cash" | "PayPal";
    MenuItems: (
      | { idMenuItem: string; quantity: number }
      | { idCombo: string; quantity: number }
    )[];
    comment: string;
  }) => {
    const res = await fetch(`${APIURL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  
    if (!res.ok) {
      throw new Error(`Error creating order: ${res.statusText}`);
    }
  
    const data = await res.json();
    return data;
  };

  export const updatePaymentStatus = async (orderId: string) => {
    if (!orderId) throw new Error("Order ID is required to update payment status");
  
    try {
      const response = await fetch(`${APIURL}orders/${orderId}/payment-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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