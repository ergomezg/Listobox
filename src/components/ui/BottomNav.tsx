"use client";

import React from "react";
import {
  CalendarBlank,
  ForkKnife,
  Package,
  UserCircle,
} from "@phosphor-icons/react";
import { BottomNavTab } from "@/types/listobox";

interface BottomNavProps {
  activeTab: BottomNavTab;
  boxCount?: number;
  onTabChange: (tab: BottomNavTab) => void;
}

export function BottomNav({
  activeTab,
  boxCount = 4,
  onTabChange,
}: BottomNavProps) {
  const navItems: {
    id: BottomNavTab;
    label: string;
    badge?: number;
    renderIcon: (active: boolean) => React.ReactNode;
  }[] = [
    {
      id: "menu",
      label: "Menú",
      renderIcon: (active) => (
        <ForkKnife weight={active ? "bold" : "regular"} size={22} />
      ),
    },
    {
      id: "box",
      label: "Mi Caja",
      badge: boxCount,
      renderIcon: (active) => (
        <Package weight={active ? "bold" : "regular"} size={22} />
      ),
    },
    {
      id: "calendar",
      label: "Calendario",
      renderIcon: (active) => (
        <CalendarBlank weight={active ? "bold" : "regular"} size={22} />
      ),
    },
    {
      id: "profile",
      label: "Perfil",
      renderIcon: (active) => (
        <UserCircle weight={active ? "bold" : "regular"} size={22} />
      ),
    },
  ];

  return (
    <nav
      aria-label="Navegación principal inferior"
      className="sticky bottom-0 z-30 shrink-0 w-full bg-bottom-nav border-t border-warm-sand pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-4 px-8 py-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center min-h-11 min-w-11 py-4 rounded-xl transition-colors cursor-pointer ${
                isActive
                  ? "text-deep-forest font-bold"
                  : "text-slate-gray font-medium hover:text-deep-forest"
              }`}
            >
              <div className="relative flex items-center justify-center">
                {item.renderIcon(isActive)}
                {typeof item.badge === "number" && (
                  <span className="absolute -top-6 -right-12 inline-flex items-center justify-center px-6 py-1 rounded-full bg-lime-glow text-forest-shadow text-micro font-extrabold border border-bottom-nav">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-caption mt-2">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
