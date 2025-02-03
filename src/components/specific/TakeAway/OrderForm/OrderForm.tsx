import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    paymentMethod: "Cash" | "PayPal";
    id: string;
  }>({
    name: "",
    email: "",
    address: "",
    comments: "",
    paymentMethod: "Cash",
    id: "",
  });

  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const router = useRouter(); // Use the useRouter hook here

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);      
      if (user.name && user.email && user.id) {        
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: user.name,
          email: user.email,
          id: user.id,
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (isOrderCreated) {
      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    }
  }, [isOrderCreated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const menuItems = cartItems
      .filter((item) => item.type === "menuItem")
      .map((item: ICartItem) => ({
        idMenuItem: item.id,
        quantity: item.quantity,
      }));

    const combos = cartItems
      .filter((item) => item.type === "combo")
      .map((item: ICartItem) => ({
        idCombo: item.id,
        quantity: item.quantity,
      }));

    const allItems = [
      ...menuItems,
      ...combos
    ];

    console.log(formData);
    

    const orderData: IOrder = {
      idUser: formData.id,
      paymentMethod: formData.paymentMethod,
      comment: formData.comments,
      MenuItems: allItems.length > 0 ? allItems : [],
    };

    console.log(orderData);
    

    console.log("Order data being sent:", JSON.stringify(orderData, null, 2));

    if (!orderData.idUser) {
      alert("User ID is required to place the order.");
      return;
    }

    try {
      await createOrder(orderData);
      clearCart();
      alert("Order placed successfully!");
      setIsOrderCreated(true);
    } catch {
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
