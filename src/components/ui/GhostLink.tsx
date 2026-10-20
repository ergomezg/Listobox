"use client";

import React from "react";
import {
  ArrowRight,
  CaretRight,
  SlidersHorizontal,
} from "@phosphor-icons/react";

interface GhostLinkProps {
  label: string;
  onClick: () => void;
  icon?: "arrow-right" | "sliders" | "caret-right" | "none";
  tone?: "forest" | "slate";
  underline?: boolean;
  size?: "caption" | "sm" | "md";
  className?: string;
}

export function GhostLink({
  label,
  onClick,
  icon = "arrow-right",
  tone = "forest",
  underline = false,
  size = "sm",
  className = "",
}: GhostLinkProps) {
  const toneClass =
    tone === "forest" ? "text-deep-forest" : "text-slate-gray";

  const sizeClass =
    size === "caption"
      ? "text-caption"
      : size === "sm"
      ? "text-body-sm"
      : "text-body";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-6 min-h-11 min-w-11 font-bold hover:underline transition-colors cursor-pointer ${toneClass} ${sizeClass} ${
        underline ? "underline" : ""
      } ${className}`}
    >
      <span>{label}</span>
      {icon === "arrow-right" && <ArrowRight weight="bold" size={14} />}
      {icon === "sliders" && <SlidersHorizontal weight="regular" size={14} />}
      {icon === "caret-right" && <CaretRight weight="bold" size={16} />}
    </button>
  );
}
