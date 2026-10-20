"use client";

import React from "react";
import {
  Acorn,
  ArrowRight,
  Bird,
  CaretRight,
  Check,
  CheckCircle,
  CookingPot,
  Drop,
  Egg,
  FishSimple,
  Grains,
  Knife,
  Leaf,
  Lightning,
  Plant,
  Sailboat,
  SealCheck,
} from "@phosphor-icons/react";
import { AllergenId, ProteinAffinityId, ScreenId } from "@/types/listobox";
import { useListoBox } from "@/context/ListoBoxContext";
import {
  ALLERGEN_OPTIONS,
  HERO_IMAGES,
  PROTEIN_AFFINITIES,
} from "@/mocks/listoboxData";
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

export function WizardStep2Screen() {
  const {
    state,
    toggleAllergen,
    clearAllergens,
    toggleProteinAffinity,
    setCookingTime,
    navigateScreen,
  } = useListoBox();

  const renderAllergenIcon = (id: AllergenId) => {
    switch (id) {
      case "mariscos":
        return <FishSimple weight="regular" size={24} />;
      case "mani":
        return <Acorn weight="regular" size={22} />;
      case "lactosa":
        return <Drop weight="regular" size={22} />;
      case "gluten":
        return <Grains weight="regular" size={22} />;
      case "soya":
        return <Leaf weight="regular" size={22} />;
      case "huevo":
        return <Egg weight="regular" size={22} />;
    }
  };

  const renderProteinIcon = (id: ProteinAffinityId) => {
    switch (id) {
      case "pollo-pastoreo":
        return <Bird weight="regular" size={22} />;
      case "pescados-sostenibles":
        return <Sailboat weight="regular" size={22} />;
      case "res-madurada":
        return <Knife weight="regular" size={22} />;
      case "plant-based":
        return <Plant weight="regular" size={22} />;
    }
  };

  return (
    <div className="pb-24">
      <WizardProgressBar
        currentStep={2}
        onStepSelect={(step) => navigateScreen(STEP_MAP[step])}
      />

      {/* Top Section on Cream Canvas */}
      <div className="px-16 pt-16 pb-20">
        <div className="h-160 w-full rounded-2xl overflow-hidden bg-warm-sand">
          <img
            src={HERO_IMAGES.spicesBoard}
            alt="Ingredientes y especias frescas ListoBox"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="mt-20 text-heading-mobile font-extrabold text-deep-forest">
          Tu seguridad y gustos primero
        </h1>
        <p className="mt-10 text-body text-slate-gray">
          Excluiremos automáticamente ingredientes vetados de tu caja para
          garantizar 0% contaminación cruzada en planta y en tu cocina.
        </p>

        {/* 1. Vetos Médicos y Alérgenos */}
        <div className="mt-24">
          <SectionHeader
            squareBullet
            title="Vetos Médicos y Alérgenos"
            subtitle="Toca los ingredientes que el chef debe bloquear sin excepción en tu suscripción."
          />

          <div className="mt-16 grid grid-cols-2 gap-12">
            {ALLERGEN_OPTIONS.map((item) => {
              const isSelected = state.vetoedAllergens.includes(item.id);
              return (
                <SelectableCard
                  key={item.id}
                  variant="allergen"
                  selected={isSelected}
                  onSelect={() => toggleAllergen(item.id)}
                  title={item.title}
                  subtitle={item.subtitle}
                  badgeText={item.severityLabel}
                  icon={renderAllergenIcon(item.id)}
                />
              );
            })}
          </div>

          {/* Sin alergias ni restricciones médicas */}
          <button
            type="button"
            onClick={() => {
              clearAllergens();
              navigateScreen("wizard-step-3");
            }}
            className="mt-16 w-full flex items-center justify-between gap-12 p-12 rounded-2xl min-h-11 min-w-11 text-left hover:bg-warm-sand/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-12">
              <CheckCircle
                weight="regular"
                size={24}
                className="text-deep-forest shrink-0"
              />
              <div>
                <p className="text-body-sm font-bold text-deep-forest">
                  Sin alergias ni restricciones médicas
                </p>
                <p className="text-caption text-slate-gray">
                  Puedo consumir todos los ingredientes
                </p>
              </div>
            </div>
            <CaretRight
              weight="bold"
              size={18}
              className="text-deep-forest shrink-0"
            />
          </button>
        </div>
      </div>

      {/* 2. Proteínas y Afinidades (Sage Mist Band) */}
      <section className="bg-sage-mist/70 px-16 py-24">
        <SectionHeader
          squareBullet
          title="Proteínas y Afinidades"
          subtitle="Priorizaremos estas fuentes biológicas y recetas artesanales de origen limpio."
        />

        <div className="mt-16 flex flex-col gap-10">
          {PROTEIN_AFFINITIES.map((protein) => {
            const isChecked = state.proteinAffinities.includes(protein.id);
            return (
              <button
                key={protein.id}
                type="button"
                onClick={() => toggleProteinAffinity(protein.id)}
                className="w-full bg-cream-canvas rounded-xl p-14 flex items-center justify-between gap-12 min-h-11 min-w-11 text-left cursor-pointer"
              >
                <div className="flex items-center gap-12">
                  <div className="w-40 h-40 rounded-lg bg-warm-sand text-deep-forest flex items-center justify-center shrink-0">
                    {renderProteinIcon(protein.id)}
                  </div>
                  <div>
                    <p className="text-body-sm font-bold text-deep-forest">
                      {protein.title}
                    </p>
                    <p className="text-caption text-slate-gray">
                      {protein.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-24 h-24 rounded-md flex items-center justify-center shrink-0 ${
                    isChecked
                      ? "bg-deep-forest text-surface-white"
                      : "bg-surface-white border border-warm-gray"
                  }`}
                >
                  {isChecked && <Check weight="bold" size={14} />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Tiempo Máximo de Cocción */}
      <section className="px-16 py-24">
        <SectionHeader
          squareBullet
          title="Tiempo Máximo de Cocción"
          subtitle="Alineado con tus tardes y tu ritmo de vida."
        />

        <div className="mt-16 grid grid-cols-2 gap-12">
          <SelectableCard
            variant="cooking-time"
            selected={state.maxCookingTime === "15-20"}
            onSelect={() => setCookingTime("15-20")}
            title="15–20 min"
            subtitle="Ritmo Express"
            icon={<Lightning weight="regular" size={22} />}
          />

          <SelectableCard
            variant="cooking-time"
            selected={state.maxCookingTime === "25-35"}
            onSelect={() => setCookingTime("25-35")}
            title="25–35 min"
            subtitle="Experiencia Gourmet"
            icon={<CookingPot weight="regular" size={22} />}
          />
        </div>

        {/* Garantía ListoBox Safe-Pack */}
        <div className="mt-20 p-16 rounded-2xl bg-sage-mist flex items-start gap-12">
          <SealCheck
            weight="regular"
            size={24}
            className="text-deep-forest shrink-0 mt-2"
          />
          <div>
            <h3 className="text-body font-bold text-deep-forest">
              Garantía ListoBox Safe-Pack
            </h3>
            <p className="mt-4 text-body-sm text-slate-gray">
              Garantizamos ingredientes dosificados en empaque hermético sellado
              individualmente.
            </p>
          </div>
        </div>

        {/* Explicit "Continuar" Primary PillButton approved in Decision #1 */}
        <div className="mt-20">
          <PillButton
            variant="lime"
            size="md"
            rightIcon={<ArrowRight weight="bold" size={18} />}
            onClick={() => navigateScreen("wizard-step-3")}
          >
            Continuar
          </PillButton>
        </div>
      </section>
    </div>
  );
}
