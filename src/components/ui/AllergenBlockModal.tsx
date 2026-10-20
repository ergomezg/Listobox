"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Prohibit,
  ShieldPlus,
  ThumbsUp,
  X,
} from "@phosphor-icons/react";
import { Recipe } from "@/types/listobox";
import { PillButton } from "@/components/ui/PillButton";

interface AllergenBlockModalProps {
  isOpen: boolean;
  blockedRecipe: Recipe;
  safeAlternative: Recipe;
  onAcceptAlternative: (
    blockedRecipeId: string,
    alternativeRecipeId: string
  ) => void;
  onDismiss: () => void;
  onEditRestrictions: () => void;
}

export function AllergenBlockModal({
  isOpen,
  blockedRecipe,
  safeAlternative,
  onAcceptAlternative,
  onDismiss,
  onEditRestrictions,
}: AllergenBlockModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="allergen-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-16 bg-forest-shadow/70 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-cream-canvas rounded-3xl p-20 shadow-xl border border-warm-sand">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-10">
            <div className="w-48 h-48 rounded-full bg-danger-light border border-danger-border flex items-center justify-center text-danger-dark shrink-0">
              <ShieldPlus weight="fill" size={24} />
            </div>

            <div className="inline-flex items-center gap-6 text-danger-dark text-micro font-extrabold uppercase tracking-wider whitespace-nowrap">
              <span className="w-8 h-8 rounded-full bg-danger-dark inline-block shrink-0" />
              <span>BLOQUEO DE SEGURIDAD VITAL</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex items-center justify-center min-h-11 min-w-11 w-44 h-44 rounded-full bg-surface-muted text-forest-shadow hover:bg-warm-sand transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar alerta de alérgenos"
          >
            <X weight="bold" size={18} />
          </button>
        </div>

        {/* Title & Subtitle */}
        <h2
          id="allergen-modal-title"
          className="mt-20 text-heading-sm font-extrabold text-deep-forest leading-tight"
        >
          Ingrediente no seguro para tu salud
        </h2>
        <p className="mt-8 text-body-sm text-slate-gray">
          Bloqueado por tu seguridad: contiene mariscos registrados en tus
          alergias.
        </p>

        {/* Blocked Dish Card */}
        <div className="mt-16 p-12 rounded-2xl bg-danger-light border border-danger-border flex items-center gap-12">
          <div className="relative w-56 h-56 rounded-full overflow-hidden shrink-0 bg-warm-sand">
            <img
              src={blockedRecipe.imageUrl}
              alt={blockedRecipe.title}
              className="w-full h-full object-cover opacity-55 grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-danger-dark/25 text-danger-red">
              <Prohibit weight="bold" size={24} />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-body-sm font-extrabold text-forest-shadow whitespace-nowrap">
              Cazuela de Langostinos al Coco
            </p>
            <span className="mt-4 inline-block px-8 py-2 rounded-full bg-danger-badge text-danger-dark text-micro font-bold whitespace-nowrap">
              {blockedRecipe.allergenDetailLabel ??
                "Contiene: Langostinos / Crustáceos"}
            </span>
          </div>
        </div>

        {/* Safe Alternative Card */}
        <div className="mt-14 p-16 rounded-2xl bg-sage-mist/75 border border-deep-forest/15">
          <div className="flex items-center justify-between gap-8">
            <div className="inline-flex items-center gap-8 text-deep-forest text-caption font-extrabold uppercase">
              <ThumbsUp weight="fill" size={18} className="shrink-0" />
              <span>RECOMENDACIÓN SEGURA INMEDIATA</span>
            </div>
            <span className="text-caption font-bold text-deep-forest text-left">
              100% libre de mariscos
            </span>
          </div>

          <h3 className="mt-10 text-body font-bold text-deep-forest">
            {safeAlternative.title}
          </h3>

          <div className="mt-4 flex items-center justify-between gap-8">
            <p className="text-body-sm text-slate-gray">
              Pescado blanco artesanal · {safeAlternative.proteinGrams}g prot ·{" "}
              {safeAlternative.prepTimeMinutes} min
            </p>
            <span className="px-10 py-4 rounded-full bg-cream-canvas text-deep-forest text-body-sm font-extrabold shrink-0">
              +$0
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-20 flex flex-col gap-10">
          <PillButton
            variant="lime"
            size="sm"
            leftIcon={<CheckCircle weight="bold" size={20} />}
            className="py-14 text-body-sm font-extrabold"
            onClick={() =>
              onAcceptAlternative(blockedRecipe.id, safeAlternative.id)
            }
          >
            Elegir alternativa segura sugerida
          </PillButton>

          <PillButton
            variant="outline-forest"
            size="md"
            onClick={onDismiss}
          >
            Entendido, volver al menú
          </PillButton>
        </div>

        {/* Tertiary Profile Link */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onEditRestrictions}
            className="inline-flex items-center gap-6 min-h-11 min-w-11 text-caption font-medium text-slate-gray hover:text-deep-forest whitespace-nowrap cursor-pointer"
          >
            <span>Actualizar mis restricciones médicas en Perfil</span>
            <ArrowRight weight="bold" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
