"use client";

import React from "react";
import { PauseCircle } from "@phosphor-icons/react";
import { PillButton } from "@/components/ui/PillButton";

interface SkipWeekModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SkipWeekModal({
  isOpen,
  onConfirm,
  onCancel,
}: SkipWeekModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skip-week-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-16 bg-forest-shadow/60"
    >
      <div className="w-full max-w-sm rounded-3xl bg-cream-canvas p-24 shadow-xl border border-warm-sand text-center">
        <div className="w-48 h-48 rounded-full bg-warm-sand text-deep-forest mx-auto flex items-center justify-center">
          <PauseCircle weight="bold" size={26} />
        </div>

        <h2
          id="skip-week-modal-title"
          className="mt-16 text-subheading font-extrabold text-deep-forest leading-snug"
        >
          ¿Pausar tu entrega del 31 oct – 7 nov?
        </h2>

        <p className="mt-8 text-body-sm text-slate-gray">
          No recibirás caja ni se realizará ningún cobro durante esta semana.
        </p>

        <div className="mt-16 bg-surface-card rounded-2xl p-14 border border-warm-sand text-left flex flex-col gap-8">
          <div className="flex items-center justify-between gap-8 text-body-sm">
            <span className="text-slate-gray">Costo de esta semana:</span>
            <span className="font-extrabold text-deep-forest">$0 COP</span>
          </div>
          <div className="flex items-center justify-between gap-8 text-body-sm">
            <span className="text-slate-gray">Próxima entrega activa:</span>
            <span className="font-bold text-forest-shadow">7 de nov</span>
          </div>
        </div>

        <p className="mt-14 text-caption text-slate-gray">
          Puedes reactivar esta semana sin costo hasta el martes a las 23:59.
        </p>

        <div className="mt-20 flex flex-col gap-10">
          <PillButton variant="forest" size="md" onClick={onConfirm}>
            Sí, pausar esta semana
          </PillButton>
          <PillButton variant="outline-forest" size="md" onClick={onCancel}>
            Mantener mi entrega
          </PillButton>
        </div>
      </div>
    </div>
  );
}
