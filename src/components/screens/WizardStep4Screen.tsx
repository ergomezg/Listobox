"use client";

import React, { useState } from "react";
import {
  ChatCenteredText,
  CheckCircle,
  GoogleLogo,
  Leaf,
  LockKey,
  ShoppingBag,
  Snowflake,
  Tag,
  Tractor,
} from "@phosphor-icons/react";
import { formatCOP, ScreenId } from "@/types/listobox";
import { useListoBox } from "@/context/ListoBoxContext";
import { HERO_IMAGES } from "@/mocks/listoboxData";
import { WizardProgressBar } from "@/components/ui/WizardProgressBar";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { PillButton } from "@/components/ui/PillButton";

const STEP_MAP: Record<1 | 2 | 3 | 4, ScreenId> = {
  1: "wizard-step-1",
  2: "wizard-step-2",
  3: "wizard-step-3",
  4: "wizard-step-4",
};

export function WizardStep4Screen() {
  const {
    state,
    recipes,
    totalPortions,
    subtotalCOP,
    discountCOP,
    discountedTotalCOP,
    pricePerPortionDiscountedCOP,
    toggleRecipeInBox,
    openSwapSheet,
    openAllergenModal,
    authenticateGuest,
    navigateScreen,
  } = useListoBox();

  const [phoneInput, setPhoneInput] = useState<string>(state.userPhone);

  const selectedRecipesList = state.selectedSlots
    .map((slot) => recipes.find((r) => r.id === slot.recipeId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const peopleLabel =
    state.peopleCount === 1
      ? "1 Persona"
      : state.peopleCount === 6
      ? "Más Personas"
      : `${state.peopleCount} Personas`;

  const hasSeafoodVeto = state.vetoedAllergens.includes("mariscos");

  return (
    <div>
      <WizardProgressBar
        currentStep={4}
        onStepSelect={(step) => navigateScreen(STEP_MAP[step])}
      />

      {/* 1. Header & Hero Image */}
      <div className="px-16 pt-16 pb-20">
        <div className="h-180 w-full rounded-2xl overflow-hidden bg-warm-sand">
          <img
            src={HERO_IMAGES.chefCooking}
            alt="Cocinando en casa con ListoBox"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="mt-20 text-heading-mobile font-extrabold text-deep-forest">
          Tu menú semanal a la medida.
        </h1>

        <p className="mt-10 text-body text-slate-gray">
          Basado en tus preferencias:{" "}
          <span className="font-bold text-deep-forest">
            {peopleLabel} · {state.mealsPerWeek} Recetas ·{" "}
            {hasSeafoodVeto ? "Sin mariscos · " : ""}Alta Proteína
          </span>
          .
        </p>
      </div>

      {/* 2. Plan Dúo Vital Financial Summary Band */}
      <section className="bg-sage-mist px-16 py-20">
        <div className="flex items-center justify-between gap-8 mb-12">
          <div className="inline-flex items-center gap-8 text-deep-forest font-extrabold text-body-lg">
            <ShoppingBag weight="regular" size={20} />
            <span>Plan Dúo Vital ({state.mealsPerWeek} Cenas)</span>
          </div>

          <span className="px-12 py-4 rounded-full bg-deep-forest text-surface-white text-caption font-bold">
            {totalPortions} porciones
          </span>
        </div>

        <div className="bg-cream-canvas rounded-2xl p-16">
          <div className="flex items-center justify-between gap-8 text-body-sm">
            <span className="text-slate-gray">
              Subtotal caja semanal ({totalPortions}porciones)
            </span>
            <span className="text-warm-gray line-through font-medium whitespace-nowrap shrink-0">
              {formatCOP(subtotalCOP)} COP
            </span>
          </div>

          {state.appliedCoupon && (
            <div className="mt-10 flex items-center justify-between gap-8 text-body-sm">
              <div className="inline-flex items-center gap-6 text-deep-forest font-bold">
                <Tag weight="regular" size={16} />
                <span>Cupón</span>
                <span className="px-8 py-2 rounded-md bg-lime-glow text-forest-shadow text-micro font-extrabold uppercase">
                  {state.appliedCoupon.code}
                </span>
              </div>
              <span className="text-deep-forest font-extrabold whitespace-nowrap shrink-0">
                -{state.appliedCoupon.discountPercent}% OFF (-
                {formatCOP(discountCOP)})
              </span>
            </div>
          )}

          <div className="mt-14 pt-12 border-t border-warm-sand flex items-end justify-between gap-8">
            <div>
              <span className="block text-caption text-slate-gray">total</span>
              <div className="flex items-baseline gap-4">
                <span className="text-heading-mobile font-extrabold text-forest-shadow">
                  {formatCOP(discountedTotalCOP)}
                </span>
                <span className="text-caption font-bold text-slate-gray">
                  COP
                </span>
              </div>
            </div>

            <span className="px-12 py-6 rounded-full bg-warm-sand text-deep-forest text-caption font-extrabold whitespace-nowrap shrink-0">
              {formatCOP(pricePerPortionDiscountedCOP)} COP/porción
            </span>
          </div>
        </div>
      </section>

      {/* 3. Allergen Filter Banner */}
      <div className="bg-warm-sand px-16 py-12 flex items-center gap-12">
        <CheckCircle
          weight="regular"
          size={20}
          className="text-deep-forest shrink-0"
        />
        <p className="text-body-sm text-deep-forest">
          Recetas con{" "}
          <span className="font-bold">mariscos y crustáceos</span> filtradas
          automáticamente de tu catálogo por tu seguridad.
        </p>
      </div>

      {/* 4. Tu Selección de la Semana */}
      <section className="px-16 py-24">
        <div className="flex items-center justify-between gap-8 mb-16">
          <div className="inline-flex items-center gap-8 min-w-0">
            <h2 className="text-body-lg font-extrabold text-deep-forest whitespace-nowrap">
              Tu Selección de la Semana
            </h2>
            <span className="w-8 h-8 rounded-full bg-lime-glow inline-block shrink-0" />
          </div>
          <span className="text-caption font-bold text-slate-gray whitespace-nowrap shrink-0">
            {selectedRecipesList.length} de {state.mealsPerWeek} listas
          </span>
        </div>

        <div className="flex flex-col gap-16">
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
        </div>
      </section>

      {/* 5. Contextual Guest-to-User Registration Block (Deep Forest) */}
      <section className="bg-deep-forest text-surface-white px-16 py-28">
        <div className="inline-flex items-center gap-10">
          <div className="w-36 h-36 rounded-full bg-lime-glow text-forest-shadow flex items-center justify-center shrink-0">
            <LockKey weight="fill" size={18} />
          </div>
          <span className="text-caption font-extrabold uppercase tracking-wider text-lime-glow">
            RESERVA DE INGREDIENTES FRESCOS
          </span>
        </div>

        <h2 className="mt-16 text-heading-sm font-extrabold text-surface-white leading-snug">
          Guarda tu menú en 1 toque para no perder tus ingredientes reservados.
        </h2>

        <p className="mt-8 text-body-sm text-sage-mist">
          Asignamos porciones directamente con los agricultores locales en
          tiempo real. Conservamos tu selección durante 15 minutos.
        </p>

        <div className="mt-20 flex flex-col gap-10">
          <PillButton
            variant="white"
            size="md"
            leftIcon={
              <GoogleLogo weight="bold" size={18} className="text-deep-forest" />
            }
            onClick={() => authenticateGuest("google")}
          >
            Continuar con Google
          </PillButton>

          <PillButton
            variant="whatsapp"
            size="md"
            leftIcon={<ChatCenteredText weight="bold" size={18} />}
            onClick={() => authenticateGuest("whatsapp")}
          >
            Acceso rápido vía WhatsApp (+57)
          </PillButton>
        </div>

        {/* Divider */}
        <div className="my-16 flex items-center gap-12">
          <span className="h-1 flex-1 bg-sage-mist/25" />
          <span className="text-micro font-bold uppercase tracking-wider text-sage-mist">
            O CON TU MÓVIL
          </span>
          <span className="h-1 flex-1 bg-sage-mist/25" />
        </div>

        {/* Phone PIN Input Pill */}
        <div className="bg-cream-canvas rounded-full p-4 pl-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-8 min-w-0 flex-1">
            <span className="text-body-sm font-extrabold text-deep-forest shrink-0">
              +57
            </span>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="300 123 4567"
              aria-label="Número de celular en Colombia"
              className="w-full min-h-11 min-w-11 bg-transparent text-body-sm text-forest-shadow placeholder:text-warm-gray focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => authenticateGuest("phone", phoneInput)}
            className="shrink-0 px-16 py-10 rounded-full bg-deep-forest text-surface-white text-caption font-bold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
          >
            Enviar PIN
          </button>
        </div>

        <p className="mt-12 text-center text-micro text-sage-mist/85">
          Al continuar aceptas recibir actualizaciones de tu pedido y
          confirmación de entrega por WhatsApp.
        </p>
      </section>

      {/* 6. Promesa de Calidad ListoBox */}
      <section className="bg-warm-sand px-16 py-24">
        <div className="flex items-center gap-8 text-deep-forest mb-14">
          <Leaf weight="regular" size={20} />
          <h3 className="text-body-lg font-extrabold">
            Promesa de Calidad ListoBox
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="bg-cream-canvas rounded-2xl p-14">
            <Tractor
              weight="regular"
              size={22}
              className="text-deep-forest mb-8"
            />
            <h4 className="text-body-sm font-bold text-deep-forest">
              Cosecha del Día
            </h4>
            <p className="mt-4 text-caption text-slate-gray">
              Verduras recogidas máx. 24h antes del despacho.
            </p>
          </div>

          <div className="bg-cream-canvas rounded-2xl p-14">
            <Snowflake
              weight="regular"
              size={22}
              className="text-deep-forest mb-8"
            />
            <h4 className="text-body-sm font-bold text-deep-forest">
              Cadena de Frío
            </h4>
            <p className="mt-4 text-caption text-slate-gray">
              Empaque térmico de lana kraft reciclable.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Bottom Sticky Checkout CTA */}
      <div className="sticky bottom-0 z-30 bg-cream-canvas border-t border-warm-sand px-16 py-12">
        <PillButton
          variant="lime"
          size="md"
          leftIcon={<ShoppingBag weight="bold" size={20} />}
          priceBadge={`+${formatCOP(discountedTotalCOP)} COP →`}
          onClick={() => navigateScreen("checkout")}
        >
          IR AL CHECKOUT
        </PillButton>
        <p className="mt-6 text-center text-caption text-slate-gray">
          Sin cláusulas de permanencia · Pausa o cancela en 1 tap
        </p>
      </div>
    </div>
  );
}
