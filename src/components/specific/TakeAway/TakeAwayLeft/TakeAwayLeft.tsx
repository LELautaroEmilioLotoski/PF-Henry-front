"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import CategorySelector from "./CategorySelector";
import ProductList from "./ProductList";
import { fetchMenuItems } from "@/helpers/menu-items.helper";

const TakeAwayLeft: React.FC = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const menuItems = await fetchMenuItems();
        setProducts(menuItems);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    getMenuItems();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="sticky top-0 bg-white z-10 space-y-6 p-4 border-b">
        <SearchBar search={search} setSearch={setSearch} />
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        />
      </div>
      <ProductList
        products={products}
        search={search}
        selectedCategory={selectedCategory}
        addToCart={addToCart}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default TakeAwayLeft;