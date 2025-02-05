"use client"

import { useEffect, useState } from "react"
import { fetchOrders, fetchMenuItem, fetchCombo } from "@/helpers/user-data.helper"
import { X } from "lucide-react"
import type { IOrderDetail, IOrderResponse, IMenuItem, ICombo } from "@/interfaces/Types"

const GetOrders = () => {
  const [orders, setOrders] = useState<IOrderResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<IOrderDetail[] | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "total" | "">("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [modalLoading, setModalLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(5)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      setError("No hay usuario en localStorage.")
      setLoading(false)
      return
    }

    const user = JSON.parse(storedUser)
    const email = user?.email
    if (!email) {
      setError("El usuario no tiene un email registrado.")
      setLoading(false)
      return
    }

    fetchOrders(email)
      .then((data) => {
        setOrders(data?.data || [])
      })
      .catch((err) => {
        if (err.message !== "El usuario no tiene reservas") {
          setError(err.message || "Error al obtener órdenes.")
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const fetchProductDetails = async (orderDetails: IOrderDetail[]) => {
    setModalLoading(true)
    try {
      const updatedOrderDetails = await Promise.all(
        orderDetails.map(async (detail) => {
          const updatedDetail = { ...detail }

          if (detail.menuItem?.id) {
            const data = await fetchMenuItem(detail.menuItem.id)
            if (data?.data) {
              updatedDetail.menuItem = { ...data.data, type: "menuItem" } as IMenuItem
            }
          }

          if (detail.combo?.id) {
            const data = await fetchCombo(detail.combo.id)
            if (data?.data) {
              updatedDetail.combo = { ...data.data, type: "combo" } as ICombo
            }
          }

          return updatedDetail
        }),
      )
      setSelectedOrderDetails(updatedOrderDetails)
    } catch (error) {
      console.error("Error fetching product details:", error)
    } finally {
      setModalLoading(false)
    }
  }

  const handleOpenModal = async (orderDetails: IOrderDetail[]) => {
    setIsModalOpen(true)
    await fetchProductDetails(orderDetails)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrderDetails(null)
  }

  const handleSort = (column: "date" | "total") => {
    const newDirection = sortBy === column && sortDirection === "asc" ? "desc" : "asc"
    setSortBy(column)
    setSortDirection(newDirection)
    setOrders(
      [...orders].sort((a, b) => {
        if (column === "date") {
          return newDirection === "asc"
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return newDirection === "asc"
          ? Number.parseFloat(a.totalPrice) - Number.parseFloat(b.totalPrice)
          : Number.parseFloat(b.totalPrice) - Number.parseFloat(a.totalPrice)
      }),
    )
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) return <p className="text-center text-gray-500 mt-10">Cargando órdenes...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Órdenes</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th
                onClick={() => handleSort("date")}
                className="px-2 md:px-4 py-2 md:py-3 cursor-pointer text-sm md:text-base text-left font-semibold text-gray-600"
              >
                Fecha
              </th>
              <th
                onClick={() => handleSort("total")}
                className="px-2 md:px-4 py-2 md:py-3 cursor-pointer text-sm md:text-base text-left font-semibold text-gray-600"
              >
                Total
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Método de pago
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Estado de pago
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Estado
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600">
                Detalles
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.length ? (
              currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base font-medium text-amber-500">
                    ${order.totalPrice}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                    {order.paymentMethod}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                    {order.payment_status}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">{order.status}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <button
                      onClick={() => handleOpenModal(order.orderDetails)}
                      className="bg-amber-500 text-white py-1 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm md:text-base">
                  No hay órdenes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(Math.ceil(orders.length / ordersPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className="px-3 md:px-4 py-1 md:py-2 bg-gray-200 text-xs md:text-sm rounded-lg hover:bg-gray-300"
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && selectedOrderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Detalles de la Orden</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {modalLoading ? (
                <p className="text-center text-gray-500">Cargando detalles...</p>
              ) : (
                <div className="space-y-4">
                  {selectedOrderDetails.map((detail) => {
                    const product = detail.menuItem || detail.combo
                    return (
                      <div key={detail.id} className="p-4 border border-gray-200 rounded-lg space-y-2">
                        {product && (
                          <>
                            <div className="flex items-center gap-4">
                              {product.image_url && (
                                <img
                                  src={product.image_url || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              )}
                              <div>
                                <h4 className="font-semibold text-gray-800">{product.name}</h4>
                                <p className="text-sm text-gray-600">{product.description}</p>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">Cantidad:</span> {detail.quantity}
                              </p>
                              <p className="text-sm font-medium text-amber-500">
                                <span className="font-semibold text-gray-600">Subtotal:</span> ${detail.subtotal}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">Tipo:</span>{" "}
                                {product.type === "menuItem" ? "Menú" : "Combo"}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetOrders