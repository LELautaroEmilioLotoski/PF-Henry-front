"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import CategorySelector from "./CategorySelector";
import ProductList from "./ProductList";
import { fetchMenuItems, fetchCombos } from "@/helpers/menu-items.helper";
import { IProduct, ICategory } from "@/interfaces/Types";

const TakeAwayLeft: React.FC = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMenuItemsAndCombos = async () => {
      try {
        const [menuItems, combos] = await Promise.all([fetchMenuItems(), fetchCombos()]);

        
        const comboProducts = combos.map((combo: IProduct) => ({
          ...combo,
          category: {
            id: "combo",
            name: "Combo",
            icon: "Package",
          } as ICategory,
          type: "combo",
        }));

        
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
      <div className="bg-white z-10 space-y-6 p-4 border-b">
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