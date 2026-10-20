"use client";

import React from "react";

interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "lime"
    | "forest"
    | "outline-forest"
    | "sage"
    | "whatsapp"
    | "white";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  priceBadge?: string;
  fullWidth?: boolean;
}

export function PillButton({
  variant = "lime",
  size = "md",
  leftIcon,
  rightIcon,
  priceBadge,
  fullWidth = true,
  className = "",
  children,
  ...props
}: PillButtonProps) {
  const variantClasses: Record<NonNullable<PillButtonProps["variant"]>, string> =
    {
      lime: "bg-lime-glow text-forest-shadow hover:opacity-95",
      forest: "bg-deep-forest text-surface-white hover:opacity-95",
      "outline-forest":
        "bg-transparent border-2 border-deep-forest text-deep-forest hover:bg-sage-mist",
      sage: "bg-sage-mist text-deep-forest hover:opacity-90",
      whatsapp: "bg-whatsapp-green text-forest-shadow hover:opacity-95",
      white:
        "bg-cream-canvas text-forest-shadow border border-warm-sand hover:opacity-95",
    };

  const sizeClasses: Record<NonNullable<PillButtonProps["size"]>, string> = {
    sm: "px-16 py-10 text-body-sm font-bold min-h-11 min-w-11",
    md: priceBadge
      ? "px-16 py-12 text-body font-extrabold min-h-11 min-w-11"
      : "px-20 py-14 text-body font-bold min-h-11 min-w-11",
    lg: priceBadge
      ? "px-16 py-14 text-body-lg font-extrabold min-h-11 min-w-11"
      : "px-20 py-16 text-body-lg font-extrabold min-h-11 min-w-11",
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-8 rounded-full transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : ""
      } ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span
        className={
          priceBadge ? "whitespace-nowrap" : "text-center leading-tight"
        }
      >
        {children}
      </span>
      {priceBadge && (
        <span className="ml-4 px-12 py-4 rounded-full bg-lime-pill-inner text-forest-shadow text-caption font-extrabold inline-flex items-center gap-4 whitespace-nowrap shrink-0">
          {priceBadge}
        </span>
      )}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
