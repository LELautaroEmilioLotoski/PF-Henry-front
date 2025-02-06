"use client";

import React from "react";
import { ProductListProps } from "@/interfaces/Menu-item.interfaces";
import ProductCard from "@/components/specific/TakeAway/TakeAwayLeft/ProductCard";

const ProductList: React.FC<ProductListProps> = ({
  products,
  search,
  selectedCategory,
  addToCart,
  loading,
  error,
}) => {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.id.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const categoryName = product.category?.name || "Sin categoría";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p className="text-xl font-semibold">No products found</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {category}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                type={product.type || "menuItem"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;