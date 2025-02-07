"use client"

import { useState, useEffect } from "react"
import { fetchMenuItems } from "@/helpers/menu-items.helper"
import { fetchCategories, patchMenuItem } from "@/helpers/admin.helper"
import type { ICategory, IMenuItem } from "@/interfaces/Types"
import RoleHeader from "@/components/specific/Admin/AdminHeader/AdminHeader"
import { toast, ToastContainer } from "react-toastify" // Importación de Toastify
import "react-toastify/dist/ReactToastify.css"

const EditMenuItem = ({ menuItemId }: { menuItemId: string }) => {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<string>(menuItemId)
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [stock, setStock] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [category, setCategory] = useState<string | ICategory>("")

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchMenuItems()
        setMenuItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      }
    }

    fetchItems()
  }, [])

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await fetchCategories()
        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCats()
  }, [])

  useEffect(() => {
    if (selectedMenuItemId) {
      const menuItem = menuItems.find((item) => item.id === selectedMenuItemId)
      if (menuItem) {
        setName(menuItem.name)
        setDescription(menuItem.description)
        setPrice(String(menuItem.price))
        setStock(String(menuItem.stock))
        setImageUrl(menuItem.image_url || "")
        setCategory(menuItem.category)
      }
    }
  }, [selectedMenuItemId, menuItems])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedMenuItem: IMenuItem = {
      id: selectedMenuItemId,
      type: "menuItem",
      isActive: true,
      name,
      description,
      price: Number.parseFloat(price),
      stock: Number.parseInt(stock),
      image_url: imageUrl,
      category: typeof category === "string" ? category : category?.name,
    }

    try {
      const { data } = await patchMenuItem(selectedMenuItemId, updatedMenuItem)
      console.log("Updated menu item:", data)
      toast.success("Menu item updated successfully!") // Toastify en lugar de alert
    } catch (error) {
      console.error(error)
      toast.error("Error updating menu item.") // Toastify en lugar de alert
    }
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Edit Menu Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="menuItem" className="block text-sm font-medium text-gray-700">
                  Select Menu Item
                </label>
                <select
                  id="menuItem"
                  value={selectedMenuItemId}
                  onChange={(e) => setSelectedMenuItemId(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select an item</option>
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMenuItemId && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image_url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      value={typeof category === "string" ? category : category?.name}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Update Item
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default EditMenuItem
