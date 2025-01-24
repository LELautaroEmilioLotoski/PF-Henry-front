import { OrderSummaryProps } from "@/interfaces/Menu-item.interfaces";
import React from "react";


const OrderSummary: React.FC<OrderSummaryProps> = ({ total }) => (
  <div className="mb-4">
    <p className="font-semibold text-xl">Total: ${total.toFixed(2)}</p>
  </div>
);

export default OrderSummary;
