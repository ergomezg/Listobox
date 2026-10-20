"use client";

import React from "react";
import { ShieldCheck } from "@phosphor-icons/react";

interface WizardProgressBarProps {
  currentStep: 1 | 2 | 3 | 4;
  totalSteps?: number;
  label?: string;
  onStepSelect?: (step: 1 | 2 | 3 | 4) => void;
}

export function WizardProgressBar({
  currentStep,
  totalSteps = 4,
  label = "Diseña tu semana",
  onStepSelect,
}: WizardProgressBarProps) {
  const widthClass =
    currentStep === 1
      ? "w-1/4"
      : currentStep === 2
      ? "w-2/4"
      : currentStep === 3
      ? "w-3/4"
      : "w-full";

  return (
    <div className="bg-sage-mist px-16 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-6 text-deep-forest text-body-sm font-bold">
          <ShieldCheck weight="regular" size={16} />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-deep-forest text-body-sm font-bold">
            Paso {currentStep} de {totalSteps}
          </span>
        </div>
      </div>

      {/* Progress Bar Track with Interactive Step Segments (>= 44x44px touch targets) */}
      <div className="relative w-full h-8 bg-warm-sand rounded-full">
        <div
          className={`h-full bg-deep-forest rounded-full transition-all duration-200 ${widthClass}`}
        />
        {onStepSelect && (
          <div className="absolute -top-18 left-0 right-0 h-44 grid grid-cols-4">
            {([1, 2, 3, 4] as const).map((stepNum) => (
              <button
                key={stepNum}
                type="button"
                onClick={() => onStepSelect(stepNum)}
                className="min-h-11 min-w-11 h-44 w-full cursor-pointer"
                aria-label={`Ir al Paso ${stepNum} de ${totalSteps}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
