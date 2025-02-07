"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { ChevronUp, ChevronDown } from "lucide-react"
import RoleHeader from "../../Admin/AdminHeader/AdminHeader"
import { getReservationsByEmail } from "@/helpers/user.helper"
import { getAllReservations, updateReservationStatus } from "@/helpers/reservations.helper"

export interface IUser {
  id: string
  email: string
  name: string
}

export interface IReservationTable {
  id: string
  date: string
  time: string
  guest: number
  status: string
  create_at: string
  userId: IUser
}

type SortDirection = "asc" | "desc"
type SortableColumns = "name" | "email" | "date" | "time" | "guest" | "status"

export default function GetAllReservations() {
  console.log("🟢 The ReservationsPage component is rendering")
  const [reservations, setReservations] = useState<IReservationTable[]>([])
  const [email, setEmail] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    column: SortableColumns | null
    direction: SortDirection
  }>({
    column: null,
    direction: "asc",
  })

  useEffect(() => {
    const storedToken = Cookies.get("token")
    if (!storedToken) return

    setToken(storedToken)
    fetchReservations(storedToken)
  }, [])

  const fetchReservations = async (token: string) => {
    try {
      const data = await getAllReservations(token)
      setReservations(Array.isArray(data) ? data : [])
    } catch {
      setReservations([])
    }
  }

  const handleSearch = async () => {
    if (!token) return
    try {
      const data = email ? await getReservationsByEmail(email, token) : await getAllReservations(token)

      setReservations(Array.isArray(data) ? data : [])
    } catch {
      setReservations([])
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!token) return
    try {
      await updateReservationStatus(id, newStatus, token)
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: newStatus } : reservation,
        ),
      )
    } catch (error) {
      console.error("❌ Error updating reservation:", error)
    }
  }

  const handleSort = (column: SortableColumns) => {
    setSortConfig((currentConfig) => {
      const newDirection: SortDirection =
        currentConfig.column === column && currentConfig.direction === "asc" ? "desc" : "asc"

      const sortedReservations = [...reservations].sort((a, b) => {
        let valueA: any
        let valueB: any

        // Handle nested properties for user-related columns
        if (column === "name") {
          valueA = a.userId?.name || ""
          valueB = b.userId?.name || ""
        } else if (column === "email") {
          valueA = a.userId?.email || ""
          valueB = b.userId?.email || ""
        } else {
          valueA = a[column]
          valueB = b[column]
        }

        // Handle different data types
        if (typeof valueA === "number" && typeof valueB === "number") {
          return newDirection === "asc" ? valueA - valueB : valueB - valueA
        }

        // Handle date comparison
        if (column === "date") {
          const dateA = new Date(valueA)
          const dateB = new Date(valueB)
          return newDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
        }

        // Default string comparison
        return newDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      })

      setReservations(sortedReservations)

      return {
        column,
        direction: newDirection,
      }
    })
  }

  const getSortIcon = (column: SortableColumns) => {
    if (sortConfig.column !== column) {
      return null
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    )
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Reservation Management</h2>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={!token}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      onClick={() => handleSort("name")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Name {getSortIcon("name")}
                    </th>
                    <th
                      onClick={() => handleSort("email")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Email {getSortIcon("email")}
                    </th>
                    <th
                      onClick={() => handleSort("date")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Date {getSortIcon("date")}
                    </th>
                    <th
                      onClick={() => handleSort("time")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Time {getSortIcon("time")}
                    </th>
                    <th
                      onClick={() => handleSort("guest")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Guest {getSortIcon("guest")}
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Status {getSortIcon("status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservations.length ? (
                    reservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-gray-50">
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {reservation.userId?.name || "Not available"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {reservation.userId?.email || "Not available"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {reservation.date}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {reservation.time}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {reservation.guest || "Not available"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base">
                          <select
                            className="w-full border border-gray-200 rounded-lg px-2 py-1 text-sm md:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={reservation.status}
                            onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm md:text-base">
                        No reservations available.
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