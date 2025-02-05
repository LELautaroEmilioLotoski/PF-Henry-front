"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartProps {
  onCreateOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ onCreateOrder }) => {
  const { cartItems, removeFromCart, updateQuantity, total, setCartItems } = useCart();
  const [isOrderCreated, setIsOrderCreated] = React.useState(false);
  const router = useRouter();

  const handleCreateOrder = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    
    if (!token) {
      router.push('/login');
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to create the order?");
    if (isConfirmed) {
      setIsOrderCreated(true);
      onCreateOrder();
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [setCartItems]);

  return (
    <div className="bg-white rounded-lg shadow-sm h-full border">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Cart</h2>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-15rem)]">
        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                <p className="text-amber-500 font-bold">${item.price}</p>
                <p className="text-sm text-gray-500">{item.type === "combo" ? "Combo" : "Menu Item"}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1 || isOrderCreated}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isOrderCreated}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  disabled={isOrderCreated}
                  className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && <div className="text-center py-8 text-gray-500">Your cart is empty</div>}
        </div>
      </div>

      <div className="p-4 border-t mt-auto space-y-4">
        <div className="w-full flex items-center justify-between">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-amber-500">${total}</span>
        </div>
        {total > 0 && !isOrderCreated && (
          <button
            className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            onClick={handleCreateOrder}
          >
            Create Order
          </button>
        )}
        {isOrderCreated && (
          <div className="text-center text-green-500 font-semibold">Order has been created!</div>
        )}
      </div>
    </div>
  );
};

export default Cart;