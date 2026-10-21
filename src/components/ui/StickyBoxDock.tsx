"use client";

import React from "react";
import { ArrowRight, ShoppingBag } from "@phosphor-icons/react";
import { formatCOP } from "@/types/listobox";

export type StickyDockVariant = "banner-cta" | "split-box" | "cta-disclaimer";

export interface StickyDockProps {
  variant?: StickyDockVariant;
  // Banner superior (Pasos 1, 2 y 4)
  topBannerText?: React.ReactNode;
  topBannerAlign?: "left" | "center";

  // Configuración de cuota / slots (Paso 3)
  splitConfig?: {
    headerTitle?: string;
    headerCountText?: string;
    selectedCount: number;
    targetCount: number;
    subtotalCOP: number;
    totalPortions: number;
  };

  // Props directas compatibles con versión anterior de StickyBoxDock (Paso 3)
  selectedCount?: number;
  targetCount?: number;
  subtotalCOP?: number;
  totalPortions?: number;

  // CTA Principal (Común a todas las pantallas)
  ctaText?: string;
  ctaLeftIcon?: React.ReactNode;
  ctaRightIcon?: React.ReactNode;
  ctaPriceBadge?: string;
  onContinue: () => void;
  isDisabled?: boolean;

  // Disclaimer legal inferior (Checkout)
  bottomDisclaimer?: string;

  // Clases extra opcionales
  className?: string;
}

export function StickyDock({
  variant,
  topBannerText,
  topBannerAlign = "left",
  splitConfig,
  selectedCount,
  targetCount,
  subtotalCOP,
  totalPortions,
  ctaText,
  ctaLeftIcon,
  ctaRightIcon,
  ctaPriceBadge,
  onContinue,
  isDisabled = false,
  bottomDisclaimer,
  className = "",
}: StickyDockProps) {
  // Inferir variante si no se especificó explícitamente
  const resolvedVariant: StickyDockVariant =
    variant ??
    (splitConfig || selectedCount !== undefined
      ? "split-box"
      : bottomDisclaimer
      ? "cta-disclaimer"
      : "banner-cta");

  // Render para Variante Paso 3 (Split Box con cuota de recetas)
  if (resolvedVariant === "split-box") {
    const activeSelectedCount =
      splitConfig?.selectedCount ?? selectedCount ?? 0;
    const activeTargetCount = splitConfig?.targetCount ?? targetCount ?? 4;
    const activeSubtotalCOP = splitConfig?.subtotalCOP ?? subtotalCOP ?? 0;
    const activeTotalPortions =
      splitConfig?.totalPortions ?? totalPortions ?? 8;

    const missingCount = Math.max(0, activeTargetCount - activeSelectedCount);
    const isIncomplete = activeSelectedCount < activeTargetCount;
    const slotsArray = Array.from({ length: activeTargetCount }, (_, i) => i);

    const ctaLabel =
      ctaText ??
      (isIncomplete
        ? missingCount === 1
          ? "Falta 1 receta"
          : `Faltan ${missingCount} recetas`
        : "Confirmar y continuar");

    return (
      <div className={`sticky bottom-0 z-30 px-12 pb-8 pt-4 ${className}`}>
        <div className="bg-deep-forest text-surface-white rounded-2xl p-14 shadow-xl border border-sage-mist/20 overflow-hidden">
          {/* Top Row: Label + Dots */}
          <div className="flex items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-6 text-caption min-w-0">
              <span className="text-lime-glow font-bold shrink-0">
                {splitConfig?.headerTitle ?? "Tu Caja Semanal"}
              </span>
              <span className="text-sage-mist truncate">
                {splitConfig?.headerCountText ??
                  `${activeSelectedCount} de ${activeTargetCount} recetas`}
              </span>
            </div>

            <div
              className="flex items-center gap-6 shrink-0"
              aria-label={`${activeSelectedCount} de ${activeTargetCount} recetas seleccionadas`}
            >
              {slotsArray.map((slotIdx) => {
                const isFilled = slotIdx < activeSelectedCount;
                return (
                  <span
                    key={slotIdx}
                    className={`w-8 h-8 rounded-full inline-block transition-colors ${
                      isFilled ? "bg-lime-glow" : "bg-sage-mist/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Price + CTA */}
          <div className="flex items-center justify-between gap-8">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-4">
                <span className="text-subheading font-extrabold text-surface-white whitespace-nowrap">
                  {formatCOP(activeSubtotalCOP)}
                </span>
                <span className="text-caption text-sage-mist font-bold shrink-0">
                  COP
                </span>
              </div>
              <p className="text-micro text-sage-mist truncate">
                {splitConfig?.headerCountText
                  ? splitConfig.headerCountText
                  : `${activeTotalPortions} porciones · Envío refrigerado`}
              </p>
            </div>

            <button
              type="button"
              disabled={isIncomplete}
              onClick={() => {
                if (!isIncomplete) {
                  onContinue();
                }
              }}
              className="shrink-0 inline-flex items-center justify-center gap-6 px-14 py-10 rounded-full bg-lime-glow text-forest-shadow text-caption font-extrabold min-h-11 min-w-11 whitespace-nowrap hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{ctaLabel}</span>
              <ArrowRight weight="bold" size={14} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render para Variantes Banner + Full CTA (Pasos 1, 2, 4) y CTA + Disclaimer (Checkout)
  return (
    <div className={`sticky bottom-0 z-30 px-12 pb-8 pt-4 ${className}`}>
      <div className="bg-deep-forest text-surface-white rounded-2xl p-14 shadow-xl border border-sage-mist/20 overflow-hidden">
        {/* Top Banner (si existe) */}
        {topBannerText && (
          <div
            className={`mb-10 text-lime-glow text-caption font-bold leading-tight ${
              topBannerAlign === "center" ? "text-center" : "text-left"
            }`}
          >
            {topBannerText}
          </div>
        )}

        {/* Botón CTA Full Width */}
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              onContinue();
            }
          }}
          className={`w-full inline-flex items-center rounded-full bg-lime-glow text-forest-shadow min-h-11 min-w-11 transition-opacity hover:opacity-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            ctaPriceBadge
              ? "justify-between px-14 py-8"
              : "justify-center gap-8 px-16 py-12"
          }`}
        >
          {/* Lado izquierdo o centrado */}
          <div className="flex items-center gap-8 min-w-0">
            {ctaLeftIcon && <span className="shrink-0">{ctaLeftIcon}</span>}
            <span
              className={`font-extrabold text-forest-shadow truncate ${
                ctaPriceBadge ? "text-body-sm" : "text-body"
              }`}
            >
              {ctaText}
            </span>
          </div>

          {/* Badge de precio derecho (Pasos 4 y Checkout) */}
          {ctaPriceBadge ? (
            <span className="ml-6 px-10 py-4 rounded-full bg-lime-pill-inner text-forest-shadow text-caption font-extrabold inline-flex items-center gap-4 whitespace-nowrap shrink-0">
              <span>{ctaPriceBadge}</span>
              <ArrowRight weight="bold" size={14} className="shrink-0" />
            </span>
          ) : (
            ctaRightIcon ?? (
              <ArrowRight weight="bold" size={16} className="shrink-0" />
            )
          )}
        </button>

        {/* Disclaimer inferior legal (Checkout) */}
        {bottomDisclaimer && (
          <p className="mt-10 text-center text-micro text-sage-mist/85 leading-tight px-4">
            {bottomDisclaimer}
          </p>
        )}
      </div>
    </div>
  );
}

// Export para compatibilidad hacia atrás
export const StickyBoxDock = StickyDock;
