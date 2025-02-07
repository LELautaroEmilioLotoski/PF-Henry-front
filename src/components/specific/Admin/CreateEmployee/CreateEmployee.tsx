"use client"

import { useState } from "react"
import { registerWorker } from "@/helpers/auth.helper"
import { validateRegisterForm } from "@/helpers/validate"
import type { IRegisterErrors, IRegisterProps } from "@/interfaces/Types"
import RoleHeader from "@/components/specific/Admin/AdminHeader/AdminHeader"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function CreateEmployee() {
  const initialState: IRegisterProps = {
    id: "",
    role: "",
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    address: "",
    image_url:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
  }

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState)
  const [errors, setErrors] = useState<IRegisterErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDataUser((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setErrors({})

    const validationErrors = validateRegisterForm(dataUser)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      toast.error("No se encontró el token. Por favor, inicia sesión.")
      setIsLoading(false)
      return
    }

    try {
      const res = await registerWorker(dataUser, token)

      if (res.data) {
        toast.success("Employee created successfully")
        setDataUser(initialState)
      } else {
        toast.error("There was an error creating the employee")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({})
    }

    setIsLoading(false)
  }

  return (
    <>
      {/* Contenedor de Toastify */}
      <ToastContainer />
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
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Create New Employee</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={dataUser.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={dataUser.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={dataUser.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                <input
                  type="password"
                  name="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={dataUser.ConfirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {errors.ConfirmPassword && <p className="text-red-500 text-sm mt-1">{errors.ConfirmPassword}</p>}

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={dataUser.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Employee"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateEmployee
