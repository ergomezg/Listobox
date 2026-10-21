"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChatCenteredText,
  CheckCircle,
  Clock,
  Door,
  ForkKnife,
  Headset,
  HourglassHigh,
  Leaf,
  MapPin,
  Package,
  ThermometerCold,
  Truck,
} from "@phosphor-icons/react";
import { useListoBox } from "@/context/ListoBoxContext";
import { PillButton } from "@/components/ui/PillButton";

interface FreshnessNightItem {
  id: string;
  dayHeader: string;
  badgeText: string;
  badgeVariant: "danger" | "white";
  badgeIcon?: "clock" | "check";
  title: string;
  description: string;
  imageUrl: string;
  kcalBadge?: string;
  prepTimeText: string;
  footerMeta: string;
  hasGreenDot?: boolean;
  cardSurface: "sage" | "sand";
  linkedRecipeId: string;
}

const FRESHNESS_NIGHTS: FreshnessNightItem[] = [
  {
    id: "night-1",
    dayHeader: "MARTES 29 OCT · NOCHE 1",
    badgeText: "Consumo 24h",
    badgeVariant: "danger",
    badgeIcon: "clock",
    title: "Salmón del Pacífico al Eneldo",
    description:
      "Cocinar primero: lomo de pesca silvestre refrigerado a 2°C con hierbas recién cortadas.",
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    kcalBadge: "Kcal 520",
    prepTimeText: "15 minutos",
    footerMeta: "Nivel: Muy fácil",
    hasGreenDot: true,
    cardSurface: "sage",
    linkedRecipeId: "salmon-glaseado-panela",
  },
  {
    id: "night-2",
    dayHeader: "MIÉRCOLES 30 OCT · NOCHE 2",
    badgeText: "Frescura óptima ave",
    badgeVariant: "white",
    badgeIcon: "check",
    title: "Pollo Campesino en Salsa Criolla",
    description:
      "Pechuga de pastoreo sellada con cebollines campesinos y emulsión de tomate chonto fresco.",
    imageUrl:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    prepTimeText: "20 minutos",
    footerMeta: "Sartén + 1 fuego",
    cardSurface: "sand",
    linkedRecipeId: "pollo-campesino-criolla",
  },
  {
    id: "night-3",
    dayHeader: "VIERNES 1 NOV · NOCHE 3",
    badgeText: "Madurado al vacío",
    badgeVariant: "white",
    title: "Lomo Fino Salteado al Wok",
    description:
      "Corte tierno macerado en soya reducida, ajonjolí tostado y cebollas moradas crujientes.",
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    prepTimeText: "18 minutos",
    footerMeta: "Gusto: Umami intenso",
    cardSurface: "sage",
    linkedRecipeId: "lomo-fino-wok-criollo",
  },
  {
    id: "night-4",
    dayHeader: "SÁBADO 2 NOV · NOCHE 4",
    badgeText: "Larga conservación",
    badgeVariant: "white",
    title: "Bowl Andino de Quinua Real & Tofu",
    description:
      "Vegetales de raíz, aguacate hass y aderezo cremoso de maracuyá y cúrcuma fresca.",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTimeText: "20 minutos",
    footerMeta: "100% Plant-Based",
    cardSurface: "sand",
    linkedRecipeId: "bowl-mediterraneo-quinua",
  },
];

