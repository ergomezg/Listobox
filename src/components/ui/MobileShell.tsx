"use client";

import React from "react";
import { BottomNavTab } from "@/types/listobox";
import { TopNav } from "@/components/ui/TopNav";
import { BottomNav } from "@/components/ui/BottomNav";

interface MobileShellProps {
  activeTab: BottomNavTab;
  boxCount?: number;
  cutOffText?: string;
  isSheetOpen?: boolean;
  onTabChange: (tab: BottomNavTab) => void;
  onBackClick?: () => void;
  onLogoClick?: () => void;
  onHelpClick?: () => void;
  onProfileClick?: () => void;
  children: React.ReactNode;
}

export function MobileShell({
  activeTab,
  boxCount = 4,
  cutOffText = "Cierre Martes 23:59",
  isSheetOpen = false,
  onTabChange,
  onBackClick,
  onLogoClick,
  onHelpClick,
  onProfileClick,
  children,
}: MobileShellProps) {
  return (
    <div className="w-full max-w-md mx-auto relative h-dvh max-h-dvh overflow-hidden flex flex-col bg-cream-canvas shadow-xl">
      <div
        className={`sticky top-0 z-30 shrink-0 ${
          isSheetOpen ? "brightness-50 pointer-events-none" : ""
        }`}
      >
        <TopNav
          cutOffText={cutOffText}
          onBackClick={onBackClick}
          onLogoClick={onLogoClick}
          onHelpClick={onHelpClick}
          onProfileClick={onProfileClick}
        />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain no-scrollbar">
        {children}
      </main>

      {!isSheetOpen && (
        <BottomNav
          activeTab={activeTab}
          boxCount={boxCount}
          onTabChange={onTabChange}
        />
      )}
    </div>
  );
}
