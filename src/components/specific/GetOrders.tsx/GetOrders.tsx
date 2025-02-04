'use client'

import { useEffect, useState } from "react"
import { fetchOrders } from "@/helpers/user-data.helper"
import { X } from 'lucide-react'

const GetOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null)
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const email = user?.email;
  
      if (email) {
        fetchOrders(email)
          .then((data) => {
            console.log("Respuesta de la API:", data);
  
            if (Array.isArray(data) && data.length > 0) {
              setOrders(data);
            } else {
              setError("No hay órdenes disponibles.");
            }
  
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error al obtener órdenes:", err);
  
            if (err.response?.data?.message) {
              setError(err.response.data.message);
            } else {
              setError("Error al obtener órdenes.");
            }
  
            setLoading(false);
          });
      } else {
        setError("El usuario no tiene un email registrado.");
        setLoading(false);
      }
    } else {
      setError("No hay usuario en localStorage.");
      setLoading(false);
    }
  }, []);
  
  

  const handleOpenModal = (orderDetails) => {
    setSelectedOrderDetails(orderDetails)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrderDetails(null)
  }

  const handleSort = (column) => {
    const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortBy(column)
    setSortDirection(newDirection)

    const sortedOrders = [...orders].sort((a, b) => {
      if (column === 'date') {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return newDirection === 'asc' ? dateA - dateB : dateB - dateA
      } else if (column === 'total') {
        return newDirection === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice
      }
      return 0
    })

    setOrders(sortedOrders)
  }

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p className="text-xl font-semibold">Cargando órdenes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Órdenes</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Fecha
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                onClick={() => handleSort('total')}
              >
                Total
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Método de pago</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado de pago</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Detalles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{order.createdAt}</td>
                  <td className="px-4 py-3 text-sm font-medium text-amber-500">${order.totalPrice}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.payment_status}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.status}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleOpenModal(order.orderDetails)}
                      className="bg-amber-500 text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No hay órdenes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
              <div className="space-y-4">
                {selectedOrderDetails.map((detail) => (
                  <div
                    key={detail.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-2"
                  >
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">ID Producto:</span> {detail.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Cantidad:</span> {detail.quantity}
                    </p>
                    <p className="text-sm font-medium text-amber-500">
                      <span className="font-semibold text-gray-600">Subtotal:</span> ${detail.subtotal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetOrders

// import React from 'react'

// const GetOrders = () => {
//   return (
//     <div>GetOrders</div>
//   )
// }

// export default GetOrders