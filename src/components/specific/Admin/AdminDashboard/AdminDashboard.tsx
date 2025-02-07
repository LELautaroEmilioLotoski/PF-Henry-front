"use client"

import { useUserContext } from "@/context/UserContext"
import RoleHeader from '@/components/specific/Admin/AdminHeader/AdminHeader'
import FileUploadComponent from "@/app/Cloudinary/page"

function AdminDashboard() {

  const { userNormal } = useUserContext()

  if (!userNormal) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Welcome, {userNormal.name}</h1>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo on the left */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <FileUploadComponent userprops={userNormal} />
                </div>
              </div>

              {/* Data on the right */}
              <div className="w-full md:w-2/3">
                <div className="bg-gray-50 rounded-lg p-6 shadow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Data</h2>
                  <div className="space-y-3">
                    <p className="text-base md:text-lg text-gray-600">
                      <span className="font-medium">Name:</span> {userNormal.name}
                    </p>
                    <p className="text-base md:text-lg text-gray-600">
                      <span className="font-medium">Email:</span> {userNormal.email}
                    </p>
                    <p className="text-base md:text-lg text-gray-600">
                      <span className="font-medium">Address:</span> {userNormal.address || "No registrada"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard