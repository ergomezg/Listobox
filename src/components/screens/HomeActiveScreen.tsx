"use client";

import React from "react";
import { CalendarCheck, CheckCircle, PauseCircle } from "@phosphor-icons/react";
import { useListoBox } from "@/context/ListoBoxContext";
import { CategoryFilterPills } from "@/components/ui/CategoryFilterPills";
import { RecipeCard } from "@/components/ui/RecipeCard";

export function HomeActiveScreen() {
  const {
    state,
    recipes,
    isRecipeBlockedByAllergen,
    setDietaryFilter,
    toggleRecipeInBox,
    openSwapSheet,
    openAllergenModal,
    navigateScreen,
    toggleSkipWeek,
    openSkipWeekModal,
  } = useListoBox();

  const activeSelectedRecipes = state.selectedSlots
    .map((slot) => recipes.find((r) => r.id === slot.recipeId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const blockedRecipes = recipes.filter((r) => isRecipeBlockedByAllergen(r));

  const filterByCategory = (list: typeof recipes) => {
    if (state.activeDietaryFilter === "todos") return list;
    return list.filter((r) =>
      r.dietaryCategories.includes(state.activeDietaryFilter)
    );
  };

  const visibleSelected = filterByCategory(activeSelectedRecipes);
  const visibleBlocked = filterByCategory(blockedRecipes);

  return (
    <div className="pb-24 px-16 pt-16">
      {/* Top Status Pill + 1-Tap Skip Week Action (PRD Rule #8) */}
      <div className="flex items-center justify-between gap-8">
        <span className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-deep-forest text-surface-white text-caption font-bold whitespace-nowrap">
          <CheckCircle weight="regular" size={16} className="text-lime-glow shrink-0" />
          <span>
            Completa tu caja • {state.selectedSlots.length} de{" "}
            {state.mealsPerWeek} listas
          </span>
        </span>

        <button
          type="button"
          onClick={() =>
            state.isWeekSkipped ? toggleSkipWeek() : openSkipWeekModal()
          }
          className={`inline-flex items-center gap-4 px-10 py-6 rounded-full text-micro font-bold min-h-11 min-w-11 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            state.isWeekSkipped
              ? "bg-warm-sand text-deep-forest"
              : "bg-sage-mist text-deep-forest hover:bg-warm-sand"
          }`}
        >
          {state.isWeekSkipped ? (
            <>
              <CalendarCheck weight="bold" size={14} />
              <span>Reactivar</span>
            </>
          ) : (
            <>
              <PauseCircle weight="regular" size={14} />
              <span>Pausar semana</span>
            </>
          )}
        </button>
      </div>

      {/* Headline & Subtitle */}
      <h1 className="mt-14 text-heading-mobile font-extrabold text-deep-forest">
        Tu caja semanal: {state.mealsPerWeek} recetas listas
      </h1>
      <p className="mt-8 text-body text-slate-gray">
        Personaliza tus porciones, reemplaza guarniciones o haz cambio de
        proteínas antes del corte de este martes a medianoche.
      </p>

      {/* Dietary Category Filter Pills */}
      <div className="mt-16">
        <CategoryFilterPills
          activeCategory={state.activeDietaryFilter}
          onSelectCategory={setDietaryFilter}
        />
      </div>

      {/* Active Subscriber Recipe Cards Feed */}
      <div className="mt-16 flex flex-col gap-16">
        {visibleSelected.map((recipe, idx) => {
          const slot = state.selectedSlots.find(
            (s) => s.recipeId === recipe.id
          );
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              mode="active-subscriber"
              isSelected={true}
              selectionNumber={idx + 2}
              selectedSlot={slot}
              onToggleSelect={toggleRecipeInBox}
              onOpenSwapSheet={openSwapSheet}
              onOpenAllergenModal={openAllergenModal}
            />
          );
        })}

        {visibleBlocked.map((blockedRecipe) => (
          <RecipeCard
            key={blockedRecipe.id}
            recipe={blockedRecipe}
            mode="active-subscriber"
            isBlockedByAllergen={true}
            onToggleSelect={toggleRecipeInBox}
            onOpenSwapSheet={openSwapSheet}
            onOpenAllergenModal={openAllergenModal}
            onEditAllergensProfile={() => navigateScreen("wizard-step-2")}
          />
        ))}
      </div>
    </div>
  );
}
