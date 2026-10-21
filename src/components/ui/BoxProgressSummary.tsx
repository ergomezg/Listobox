"use client";

import React from "react";
import { CheckCircle, Package } from "@phosphor-icons/react";
import { formatCOP, Recipe, SelectedRecipeSlot } from "@/types/listobox";

interface BoxProgressSummaryProps {
  selectedSlots: SelectedRecipeSlot[];
  recipes: Recipe[];
  targetCount: number;
  discountedTotalCOP: number;
  totalPortions: number;
  onRemoveSlot?: (recipeId: string) => void;
}

export function BoxProgressSummary({
  selectedSlots,
  recipes,
  targetCount,
  discountedTotalCOP,
  totalPortions,
  onRemoveSlot,
}: BoxProgressSummaryProps) {
  const selectedCount = selectedSlots.length;
  const missingCount = Math.max(0, targetCount - selectedCount);

  return (
    <div className="bg-sage-mist/85 rounded-2xl p-16 border border-deep-forest/15">
      {/* Row 1: Title + Missing Badge */}
      <div className="flex items-center justify-between gap-8">
        <div className="inline-flex items-center gap-8 text-deep-forest font-bold text-body">
          <Package weight="regular" size={18} />
          <span>
            Tu Caja: {selectedCount} de {targetCount} recetas
          </span>
        </div>

        <span className="px-10 py-2 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold uppercase">
          {missingCount > 0 ? `FALTA ${missingCount}` : "COMPLETA"}
        </span>
      </div>

      {/* Row 2: Price + Plan Info */}
      <div className="flex items-center justify-between gap-8 mt-6">
        <span className="text-deep-forest font-extrabold text-body-sm">
          {formatCOP(discountedTotalCOP)} COP
        </span>
        <span className="text-slate-gray text-caption">
          Plan Dúo Vital ({totalPortions} porciones)
        </span>
      </div>

      {/* Row 3: Recipe Slot Pills */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar mt-12">
        {selectedSlots.map((slot) => {
          const recipe = recipes.find((r) => r.id === slot.recipeId);
          if (!recipe) return null;
          return (
            <button
              key={slot.recipeId}
              type="button"
              onClick={() => onRemoveSlot?.(slot.recipeId)}
              className="shrink-0 inline-flex items-center gap-4 px-10 py-6 rounded-full bg-deep-forest text-surface-white text-caption font-bold min-h-11 min-w-11 cursor-pointer"
              title={`Quitar ${recipe.title}`}
            >
              <CheckCircle
                weight="regular"
                size={14}
                className="text-lime-glow shrink-0"
              />
              <span className="truncate max-w-80">{recipe.shortName}</span>
            </button>
          );
        })}

        {missingCount > 0 && (
          <span className="shrink-0 inline-flex items-center justify-center px-12 py-6 rounded-full bg-lime-glow text-forest-shadow text-caption font-extrabold min-h-11 min-w-11">
            + {missingCount} Recet
          </span>
        )}
      </div>
    </div>
  );
}
