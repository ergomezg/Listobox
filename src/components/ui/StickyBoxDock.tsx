"use client";

import React from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { formatCOP } from "@/types/listobox";

interface StickyBoxDockProps {
  selectedCount: number;
  targetCount: number;
  subtotalCOP: number;
  totalPortions: number;
  onContinue: () => void;
}

export function StickyBoxDock({
  selectedCount,
  targetCount,
  subtotalCOP,
  totalPortions,
  onContinue,
}: StickyBoxDockProps) {
  const missingCount = Math.max(0, targetCount - selectedCount);
  const isIncomplete = selectedCount < targetCount;
  const slotsArray = Array.from({ length: targetCount }, (_, i) => i);

  const ctaLabel = isIncomplete
    ? missingCount === 1
      ? "Falta 1 receta"
      : `Faltan ${missingCount} recetas`
    : "Confirmar y continuar";

  return (
    <div className="sticky bottom-0 z-30 px-12 pb-8 pt-4">
      <div className="bg-deep-forest text-surface-white rounded-2xl p-14 shadow-xl border border-sage-mist/20 overflow-hidden">
        {/* Top Row: Label + Dots */}
        <div className="flex items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-6 text-caption min-w-0">
            <span className="text-lime-glow font-bold shrink-0">
              Tu Caja Semanal
            </span>
            <span className="text-sage-mist truncate">
              {selectedCount} de {targetCount} recetas
            </span>
          </div>

          <div
            className="flex items-center gap-6 shrink-0"
            aria-label={`${selectedCount} de ${targetCount} recetas seleccionadas`}
          >
            {slotsArray.map((slotIdx) => {
              const isFilled = slotIdx < selectedCount;
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
                {formatCOP(subtotalCOP)}
              </span>
              <span className="text-caption text-sage-mist font-bold shrink-0">
                COP
              </span>
            </div>
            <p className="text-micro text-sage-mist truncate">
              {totalPortions} porciones · Envío refrigerado
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
