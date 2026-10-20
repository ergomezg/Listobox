"use client";

import React from "react";

interface BadgePillProps {
  variant?:
    | "lime"
    | "forest"
    | "sage"
    | "sand"
    | "dark-overlay"
    | "danger"
    | "danger-outline"
    | "cream";
  icon?: React.ReactNode;
  dotColor?: "green" | "lime" | "red";
  uppercase?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BadgePill({
  variant = "sage",
  icon,
  dotColor,
  uppercase = false,
  children,
  className = "",
}: BadgePillProps) {
  const variantClasses: Record<
    NonNullable<BadgePillProps["variant"]>,
    string
  > = {
    lime: "bg-lime-glow text-forest-shadow font-bold",
    forest: "bg-deep-forest text-surface-white font-bold",
    sage: "bg-sage-mist text-deep-forest font-bold",
    sand: "bg-warm-sand text-forest-shadow font-bold",
    "dark-overlay": "bg-forest-shadow/85 text-surface-white font-bold",
    danger: "bg-danger-badge text-danger-dark font-bold",
    "danger-outline":
      "bg-danger-light text-danger-dark border border-danger-border font-bold",
    cream: "bg-cream-canvas text-deep-forest font-bold",
  };

  const dotClasses =
    dotColor === "green"
      ? "bg-deep-forest"
      : dotColor === "lime"
      ? "bg-lime-glow"
      : "bg-danger-red";

  return (
    <span
      className={`inline-flex items-center gap-6 px-12 py-4 rounded-full text-caption ${
        uppercase ? "uppercase tracking-wider" : ""
      } ${variantClasses[variant]} ${className}`}
    >
      {dotColor && <span className={`w-6 h-6 rounded-full ${dotClasses}`} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
