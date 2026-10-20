"use client";

import React from "react";
import {
  ArrowRight,
  ArrowsLeftRight,
  CaretDown,
  CheckCircle,
  Clock,
  Plus,
  SlidersHorizontal,
  Tractor,
  Warning,
} from "@phosphor-icons/react";
import { formatCOP, Recipe, SelectedRecipeSlot } from "@/types/listobox";

export type RecipeCardMode =
  | "carousel-preview"
  | "catalog-feed"
  | "active-subscriber";

interface RecipeCardProps {
  recipe: Recipe;
  mode: RecipeCardMode;
  isSelected?: boolean;
  isBlockedByAllergen?: boolean;
  selectionNumber?: number;
  selectedSlot?: SelectedRecipeSlot;
  onToggleSelect: (recipeId: string) => void;
  onOpenSwapSheet: (recipeId: string) => void;
  onOpenAllergenModal: (recipeId: string) => void;
  onEditAllergensProfile?: () => void;
}

export function RecipeCard({
  recipe,
  mode,
  isSelected = false,
  isBlockedByAllergen = false,
  selectionNumber,
  selectedSlot,
  onToggleSelect,
  onOpenSwapSheet,
  onOpenAllergenModal,
  onEditAllergensProfile,
}: RecipeCardProps) {
  const isProteinSwapped = Boolean(
    selectedSlot?.selectedProteinId &&
      selectedSlot.selectedProteinId !== recipe.defaultProteinId
  );
  const currentProteinOption = isProteinSwapped
    ? recipe.proteinOptions.find((p) => p.id === selectedSlot?.selectedProteinId)
    : undefined;

  // ---------------------------------------------------------------------------
  // 1. CAROUSEL PREVIEW CARD (01 - Home - Guest.png)
  // ---------------------------------------------------------------------------
  if (mode === "carousel-preview") {
    return (
      <article className="shrink-0 w-260 bg-surface-white rounded-3xl p-12 flex flex-col justify-between border border-warm-sand/60">
        <div>
          <div className="relative h-160 w-full rounded-2xl overflow-hidden bg-warm-sand">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            {recipe.topBadge.variant === "online-only" ? (
              <span className="absolute top-10 left-10 px-12 py-4 rounded-full bg-deep-forest text-surface-white text-micro font-extrabold uppercase tracking-wider">
                ONLINE ONLY
              </span>
            ) : (
              <span className="absolute top-10 left-10 px-12 py-4 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold uppercase tracking-wider">
                CHEF SIGNATURE
              </span>
            )}

            <span className="absolute bottom-8 right-8 inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/80 text-surface-white text-micro font-bold">
              <Clock weight="regular" size={12} />
              <span>{recipe.prepTimeMinutes} min</span>
            </span>
          </div>

          <div className="mt-12 px-4">
            <div className="flex items-center gap-6 text-caption">
              <span className="text-slate-gray">{recipe.kcal} kcal</span>
              <span className="text-slate-gray">•</span>
              <span className="text-deep-forest font-bold">
                {recipe.categoryLabel}
              </span>
            </div>

            <h3 className="mt-4 text-body font-bold text-forest-shadow leading-snug">
              {recipe.title}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleSelect(recipe.id)}
          className="mt-12 w-full inline-flex items-center justify-center gap-6 py-10 px-16 rounded-full bg-sage-mist text-deep-forest text-body-sm font-bold min-h-11 min-w-11 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus weight="bold" size={14} />
          <span>
            {isSelected ? "Agregada a mi prueba" : "Agregar a mi prueba"}
          </span>
        </button>
      </article>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. ACTIVE SUBSCRIBER CARD (08 - Home - Usuario activo.png)
  // ---------------------------------------------------------------------------
  if (mode === "active-subscriber") {
    if (isBlockedByAllergen) {
      return (
        <article
          onClick={() => onOpenAllergenModal(recipe.id)}
          className="rounded-3xl border border-deep-forest/25 bg-cream-canvas p-16 cursor-pointer"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between gap-8 mb-12">
            <div className="inline-flex items-center gap-6 text-danger-dark text-caption font-bold whitespace-nowrap">
              <Warning weight="bold" size={16} />
              <span>Alérgeno detectado en tu perfil</span>
            </div>
            <span className="px-10 py-4 rounded-full bg-danger-badge text-danger-dark text-micro font-bold shrink-0">
              Bloqueada
            </span>
          </div>

          {/* Desaturated Image */}
          <div className="relative h-180 w-full rounded-2xl overflow-hidden bg-warm-sand">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover opacity-75 grayscale-25"
            />
          </div>

          <h3 className="mt-14 text-subheading font-bold text-slate-gray line-through">
            Cazuela de Langostinos al Coco y Patacón
          </h3>

          <p className="mt-6 text-body-sm text-slate-gray">
            No seleccionable automáticamente debido a tus preferencias de
            alérgenos configuradas.
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onEditAllergensProfile) {
                onEditAllergensProfile();
              } else {
                onOpenAllergenModal(recipe.id);
              }
            }}
            className="mt-10 inline-flex items-center min-h-11 min-w-11 text-body-sm font-bold text-deep-forest underline cursor-pointer"
          >
            Modificar filtros de alérgenos en Perfil
          </button>
        </article>
      );
    }

    return (
      <article className="rounded-3xl border border-deep-forest/25 bg-cream-canvas p-16">
        {/* Top Selection Header */}
        <div className="flex items-center justify-between gap-8 mb-12">
          <span className="text-body-sm font-bold text-slate-gray">
            Selección #{selectionNumber ?? 1}
          </span>
          <span className="px-12 py-4 rounded-full bg-deep-forest text-surface-white text-caption font-bold">
            En tu caja
          </span>
        </div>

        {/* Dish Photo */}
        <div className="relative h-180 w-full rounded-2xl overflow-hidden bg-warm-sand">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-10 right-10 inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-caption font-bold">
            <Clock weight="regular" size={14} />
            <span>{recipe.prepTimeMinutes} min</span>
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-14 text-subheading font-bold text-deep-forest">
          {recipe.title}
        </h3>
        <p className="mt-6 text-body-sm text-slate-gray">
          {recipe.description}
        </p>

        {/* Meta Row */}
        <div className="mt-10 flex items-center gap-8 text-body-sm">
          <span className="text-slate-gray">{recipe.portions} porciones</span>
          <span className="text-slate-gray">•</span>
          <span className="text-deep-forest font-bold">
            {currentProteinOption?.macros.proteinGrams ?? recipe.proteinGrams}g
            proteína
          </span>
          <span className="text-slate-gray">•</span>
          <span className="text-slate-gray">
            {currentProteinOption?.macros.kcal ?? recipe.kcal} kcal
          </span>
        </div>

        {/* Bottom Action Row */}
        <div className="mt-12 pt-8 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => onOpenSwapSheet(recipe.id)}
            className="inline-flex items-center gap-6 min-h-11 min-w-11 text-body-sm font-bold text-deep-forest hover:underline cursor-pointer"
          >
            <SlidersHorizontal weight="regular" size={16} />
            <span>Personalizar receta</span>
          </button>

          <span className="text-body-sm text-slate-gray">
            {selectedSlot && selectedSlot.extraCostCOP > 0
              ? `+${formatCOP(selectedSlot.extraCostCOP)} COP`
              : recipe.tagRight}
          </span>
        </div>
      </article>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. CATALOG FEED CARD (04 - Paso 3 & 06 - Paso 4)
  // ---------------------------------------------------------------------------
  if (isBlockedByAllergen) {
    return (
      <article className="rounded-3xl border border-deep-forest/25 bg-cream-canvas p-16">
        <div
          onClick={() => onOpenAllergenModal(recipe.id)}
          className="relative h-180 w-full rounded-2xl overflow-hidden bg-warm-sand cursor-pointer"
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-70"
          />
          <span className="absolute top-10 left-10 inline-flex items-center gap-6 px-12 py-4 rounded-full bg-danger-light text-danger-dark border border-danger-border text-micro font-bold">
            <Warning weight="bold" size={12} />
            <span>{recipe.topBadge.text}</span>
          </span>
          <span className="absolute bottom-10 right-10 inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/75 text-surface-white text-caption font-bold">
            <Clock weight="regular" size={14} />
            <span>{recipe.prepTimeMinutes} min</span>
          </span>
        </div>

        {/* Meta line (UX Pruning P3: single time in image badge, clean meta below) */}
        <div className="mt-12 flex items-center gap-6 text-caption text-slate-gray">
          <span>{recipe.portions} porciones</span>
          <span>•</span>
          <span>{recipe.kcal} kcal</span>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenAllergenModal(recipe.id)}
            className="inline-flex items-center min-h-11 min-w-11 px-4 -my-14 text-deep-forest font-bold underline cursor-pointer"
          >
            Cambio seguro
          </button>
        </div>

        <h3 className="mt-6 text-subheading font-bold text-deep-forest">
          {recipe.title}
        </h3>

        <button
          type="button"
          onClick={() => onOpenAllergenModal(recipe.id)}
          className="mt-14 w-full inline-flex items-center justify-center gap-8 py-12 px-20 rounded-full bg-deep-forest text-surface-white text-body-sm font-bold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
        >
          <ArrowsLeftRight weight="regular" size={16} />
          <span>Ver alternativa segura</span>
        </button>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              onEditAllergensProfile
                ? onEditAllergensProfile()
                : onOpenAllergenModal(recipe.id)
            }
            className="inline-flex items-center gap-6 min-h-11 min-w-11 text-caption text-slate-gray font-medium hover:text-deep-forest cursor-pointer"
          >
            <span>Personalizar alérgenos en tu perfil</span>
            <SlidersHorizontal weight="regular" size={12} />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-3xl border border-deep-forest/25 bg-cream-canvas p-16">
      {/* Dish Image with Badges */}
      <div className="relative h-180 w-full rounded-2xl overflow-hidden bg-warm-sand">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-10 left-10 inline-flex items-center gap-6 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-micro font-bold">
          <Tractor weight="regular" size={14} className="text-lime-glow" />
          <span>{recipe.topBadge.text}</span>
        </span>

        <span className="absolute bottom-10 right-10 inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-caption font-bold">
          <Clock weight="regular" size={14} />
          <span>{recipe.prepTimeMinutes} min</span>
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="mt-14 text-subheading font-bold text-deep-forest">
        {recipe.title}
      </h3>
      <p className="mt-6 text-body-sm text-slate-gray">{recipe.description}</p>

      {/* Nutritional Meta Row */}
      <div className="mt-10 flex items-center gap-8 text-caption">
        <span className="text-slate-gray">{recipe.portions} porciones</span>
        <span className="text-slate-gray">•</span>
        <span className="text-deep-forest font-bold">
          {currentProteinOption?.macros.proteinGrams ?? recipe.proteinGrams}g
          proteína
        </span>
        <span className="text-slate-gray">•</span>
        <span className="text-slate-gray">
          {currentProteinOption?.macros.kcal ?? recipe.kcal} kcal
        </span>
      </div>

      {/* Personalizar Receta Chip + Cost Label */}
      <div className="mt-10 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => onOpenSwapSheet(recipe.id)}
          className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-surface-card text-deep-forest text-caption font-bold min-h-11 min-w-11 hover:bg-sage-mist transition-colors cursor-pointer"
        >
          <SlidersHorizontal weight="regular" size={14} />
          <span>Personalizar receta</span>
        </button>

        <span className="text-caption text-slate-gray">
          {selectedSlot && selectedSlot.extraCostCOP > 0
            ? `+${formatCOP(selectedSlot.extraCostCOP)} COP`
            : "Sin costo extra"}
        </span>
      </div>

      {/* Protein Swap Selector Dropdown Trigger */}
      {isSelected && (
        <button
          type="button"
          onClick={() => onOpenSwapSheet(recipe.id)}
          className="mt-10 w-full flex items-center justify-between gap-8 px-14 py-10 rounded-xl bg-warm-sand text-deep-forest text-caption font-bold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
        >
          <span className="inline-flex items-center gap-6 truncate">
            <ArrowsLeftRight weight="regular" size={14} />
            <span className="truncate">
              Proteína:{" "}
              {selectedSlot?.selectedProteinId &&
              selectedSlot.selectedProteinId !== recipe.defaultProteinId
                ? currentProteinOption?.name ?? recipe.defaultProteinLabel
                : recipe.defaultProteinLabel}
            </span>
          </span>
          <CaretDown weight="bold" size={14} className="shrink-0" />
        </button>
      )}

      {/* Main Action Button */}
      {isSelected ? (
        <button
          type="button"
          onClick={() => onToggleSelect(recipe.id)}
          className="mt-12 w-full inline-flex items-center justify-center gap-8 py-12 px-20 rounded-full bg-deep-forest text-surface-white text-body-sm font-bold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
        >
          <CheckCircle
            weight="regular"
            size={18}
            className="text-lime-glow shrink-0"
          />
          <span>✓ En tu caja (Tap para cambiar)</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onToggleSelect(recipe.id)}
          className="mt-12 w-full inline-flex items-center justify-center gap-8 py-12 px-20 rounded-full bg-lime-glow text-forest-shadow text-body-sm font-extrabold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
        >
          <Plus weight="bold" size={16} />
          <span>Agregar a mi caja</span>
        </button>
      )}

      {/* Footer Link */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => onOpenSwapSheet(recipe.id)}
          className="inline-flex items-center gap-6 min-h-11 min-w-11 text-caption font-bold text-deep-forest hover:underline cursor-pointer"
        >
          <span>
            Ver ficha nutricional & {recipe.ingredientsCount} ingredientes
            locales
          </span>
          <ArrowRight weight="bold" size={12} />
        </button>
      </div>
    </article>
  );
}
