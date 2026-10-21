"use client";

import React, { useState } from "react";
import {
  ArrowsLeftRight,
  CalendarBlank,
  CaretDown,
  CookingPot,
  MapPin,
  ShieldCheck,
  Snowflake,
} from "@phosphor-icons/react";
import { FaqItem, HelpFaqIconType } from "@/types/listobox";

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string | null;
}

function renderFaqIcon(iconType?: HelpFaqIconType) {
  switch (iconType) {
    case "calendar":
      return <CalendarBlank weight="regular" size={18} className="text-deep-forest shrink-0" />;
    case "snowflake":
      return <Snowflake weight="regular" size={18} className="text-deep-forest shrink-0" />;
    case "shield":
      return <ShieldCheck weight="regular" size={18} className="text-deep-forest shrink-0" />;
    case "swap":
      return <ArrowsLeftRight weight="regular" size={18} className="text-deep-forest shrink-0" />;
    case "map-pin":
      return <MapPin weight="regular" size={18} className="text-deep-forest shrink-0" />;
    case "cooking-pot":
      return <CookingPot weight="regular" size={18} className="text-deep-forest shrink-0" />;
    default:
      return null;
  }
}

export function FaqAccordion({ items, defaultOpenId = null }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-sage-mist bg-surface-card/70 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-12 px-16 py-14 min-h-11 min-w-11 text-left cursor-pointer"
            >
              <span className="inline-flex items-center gap-10 min-w-0">
                {renderFaqIcon(item.iconType)}
                <span className="text-body-sm font-bold text-forest-shadow">
                  {item.question}
                </span>
              </span>
              <CaretDown
                weight="bold"
                size={16}
                className={`text-deep-forest shrink-0 transition-transform duration-150 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-16 pb-14 text-body-sm text-slate-gray border-t border-sage-mist pt-10">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
