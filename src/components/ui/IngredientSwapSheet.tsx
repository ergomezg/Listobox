"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  Checks,
  Clock,
  ClockCounterClockwise,
  CookingPot,
  ForkKnife,
  Heartbeat,
  Leaf,
  Package,
  ShieldCheck,
  Tree,
  X,
} from "@phosphor-icons/react";
import { formatCOP, Recipe } from "@/types/listobox";
import { PillButton } from "@/components/ui/PillButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface IngredientSwapSheetProps {
  isOpen: boolean;
  recipe: Recipe;
  peopleCount: number;
  initialProteinId?: string;
  initialSideSwapId?: string;
  onSaveSwap: (
    recipeId: string,
    proteinId: string,
    sideSwapId: string,
    extraCostCOP: number
  ) => void;
  onClose: () => void;
}

export function IngredientSwapSheet({
  isOpen,
  recipe,
  peopleCount,
  initialProteinId,
  initialSideSwapId,
  onSaveSwap,
  onClose,
}: IngredientSwapSheetProps) {
  const [selectedProteinId, setSelectedProteinId] = useState<string>(
    initialProteinId && initialProteinId !== recipe.defaultProteinId
      ? initialProteinId
      : "tofu-organico"
  );
  const [selectedSideId, setSelectedSideId] = useState<string>(
    initialSideSwapId ?? "yuca-actual"
  );

  useEffect(() => {
    setSelectedProteinId(
      initialProteinId && initialProteinId !== recipe.defaultProteinId
        ? initialProteinId
        : "tofu-organico"
    );
    setSelectedSideId(initialSideSwapId ?? "yuca-actual");
  }, [recipe, initialProteinId, initialSideSwapId]);

  if (!isOpen) return null;

  const currentProtein =
    recipe.proteinOptions.find((p) => p.id === selectedProteinId) ??
    recipe.proteinOptions[0];

  const handleSave = () => {
    onSaveSwap(
      recipe.id,
      currentProtein.id,
      selectedSideId,
      currentProtein.extraCostCOP
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="swap-sheet-title"
      className="relative z-50 bg-forest-shadow/75"
    >
      {/* Dimmed Background Context Header matching 05 - Bottomsheet cambio ingrediente.png */}
      <div className="px-16 pt-14 pb-20 opacity-35 pointer-events-none select-none">
        <span className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-deep-forest text-surface-white text-caption font-bold">
          <span>✓ Completa tu caja • 3 de 4 listas</span>
        </span>
        <h2 className="mt-12 text-heading-mobile font-extrabold text-forest-shadow">
          Tu caja semanal: 4 recetas listas
        </h2>
        <p className="mt-6 text-body-sm text-forest-shadow">
          Personaliza tus porciones, reemplaza guarniciones o haz cambio de
          proteínas...
        </p>
      </div>

      <div className="-mt-16 w-full max-w-md mx-auto bg-cream-canvas rounded-t-3xl pt-12 pb-24 px-16 shadow-xl border-t border-warm-sand relative z-10">
        {/* Top Handle + Close */}
        <div className="relative flex items-center justify-center pb-8">
          <span className="w-48 h-4 rounded-full bg-warm-gray/45 inline-block" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-0 inline-flex items-center justify-center min-h-11 min-w-11 w-44 h-44 rounded-full bg-surface-muted text-forest-shadow hover:bg-warm-sand transition-colors cursor-pointer"
            aria-label="Cerrar personalización de ingredientes"
          >
            <X weight="bold" size={18} />
          </button>
        </div>

        {/* Status Pill Badge */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-6 px-12 py-4 rounded-full bg-lime-glow text-forest-shadow text-caption font-extrabold uppercase">
            <Package weight="fill" size={14} />
            <span>RECETA EN TU CAJA · {peopleCount} PORCIONES</span>
          </span>
        </div>

        {/* Hero Photo with Bottom Badges */}
        <div className="relative mt-12 h-200 w-full rounded-2xl overflow-hidden bg-warm-sand">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10 right-10 flex items-center gap-8 flex-wrap">
            <span className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-caption font-bold">
              <Clock weight="regular" size={14} />
              <span>20 min</span>
            </span>
            <span className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-caption font-bold">
              <CookingPot weight="regular" size={14} />
              <span>1 Sartén</span>
            </span>
            <span className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-caption font-bold">
              <Tree weight="regular" size={14} />
              <span>Pastoreo 100%</span>
            </span>
          </div>
        </div>

        {/* Dish Header */}
        <h2
          id="swap-sheet-title"
          className="mt-16 text-heading-sm font-extrabold text-deep-forest"
        >
          {recipe.title}
        </h2>
        <p className="mt-6 text-body-sm text-slate-gray">
          {recipe.description}
        </p>

        {/* Section 1: Cambiar Proteína Principal */}
        <div className="mt-20">
          <SectionHeader
            dotBullet
            title="Cambiar Proteína Principal"
            rightElement={
              <span className="text-caption text-slate-gray">1 requerida</span>
            }
          />

          <div className="mt-12 flex flex-col gap-10">
            {recipe.proteinOptions.map((option) => {
              const isSelected = option.id === currentProtein.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedProteinId(option.id)}
                  className={`w-full flex items-center justify-between gap-12 p-14 rounded-2xl text-left min-h-11 min-w-11 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-sage-mist border border-deep-forest/20"
                      : "bg-surface-card/75 border border-transparent hover:bg-warm-sand/50"
                  }`}
                >
                  <div className="flex items-center gap-12 min-w-0">
                    <img
                      src={option.imageUrl}
                      alt={option.name}
                      className="w-48 h-48 rounded-full object-cover shrink-0 bg-warm-sand"
                    />
                    <div className="min-w-0">
                      <p className="text-body-sm font-bold text-forest-shadow">
                        {option.name}
                      </p>

                      {option.badgeText && (
                        <span className="mt-2 inline-block px-8 py-2 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold">
                          {option.badgeText}
                        </span>
                      )}

                      <p className="text-caption text-slate-gray mt-2">
                        {option.weightGrams}g · {option.subtitle}
                      </p>

                      <p
                        className={`text-caption font-bold mt-2 ${
                          option.extraCostCOP === 0
                            ? "text-deep-forest"
                            : "text-forest-shadow"
                        }`}
                      >
                        {option.isOriginal
                          ? "Incluido ($0)"
                          : option.extraCostCOP === 0
                          ? "Sin costo extra (+$0 COP)"
                          : `+${formatCOP(option.extraCostCOP)} COP`}
                      </p>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-deep-forest text-surface-white"
                        : "border border-warm-gray/40 bg-cream-canvas"
                    }`}
                  >
                    {isSelected && <Check weight="bold" size={14} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Guarnición y Base */}
        <div className="mt-24">
          <SectionHeader
            dotBullet
            title="Guarnición y Base"
            rightElement={
              <span className="text-caption text-slate-gray">3 elementos</span>
            }
          />

          <div className="mt-12 flex flex-col gap-12">
            {recipe.sideDishes.map((side) => (
              <div
                key={side.id}
                className="p-14 rounded-2xl bg-surface-card/75 border border-warm-sand/50"
              >
                <div className="flex items-center justify-between gap-10">
                  <div className="flex items-center gap-12">
                    <div className="w-36 h-36 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
                      {side.iconType === "fork-knife" && (
                        <ForkKnife weight="regular" size={18} />
                      )}
                      {side.iconType === "cooking-pot" && (
                        <CookingPot weight="regular" size={18} />
                      )}
                      {side.iconType === "leaf" && (
                        <Leaf weight="regular" size={18} />
                      )}
                    </div>

                    <div>
                      <p className="text-body-sm font-bold text-forest-shadow">
                        {side.name}
                      </p>
                      <p className="text-caption text-slate-gray">
                        {side.description}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 inline-flex items-center gap-4 px-10 py-4 rounded-full bg-sage-mist text-deep-forest text-caption font-bold">
                    <Check weight="bold" size={12} />
                    <span>{side.statusLabel}</span>
                  </span>
                </div>

                {/* Optional Side Swap Pills */}
                {side.swapOptions && (
                  <div className="mt-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {side.swapOptions.map((swapOpt) => {
                      const isActive = selectedSideId === swapOpt.id;
                      return (
                        <button
                          key={swapOpt.id}
                          type="button"
                          onClick={() => setSelectedSideId(swapOpt.id)}
                          className={`shrink-0 px-14 py-8 rounded-full text-caption font-bold min-h-11 min-w-11 transition-colors cursor-pointer ${
                            isActive
                              ? "bg-deep-forest text-surface-white"
                              : "bg-warm-sand text-forest-shadow"
                          }`}
                        >
                          {swapOpt.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Impacto Nutricional del cambio */}
        <div className="mt-24 p-16 rounded-2xl bg-warm-sand">
          <div className="flex items-center gap-8 text-deep-forest">
            <Heartbeat weight="regular" size={20} />
            <h3 className="text-body-lg font-extrabold">
              Impacto Nutricional del cambio
            </h3>
          </div>

          <div className="mt-14 grid grid-cols-4 gap-8">
            <div className="bg-cream-canvas rounded-3xl py-12 px-6 flex flex-col items-center text-center">
              <span className="text-subheading font-extrabold text-deep-forest">
                {currentProtein.macros.kcal}
              </span>
              <span className="text-caption text-slate-gray">kcal</span>
              <span className="text-micro font-bold text-olive-accent mt-2">
                {currentProtein.macros.kcalDeltaText}
              </span>
            </div>

            <div className="bg-cream-canvas rounded-3xl py-12 px-6 flex flex-col items-center text-center">
              <span className="text-subheading font-extrabold text-deep-forest">
                {currentProtein.macros.proteinGrams}g
              </span>
              <span className="text-caption text-slate-gray">Proteína</span>
              <span className="text-micro font-bold text-deep-forest mt-2">
                {currentProtein.macros.proteinTag}
              </span>
            </div>

            <div className="bg-cream-canvas rounded-3xl py-12 px-6 flex flex-col items-center text-center">
              <span className="text-subheading font-extrabold text-deep-forest">
                {currentProtein.macros.carbsGrams}g
              </span>
              <span className="text-caption text-slate-gray">Carbos</span>
              <span className="text-micro text-slate-gray mt-2">
                {currentProtein.macros.carbsTag}
              </span>
            </div>

            <div className="bg-cream-canvas rounded-3xl py-12 px-6 flex flex-col items-center text-center">
              <span className="text-subheading font-extrabold text-deep-forest">
                {currentProtein.macros.fatsGrams}g
              </span>
              <span className="text-caption text-slate-gray">Grasas</span>
              <span className="text-micro font-bold text-olive-accent mt-2">
                {currentProtein.macros.fatsTag}
              </span>
            </div>
          </div>

          {/* Allergen Safety Assurance Banner */}
          <div className="mt-14 p-12 rounded-xl bg-sage-mist flex items-center gap-10">
            <ShieldCheck
              weight="fill"
              size={22}
              className="text-deep-forest shrink-0"
            />
            <p className="text-caption text-forest-shadow">
              <span className="font-bold">
                100% Libre de tus alérgenos vetados:
              </span>{" "}
              Sin mariscos, sin maní y sin lactosa agregada.
            </p>
          </div>
        </div>

        {/* Sticky Save Footer */}
        <div className="mt-20 pt-12 border-t border-warm-sand">
          <PillButton
            variant="lime"
            size="lg"
            leftIcon={<Checks weight="bold" size={20} />}
            priceBadge={
              currentProtein.extraCostCOP === 0
                ? "+$0 COP"
                : `+${formatCOP(currentProtein.extraCostCOP)} COP`
            }
            onClick={handleSave}
          >
            Guardar cambios
          </PillButton>

          <div className="mt-10 flex items-center justify-center gap-6 text-caption text-slate-gray">
            <ClockCounterClockwise weight="regular" size={14} />
            <span>Puedes revertir este cambio hasta el martes a las 23:59</span>
          </div>
        </div>
      </div>
    </div>
  );
}
