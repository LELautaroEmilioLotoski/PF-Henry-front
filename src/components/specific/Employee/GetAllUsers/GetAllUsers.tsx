"use client"

import { useEffect, useState } from "react"
import { getActiveUsers } from "@/helpers/auth.helper"
import type { IUser } from "@/interfaces/Types"
import { ChevronUp, ChevronDown } from "lucide-react"
import RoleHeader from "../../Admin/AdminHeader/AdminHeader"

type SortDirection = "asc" | "desc"
type SortableColumns = "name" | "email" | "role" | "address"

export default function GetAllUsers() {
  const [users, setUsers] = useState<IUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    column: SortableColumns | null
    direction: SortDirection
  }>({
    column: null,
    direction: "asc",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await getActiveUsers()
      const transformedUsers = response.map((user) => ({
        id: user.id,
        email: user.email,
        roles: user.roles,
        name: user.name,
        address: user.address,
        role: user.role,
        image_url: user.image_url,
        created_atts: user.created_atts,
      }))
      setUsers(transformedUsers)
    } catch (error) {
      console.error("Error al obtener los usuarios:", error)
    }
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      fetchUsers()
      return
    }

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setUsers(filteredUsers)
  }

  const handleSort = (column: SortableColumns) => {
    setSortConfig((currentConfig) => {
      const newDirection: SortDirection =
        currentConfig.column === column && currentConfig.direction === "asc" ? "desc" : "asc"

      const sortedUsers = [...users].sort((a, b) => {
        const valueA = (a[column] || "").toString().toLowerCase()
        const valueB = (b[column] || "").toString().toLowerCase()

        return newDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      })

      setUsers(sortedUsers)

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
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Active Users</h2>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
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
                      onClick={() => handleSort("role")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Role {getSortIcon("role")}
                    </th>
                    <th
                      onClick={() => handleSort("address")}
                      className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Address {getSortIcon("address")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length ? (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">{user.name}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">{user.email}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {user.role || "N/A"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600">
                          {user.address || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500 text-sm md:text-base">
                        No users available.
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