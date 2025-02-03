"use client";

import React from "react";
import Image from "next/image";
import { ProductCardProps } from "@/interfaces/Menu-item.interfaces";

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, type }) => {
  const itemType = type || "menuItem";

  return (
    <div className="bg-white rounded-lg border p-4 flex gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-amber-500 font-bold text-lg">
              ${parseFloat(product.price).toLocaleString()}
            </p>
            <span className="text-sm text-gray-500">
              Stock: {product.stock || 0}
            </span>
          </div>
          <button
            onClick={() => addToCart(product, itemType)}
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
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
  );
};

export default ProductCard;