"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Question, User } from "@phosphor-icons/react";

interface TopNavProps {
  cutOffText?: string;
  onBackClick?: () => void;
  onLogoClick?: () => void;
  onHelpClick?: () => void;
  onProfileClick?: () => void;
}

export function TopNav({
  cutOffText = "Cierre Martes 23:59",
  onBackClick,
  onLogoClick,
  onHelpClick,
  onProfileClick,
}: TopNavProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-30 shrink-0 bg-cream-canvas pt-[env(safe-area-inset-top)] border-b border-warm-sand">
      <div className="flex items-center justify-between px-16 py-12">
        {/* Left: Back Navigation + Brand Wordmark */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={handleBack}
            className="min-w-11 min-h-11 flex items-center justify-center rounded-full text-deep-forest hover:bg-sage-mist transition-colors cursor-pointer"
            aria-label="Volver atrás"
          >
            <ArrowLeft weight="bold" size={20} />
          </button>

          <button
            type="button"
            onClick={onLogoClick}
            className="inline-flex items-center min-h-11 min-w-11 text-left cursor-pointer"
            aria-label="Ir al inicio de ListoBox"
          >
            <img
              src="/logo-listobox.svg"
              alt="Listobox"
              role="img"
              className="h-32 w-auto"
            />
          </button>
        </div>

        {/* Center Cut-off Pill */}
        <div className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-sage-mist text-deep-forest text-caption font-bold">
          <span className="w-8 h-8 rounded-full bg-olive-accent inline-block" />
          <span>{cutOffText}</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={onHelpClick}
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full text-deep-forest hover:bg-sage-mist transition-colors cursor-pointer"
            aria-label="Centro de ayuda y preguntas frecuentes"
          >
            <Question weight="regular" size={24} />
          </button>

          <button
            type="button"
            onClick={onProfileClick}
            className="inline-flex items-center justify-center min-h-11 min-w-11 w-44 h-44 rounded-full bg-deep-forest text-cream-canvas hover:opacity-95 transition-opacity cursor-pointer"
            aria-label="Perfil y preferencias de usuario"
          >
            <User weight="bold" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
