"use client";

import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  squareBullet?: boolean;
  dotBullet?: boolean;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  squareBullet = false,
  dotBullet = false,
  leftIcon,
  rightElement,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`${
        align === "center" ? "text-center flex flex-col items-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <span className="block text-caption font-bold uppercase tracking-wider text-deep-forest mb-4">
          {eyebrow}
        </span>
      )}

      <div className="flex items-center justify-between gap-12 w-full">
        <div className="flex items-center gap-8">
          {squareBullet && (
            <span className="w-10 h-10 bg-deep-forest inline-block shrink-0" />
          )}
          {dotBullet && (
            <span className="w-8 h-8 rounded-full bg-deep-forest inline-block shrink-0" />
          )}
          {leftIcon && (
            <span className="text-deep-forest shrink-0">{leftIcon}</span>
          )}
          <h2
            className={`text-subheading font-bold text-deep-forest leading-snug ${
              dotBullet ? "whitespace-nowrap" : ""
            }`}
          >
            {title}
          </h2>
        </div>

        {rightElement && <div className="shrink-0">{rightElement}</div>}
      </div>

      {subtitle && (
        <p
          className={`mt-6 text-body-sm text-slate-gray ${
            align === "center" ? "max-w-xs mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
