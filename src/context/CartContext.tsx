'use client'

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { ICartItem, Product } from "@/interfaces/Menu-item.interfaces";

interface CartContextType {
  cartItems: ICartItem[];
  addToCart: (product: Product, type: "menuItem" | "combo") => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, type: "menuItem" | "combo") => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id && item.type === type);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        
        return [
          ...prev,
          { 
            id: product.id, 
            name: product.name, 
            price: parseFloat(product.price), 
            quantity: 1, 
            type,
          },
        ];
      }
    });
  };
  

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};