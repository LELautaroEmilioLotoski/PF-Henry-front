"use client";

import type React from "react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import productsToPreLoad from "@/helpers/products";
import categoryToPreLoad from "@/helpers/category";
import Image from "next/image";
import { Search } from "lucide-react";
import * as Icons from "lucide-react";

const TakeAwayLeft: React.FC = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = productsToPreLoad.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
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
    <div className="bg-white rounded-lg shadow-sm">
      <div className="sticky top-0 bg-white z-10 space-y-6 p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar productos por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-2">
            {categoryToPreLoad.map((category) => {
              const IconComponent =
                (Icons[
                  category.icon as keyof typeof Icons
                ] as React.ComponentType<React.SVGProps<SVGSVGElement>>) ||
                Icons["AlertCircle"];
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id.toLowerCase())}
                  className={`flex-shrink-0 h-auto aspect-square min-w-[5rem] flex flex-col items-center justify-center gap-1 rounded-lg transition-all
                    ${
                      selectedCategory === category.id.toLowerCase()
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-15rem)]">
        <div className="p-4 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-xl font-semibold">No products found</p>
            </div>
          ) : (
            Object.entries(groupedProducts).map(
              ([category, categoryProducts]) => (
                <div key={category} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {categoryToPreLoad.find(
                      (c) => c.id.toLowerCase() === category.toLowerCase()
                    )?.name || category}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {categoryProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg border p-4 flex gap-4 hover:shadow-md transition-shadow"
                      >
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
                                ${product.price.toLocaleString()}
                              </p>
                              <span className="text-sm text-gray-500">
                                Stock: {product.stock || 0}
                              </span>
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeAwayLeft;
