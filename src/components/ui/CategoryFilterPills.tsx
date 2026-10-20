"use client";

import React from "react";
import { DietaryCategoryId } from "@/types/listobox";
import { DIETARY_CATEGORIES } from "@/mocks/listoboxData";

interface CategoryFilterPillsProps {
  activeCategory: DietaryCategoryId;
  onSelectCategory: (id: DietaryCategoryId) => void;
}

export function CategoryFilterPills({
  activeCategory,
  onSelectCategory,
}: CategoryFilterPillsProps) {
  return (
    <div
      className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4"
      role="tablist"
      aria-label="Categorías nutricionales"
    >
      {DIETARY_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.id)}
            className={`shrink-0 inline-flex items-center gap-4 px-20 py-10 rounded-full min-h-11 min-w-11 text-body-sm transition-colors cursor-pointer ${
              isActive
                ? "bg-deep-forest text-lime-glow font-bold"
                : "bg-sage-mist text-forest-shadow font-bold hover:opacity-90"
            }`}
          >
            <span>{cat.label}</span>
            {cat.sublabel && (
              <span
                className={
                  isActive
                    ? "text-lime-glow/85 font-normal"
                    : "text-slate-gray font-normal"
                }
              >
                {cat.sublabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
