import { PaymentMethodFormProps } from "@/interfaces/Menu-item.interfaces";
import React from "react";

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ paymentMethod, handleChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-black mb-1">Payment Method</label>
    <div className="space-y-2">
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="paymentMethod"
          value="Efectivo"
          checked={paymentMethod === "Efectivo"}
          onChange={handleChange}
          className="h-4 w-4 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-black">Efectivo</span>
      </label>
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="paymentMethod"
          value="Transferencia"
          checked={paymentMethod === "Transferencia"}
          onChange={handleChange}
          className="h-4 w-4 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-black">Transferencia</span>
      </label>
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="paymentMethod"
          value="PayPal"
          checked={paymentMethod === "PayPal"}
          onChange={handleChange}
          className="h-4 w-4 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-black">PayPal</span>
      </label>
    </div>
  </div>
);

export default PaymentMethodForm;