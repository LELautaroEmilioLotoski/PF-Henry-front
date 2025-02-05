import React, { useMemo } from "react";
import * as Icons from "lucide-react";
import { ICategory, CategorySelectorProps } from "@/interfaces/Types";

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
  products,
}) => {
  const categories = useMemo(() => {
    const categoryMap = new Map<string, ICategory>();
    products.forEach((product) => {
      if (product.category && typeof product.category !== 'string' && product.category.id) {
        categoryMap.set(product.category.id, product.category);
      }
    });
    return Array.from(categoryMap.values());
  }, [products]);

  return (
    <div className="overflow-x-auto pb-2 -mx-4 px-4">
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex-shrink-0 h-auto aspect-square min-w-[5rem] flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${
            selectedCategory === "all"
              ? "bg-amber-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Icons.List className="h-5 w-5" />
          <span className="text-xs font-medium">All</span>
        </button>

        {categories.map((category) => {
          if (!category || !category.icon) return null;

          const IconComponent =
            (Icons[
              category.icon as keyof typeof Icons
            ] as React.ComponentType<React.SVGProps<SVGSVGElement>>) ||
            Icons["AlertCircle"];

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id.toLowerCase())}
              className={`flex-shrink-0 h-auto aspect-square min-w-[5rem] flex flex-col items-center justify-center gap-1 rounded-lg transition-all ${
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
  );
};

export default CategorySelector;