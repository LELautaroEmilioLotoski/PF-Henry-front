"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectItem } from "@/components/ui/select"
import { getAllOrders, updateOrderStatus } from "@/helpers/orders.helper"
import type { IUser } from "@/interfaces/Types"
import { ArrowUpDown } from "lucide-react"
import RoleHeader from "../../Admin/AdminHeader/AdminHeader"
import { getOrdersByEmail } from "@/helpers/user.helper"

export interface IOrderEmployee {
  id: string
  status: string
  totalPrice: number
  createdAt: string
  paymentMethod: string
  comment: string
  orderDetails: { id: string; quantity: number; subtotal: number }[]
  user?: IUser
}

const orderStatuses = ["en preparación", "listo", "entregado"]

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrderEmployee[]>([])
  const [email, setEmail] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  useEffect(() => {
    const storedToken = Cookies.get("token")
    if (!storedToken) return

    setToken(storedToken)
    fetchOrders(storedToken)
  }, [])

  const fetchOrders = async (token: string) => {
    try {
      const data = await getAllOrders(token)
      setOrders(Array.isArray(data) ? formatOrders(data) : [])
    } catch {
      setOrders([])
    }
  }

  const formatOrders = (data: any[]): IOrderEmployee[] => {
    return data.map(({ orderDetails, ...order }) => ({
      ...order,
      totalPrice: Number.parseFloat(order.totalPrice),
      orderDetails: orderDetails.map((detail) => ({
        ...detail,
        subtotal: Number.parseFloat(detail.subtotal),
      })),
    }))
  }

  const handleSearch = async () => {
    if (!token) return
    try {
      const data = email ? await getOrdersByEmail(email, token) : await getAllOrders(token)
      setOrders(formatOrders(data))
    } catch {
      setOrders([])
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!token) return
    try {
      await updateOrderStatus(orderId, newStatus, token)
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
      )
    } catch {
      // Error handling if needed
    }
  }

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortedOrders = (orders: IOrderEmployee[]) => {
    if (!sortConfig) return orders
    return [...orders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="inline ml-1 h-4 w-4" />
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓"
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <RoleHeader />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b">
        <RoleHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Order Management</h2>

            <div className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Button
                onClick={handleSearch}
                disabled={!token}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    {orders.some((order) => order.user?.email) && (
                      <th
                        onClick={() => handleSort("user.email")}
                        className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      >
                        Email {getSortIcon("user.email")}
                      </th>
                    )}
                    <th
                      onClick={() => handleSort("status")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Status {getSortIcon("status")}
                    </th>
                    <th
                      onClick={() => handleSort("totalPrice")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Total Price {getSortIcon("totalPrice")}
                    </th>
                    <th
                      onClick={() => handleSort("createdAt")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Date {getSortIcon("createdAt")}
                    </th>
                    <th
                      onClick={() => handleSort("paymentMethod")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Payment Method {getSortIcon("paymentMethod")}
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                      Comments
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getSortedOrders(orders).length > 0 ? (
                    getSortedOrders(orders).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        {order.user?.email && (
                          <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                            {order.user.email}
                          </td>
                        )}
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base font-semibold capitalize text-gray-600">
                          {order.status}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {new Intl.DateTimeFormat("es-ES", { timeZone: "UTC" }).format(new Date(order.createdAt))}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {order.paymentMethod}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {order.comment || "Sin comentario"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base">
                          <Select
                            className="w-full border border-gray-200 rounded-lg px-2 py-1 text-sm md:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          >
                            {orderStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </Select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm md:text-base">
                        No active orders
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}