"use client"

import type React from "react"
import { useState } from "react"
import TakeAwayLeft from "./TakeAwayLeft"
import Cart from "./Cart"
import OrderForm from "@/components/specific/TakeAway/OrderForm"

const TakeAway: React.FC = () => {
  const [showOrderForm, setShowOrderForm] = useState(false)


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Take-away</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">{showOrderForm ? <OrderForm /> : <TakeAwayLeft />}</div>
          <div className="order-1 lg:order-2">
            <Cart onCreateOrder={() => setShowOrderForm(true)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TakeAway