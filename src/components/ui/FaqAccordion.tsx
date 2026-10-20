"use client";

import React, { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { FaqItem } from "@/types/listobox";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

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
              <span className="text-body-sm font-bold text-forest-shadow">
                {item.question}
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
