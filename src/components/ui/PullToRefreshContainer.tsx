"use client";

import React, { useState } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { useListoBox } from "@/context/ListoBoxContext";

interface PullToRefreshContainerProps {
  children: React.ReactNode;
}

export function PullToRefreshContainer({
  children,
}: PullToRefreshContainerProps) {
  const { state, simulatePullRefresh } = useListoBox();
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (window.scrollY <= 0) {
      setTouchStartY(e.touches[0].clientY);
    } else {
      setTouchStartY(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY === null || isRefreshing) return;
    const delta = e.touches[0].clientY - touchStartY;
    if (delta > 0 && window.scrollY <= 0) {
      setPullDistance(Math.min(delta * 0.45, 72));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance >= 48 && !isRefreshing) {
      setIsRefreshing(true);
      simulatePullRefresh();
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 650);
    } else {
      setPullDistance(0);
    }
    setTouchStartY(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {(pullDistance > 12 || isRefreshing) && (
        <div className="flex items-center justify-center gap-8 py-8 bg-sage-mist text-deep-forest text-caption font-bold border-b border-warm-sand">
          <ArrowsClockwise
            weight="bold"
            size={16}
            className={isRefreshing ? "animate-spin" : ""}
          />
          <span>
            {isRefreshing
              ? "Actualizando inventario fresco de finca..."
              : "Suelta para actualizar menú y stock"}
          </span>
        </div>
      )}

      {state.lastRefreshedAt && !isRefreshing && pullDistance === 0 && (
        <div className="sr-only" aria-live="polite">
          Catálogo sincronizado a las {state.lastRefreshedAt}
        </div>
      )}

      {children}
    </div>
  );
}
