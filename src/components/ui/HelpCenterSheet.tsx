"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  ChatCenteredText,
  CheckCircle,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import { HelpFaqCategoryId } from "@/types/listobox";
import { HELP_CENTER_FAQS } from "@/mocks/listoboxData";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PillButton } from "@/components/ui/PillButton";

interface HelpCenterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const HELP_CATEGORIES: { id: HelpFaqCategoryId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "suscripcion", label: "Suscripción" },
  { id: "envios", label: "Envíos" },
  { id: "recetas", label: "Recetas & Kits" },
];

export function HelpCenterSheet({ isOpen, onClose }: HelpCenterSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<HelpFaqCategoryId>("todos");
  const [incidentReported, setIncidentReported] = useState(false);

  const filteredFaqs = useMemo(() => {
    return HELP_CENTER_FAQS.filter((item) => {
      const matchesCategory =
        activeCategory === "todos" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;
      return (
        matchesCategory &&
        (item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query))
      );
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-center-title"
      className="fixed inset-0 z-50 flex flex-col justify-end bg-forest-shadow/60"
    >
      <div className="w-full max-w-md mx-auto bg-cream-canvas rounded-t-3xl max-h-dvh overflow-y-auto no-scrollbar border-t border-warm-sand shadow-xl pb-[env(safe-area-inset-bottom)]">
        {/* Drag Handle */}
        <div className="pt-12 flex justify-center">
          <span className="w-40 h-4 rounded-full bg-warm-gray/40 inline-block" />
        </div>

        {/* Header */}
        <div className="px-16 pt-12 pb-16 flex items-start justify-between gap-12">
          <div>
            <h2
              id="help-center-title"
              className="text-heading-sm font-extrabold text-deep-forest"
            >
              Centro de ayuda
            </h2>
            <p className="mt-4 text-body-sm text-slate-gray">
              Respuestas claras, sin letra pequeña.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar centro de ayuda"
            className="min-h-11 min-w-11 w-40 h-40 rounded-full bg-surface-muted text-forest-shadow flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <X weight="bold" size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-16">
          <div className="bg-surface-white border border-warm-sand rounded-full px-16 py-6 flex items-center gap-10 min-h-11">
            <MagnifyingGlass
              weight="regular"
              size={18}
              className="text-slate-gray shrink-0"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar dudas (ej. pausas, envíos, alérgenos)..."
              aria-label="Buscar dudas en el centro de ayuda"
              className="w-full min-h-11 bg-transparent text-body-sm text-forest-shadow placeholder:text-warm-gray focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-16 mt-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {HELP_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-14 py-8 rounded-full text-caption font-bold min-h-11 min-w-11 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-deep-forest text-surface-white"
                    : "bg-sage-mist text-deep-forest hover:bg-warm-sand"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordions */}
        <section className="px-16 mt-20">
          <span className="block text-micro font-extrabold uppercase tracking-wider text-deep-forest mb-10">
            PREGUNTAS FRECUENTES
          </span>
          {filteredFaqs.length > 0 ? (
            <FaqAccordion items={filteredFaqs} defaultOpenId="help-1" />
          ) : (
            <div className="rounded-2xl bg-surface-card p-16 text-center text-body-sm text-slate-gray">
              No encontramos resultados para &ldquo;{searchQuery}&rdquo;.
              Escríbenos directamente por WhatsApp abajo.
            </div>
          )}
        </section>

        {/* Direct Support & Incidents Block */}
        <section className="px-16 mt-24">
          <span className="block text-micro font-extrabold uppercase tracking-wider text-deep-forest mb-10">
            ¿AÚN TIENES DUDAS O TUVISTE UN INCONVENIENTE?
          </span>

          {/* Primary WhatsApp Support Card */}
          <div className="bg-deep-forest text-surface-white rounded-3xl p-16">
            <div className="flex items-start gap-10">
              <div className="w-36 h-36 rounded-full bg-lime-glow text-forest-shadow flex items-center justify-center shrink-0">
                <ChatCenteredText weight="fill" size={18} />
              </div>
              <div>
                <h3 className="text-body font-extrabold text-surface-white">
                  Soporte directo por WhatsApp
                </h3>
                <p className="mt-4 text-caption text-sage-mist">
                  Te atendemos humanos, no bots eternos. Respuesta promedio en
                  menos de 5 minutos (Lunes a sábado de 7:00 a. m. a 8:00 p. m.).
                </p>
              </div>
            </div>

            <div className="mt-16">
              <PillButton
                variant="lime"
                size="md"
                rightIcon={<ArrowRight weight="bold" size={16} />}
                onClick={onClose}
              >
                Hablar por WhatsApp
              </PillButton>
            </div>
          </div>

          {/* Secondary Kit Incident Action */}
          <div className="mt-12">
            <PillButton
              variant="outline-forest"
              size="sm"
              leftIcon={
                incidentReported ? (
                  <CheckCircle weight="bold" size={16} />
                ) : (
                  <Camera weight="bold" size={16} />
                )
              }
              onClick={() => setIncidentReported(true)}
            >
              {incidentReported
                ? "Solicitud de reporte iniciada · Te contactaremos"
                : "Reportar un ingrediente faltante o dañado"}
            </PillButton>
            <p className="mt-6 text-center text-micro text-slate-gray px-8">
              Si algún ingrediente no llegó perfecto, adjunta una foto y lo
              abonamos a tu próxima caja de inmediato.
            </p>
          </div>
        </section>

        {/* Legal Footer Links */}
        <footer className="px-16 pt-20 pb-24 mt-16 border-t border-warm-sand flex flex-wrap items-center justify-center gap-4 text-micro font-bold text-slate-gray">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 px-4 hover:text-deep-forest underline cursor-pointer"
          >
            Términos y condiciones
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 px-4 hover:text-deep-forest underline cursor-pointer"
          >
            Política de privacidad
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 px-4 hover:text-deep-forest underline cursor-pointer"
          >
            Política de pausas y reversión
          </button>
        </footer>
      </div>
    </div>
  );
}
