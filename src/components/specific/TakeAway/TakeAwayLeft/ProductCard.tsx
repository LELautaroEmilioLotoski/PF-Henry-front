"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import type { ProductCardProps } from "@/interfaces/Types"
import InfoCard from "@/components/specific/TakeAway/TakeAwayLeft/InfoCard"

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, type }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const itemType = type || "menuItem"
  const stock = itemType === "menuItem" ? product.stock : product.stockCombos

  return (
    <>
      <div className="bg-white rounded-lg border p-4 flex gap-4 hover:shadow-md transition-shadow">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-amber-500 font-bold text-lg">${Number.parseFloat(String(product.price)).toLocaleString()}</p>
              <span className="text-sm text-gray-500">Stock: {stock || 0}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(product, itemType)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  stock === 0
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
                disabled={stock === 0}
              >
                Add to Cart
              </button>
              {itemType === "combo" && (
                <button
                  onClick={() => setIsInfoOpen(true)}
                  className="px-4 py-2 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Info
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <InfoCard isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} combo={product} />
    </>
  )
}

export default ProductCard