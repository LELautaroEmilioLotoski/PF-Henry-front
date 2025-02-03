"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import CategorySelector from "./CategorySelector";
import ProductList from "./ProductList";
import { fetchMenuItems, fetchCombos } from "@/helpers/menu-items.helper";

const TakeAwayLeft: React.FC = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenuItemsAndCombos = async () => {
      try {
        const [menuItems, combos] = await Promise.all([fetchMenuItems(), fetchCombos()]);

        // Agregar la categoría "Combo" sin modificar la estructura de los combos
        const comboProducts = combos.map((combo: any) => ({
          ...combo,
          category: {
            id: "combo",
            name: "Combo",
            icon: "Package",
          },
        }));

        // Combinar menuItems y comboProducts
        const allProducts = [...menuItems, ...comboProducts];
        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getMenuItemsAndCombos();
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
      />
    </div>
  );
};

export default TakeAwayLeft;
