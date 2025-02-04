import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ICartItem, IOrder } from "@/interfaces/Menu-item.interfaces";
import { createOrder } from "@/helpers/menu-items.helper";
import UserDataForm from "@/components/specific/TakeAway/OrderForm/UserDataForm";
import CommentsForm from "@/components/specific/TakeAway/OrderForm/CommentsForm";
import PaymentMethodForm from "@/components/specific/TakeAway/OrderForm/PaymentMethodForm";
import OrderSummary from "@/components/specific/TakeAway/OrderForm/OrderSummary";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const OrderForm: React.FC = () => {
  const { cartItems, total, clearCart } = useCart();
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    address: string;
    comments: string;
    paymentMethod: "Efectivo" | "Transferencia" | "PayPal";
    id: string;
  }>( {
    name: "",
    email: "",
    address: "",
    comments: "",
    paymentMethod: "Efectivo",
    id: "",
  });

  const [showPayPal, setShowPayPal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData!);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "paymentMethod" && value === "PayPal") {
      setShowPayPal(true);
    } else {
      setShowPayPal(false);
    }
  };

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

   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

      {showPayPal && (
        <PayPalScriptProvider
          options={{
            clientId: "AeTVy8fpYKvZ_q372W1dasinGPVVFwUAQ5Lfh_gFd73-G6218PUgYkWTDE6NPY78_pNh4XhEVXf5ieFv",
            currency: "USD",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              if (!actions.order) {
                toast.error("Error al inicializar el pedido.");
                return Promise.reject("actions.order es undefined");
              }

              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: total.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              if (!actions.order) {
                toast.error("Error al procesar el pago.");
                return Promise.reject("actions.order es undefined");
              }

              return actions.order.capture().then((details) => {
                toast.success("¡Pago realizado con éxito!");
                console.log(details);
                setShowPayPal(false);
              });
            }}
            onError={(err) => {
              toast.error("Pago rechazado o error al procesar.");
              console.error(err);
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default OrderForm;
