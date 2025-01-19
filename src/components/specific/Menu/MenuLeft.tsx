"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import productsToPreLoad from "@/helpers/products";
import categoryToPreLoad from "@/helpers/category";
import Image from "next/image";
import { Search } from "lucide-react";

const MenuLeft: React.FC = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = productsToPreLoad.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof productsToPreLoad>);

  return (
    <div className="relative">
      {/* Sticky header with search and categories */}
      <div className="sticky top-0 bg-white z-10 space-y-6 pb-6 pt-4 px-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar productos por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 text-gray-700 bg-white shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-5 gap-2">
          {categoryToPreLoad.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center aspect-square w-20 justify-center rounded-full transition-all
        ${
          selectedCategory === category.id
            ? "bg-[#FFF8E7] text-gray-800 scale-105"
            : "bg-[#FFF8E7] hover:scale-105 text-gray-600"
        }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable products section */}
      <div className="px-4 space-y-6">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {categoryToPreLoad.find((c) => c.id === category)?.name ||
                category}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
                >
                  {/* Left side: Product info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-amber-500 font-bold text-lg">
                          ${product.price.toLocaleString()}
                        </p>
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock || 0}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-amber-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Right side: Product image */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuLeft;
