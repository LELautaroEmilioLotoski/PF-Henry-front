import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalComponent = () => {
  const initialOptions = {
    clientId: "AdC_mX5KO2zrJHbkkyXyzvRufi5JuLMPwPOq7jpHyCUxTfC6AHPnjWKHnGrT1W80-nnWcjtL1Ng9F1ud",
    currency: "USD",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={async () => {
          const response = await fetch("http://localhost:3000/paypal/orders", {
            method: "POST",
          });
          const orderData = await response.json();
          return orderData.id;
        }}
        onApprove={async (data) => {
          const response = await fetch(`http://localhost:3000/paypal/orders/${data.paymentID}/capture`, {
            method: "POST",
          });
          const captureData = await response.json();
          console.log("Order captured:", captureData);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;