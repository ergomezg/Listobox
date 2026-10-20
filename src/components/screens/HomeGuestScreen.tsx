"use client";

import React from "react";
import {
  ArrowRight,
  ArrowsLeftRight,
  Article,
  BookOpen,
  Clock,
  CookingPot,
  Leaf,
  MinusCircle,
  Package,
  SlidersHorizontal,
  Snowflake,
  Sparkle,
  ThermometerCold,
  ThumbsUp,
  Truck,
} from "@phosphor-icons/react";
import { useListoBox } from "@/context/ListoBoxContext";
import { FAQ_ITEMS, HERO_IMAGES } from "@/mocks/listoboxData";
import { BadgePill } from "@/components/ui/BadgePill";
import { PillButton } from "@/components/ui/PillButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { GhostLink } from "@/components/ui/GhostLink";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function HomeGuestScreen() {
  const {
    state,
    recipes,
    navigateScreen,
    toggleRecipeInBox,
    openSwapSheet,
    openAllergenModal,
  } = useListoBox();

  const previewRecipes = [
    {
      ...recipes[0],
      title: "Pollo Campesino en Salsa Criolla & Yuca",
      kcal: 540,
      prepTimeMinutes: 20,
      topBadge: { text: "ONLINE ONLY", variant: "online-only" as const },
    },
    {
      ...recipes[2],
      title: "Salmón Glaseado en Reducción de Panela",
      kcal: 590,
      prepTimeMinutes: 20,
      topBadge: { text: "CHEF SIGNATURE", variant: "chef-signature" as const },
    },
    {
      ...recipes[4],
      title: "Pappardelle Artesanal con Hongos Silvestres",
      kcal: 490,
      prepTimeMinutes: 20,
      topBadge: { text: "CHEF SIGNATURE", variant: "chef-signature" as const },
    },
  ];

  const stepsData = [
    {
      number: 1,
      badgeLabel: "PASO 1",
      badgeIcon: <BookOpen weight="regular" size={14} />,
      imageUrl: HERO_IMAGES.step1MiseEnPlace,
      title: "1. Curas tu menú semanal",
      description:
        "18 recetas que cambian cada martes. Personaliza porciones, cambio de proteínas y bloquea alérgenos con un toque desde tu celular.",
      chip1: {
        icon: <ArrowsLeftRight weight="regular" size={14} />,
        label: "18 opciones/sem",
      },
      chip2: {
        icon: <SlidersHorizontal weight="regular" size={14} />,
        label: "Filtros dietarios",
      },
    },
    {
      number: 2,
      badgeLabel: "PASO 2",
      badgeIcon: <Snowflake weight="regular" size={14} />,
      imageUrl: HERO_IMAGES.step2ChickenDish,
      title: "2. Llega frío a tu puerta",
      description:
        "Caja térmica reciclable con hielo biodegradable que conserva los ingredientes hasta por 48 horas sin refrigerador, garantizando máxima frescura.",
      chip1: {
        icon: <ThermometerCold weight="regular" size={14} />,
        label: "Hielo compostable",
      },
      chip2: {
        icon: <Package weight="regular" size={14} />,
        label: "48h cadena de frío",
      },
    },
    {
      number: 3,
      badgeLabel: "PASO 3",
      badgeIcon: <CookingPot weight="regular" size={14} />,
      imageUrl: HERO_IMAGES.step3PastaDish,
      title: "3. Creas magia en tu cocina",
      description:
        "Sigue las instrucciones gráficas paso a paso sin medir ni pesar nada. Todo viene listo para saltar a la sartén y servir como un chef profesional.",
      chip1: {
        icon: <Clock weight="regular" size={14} />,
        label: "Listo en 20m",
      },
      chip2: {
        icon: <Sparkle weight="regular" size={14} />,
        label: "Cero desperdicio",
      },
    },
  ];

  return (
    <div>
      {/* 1. HERO FULL-BLEED SECTION */}
      <section className="relative w-full pt-16 pb-20 px-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-forest-shadow">
          <img
            src={HERO_IMAGES.homeGuest}
            alt="Ingredientes frescos de cosecha local ListoBox"
            className="w-full h-full object-cover opacity-85"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between min-h-260">
          <div>
            <BadgePill variant="lime" dotColor="green">
              En Cosecha Local
            </BadgePill>
          </div>

          {/* Floating Hero Card */}
          <div className="mt-80 bg-cream-canvas/95 rounded-3xl p-20 shadow-xl border border-warm-sand">
            <div className="flex items-center justify-between gap-8 mb-10">
              <div className="inline-flex items-center gap-6 text-deep-forest text-caption font-bold">
                <Truck weight="regular" size={16} />
                <span>Plan Dúo Vital</span>
              </div>
              <BadgePill variant="sage">
                {state.mealsPerWeek} Recetas
              </BadgePill>
            </div>

            <h1 className="text-heading-mobile font-extrabold text-forest-shadow">
              Esta semana cocinas como Chef en casa.
            </h1>

            <p className="mt-8 text-body-sm text-slate-gray">
              Ingredientes listos al gramo, recetas paso a paso de autor.
            </p>

            <div className="mt-16">
              <PillButton
                variant="lime"
                size="md"
                rightIcon={<ArrowRight weight="bold" size={18} />}
                onClick={() => navigateScreen("wizard-step-1")}
              >
                Personalizar tu caja semanal
              </PillButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PASO A PASO FÁCIL: TU SEMANA EN 3 PASOS */}
      <section className="px-16 py-24">
        <SectionHeader
          eyebrow="PASO A PASO FÁCIL"
          title="Tu Semana en 3 Pasos"
          rightElement={
            <BadgePill variant="sand" className="text-deep-forest">
              1 · 2 · 3 Listo
            </BadgePill>
          }
        />

        <div className="mt-16 flex flex-col gap-16">
          {stepsData.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-deep-forest/20 bg-cream-canvas overflow-hidden"
            >
              <div className="relative h-160 w-full bg-warm-sand">
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-12 left-12">
                  <BadgePill variant="lime" icon={step.badgeIcon} uppercase>
                    {step.badgeLabel}
                  </BadgePill>
                </div>
              </div>

              <div className="p-16">
                <h3 className="text-body-lg font-extrabold text-deep-forest">
                  {step.title}
                </h3>
                <p className="mt-6 text-body-sm text-slate-gray">
                  {step.description}
                </p>

                <div className="mt-12 flex items-center gap-8 flex-wrap">
                  <BadgePill variant="sage" icon={step.chip1.icon}>
                    {step.chip1.label}
                  </BadgePill>
                  <BadgePill variant="sand" icon={step.chip2.icon}>
                    {step.chip2.label}
                  </BadgePill>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. TU SUSCRIPCIÓN 100% TRANSPARENTE */}
      <section className="bg-sage-mist/70 px-16 py-28">
        <div className="flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full bg-deep-forest text-lime-glow flex items-center justify-center">
            <ThumbsUp weight="regular" size={24} />
          </div>
          <h2 className="mt-12 text-heading-sm font-extrabold text-forest-shadow">
            Tu suscripción 100% transparente
          </h2>
          <p className="mt-6 text-body-sm text-slate-gray max-w-xs">
            Diseñada para darte libertad total sin contratos escondidos ni
            llamadas molestas.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-12">
          <div className="bg-cream-canvas rounded-2xl p-16 flex items-start gap-14">
            <div className="w-40 h-40 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <MinusCircle weight="regular" size={20} />
            </div>
            <div>
              <h3 className="text-body font-bold text-forest-shadow">
                Cero Permanencia
              </h3>
              <p className="mt-2 text-body-sm text-slate-gray">
                Pausa, cambia tu día de entrega o cancela en un solo toque desde
                tu app.
              </p>
            </div>
          </div>

          <div className="bg-cream-canvas rounded-2xl p-16 flex items-start gap-14">
            <div className="w-40 h-40 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <Leaf weight="regular" size={20} />
            </div>
            <div>
              <h3 className="text-body font-bold text-forest-shadow">
                Garantía 100% Frescura
              </h3>
              <p className="mt-2 text-body-sm text-slate-gray">
                Si un ingrediente no llega en estado impecable, te lo abonamos
                al instante.
              </p>
            </div>
          </div>

          <div className="bg-cream-canvas rounded-2xl p-16 flex items-start gap-14">
            <div className="w-40 h-40 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <Snowflake weight="regular" size={20} />
            </div>
            <div>
              <h3 className="text-body font-bold text-forest-shadow">
                Cadena de Frío 48 Horas
              </h3>
              <p className="mt-2 text-body-sm text-slate-gray">
                Cajas térmicas biodegradables con geles ecológicos que conservan
                la frescura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATÁLOGO ABIERTO: MENÚ DE ESTA SEMANA */}
      <section className="px-16 py-24">
        <SectionHeader
          eyebrow="CATÁLOGO ABIERTO"
          title="Menú de esta semana"
        />

        <div className="mt-16 flex items-stretch gap-12 overflow-x-auto no-scrollbar pb-4">
          {previewRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              mode="carousel-preview"
              isSelected={false}
              onToggleSelect={(id) => {
                toggleRecipeInBox(id);
                navigateScreen("wizard-step-3");
              }}
              onOpenSwapSheet={openSwapSheet}
              onOpenAllergenModal={openAllergenModal}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <GhostLink
            label="Ver las 18 recetas de esta semana"
            icon="arrow-right"
            onClick={() => navigateScreen("wizard-step-3")}
          />
        </div>
      </section>

      {/* 5. DUDAS COMUNES: DUDAS FRECUENTES */}
      <section className="px-16 py-16">
        <SectionHeader
          eyebrow="DUDAS COMUNES"
          title="Dudas frecuentes"
          rightElement={
            <Article weight="regular" size={24} className="text-deep-forest" />
          }
        />

        <div className="mt-14">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* 6. STICKY DARK FOOTER BAR ABOVE BOTTOM NAV */}
      <div className="sticky bottom-0 z-30 w-full bg-forest-shadow px-24 py-12">
        <PillButton
          variant="lime"
          size="md"
          rightIcon={<ArrowRight weight="bold" size={16} />}
          onClick={() => navigateScreen("wizard-step-1")}
        >
          ARMAR MI PRIMERA CAJA
        </PillButton>
      </div>
    </div>
  );
}
