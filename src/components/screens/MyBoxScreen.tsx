"use client";

import React from "react";
import { Plus } from "@phosphor-icons/react";
import { useListoBox } from "@/context/ListoBoxContext";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { PillButton } from "@/components/ui/PillButton";
import { QualityPromiseSection } from "@/components/ui/QualityPromiseSection";

export function MyBoxScreen() {
  const {
    state,
    recipes,
    toggleRecipeInBox,
    openSwapSheet,
    openAllergenModal,
    navigateScreen,
  } = useListoBox();

  const selectedRecipesList = state.selectedSlots
    .map((slot) => recipes.find((r) => r.id === slot.recipeId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const missingCount = Math.max(
    0,
    state.mealsPerWeek - selectedRecipesList.length
  );

  const peopleLabel =
    state.peopleCount === 1
      ? "1 Persona"
      : state.peopleCount === 6
      ? "Más Personas"
      : `${state.peopleCount} Personas`;

  const hasSeafoodVeto = state.vetoedAllergens.includes("mariscos");

  return (
    <div>
      {/* 1. Header Section */}
      <section className="px-16 pt-20 pb-16">
        <h1 className="text-heading-mobile font-extrabold text-deep-forest">
          Tu Selección de la Semana
        </h1>

        <p className="mt-10 text-body text-slate-gray">
          Basado en tus preferencias:{" "}
          <span className="font-bold text-deep-forest">
            {peopleLabel} · {state.mealsPerWeek} Recetas ·{" "}
            {hasSeafoodVeto ? "Sin mariscos · " : ""}Alta Proteína
          </span>
          .
        </p>

        <div className="mt-16 flex items-center justify-between gap-8">
          <div className="inline-flex items-center gap-8">
            <span className="w-8 h-8 rounded-full bg-lime-glow inline-block shrink-0" />
            <span className="text-subheading font-extrabold text-deep-forest">
              {selectedRecipesList.length} de {state.mealsPerWeek} listas
            </span>
          </div>

          {missingCount > 0 && (
            <button
              type="button"
              onClick={() => navigateScreen("wizard-step-3")}
              className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-lime-glow text-forest-shadow text-caption font-extrabold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Plus weight="bold" size={14} />
              <span>
                Elegir {missingCount}{" "}
                {missingCount === 1 ? "faltante" : "faltantes"}
              </span>
            </button>
          )}
        </div>
      </section>

      {/* 2. Selected Recipe Cards Feed */}
      <section className="px-16 pb-24 flex flex-col gap-16">
        {selectedRecipesList.map((recipe) => {
          const slot = state.selectedSlots.find(
            (s) => s.recipeId === recipe.id
          );
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              mode="catalog-feed"
              isSelected={true}
              selectedSlot={slot}
              onToggleSelect={toggleRecipeInBox}
              onOpenSwapSheet={openSwapSheet}
              onOpenAllergenModal={openAllergenModal}
            />
          );
        })}

        {missingCount > 0 && (
          <div className="rounded-3xl border border-deep-forest/20 bg-surface-card p-16 text-center">
            <p className="text-body-sm font-bold text-deep-forest">
              Aún tienes {missingCount}{" "}
              {missingCount === 1 ? "espacio disponible" : "espacios disponibles"}{" "}
              en tu caja de {state.mealsPerWeek} recetas.
            </p>
            <div className="mt-12">
              <PillButton
                variant="forest"
                size="sm"
                leftIcon={<Plus weight="bold" size={14} />}
                onClick={() => navigateScreen("wizard-step-3")}
              >
                Explorar catálogo para completar mi caja
              </PillButton>
            </div>
          </div>
        )}
      </section>

      {/* 3. Promesa de Calidad ListoBox */}
      <QualityPromiseSection className="py-24" />
    </div>
  );
}
