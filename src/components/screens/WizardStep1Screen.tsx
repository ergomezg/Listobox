"use client";

import React from "react";
import { ArrowRight, Star, Users } from "@phosphor-icons/react";
import { formatCOP, ScreenId } from "@/types/listobox";
import { useListoBox } from "@/context/ListoBoxContext";
import { HERO_IMAGES } from "@/mocks/listoboxData";
import { WizardProgressBar } from "@/components/ui/WizardProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SelectableCard } from "@/components/ui/SelectableCard";
import { PillButton } from "@/components/ui/PillButton";

const STEP_MAP: Record<1 | 2 | 3 | 4, ScreenId> = {
  1: "wizard-step-1",
  2: "wizard-step-2",
  3: "wizard-step-3",
  4: "wizard-step-4",
};

export function WizardStep1Screen() {
  const { state, setPeopleCount, setMealsPerWeek, navigateScreen } =
    useListoBox();

  const householdOptions: {
    count: 1 | 2 | 4 | 6;
    title: string;
    subtitle: string;
  }[] = [
    {
      count: 1,
      title: "1 Persona",
      subtitle: "Para ti, date gusto come saludable",
    },
    {
      count: 2,
      title: "2 Personas",
      subtitle: "Ideal para parejas o roomies",
    },
    {
      count: 4,
      title: "4 Personas",
      subtitle: "Familias o meal preppers",
    },
    {
      count: 6,
      title: "Más Personas",
      subtitle: "Familias numerosas",
    },
  ];

  const mealsOptions: (3 | 4 | 5)[] = [3, 4, 5];

  const peopleLabel =
    state.peopleCount === 1
      ? "1 Persona"
      : state.peopleCount === 6
      ? "Más Personas"
      : `${state.peopleCount} Personas`;

  return (
    <div className="pb-24">
      <WizardProgressBar
        currentStep={1}
        onStepSelect={(step) => navigateScreen(STEP_MAP[step])}
      />

      <div className="px-16 pt-16">
        {/* Hero Image */}
        <div className="h-180 w-full rounded-2xl overflow-hidden bg-warm-sand">
          <img
            src={HERO_IMAGES.wizardStep1}
            alt="Plato de salmón gourmet ListoBox"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="mt-20 text-heading-mobile font-extrabold text-deep-forest">
          Diseña tu semana gourmet sin esfuerzo
        </h1>
        <p className="mt-10 text-body text-slate-gray">
          Recetas de chef listas en 20 minutos con porciones milimétricas
          directas del campo. Explora libremente antes de crear tu cuenta.
        </p>

        {/* PASO 1.1: Tamaño del Hogar */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="PASO 1.1"
            title="Tamaño del Hogar"
            rightElement={
              <Users weight="regular" size={24} className="text-deep-forest" />
            }
          />

          <p className="mt-14 text-body font-bold text-deep-forest">
            ¿Para cuántos cocinas?
          </p>

          <div className="mt-10 grid grid-cols-2 gap-12">
            {householdOptions.map((opt) => (
              <SelectableCard
                key={opt.count}
                variant="household"
                selected={state.peopleCount === opt.count}
                onSelect={() => setPeopleCount(opt.count)}
                title={opt.title}
                subtitle={opt.subtitle}
              />
            ))}
          </div>

          <p className="mt-20 text-body font-bold text-deep-forest">
            Comidas por semana
          </p>

          <div className="mt-10 grid grid-cols-3 gap-12">
            {mealsOptions.map((mealsCount) => (
              <SelectableCard
                key={mealsCount}
                variant="meals-count"
                selected={state.mealsPerWeek === mealsCount}
                onSelect={() => setMealsPerWeek(mealsCount)}
                title={String(mealsCount)}
                subtitle="Recetas"
              />
            ))}
          </div>

          {/* Dynamic Recommendation Callout */}
          <div className="mt-20 p-16 rounded-2xl bg-warm-sand flex items-start gap-12">
            <div className="w-28 h-28 rounded-full bg-deep-forest text-surface-white flex items-center justify-center shrink-0 mt-2">
              <Star weight="fill" size={14} />
            </div>

            <div>
              <span className="block text-caption font-extrabold uppercase tracking-wider text-olive-accent">
                COMBINACIÓN MÁS ELEGIDA
              </span>
              <h3 className="mt-2 text-body font-extrabold text-deep-forest">
                {peopleLabel} · {state.mealsPerWeek} Recetas (
                {formatCOP(state.basePricePerPortionCOP)} COP por plato)
              </h3>
              <p className="mt-6 text-body-sm text-slate-gray">
                Ahorras 1.8 horas de supermercado y aprovechas el 100% de cada
                gramo recibido.
              </p>
            </div>
          </div>

          {/* Explicit "Continuar" Primary PillButton approved in Decision #1 */}
          <div className="mt-20">
            <PillButton
              variant="lime"
              size="md"
              rightIcon={<ArrowRight weight="bold" size={18} />}
              onClick={() => navigateScreen("wizard-step-2")}
            >
              Continuar
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
