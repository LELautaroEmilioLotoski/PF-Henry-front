'use client'

import React from 'react';
import { useCart } from '@/contexts/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl">Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded">
            <div>
              <h3 className="text-xl">{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="bg-gray-200 p-1 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 p-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white py-1 px-4 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl">
        <strong>Total: </strong>${total}
      </div>
    </div>
  );
};

export default Cart;