export function CalendarScreen() {
  const {
    state,
    openSwapSheet,
    navigateScreen,
    openSkipWeekModal,
    toggleSkipWeek,
    openHelpSheet,
  } = useListoBox();

  const [weekIndex, setWeekIndex] = useState<0 | 1>(0);
  const [coldStatusExpanded, setColdStatusExpanded] = useState(false);

  const weekLabel = weekIndex === 0 ? "28 Oct – 3 Nov" : "4 Nov – 10 Nov";

  const renderNightCard = (item: FreshnessNightItem) => (
    <article
      className={`flex-1 min-w-0 rounded-3xl p-14 border border-deep-forest/15 ${
        item.cardSurface === "sage" ? "bg-sage-mist/60" : "bg-warm-sand/55"
      }`}
    >
      {/* Top Day + Freshness Badge */}
      <div className="flex items-center justify-between gap-8">
        <span className="text-micro font-extrabold uppercase tracking-wider text-olive-accent">
          {item.dayHeader}
        </span>

        <span
          className={`shrink-0 inline-flex items-center gap-4 px-10 py-4 rounded-full text-micro font-bold ${
            item.badgeVariant === "danger"
              ? "bg-danger-badge text-danger-dark"
              : "bg-surface-white text-deep-forest"
          }`}
        >
          {item.badgeIcon === "clock" && <Clock weight="bold" size={12} />}
          {item.badgeIcon === "check" && (
            <CheckCircle weight="regular" size={12} />
          )}
          <span>{item.badgeText}</span>
        </span>
      </div>

      {/* Dish Title & Description */}
      <h3 className="mt-6 text-body-lg font-extrabold text-deep-forest leading-snug">
        {item.title}
      </h3>
      <p className="mt-4 text-caption text-slate-gray">{item.description}</p>

      {/* Dish Photo */}
      <div className="mt-10 relative h-120 w-full rounded-2xl overflow-hidden bg-warm-sand">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {item.kcalBadge && (
          <span className="absolute top-8 right-8 px-10 py-4 rounded-full bg-surface-white/95 text-forest-shadow text-micro font-extrabold">
            {item.kcalBadge}
          </span>
        )}
        <span className="absolute bottom-8 left-8 inline-flex items-center gap-4 px-10 py-4 rounded-full bg-forest-shadow/85 text-surface-white text-micro font-bold">
          <Clock weight="regular" size={12} className="text-lime-glow" />
          <span>{item.prepTimeText}</span>
        </span>
      </div>

      {/* Footer Action Row */}
      <div className="mt-12 flex items-center justify-between gap-8">
        <div className="inline-flex items-center gap-6 text-caption font-bold text-deep-forest">
          {item.hasGreenDot && (
            <span className="w-6 h-6 rounded-full bg-olive-accent inline-block shrink-0" />
          )}
          <span>{item.footerMeta}</span>
        </div>

        <button
          type="button"
          onClick={() => openSwapSheet(item.linkedRecipeId)}
          className="px-14 py-8 rounded-full bg-deep-forest text-surface-white text-caption font-bold min-h-11 min-w-11 hover:opacity-95 transition-opacity cursor-pointer"
        >
          Ficha de Cocina
        </button>
      </div>
    </article>
  );

  return (
    <div>
      {/* 1. Top Header, Week Controls & Cold-Chain Card */}
      <div className="px-16 pt-16">
        {/* Eyebrow Pill + Prev/Next Arrows */}
        <div className="flex items-center justify-between gap-8">
          <span className="inline-flex items-center gap-6 px-10 py-4 rounded-lg bg-sage-mist text-deep-forest text-micro font-bold">
            <ForkKnife weight="bold" size={12} />
            <span>Cronograma Chef ListoBox</span>
          </span>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setWeekIndex(0)}
              aria-label="Semana anterior"
              className="min-h-11 min-w-11 w-32 h-32 rounded-full bg-surface-card border border-warm-sand text-deep-forest flex items-center justify-center hover:bg-sage-mist transition-colors cursor-pointer"
            >
              <CaretLeft weight="bold" size={14} />
            </button>
            <button
              type="button"
              onClick={() => setWeekIndex(1)}
              aria-label="Semana siguiente"
              className="min-h-11 min-w-11 w-32 h-32 rounded-full bg-surface-card border border-warm-sand text-deep-forest flex items-center justify-center hover:bg-sage-mist transition-colors cursor-pointer"
            >
              <CaretRight weight="bold" size={14} />
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="mt-10 text-heading-sm font-extrabold text-deep-forest">
          Tu Agenda Semanal de Cocina
        </h1>
        <p className="mt-4 text-body-sm text-slate-gray">
          Día de llegada de la caja y cronograma recomendado de frescura para
          tus {state.mealsPerWeek} cenas.
        </p>

        {/* Week Selector Pill Bar */}
        <div className="mt-14 bg-warm-sand/60 rounded-full p-6 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => setWeekIndex((prev) => (prev === 0 ? 1 : 0))}
            className="bg-surface-white rounded-full px-14 py-8 flex items-center justify-between flex-1 min-h-11 min-w-11 cursor-pointer"
          >
            <CalendarBlank
              weight="regular"
              size={16}
              className="text-olive-accent shrink-0"
            />
            <span className="text-body-sm font-extrabold text-deep-forest">
              {weekLabel}
            </span>
            <CaretDown
              weight="bold"
              size={14}
              className="text-deep-forest shrink-0"
            />
          </button>

          <div className="px-10 flex items-center gap-6 text-caption font-bold text-deep-forest shrink-0">
            <span className="w-6 h-6 rounded-full bg-olive-accent inline-block shrink-0" />
            <span className="leading-tight">
              {state.mealsPerWeek} de {state.mealsPerWeek}
              <br />
              comidas
            </span>
          </div>
        </div>

        {/* Cold-Chain Logistics Card */}
        <section className="mt-16 bg-deep-forest text-surface-white rounded-3xl p-16">
          <div className="flex items-start justify-between gap-12">
            <div className="flex items-center gap-12">
              <div className="w-36 h-36 rounded-full bg-lime-glow text-forest-shadow flex items-center justify-center shrink-0">
                <Truck weight="fill" size={18} />
              </div>
              <div>
                <span className="block text-micro font-extrabold uppercase tracking-wider text-lime-glow">
                  LOGÍSTICA EN FRÍO
                </span>
                <h2 className="text-subheading font-extrabold text-surface-white leading-tight">
                  Llegada de tu Caja
                </h2>
              </div>
            </div>

            <span className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-sage-mist/15 text-surface-white text-micro font-bold shrink-0">
              <span className="w-6 h-6 rounded-full bg-lime-glow inline-block" />
              <span>{state.isWeekSkipped ? "Pausada" : "En ruta"}</span>
            </span>
          </div>

          <div className="mt-14 bg-forest-shadow/35 rounded-2xl p-14 flex flex-col gap-10 border border-sage-mist/15">
            <div className="flex items-center gap-10">
              <CalendarBlank
                weight="regular"
                size={16}
                className="text-lime-glow shrink-0"
              />
              <span className="text-body-sm font-bold text-surface-white">
                Martes 29 de Octubre
              </span>
            </div>
            <div className="flex items-center gap-10">
              <Clock
                weight="regular"
                size={16}
                className="text-lime-glow shrink-0"
              />
              <span className="text-caption text-sage-mist">
                Franja matutina: 8:00 AM – 12:00 PM
              </span>
            </div>
            <div className="flex items-center gap-10">
              <MapPin
                weight="regular"
                size={16}
                className="text-lime-glow shrink-0"
              />
              <span className="text-caption text-sage-mist">
                Origen: Centro de Frescura Ventaquemada
              </span>
            </div>
          </div>

          {coldStatusExpanded && (
            <div className="mt-10 rounded-xl bg-sage-mist/15 px-12 py-8 text-micro text-lime-glow font-bold">
              Sensor isotérmico activo: 2.4 °C · Empaque de lana kraft sellado
            </div>
          )}

          <div className="mt-14 grid grid-cols-2 gap-10">
            <button
              type="button"
              onClick={() => setColdStatusExpanded((prev) => !prev)}
              className="rounded-full bg-lime-glow text-forest-shadow py-10 px-14 min-h-11 min-w-11 inline-flex items-center justify-center gap-6 text-caption font-extrabold hover:opacity-95 transition-opacity cursor-pointer"
            >
              <ThermometerCold weight="bold" size={16} />
              <span>Rastrear frío</span>
            </button>

            <button
              type="button"
              onClick={() => navigateScreen("profile")}
              className="rounded-full bg-transparent text-surface-white py-10 px-14 min-h-11 min-w-11 inline-flex items-center justify-center gap-6 text-caption font-bold hover:bg-sage-mist/10 transition-colors cursor-pointer"
            >
              <Door weight="regular" size={16} />
              <span>Portería</span>
            </button>
          </div>
        </section>

        {/* 2. Planificador de Frescura (Timeline) */}
        <section className="mt-24">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="text-subheading font-extrabold text-deep-forest">
                Planificador de Frescura
              </h2>
              <p className="mt-2 text-caption text-slate-gray">
                Orden diseñado para cocinar cada proteína en su momento cumbre.
              </p>
            </div>
            <Leaf
              weight="regular"
              size={20}
              className="text-olive-accent shrink-0 mt-4"
            />
          </div>

          <div className="mt-16 flex flex-col gap-16">
            {/* Item 1: Lunes 28 Oct */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-warm-gray shrink-0 mt-4" />
                <span className="w-2 flex-1 bg-warm-sand mt-4" />
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between gap-8 pb-4">
                <div>
                  <span className="block text-micro font-extrabold uppercase text-slate-gray">
                    LUNES 28 OCT
                  </span>
                  <span className="text-body font-bold text-slate-gray">
                    Noche sin kit activo
                  </span>
                </div>
                <span className="px-10 py-4 rounded-full bg-surface-card text-slate-gray text-micro font-bold shrink-0">
                  Despensa propia
                </span>
              </div>
            </div>

            {/* Item 2: Martes 29 Oct · Noche 1 */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-lime-glow shrink-0 mt-6" />
                <span className="w-2 flex-1 bg-warm-sand mt-4" />
              </div>
              {renderNightCard(FRESHNESS_NIGHTS[0])}
            </div>

            {/* Item 3: Miércoles 30 Oct · Noche 2 */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-lime-glow shrink-0 mt-6" />
                <span className="w-2 flex-1 bg-warm-sand mt-4" />
              </div>
              {renderNightCard(FRESHNESS_NIGHTS[1])}
            </div>

            {/* Item 4: Jueves 31 Oct · Pausa */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-warm-gray shrink-0 mt-6" />
                <span className="w-2 flex-1 bg-warm-sand mt-4" />
              </div>
              <div className="flex-1 min-w-0 rounded-2xl bg-surface-card p-14 border border-warm-sand">
                <div className="flex items-center justify-between gap-8">
                  <span className="text-micro font-extrabold uppercase text-slate-gray">
                    JUEVES 31 OCT · PAUSA
                  </span>
                  <ForkKnife
                    weight="regular"
                    size={16}
                    className="text-olive-accent shrink-0"
                  />
                </div>
                <h3 className="mt-4 text-body font-extrabold text-deep-forest">
                  Noche Libre / Cena fuera
                </h3>
                <p className="mt-4 text-caption text-slate-gray">
                  Espacio para compromisos sociales o recalentar caldos. Tus 2
                  cenas restantes esperan intactas al vacío.
                </p>
              </div>
            </div>

            {/* Item 5: Viernes 1 Nov · Noche 3 */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-lime-glow shrink-0 mt-6" />
                <span className="w-2 flex-1 bg-warm-sand mt-4" />
              </div>
              {renderNightCard(FRESHNESS_NIGHTS[2])}
            </div>

            {/* Item 6: Sábado 2 Nov · Noche 4 */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-lime-glow shrink-0 mt-6" />
                <span className="w-2 flex-1 bg-warm-sand mt-4" />
              </div>
              {renderNightCard(FRESHNESS_NIGHTS[3])}
            </div>

            {/* Item 7: Domingo 3 Nov · Cierre de pedidos */}
            <div className="flex gap-10">
              <div className="flex flex-col items-center w-14 shrink-0">
                <span className="w-10 h-10 rounded-full bg-olive-accent shrink-0 mt-6" />
              </div>
              <div className="flex-1 min-w-0 rounded-2xl bg-surface-card p-14 border border-warm-sand">
                <div className="inline-flex items-center gap-6 text-danger-red text-micro font-extrabold uppercase">
                  <HourglassHigh weight="bold" size={12} />
                  <span>DOMINGO 3 NOV · CIERRE DE PEDIDOS</span>
                </div>
                <h3 className="mt-4 text-body font-extrabold text-deep-forest">
                  Fin de semana y balance de despensa
                </h3>
                <p className="mt-4 text-caption text-slate-gray">
                  Las opciones para la caja del siguiente ciclo se cierran hoy a
                  las 11:59 PM para cosecha de lunes a primera hora.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Próxima Caja Semanal Band */}
      <section className="mt-24 bg-sage-mist px-16 py-24">
        <div className="flex items-center justify-between gap-8">
          <div className="inline-flex items-center gap-6 text-caption font-extrabold uppercase text-deep-forest">
            <Package
              weight="regular"
              size={16}
              className="text-olive-accent shrink-0"
            />
            <span>PRÓXIMA CAJA SEMANAL</span>
          </div>

          <span className="px-10 py-4 rounded-full bg-cream-canvas text-deep-forest text-micro font-bold">
            Semana 45
          </span>
        </div>

        <h3 className="mt-8 text-subheading font-extrabold text-deep-forest">
          Martes 5 de Noviembre
        </h3>

        <p className="mt-6 text-caption text-slate-gray">
          Estado actual:{" "}
          <span className="font-bold text-deep-forest">
            {state.mealsPerWeek} recetas pre-seleccionadas por chef
          </span>{" "}
          según tus gustos habituales. Tienes hasta el domingo para cambiar
          platos.
        </p>

        <div className="mt-16">
          <PillButton
            variant="lime"
            size="md"
            rightIcon={<ArrowRight weight="bold" size={16} />}
            onClick={() => navigateScreen("wizard-step-3")}
          >
            Gestionar menú próxima semana
          </PillButton>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() =>
              state.isWeekSkipped ? toggleSkipWeek() : openSkipWeekModal()
            }
            className="inline-flex items-center justify-center min-h-11 min-w-11 text-caption font-bold text-deep-forest underline cursor-pointer"
          >
            {state.isWeekSkipped
              ? "Reactivar semana siguiente"
              : "Pausar semana siguiente"}
          </button>
        </div>
      </section>

      {/* 4. Concierge Support Card */}
      <section className="px-16 py-20">
        <div className="bg-surface-card rounded-3xl p-16 flex items-center justify-between gap-12 border border-warm-sand">
          <div className="w-36 h-36 rounded-full bg-deep-forest text-lime-glow flex items-center justify-center shrink-0">
            <Headset weight="regular" size={18} />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-caption font-extrabold text-deep-forest">
              ¿Cambio imprevisto de planes?
            </h4>
            <p className="mt-2 text-micro text-slate-gray">
              Ajusta dirección o franja horaria por WhatsApp con nuestro
              concierge.
            </p>
          </div>

          <button
            type="button"
            onClick={openHelpSheet}
            aria-label="Abrir soporte y ayuda por WhatsApp"
            className="min-h-11 min-w-11 w-40 h-40 rounded-full bg-cream-canvas text-olive-accent flex items-center justify-center hover:bg-sage-mist transition-colors cursor-pointer shrink-0"
          >
            <ChatCenteredText weight="regular" size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
