"use client";

import React from "react";
import * as Icons from "lucide-react";
import { CategorySelectorProps } from "@/interfaces/Menu-item.interfaces";
import categoryToPreLoad from "@/helpers/category";

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
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