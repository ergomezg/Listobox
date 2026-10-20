"use client";

import React from "react";
import { ScreenId } from "@/types/listobox";
import { useListoBox } from "@/context/ListoBoxContext";
import { HERO_IMAGES } from "@/mocks/listoboxData";
import { WizardProgressBar } from "@/components/ui/WizardProgressBar";
import { BoxProgressSummary } from "@/components/ui/BoxProgressSummary";
import { CategoryFilterPills } from "@/components/ui/CategoryFilterPills";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { StickyBoxDock } from "@/components/ui/StickyBoxDock";

const STEP_MAP: Record<1 | 2 | 3 | 4, ScreenId> = {
  1: "wizard-step-1",
  2: "wizard-step-2",
  3: "wizard-step-3",
  4: "wizard-step-4",
};

export function WizardStep3Screen() {
  const {
    state,
    recipes,
    totalPortions,
    subtotalCOP,
    discountedTotalCOP,
    isRecipeBlockedByAllergen,
    setDietaryFilter,
    toggleRecipeInBox,
    openSwapSheet,
    openAllergenModal,
    navigateScreen,
  } = useListoBox();

  // Filter catalog by active dietary category pill
  const baseFeedRecipes = recipes.slice(0, 7);
  const feedRecipes =
    state.activeDietaryFilter === "todos"
      ? baseFeedRecipes
      : baseFeedRecipes.filter((r) =>
          r.dietaryCategories.includes(state.activeDietaryFilter)
        );

  return (
    <div>
      <WizardProgressBar
        currentStep={3}
        onStepSelect={(step) => navigateScreen(STEP_MAP[step])}
      />

      <div className="px-16 pt-16 pb-24">
        {/* Hero Image */}
        <div className="h-160 w-full rounded-2xl overflow-hidden bg-warm-sand">
          <img
            src={HERO_IMAGES.spicesBoard}
            alt="Ingredientes frescos dosificados ListoBox"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="mt-20 text-heading-mobile font-extrabold text-deep-forest">
          Elige tus {state.mealsPerWeek} cenas de la semana
        </h1>
        <p className="mt-8 text-body-sm text-slate-gray">
          Ingredientes frescos dosificados al gramo exacto. Personaliza tus
          porciones y proteínas en cada plato.
        </p>

        {/* Top Box Progress Summary Card */}
        <div className="mt-16">
          <BoxProgressSummary
            selectedSlots={state.selectedSlots}
            recipes={recipes}
            targetCount={state.mealsPerWeek}
            discountedTotalCOP={discountedTotalCOP}
            totalPortions={totalPortions}
            onRemoveSlot={toggleRecipeInBox}
          />
        </div>

        {/* Dietary Category Filter Pills (PRD §6 N2.1) */}
        <div className="mt-14">
          <CategoryFilterPills
            activeCategory={state.activeDietaryFilter}
            onSelectCategory={setDietaryFilter}
          />
        </div>

        {/* Recipe Feed (UX Pruning P1-P3 applied: unique recipes, descriptions & times) */}
        <div className="mt-14 flex flex-col gap-16">
          {feedRecipes.map((recipe) => {
            const selectedSlot = state.selectedSlots.find(
              (s) => s.recipeId === recipe.id
            );
            const isSelected = Boolean(selectedSlot);
            const isBlocked = isRecipeBlockedByAllergen(recipe);

            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                mode="catalog-feed"
                isSelected={isSelected}
                isBlockedByAllergen={isBlocked}
                selectedSlot={selectedSlot}
                onToggleSelect={toggleRecipeInBox}
                onOpenSwapSheet={openSwapSheet}
                onOpenAllergenModal={openAllergenModal}
                onEditAllergensProfile={() => navigateScreen("wizard-step-2")}
              />
            );
          })}
        </div>
      </div>

      {/* Persistent Sticky Box Dock */}
      <StickyBoxDock
        selectedCount={state.selectedSlots.length}
        targetCount={state.mealsPerWeek}
        subtotalCOP={subtotalCOP}
        totalPortions={totalPortions}
        onContinue={() => navigateScreen("wizard-step-4")}
      />
    </div>
  );
}
