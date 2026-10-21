"use client";

import React, { useState } from "react";
import {
  Bank,
  CalendarBlank,
  Check,
  CreditCard,
  DeviceMobile,
  EnvelopeSimple,
  Headset,
  HouseLine,
  Info,
  Leaf,
  MapPin,
  MapPinPlus,
  Plant,
  Plus,
  PlusCircle,
  Scales,
  SealCheck,
  ShieldCheck,
  Shrimp,
  SignOut,
  Snowflake,
  Tree,
  Truck,
  Wallet,
  Warning,
  X,
} from "@phosphor-icons/react";
import { AllergenId, formatCOP } from "@/types/listobox";
import { ALLERGEN_OPTIONS } from "@/mocks/listoboxData";
import { useListoBox } from "@/context/ListoBoxContext";
import { PillButton } from "@/components/ui/PillButton";

const ALLERGEN_SHORT_LABELS: Record<AllergenId, string> = {
  mariscos: "Mariscos (Veto estricto)",
  mani: "Maní y Nueces (Veto estricto)",
  lactosa: "Lactosa / Lácteos",
  gluten: "Gluten",
  soya: "Soya",
  huevo: "Huevo",
};

export function ProfileScreen() {
  const {
    state,
    totalPortions,
    discountedTotalCOP,
    toggleAllergen,
    navigateScreen,
    setBottomTab,
    openSkipWeekModal,
    toggleSkipWeek,
    openHelpSheet,
  } = useListoBox();

  const [autoVeggieSub, setAutoVeggieSub] = useState(true);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([
    "equilibrada",
    "alta-proteina",
  ]);
  const [activePaymentCard, setActivePaymentCard] = useState<"pse" | "nequi">(
    "pse"
  );

  const togglePrefChip = (id: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* 1. User Header & Sustainability Impact */}
      <section className="px-16 pt-20 pb-20">
        {/* Avatar with Lime Border & Leaf Badge */}
        <div className="relative w-80 h-80 mx-auto">
          <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-lime-glow bg-warm-sand">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Camila Restrepo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2 -right-2 w-28 h-28 rounded-full bg-deep-forest text-lime-glow flex items-center justify-center border-2 border-cream-canvas">
            <Leaf weight="fill" size={14} />
          </span>
        </div>

        {/* Name & Tier */}
        <h1 className="mt-12 text-center text-heading-sm font-extrabold text-forest-shadow">
          Camila Restrepo
        </h1>

        <div className="mt-6 flex justify-center">
          <span className="px-12 py-4 rounded-full bg-warm-sand text-forest-shadow text-micro font-extrabold inline-flex items-center gap-6">
            <SealCheck weight="fill" size={14} className="text-forest-shadow" />
            <span>Suscriptora Gourmet · Nivel Cosecha</span>
          </span>
        </div>

        {/* Contact Info */}
        <div className="mt-10 flex flex-col items-center gap-4 text-caption text-slate-gray">
          <div className="inline-flex items-center gap-6">
            <EnvelopeSimple weight="regular" size={14} />
            <span>camila.restrepo@email.com</span>
          </div>
          <div className="inline-flex items-center gap-6">
            <DeviceMobile weight="regular" size={14} />
            <span>+57 310 482 9912</span>
          </div>
        </div>

        {/* Sustainability Footprint Card */}
        <div className="mt-16 bg-sage-mist/75 rounded-3xl p-16 border border-deep-forest/10">
          <div className="flex items-center justify-between gap-8 mb-12">
            <span className="text-micro font-extrabold uppercase tracking-wider text-deep-forest">
              HUELLA DE IMPACTO SOSTENIBLE
            </span>
            <Tree weight="regular" size={16} className="text-deep-forest" />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-cream-canvas rounded-2xl p-10 text-center">
              <span className="block text-subheading font-extrabold text-deep-forest">
                18
              </span>
              <span className="block text-micro text-slate-gray mt-2 leading-tight">
                semanas cocinando
              </span>
            </div>

            <div className="bg-cream-canvas rounded-2xl p-10 text-center">
              <span className="block text-subheading font-extrabold text-deep-forest">
                0 g
              </span>
              <span className="block text-micro text-slate-gray mt-2 leading-tight">
                desperdicio comida
              </span>
            </div>

            <div className="bg-cream-canvas rounded-2xl p-10 text-center">
              <span className="block text-subheading font-extrabold text-deep-forest">
                14
              </span>
              <span className="block text-micro text-slate-gray mt-2 leading-tight">
                fincas apoyadas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Active Subscription Plan Banner (Deep Forest) */}
      <section className="bg-deep-forest text-surface-white px-16 py-24">
        <div className="flex items-center justify-between gap-8">
          <span className="px-12 py-4 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold inline-flex items-center gap-6">
            <span className="w-6 h-6 rounded-full bg-deep-forest inline-block" />
            <span>
              {state.isWeekSkipped ? "Semana Pausada" : "Suscripción Activa"}
            </span>
          </span>

          <span className="text-caption font-bold text-lime-glow">
            Renovación semanal
          </span>
        </div>

        <h2 className="mt-12 text-heading-sm font-extrabold text-surface-white">
          Plan Dúo Vital
        </h2>
        <p className="mt-4 text-body-sm text-sage-mist">
          {state.mealsPerWeek} cenas por semana · {totalPortions} porciones
          frescas
        </p>

        {/* Inner Pricing & Delivery Box */}
        <div className="mt-14 bg-forest-shadow/40 rounded-2xl p-16 border border-sage-mist/15">
          <div className="flex items-center justify-between gap-8 pb-12 border-b border-sage-mist/15">
            <div>
              <span className="block text-micro text-sage-mist">
                Inversión semanal
              </span>
              <span className="text-subheading font-extrabold text-surface-white">
                {state.isWeekSkipped
                  ? "$0 COP"
                  : `${formatCOP(discountedTotalCOP)} COP`}
              </span>
            </div>

            <span className="px-10 py-4 rounded-full bg-deep-forest border border-lime-glow/30 text-lime-glow text-micro font-bold inline-flex items-center gap-4 shrink-0">
              <Snowflake weight="bold" size={12} />
              <span>Envío frío incluido</span>
            </span>
          </div>

          <div className="pt-12 flex items-center gap-10">
            <div className="w-32 h-32 rounded-full bg-deep-forest text-lime-glow flex items-center justify-center shrink-0">
              <Truck weight="regular" size={16} />
            </div>
            <div>
              <span className="block text-micro text-sage-mist">
                Próxima entrega programada
              </span>
              <span className="text-caption font-bold text-surface-white">
                {state.isWeekSkipped
                  ? "Martes 7 de Noviembre (8:00 – 12:00)"
                  : "Martes 24 de Octubre (8:00 – 12:00)"}
              </span>
            </div>
          </div>
        </div>

        {/* Plan Actions */}
        <div className="mt-14 flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-10">
            <PillButton
              variant="lime"
              size="sm"
              onClick={() => navigateScreen("wizard-step-1")}
            >
              Cambiar Plan
            </PillButton>

            <button
              type="button"
              onClick={() =>
                state.isWeekSkipped ? toggleSkipWeek() : openSkipWeekModal()
              }
              className="rounded-full bg-sage-mist/15 text-surface-white text-body-sm font-bold min-h-11 min-w-11 px-16 py-10 hover:bg-sage-mist/25 transition-colors cursor-pointer"
            >
              {state.isWeekSkipped ? "Reactivar Semana" : "Pausar Semana"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setBottomTab("calendar")}
            className="w-full rounded-full border border-sage-mist/30 text-surface-white text-caption font-bold min-h-11 min-w-11 py-10 px-16 inline-flex items-center justify-center gap-6 hover:bg-sage-mist/10 transition-colors cursor-pointer"
          >
            <CalendarBlank weight="regular" size={16} />
            <span>Modificar Día de Entrega</span>
          </button>
        </div>
      </section>

      {/* 3. Perfil Dietético & Alérgenos */}
      <section className="px-16 py-24 border-b border-warm-sand">
        <div className="flex items-start justify-between gap-8">
          <h2 className="text-subheading font-extrabold text-forest-shadow leading-tight">
            Perfil Dietético &<br />
            Alérgenos
          </h2>

          <span className="px-10 py-4 rounded-full bg-deep-forest text-lime-glow text-micro font-bold inline-flex items-center gap-4 shrink-0">
            <ShieldCheck weight="fill" size={12} />
            <span>Filtro Activo</span>
          </span>
        </div>

        <p className="mt-6 text-body-sm text-slate-gray">
          Las recetas del menú semanal se filtran automáticamente según estos
          parámetros.
        </p>

        {/* Nutritional Preferences */}
        <div className="mt-14">
          <span className="block text-caption font-bold text-forest-shadow mb-8">
            Preferencia Nutricional:
          </span>

          <div className="flex flex-wrap gap-8">
            {[
              { id: "equilibrada", label: "Equilibrada" },
              { id: "alta-proteina", label: "Alta Proteína" },
              { id: "baja-carbos", label: "Baja en Carbos" },
            ].map((pref) => {
              const isSelected = selectedPrefs.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => togglePrefChip(pref.id)}
                  className={`px-14 py-8 rounded-full inline-flex items-center gap-6 text-caption font-bold min-h-11 min-w-11 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-deep-forest text-surface-white"
                      : "bg-sage-mist text-deep-forest"
                  }`}
                >
                  {isSelected && (
                    <Check
                      weight="bold"
                      size={12}
                      className="text-lime-glow shrink-0"
                    />
                  )}
                  <span>{pref.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => navigateScreen("wizard-step-2")}
              className="px-14 py-8 rounded-full bg-surface-card border border-warm-sand text-forest-shadow inline-flex items-center gap-4 text-caption font-bold min-h-11 min-w-11 hover:bg-warm-sand transition-colors cursor-pointer"
            >
              <Plus weight="bold" size={12} />
              <span>Personalizar</span>
            </button>
          </div>
        </div>

        {/* Clinically Vetoed Allergens Card */}
        <div className="mt-16 bg-surface-card rounded-3xl p-16 border border-warm-sand">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <Warning
                weight="regular"
                size={18}
                className="text-danger-red shrink-0"
              />
              <h3 className="text-body-sm font-extrabold text-forest-shadow leading-tight">
                Alérgenos Vetados
                <br />
                Clínicamente
              </h3>
            </div>

            <span className="px-10 py-4 rounded-full bg-danger-badge text-danger-dark text-micro font-extrabold shrink-0">
              Prioridad 1
            </span>
          </div>

          <div className="mt-12 flex flex-col items-start gap-8">
            {state.vetoedAllergens.length > 0 ? (
              state.vetoedAllergens.map((allergenId) => {
                const option = ALLERGEN_OPTIONS.find(
                  (a) => a.id === allergenId
                );
                return (
                  <button
                    key={allergenId}
                    type="button"
                    onClick={() => toggleAllergen(allergenId)}
                    className="px-12 py-8 rounded-full bg-danger-light border border-danger-border text-danger-dark inline-flex items-center gap-8 text-caption font-extrabold min-h-11 min-w-11 cursor-pointer"
                    title={`Quitar veto de ${option?.title ?? allergenId}`}
                  >
                    <Shrimp weight="regular" size={14} className="shrink-0" />
                    <span>{ALLERGEN_SHORT_LABELS[allergenId]}</span>
                    <X weight="bold" size={12} className="shrink-0" />
                  </button>
                );
              })
            ) : (
              <span className="text-caption text-slate-gray">
                Sin alérgenos vetados actualmente.
              </span>
            )}

            <button
              type="button"
              onClick={() => navigateScreen("wizard-step-2")}
              className="px-12 py-8 rounded-full bg-warm-sand text-forest-shadow inline-flex items-center gap-6 text-caption font-bold min-h-11 min-w-11 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <PlusCircle weight="regular" size={14} />
              <span>Agregar veto o intolerancia</span>
            </button>
          </div>

          {/* Automatic Vegetable Substitution Switch */}
          <div className="mt-14 pt-12 border-t border-warm-sand flex items-center justify-between gap-12">
            <div>
              <h4 className="text-caption font-extrabold text-forest-shadow">
                Sustitución vegetal automática
              </h4>
              <p className="mt-2 text-micro text-slate-gray">
                Reemplaza ingredientes vetados con hongos o legumbres andinas.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={autoVeggieSub}
              aria-label="Sustitución vegetal automática"
              onClick={() => setAutoVeggieSub((prev) => !prev)}
              className="min-h-11 min-w-11 flex items-center justify-end cursor-pointer shrink-0"
            >
              <span
                className={`w-48 h-28 rounded-full p-4 flex items-center transition-colors duration-150 ${
                  autoVeggieSub
                    ? "bg-deep-forest justify-end"
                    : "bg-warm-gray/50 justify-start"
                }`}
              >
                <span className="w-20 h-20 rounded-full bg-lime-glow inline-block" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Dirección Principal */}
      <section className="px-16 py-24">
        <div className="flex items-center gap-8 mb-12">
          <MapPin weight="regular" size={20} className="text-deep-forest" />
          <h2 className="text-subheading font-extrabold text-forest-shadow">
            Dirección Principal
          </h2>
        </div>

        <div className="bg-surface-card rounded-3xl p-16 border border-warm-sand">
          <div className="flex items-center justify-between gap-8">
            <span className="px-10 py-4 rounded-full bg-deep-forest text-surface-white text-micro font-bold">
              Hogar Usaquén
            </span>
            <HouseLine weight="regular" size={18} className="text-warm-gray" />
          </div>

          <h3 className="mt-10 text-body font-extrabold text-forest-shadow">
            {state.checkoutForm.addressLine1}, Apto 402
          </h3>
          <p className="mt-2 text-caption text-slate-gray">
            Usaquén, Bogotá D.C., Colombia
          </p>

          <div className="mt-12 bg-warm-sand/70 rounded-2xl p-12 flex items-start gap-8">
            <Info
              weight="regular"
              size={16}
              className="text-forest-shadow shrink-0 mt-2"
            />
            <p className="text-caption text-forest-shadow">
              <span className="font-bold">Instrucción de portería:</span> Dejar
              en portería con el celador de turno. Caja sellada con aislamiento
              térmico.
            </p>
          </div>

          <div className="mt-12">
            <PillButton
              variant="lime"
              size="sm"
              leftIcon={<MapPinPlus weight="bold" size={16} />}
              onClick={() => navigateScreen("checkout")}
            >
              Añadir dirección alterna (Oficina / Finca)
            </PillButton>
          </div>
        </div>
      </section>

      {/* 5. Método de Pago */}
      <section className="px-16 pb-24">
        <div className="flex items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-8">
            <Wallet weight="regular" size={20} className="text-deep-forest" />
            <h2 className="text-subheading font-extrabold text-forest-shadow">
              Método de Pago
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigateScreen("checkout")}
            className="inline-flex items-center min-h-11 min-w-11 text-caption font-bold text-deep-forest underline cursor-pointer"
          >
            Gestionar
          </button>
        </div>

        {/* Method 1: Bancolombia PSE */}
        <div
          onClick={() => setActivePaymentCard("pse")}
          className={`rounded-2xl p-14 flex items-center justify-between gap-12 transition-colors cursor-pointer ${
            activePaymentCard === "pse"
              ? "bg-deep-forest text-surface-white"
              : "bg-warm-sand/75 text-forest-shadow"
          }`}
        >
          <div className="flex items-center gap-12">
            <div
              className={`w-36 h-36 rounded-full flex items-center justify-center shrink-0 ${
                activePaymentCard === "pse"
                  ? "bg-cream-canvas text-deep-forest"
                  : "bg-deep-forest text-surface-white"
              }`}
            >
              <Bank weight="regular" size={18} />
            </div>
            <div>
              <h3
                className={`text-body-sm font-extrabold ${
                  activePaymentCard === "pse"
                    ? "text-surface-white"
                    : "text-forest-shadow"
                }`}
              >
                Bancolombia Débito (PSE)
              </h3>
              <p
                className={`text-caption ${
                  activePaymentCard === "pse"
                    ? "text-sage-mist"
                    : "text-slate-gray"
                }`}
              >
                Débito automático ···· 4821
              </p>
            </div>
          </div>

          {activePaymentCard === "pse" ? (
            <span className="px-10 py-4 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold shrink-0">
              Activo
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setActivePaymentCard("pse")}
              className="px-12 py-6 rounded-full bg-surface-white text-forest-shadow text-micro font-bold min-h-11 min-w-11 cursor-pointer shrink-0"
            >
              Elegir
            </button>
          )}
        </div>

        {/* Method 2: Nequi Express / Visa */}
        <div
          onClick={() => setActivePaymentCard("nequi")}
          className={`mt-10 rounded-2xl p-14 flex items-center justify-between gap-12 transition-colors cursor-pointer ${
            activePaymentCard === "nequi"
              ? "bg-deep-forest text-surface-white"
              : "bg-warm-sand/75 text-forest-shadow"
          }`}
        >
          <div className="flex items-center gap-12">
            <div
              className={`w-36 h-36 rounded-full flex items-center justify-center shrink-0 ${
                activePaymentCard === "nequi"
                  ? "bg-cream-canvas text-deep-forest"
                  : "bg-deep-forest text-surface-white"
              }`}
            >
              <CreditCard weight="regular" size={18} />
            </div>
            <div>
              <h3
                className={`text-body-sm font-extrabold ${
                  activePaymentCard === "nequi"
                    ? "text-surface-white"
                    : "text-forest-shadow"
                }`}
              >
                Nequi Express / Visa
              </h3>
              <p
                className={`text-caption ${
                  activePaymentCard === "nequi"
                    ? "text-sage-mist"
                    : "text-slate-gray"
                }`}
              >
                Método de respaldo ···· 9102
              </p>
            </div>
          </div>

          {activePaymentCard === "nequi" ? (
            <span className="px-10 py-4 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold shrink-0">
              Activo
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setActivePaymentCard("nequi")}
              className="px-12 py-6 rounded-full bg-surface-white text-forest-shadow text-micro font-bold min-h-11 min-w-11 cursor-pointer shrink-0"
            >
              Elegir
            </button>
          )}
        </div>
      </section>

      {/* 6. Footer Actions & App Metadata */}
      <footer className="px-16 pb-32 flex flex-col items-center">
        <button
          type="button"
          onClick={openHelpSheet}
          className="w-full rounded-full border border-deep-forest text-deep-forest py-12 px-16 min-h-11 min-w-11 inline-flex items-center justify-center gap-8 text-body-sm font-bold hover:bg-sage-mist transition-colors cursor-pointer"
        >
          <Headset weight="bold" size={18} />
          <span>Preguntas Frecuentes & Soporte Chef</span>
        </button>

        <button
          type="button"
          onClick={openHelpSheet}
          className="mt-12 inline-flex items-center gap-6 min-h-11 min-w-11 text-caption font-bold text-slate-gray hover:text-deep-forest cursor-pointer"
        >
          <Scales weight="regular" size={16} />
          <span>Términos del Servicio y Política de Granja</span>
        </button>

        <button
          type="button"
          onClick={() => navigateScreen("home-guest")}
          className="mt-4 inline-flex items-center gap-6 min-h-11 min-w-11 text-caption font-bold text-danger-red hover:opacity-80 cursor-pointer"
        >
          <SignOut weight="regular" size={16} />
          <span>Cerrar Sesión</span>
        </button>

        <div className="mt-16 text-center text-micro text-warm-gray">
          <p>ListoBox Bogotá · Versión 1.0 (Build 111)</p>
          <p className="mt-2 inline-flex items-center justify-center gap-4">
            <span>Alimentación consciente de la mata a la mesa</span>
            <Plant weight="fill" size={12} className="text-olive-accent" />
          </p>
        </div>
      </footer>
    </div>
  );
}
