"use client";

import React from "react";
import { CheckCircle, ShieldWarning } from "@phosphor-icons/react";

interface SelectableCardProps {
  selected: boolean;
  onSelect: () => void;
  variant:
    | "household"
    | "meals-count"
    | "allergen"
    | "cooking-time"
    | "delivery-day";
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badgeText?: string;
}

export function SelectableCard({
  selected,
  onSelect,
  variant,
  title,
  subtitle,
  icon,
  badgeText,
}: SelectableCardProps) {
  if (variant === "household") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex flex-col justify-between p-16 rounded-2xl text-left min-h-11 min-w-11 transition-all cursor-pointer ${
          selected
            ? "bg-deep-forest text-surface-white"
            : "bg-surface-white/15 text-deep-forest hover:bg-warm-sand/60"
        }`}
      >
        <div className="flex items-center justify-between gap-8 w-full">
          <span
            className={`text-subheading font-bold ${
              selected ? "text-surface-white" : "text-deep-forest"
            }`}
          >
            {title}
          </span>
          {selected && (
            <CheckCircle
              weight="fill"
              size={20}
              className="text-surface-white shrink-0"
            />
          )}
        </div>
        {subtitle && (
          <span
            className={`mt-6 text-caption ${
              selected ? "text-sage-mist" : "text-slate-gray"
            }`}
          >
            {subtitle}
          </span>
        )}
      </button>
    );
  }

  if (variant === "meals-count") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex flex-col items-center justify-center py-14 px-12 rounded-2xl min-h-11 min-w-11 transition-all cursor-pointer ${
          selected
            ? "bg-deep-forest text-surface-white"
            : "bg-surface-white/15 text-deep-forest hover:bg-warm-sand/60"
        }`}
      >
        <span className="text-heading-sm font-extrabold">{title}</span>
        {subtitle && (
          <span
            className={`text-caption font-bold mt-2 ${
              selected ? "text-surface-white" : "text-deep-forest"
            }`}
          >
            {subtitle}
          </span>
        )}
      </button>
    );
  }

  if (variant === "allergen") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex flex-col justify-between p-16 rounded-2xl text-left min-h-11 min-w-11 transition-all cursor-pointer ${
          selected
            ? "bg-deep-forest text-surface-white"
            : "bg-warm-sand text-deep-forest hover:opacity-95"
        }`}
      >
        <div className="flex items-center justify-between w-full mb-14">
          <span
            className={selected ? "text-surface-white" : "text-deep-forest"}
          >
            {icon}
          </span>
          {selected ? (
            <span className="inline-flex items-center gap-4 px-8 py-2 rounded-md bg-lime-glow text-forest-shadow text-micro font-extrabold uppercase">
              <ShieldWarning weight="bold" size={12} />
              <span>{badgeText ?? "VETADO"}</span>
            </span>
          ) : (
            <span className="w-16 h-16 rounded-full bg-cream-canvas inline-block" />
          )}
        </div>

        <div>
          <span
            className={`block text-body font-bold leading-tight ${
              selected ? "text-surface-white" : "text-deep-forest"
            }`}
          >
            {title}
          </span>
          {subtitle && (
            <span
              className={`block text-caption mt-4 ${
                selected ? "text-sage-mist" : "text-slate-gray"
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>
      </button>
    );
  }

  if (variant === "cooking-time") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex flex-col justify-between p-16 rounded-2xl text-left min-h-11 min-w-11 transition-all cursor-pointer ${
          selected
            ? "bg-deep-forest text-surface-white"
            : "bg-warm-sand text-forest-shadow hover:opacity-95"
        }`}
      >
        <div className="flex items-center justify-between w-full mb-12">
          <span className={selected ? "text-lime-glow" : "text-deep-forest"}>
            {icon}
          </span>
          <span
            className={`w-12 h-12 rounded-full inline-block ${
              selected ? "bg-lime-glow" : "bg-cream-canvas"
            }`}
          />
        </div>
        <div>
          <span
            className={`block text-body font-bold ${
              selected ? "text-surface-white" : "text-forest-shadow"
            }`}
          >
            {title}
          </span>
          {subtitle && (
            <span
              className={`block text-caption mt-2 ${
                selected ? "text-sage-mist" : "text-slate-gray"
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>
      </button>
    );
  }

  // delivery-day
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col justify-between p-12 rounded-lg text-left min-h-11 min-w-11 transition-all cursor-pointer ${
        selected
          ? "bg-deep-forest text-surface-white"
          : "bg-warm-sand text-forest-shadow hover:opacity-95"
      }`}
    >
      <div className="flex items-center gap-6">
        <span
          className={`w-8 h-8 rounded-full inline-block shrink-0 ${
            selected ? "bg-lime-glow" : "bg-slate-gray"
          }`}
        />
        <span
          className={`text-body-sm font-bold ${
            selected ? "text-surface-white" : "text-deep-forest"
          }`}
        >
          {title}
        </span>
      </div>
      {subtitle && (
        <span
          className={`text-caption mt-2 pl-14 ${
            selected ? "text-lime-glow font-bold" : "text-slate-gray"
          }`}
        >
          {subtitle}
        </span>
      )}
    </button>
  );
}
