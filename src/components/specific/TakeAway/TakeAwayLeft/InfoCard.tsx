"use client"

import type React from "react"
import Image from "next/image"

interface InfoCardProps {
  isOpen: boolean
  onClose: () => void
  combo: {
    name: string
    menuItems?: {
      id: string
      name: string
      description: string
      price: string
      image_url?: string
    }[]
  }
}

const InfoCard: React.FC<InfoCardProps> = ({ isOpen, onClose, combo }) => {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] md:inset-x-auto md:left-[50%] md:translate-x-[-50%] md:max-w-lg w-full bg-white rounded-lg shadow-xl z-50 max-h-[80vh] overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Items in {combo.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid gap-4">
            {combo.menuItems?.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  <p className="text-sm font-medium text-amber-500 mt-1">
                    ${Number.parseFloat(item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoCard