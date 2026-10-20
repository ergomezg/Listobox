"use client";

import React from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  SealCheck,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react";
import { formatCOP } from "@/types/listobox";
import { useListoBox } from "@/context/ListoBoxContext";
import { HERO_IMAGES } from "@/mocks/listoboxData";
import { BadgePill } from "@/components/ui/BadgePill";
import { PillButton } from "@/components/ui/PillButton";

export function CheckoutSuccessScreen() {
  const { state, recipes, totalPortions, subtotalCOP, goToActiveHome } =
    useListoBox();

  const selectedRecipes = state.selectedSlots
    .map((slot) => recipes.find((r) => r.id === slot.recipeId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const deliveryDayText =
    state.checkoutForm.deliveryDay === "martes-24"
      ? "Martes 24 Oct · 8:00 AM - 1:00 PM"
      : "Miércoles 25 Oct · 8:00 AM - 1:00 PM";

  return (
    <div className="pb-24 px-16 pt-20">
      {/* Top Confirmation Card */}
      <div className="bg-deep-forest text-surface-white rounded-3xl p-24 shadow-xl">
        <div className="flex items-center justify-between gap-8">
          <BadgePill variant="lime" icon={<SealCheck weight="fill" size={14} />}>
            SUSCRIPCIÓN ACTIVA
          </BadgePill>
          <span className="text-caption font-extrabold text-lime-glow">
            Orden {state.orderNumber}
          </span>
        </div>

        <h1 className="mt-16 text-heading-mobile font-extrabold text-surface-white">
          ¡Tu primera caja está en manos del campo!
        </h1>

        <p className="mt-10 text-body-sm text-sage-mist">
          Hemos reservado tus ingredientes frescos con nuestros productores
          locales y programado tu despacho refrigerado.
        </p>

        {/* Key Logistics Highlights */}
        <div className="mt-20 bg-cream-canvas text-forest-shadow rounded-2xl p-16 flex flex-col gap-12">
          <div className="flex items-start gap-12">
            <div className="w-36 h-36 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <Truck weight="regular" size={18} />
            </div>
            <div>
              <span className="block text-caption text-slate-gray">
                Primer arribo programado
              </span>
              <span className="text-body-sm font-extrabold text-deep-forest">
                {deliveryDayText}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-12 pt-10 border-t border-warm-sand">
            <div className="w-36 h-36 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <MapPin weight="regular" size={18} />
            </div>
            <div>
              <span className="block text-caption text-slate-gray">
                Dirección de entrega
              </span>
              <span className="text-body-sm font-bold text-forest-shadow">
                {state.checkoutForm.addressLine1} ·{" "}
                {state.checkoutForm.addressLine2}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-12 pt-10 border-t border-warm-sand">
            <div className="w-36 h-36 rounded-full bg-warm-sand text-deep-forest flex items-center justify-center shrink-0">
              <CalendarCheck weight="regular" size={18} />
            </div>
            <div>
              <span className="block text-caption text-slate-gray">
                Próximo cierre semanal (Cut-off)
              </span>
              <span className="text-body-sm font-bold text-deep-forest">
                Martes 23:59 PM (Edita o pausa en 1 tap)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Box Summary Preview */}
      <section className="mt-20 bg-surface-card rounded-3xl p-16 border border-warm-sand">
        <div className="flex items-center justify-between gap-8 mb-12">
          <div className="inline-flex items-center gap-8 text-deep-forest font-bold text-body">
            <Package weight="regular" size={20} />
            <span>Resumen de tu Caja ({totalPortions} porciones)</span>
          </div>
          <span className="text-body-sm font-extrabold text-deep-forest">
            {formatCOP(subtotalCOP)} COP
          </span>
        </div>

        <div className="relative h-120 w-full rounded-2xl overflow-hidden bg-warm-sand mb-12">
          <img
            src={HERO_IMAGES.boxOpenKitchen}
            alt="Caja Semanal ListoBox"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-8 left-8 inline-flex items-center gap-6 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-micro font-bold">
            <ShieldCheck weight="fill" size={14} className="text-lime-glow" />
            <span>0% alérgenos vetados · Cadena de frío 48h</span>
          </span>
        </div>

        <div className="flex flex-col gap-8">
          {selectedRecipes.map((recipe, idx) => (
            <div
              key={recipe.id}
              className="flex items-center justify-between gap-10 p-10 rounded-xl bg-cream-canvas"
            >
              <div className="flex items-center gap-10 min-w-0">
                <CheckCircle
                  weight="fill"
                  size={18}
                  className="text-deep-forest shrink-0"
                />
                <span className="text-body-sm font-bold text-forest-shadow truncate">
                  {idx + 1}. {recipe.title}
                </span>
              </div>
              <span className="shrink-0 inline-flex items-center gap-4 text-caption text-slate-gray">
                <Clock weight="regular" size={12} />
                <span>{recipe.prepTimeMinutes}m</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Action to Transition to 08 - Home - Usuario activo.png */}
      <div className="mt-20 flex flex-col gap-10">
        <PillButton
          variant="lime"
          size="lg"
          rightIcon={<ArrowRight weight="bold" size={20} />}
          onClick={goToActiveHome}
        >
          Gestionar mi caja semanal
        </PillButton>
      </div>
    </div>
  );
}
