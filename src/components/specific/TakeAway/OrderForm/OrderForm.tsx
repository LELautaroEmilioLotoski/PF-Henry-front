import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ICartItem, IOrder } from "@/interfaces/Menu-item.interfaces";
import { createOrder } from "@/helpers/menu-items.helper";
import UserDataForm from "@/components/specific/TakeAway/OrderForm/UserDataForm";
import CommentsForm from "@/components/specific/TakeAway/OrderForm/CommentsForm";
import PaymentMethodForm from "@/components/specific/TakeAway/OrderForm/PaymentMethodForm";
import OrderSummary from "@/components/specific/TakeAway/OrderForm/OrderSummary";

const OrderForm: React.FC = () => {
  const { cartItems, total, clearCart } = useCart();
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    address: string;
    comments: string;
    paymentMethod: "Efectivo" | "Transferencia";
    id: string;
  }>({
    name: "",
    email: "",
    address: "",
    comments: "",
    paymentMethod: "Efectivo",
    id: "",
  });

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // console.log(user);

    const userData = localStorage.getItem(("user"));
    const user = JSON.parse(userData!)
    console.log(user);
    
    
    if (user) {     
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user.name,
        email: user.email,
        address: user.address,
        id: user.id,
      }));
    } else {
      console.warn("User data is incomplete or missing.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: IOrder = {
      idUser: formData.id,
      paymentMethod: formData.paymentMethod,
      MenuItems: cartItems.map((item: ICartItem) => ({
        idMenuItem: item.id,
        quantity: item.quantity,
      })),
      comment: formData.comments
    };

    if (!orderData.idUser) {
      console.error("Missing user ID in the order data");
      alert("User ID is required to place the order.");
      return;
    }

    try {
      const response = await createOrder(orderData);
      console.log("Response from server:", response);
      clearCart();
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error placing your order.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Order</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <UserDataForm 
          name={formData.name} 
          email={formData.email} 
          address={formData.address} 
        />
        
        <CommentsForm 
          comments={formData.comments} 
          handleChange={handleChange} 
        />
        
        <PaymentMethodForm 
          paymentMethod={formData.paymentMethod} 
          handleChange={handleChange} 
        />
        
        <OrderSummary total={total} />

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;