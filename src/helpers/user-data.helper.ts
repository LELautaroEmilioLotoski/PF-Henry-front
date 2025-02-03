
const APIURL = process.env.NEXT_PUBLIC_API_URL;



export const fetchOrders = async (email: string) => {
    const res = await fetch(`${APIURL}users/orders/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`Error fetching orders: ${res.statusText}`);
    }
  
    const data = await res.json();
    return data.data;
  };
  