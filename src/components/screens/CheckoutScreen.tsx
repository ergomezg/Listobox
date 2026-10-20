"use client";

import React from "react";
import {
  ArrowRight,
  Bank,
  Buildings,
  CalendarCheck,
  Check,
  CheckCircle,
  CreditCard,
  DeviceMobile,
  HourglassMedium,
  Leaf,
  MapPin,
  ShieldCheck,
  Snowflake,
  Timer,
  Truck,
} from "@phosphor-icons/react";
import { formatCOP, LocalPaymentMethodId } from "@/types/listobox";
import { useListoBox } from "@/context/ListoBoxContext";
import { HERO_IMAGES } from "@/mocks/listoboxData";
import { SelectableCard } from "@/components/ui/SelectableCard";
import { PillButton } from "@/components/ui/PillButton";

export function CheckoutScreen() {
  const {
    state,
    totalPortions,
    subtotalCOP,
    updateCheckoutForm,
    submitCheckoutOrder,
  } = useListoBox();

  const { checkoutForm } = state;

  const paymentMethods: {
    id: LocalPaymentMethodId;
    label: string;
    badge: string;
  }[] = [
    { id: "tarjeta", label: "Tarjeta", badge: "VISA/MC" },
    { id: "pse", label: "PSE", badge: "Bancos" },
    { id: "nequi", label: "Nequi", badge: "1-Tap" },
    { id: "daviplata", label: "Daviplata", badge: "Local" },
  ];

  return (
    <div className="pb-24 px-16 pt-16">
      {/* 1. Top Hero Image */}
      <div className="h-160 w-full rounded-2xl overflow-hidden bg-warm-sand">
        <img
          src={HERO_IMAGES.spicesBoard}
          alt="Ingredientes listos para tu primera caja ListoBox"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline */}
      <h1 className="mt-20 text-heading-mobile font-extrabold text-deep-forest">
        Tu primera caja ListoBox está lista.
      </h1>

      {/* 2. Visual Box Summary Card */}
      <div className="mt-16 bg-surface-card rounded-2xl p-16">
        <div className="relative h-160 w-full rounded-xl overflow-hidden bg-warm-sand">
          <img
            src={HERO_IMAGES.boxOpenKitchen}
            alt="Caja Semanal ListoBox en cocina"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-10 left-10 inline-flex items-center gap-6 px-12 py-4 rounded-full bg-deep-forest text-surface-white text-caption font-bold">
            <CheckCircle
              weight="regular"
              size={14}
              className="text-lime-glow"
            />
            <span>Caja Lista · Edición Semanal</span>
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          <div className="flex items-center gap-12">
            <div className="w-32 h-32 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <Leaf weight="regular" size={16} />
            </div>
            <span className="text-body-sm font-medium text-deep-forest">
              Ingredientes 100% frescos de fincas locales
            </span>
          </div>

          <div className="flex items-center gap-12">
            <div className="w-32 h-32 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <HourglassMedium weight="regular" size={16} />
            </div>
            <span className="text-body-sm font-medium text-deep-forest">
              Porciones exactas (cero desperdicio en casa)
            </span>
          </div>

          <div className="flex items-center gap-12">
            <div className="w-32 h-32 rounded-full bg-sage-mist text-deep-forest flex items-center justify-center shrink-0">
              <Timer weight="regular" size={16} />
            </div>
            <span className="text-body-sm font-medium text-deep-forest">
              Recetas guiadas paso a paso en menos de 30 min
            </span>
          </div>
        </div>
      </div>

      {/* 3. ¿Dónde y cuándo entregamos? */}
      <section className="mt-24">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-8 text-deep-forest">
            <Truck weight="regular" size={22} className="shrink-0" />
            <h2 className="text-subheading font-bold">
              ¿Dónde y cuándo entregamos?
            </h2>
          </div>
          <span className="text-caption text-slate-gray">Paso 1 de 2</span>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          <div>
            <label
              htmlFor="checkout-address-1"
              className="block text-body-sm font-bold text-deep-forest mb-6"
            >
              Dirección principal
            </label>
            <div className="flex items-center gap-10 px-14 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
              <MapPin
                weight="regular"
                size={18}
                className="text-deep-forest shrink-0"
              />
              <input
                id="checkout-address-1"
                type="text"
                value={checkoutForm.addressLine1}
                onChange={(e) =>
                  updateCheckoutForm({ addressLine1: e.target.value })
                }
                className="w-full min-h-11 min-w-11 bg-transparent text-body text-deep-forest focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="checkout-address-2"
              className="block text-body-sm font-bold text-deep-forest mb-6"
            >
              Apto / Torre / Indicaciones
            </label>
            <div className="flex items-center gap-10 px-14 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
              <Buildings
                weight="regular"
                size={18}
                className="text-deep-forest shrink-0"
              />
              <input
                id="checkout-address-2"
                type="text"
                value={checkoutForm.addressLine2}
                onChange={(e) =>
                  updateCheckoutForm({ addressLine2: e.target.value })
                }
                className="w-full min-h-11 min-w-11 bg-transparent text-body text-deep-forest focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="block text-body-sm font-bold text-deep-forest mb-8">
              Día de entrega sugerido
            </span>
            <div className="grid grid-cols-2 gap-10">
              <SelectableCard
                variant="delivery-day"
                selected={checkoutForm.deliveryDay === "martes-24"}
                onSelect={() =>
                  updateCheckoutForm({ deliveryDay: "martes-24" })
                }
                title="Martes 24 Oct"
                subtitle="Recomendado"
              />
              <SelectableCard
                variant="delivery-day"
                selected={checkoutForm.deliveryDay === "miercoles-25"}
                onSelect={() =>
                  updateCheckoutForm({ deliveryDay: "miercoles-25" })
                }
                title="Miércoles 25 Oct"
                subtitle="8:00 AM - 1:00 PM"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Método de pago seguro (Con soporte para Tarjeta, PSE, Nequi, Daviplata) */}
      <section className="mt-24">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-8 text-deep-forest">
            <CreditCard weight="regular" size={22} className="shrink-0" />
            <h2 className="text-subheading font-bold">Método de pago seguro</h2>
          </div>

          <span className="inline-flex items-center gap-4 text-caption text-slate-gray">
            <ShieldCheck weight="regular" size={14} />
            <span>Tokenizado</span>
          </span>
        </div>

        {/* Local Payment Methods Selector Pills (PRD HU-06) */}
        <div className="mt-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {paymentMethods.map((method) => {
            const isSelected = checkoutForm.paymentMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() =>
                  updateCheckoutForm({ paymentMethod: method.id })
                }
                className={`shrink-0 inline-flex items-center gap-6 px-14 py-8 rounded-full text-caption font-bold min-h-11 min-w-11 transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-deep-forest text-lime-glow"
                    : "bg-sage-mist text-deep-forest"
                }`}
              >
                <span>{method.label}</span>
                <span className="text-micro opacity-80">{method.badge}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 bg-surface-card rounded-2xl p-16">
          {checkoutForm.paymentMethod === "tarjeta" && (
            <>
              <div className="flex items-center justify-between gap-8 mb-12">
                <div className="inline-flex items-center gap-8 text-deep-forest text-body-sm font-bold">
                  <CreditCard weight="regular" size={18} />
                  <span>Tarjeta de Débito / Crédito</span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="px-8 py-2 rounded-full bg-cream-canvas text-deep-forest text-micro font-extrabold">
                    VISA
                  </span>
                  <span className="px-8 py-2 rounded-full bg-cream-canvas text-deep-forest text-micro font-extrabold">
                    MC
                  </span>
                </div>
              </div>

              {/* Card Number Input */}
              <div className="flex items-center justify-between gap-8 px-14 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
                <input
                  type="text"
                  aria-label="Número de tarjeta"
                  value={checkoutForm.cardNumberMasked}
                  onChange={(e) =>
                    updateCheckoutForm({ cardNumberMasked: e.target.value })
                  }
                  className="w-full min-h-11 min-w-11 bg-transparent text-body font-medium text-deep-forest focus:outline-none"
                />
                <CheckCircle
                  weight="regular"
                  size={18}
                  className="text-olive-accent shrink-0"
                />
              </div>

              {/* Expiry & CVC */}
              <div className="mt-10 grid grid-cols-2 gap-10">
                <div className="flex items-center gap-6 px-12 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
                  <span className="text-body-sm text-slate-gray">Vence:</span>
                  <input
                    type="text"
                    aria-label="Fecha de vencimiento"
                    value={checkoutForm.cardExpiry}
                    onChange={(e) =>
                      updateCheckoutForm({ cardExpiry: e.target.value })
                    }
                    className="w-full min-h-11 min-w-11 bg-transparent text-body font-bold text-deep-forest focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 px-12 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
                  <span className="text-body-sm text-slate-gray">CVC:</span>
                  <input
                    type="text"
                    aria-label="Código CVC"
                    value={checkoutForm.cardCvc}
                    onChange={(e) =>
                      updateCheckoutForm({ cardCvc: e.target.value })
                    }
                    className="w-full min-h-11 min-w-11 bg-transparent text-body font-bold text-deep-forest focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {checkoutForm.paymentMethod === "pse" && (
            <div>
              <div className="inline-flex items-center gap-8 text-deep-forest text-body-sm font-bold mb-10">
                <Bank weight="regular" size={18} />
                <span>Débito Bancario PSE (Colombia)</span>
              </div>
              <div className="flex items-center justify-between gap-8 px-14 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
                <input
                  type="text"
                  aria-label="Entidad bancaria PSE"
                  value={checkoutForm.pseBank}
                  onChange={(e) =>
                    updateCheckoutForm({ pseBank: e.target.value })
                  }
                  className="w-full min-h-11 min-w-11 bg-transparent text-body font-bold text-deep-forest focus:outline-none"
                />
                <CheckCircle
                  weight="regular"
                  size={18}
                  className="text-olive-accent shrink-0"
                />
              </div>
            </div>
          )}

          {(checkoutForm.paymentMethod === "nequi" ||
            checkoutForm.paymentMethod === "daviplata") && (
            <div>
              <div className="inline-flex items-center gap-8 text-deep-forest text-body-sm font-bold mb-10">
                <DeviceMobile weight="regular" size={18} />
                <span>
                  Billetera Móvil{" "}
                  {checkoutForm.paymentMethod === "nequi"
                    ? "Nequi"
                    : "Daviplata"}{" "}
                  (+57)
                </span>
              </div>
              <div className="flex items-center justify-between gap-8 px-14 rounded-lg border border-deep-forest bg-cream-canvas min-h-11">
                <input
                  type="tel"
                  aria-label="Celular vinculado a la billetera"
                  value={checkoutForm.walletPhone}
                  onChange={(e) =>
                    updateCheckoutForm({ walletPhone: e.target.value })
                  }
                  className="w-full min-h-11 min-w-11 bg-transparent text-body font-bold text-deep-forest focus:outline-none"
                />
                <CheckCircle
                  weight="regular"
                  size={18}
                  className="text-olive-accent shrink-0"
                />
              </div>
            </div>
          )}

          {/* Recurring Checkbox */}
          <button
            type="button"
            onClick={() =>
              updateCheckoutForm({
                rememberPaymentMethod: !checkoutForm.rememberPaymentMethod,
              })
            }
            className="mt-12 w-full flex items-start gap-10 text-left min-h-11 cursor-pointer"
          >
            <span
              className={`mt-2 w-16 h-16 rounded-md flex items-center justify-center shrink-0 ${
                checkoutForm.rememberPaymentMethod
                  ? "bg-deep-forest text-surface-white"
                  : "bg-cream-canvas border border-warm-gray"
              }`}
            >
              {checkoutForm.rememberPaymentMethod && (
                <Check weight="bold" size={12} />
              )}
            </span>
            <span className="text-caption text-deep-forest">
              Recordar método para futuros cobros automáticos de renovación
              semanal (cada martes 23:59).
            </span>
          </button>
        </div>
      </section>

      {/* 5. Resumen de tu Pedido */}
      <section className="mt-24 bg-surface-card rounded-2xl p-16">
        <div className="flex items-center justify-between gap-8">
          <h2 className="text-subheading font-bold text-deep-forest">
            Resumen de tu Pedido
          </h2>
          <span className="px-10 py-4 rounded-full bg-lime-glow text-forest-shadow text-caption font-extrabold">
            1ª Entrega
          </span>
        </div>

        <div className="mt-14 flex items-start justify-between gap-8">
          <div>
            <p className="text-body font-bold text-deep-forest">
              Caja Semanal {state.mealsPerWeek} Recetas
            </p>
            <p className="text-caption text-slate-gray">
              Para {state.peopleCount} personas ({totalPortions} porciones en
              total)
            </p>
            <p className="mt-2 text-caption font-bold text-olive-accent">
              {formatCOP(state.basePricePerPortionCOP)} COP por plato gourmet en
              casa
            </p>
          </div>
          <span className="text-body font-bold text-deep-forest shrink-0">
            {formatCOP(subtotalCOP)} COP
          </span>
        </div>

        <div className="mt-14 pt-12 border-t border-warm-sand flex items-center justify-between gap-8 text-body-sm">
          <div className="inline-flex items-center gap-6 text-deep-forest">
            <Snowflake weight="regular" size={16} />
            <span>Envío refrigerado con hielo gel</span>
          </div>

          <div className="inline-flex items-center gap-6">
            <span className="text-warm-gray line-through text-caption">
              $12.000
            </span>
            <span className="text-olive-accent font-extrabold">Gratis</span>
          </div>
        </div>

        <div className="mt-14 pt-12 border-t border-warm-sand flex items-center justify-between gap-12">
          <div>
            <p className="text-subheading font-bold text-deep-forest">
              Total a debitar hoy
            </p>
            <p className="text-caption text-slate-gray">
              IVA incluido · Facturación electrónica
            </p>
          </div>

          <div className="text-right">
            <span className="text-heading-sm font-extrabold text-deep-forest block">
              {formatCOP(subtotalCOP)} COP
            </span>
          </div>
        </div>

        <div className="mt-14 p-12 rounded-xl bg-warm-sand flex items-start gap-10">
          <CalendarCheck
            weight="regular"
            size={18}
            className="text-deep-forest shrink-0 mt-2"
          />
          <p className="text-caption text-deep-forest">
            <span className="font-bold">Tranquilidad garantizada:</span> Próxima
            ventana para editar recetas o pausar la siguiente entrega sin costo:{" "}
            <span className="font-bold">
              Lunes 23 Oct antes de las 11:59 PM.
            </span>
          </p>
        </div>
      </section>

      {/* 6. Primary Submit CTA -> Navigates to CheckoutSuccessScreen */}
      <div className="mt-20">
        <PillButton
          variant="lime"
          size="lg"
          rightIcon={<ArrowRight weight="bold" size={20} />}
          onClick={submitCheckoutOrder}
        >
          Comenzar suscripción · {formatCOP(subtotalCOP)} COP
        </PillButton>

        <p className="mt-10 text-center text-caption text-slate-gray px-8">
          Al hacer clic aceptas los Términos de Suscripción Semanal. Cobros
          automáticos pausables en todo momento desde tu app.
        </p>
      </div>
    </div>
  );
}
