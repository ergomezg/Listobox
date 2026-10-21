"use client";

import React from "react";
import { Leaf, Snowflake, Tractor } from "@phosphor-icons/react";

interface QualityPromiseSectionProps {
  className?: string;
}

export function QualityPromiseSection({
  className = "py-24",
}: QualityPromiseSectionProps) {
  return (
    <section className={`bg-warm-sand px-16 ${className}`}>
      <div className="flex items-center gap-8 text-deep-forest mb-14">
        <Leaf weight="regular" size={20} />
        <h3 className="text-body-lg font-extrabold">
          Promesa de Calidad ListoBox
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="bg-cream-canvas rounded-2xl p-14">
          <Tractor
            weight="regular"
            size={22}
            className="text-deep-forest mb-8"
          />
          <h4 className="text-body-sm font-bold text-deep-forest">
            Cosecha del Día
          </h4>
          <p className="mt-4 text-caption text-slate-gray">
            Verduras recogidas máx. 24h antes del despacho.
          </p>
        </div>

        <div className="bg-cream-canvas rounded-2xl p-14">
          <Snowflake
            weight="regular"
            size={22}
            className="text-deep-forest mb-8"
          />
          <h4 className="text-body-sm font-bold text-deep-forest">
            Cadena de Frío
          </h4>
          <p className="mt-4 text-caption text-slate-gray">
            Empaque térmico de lana kraft reciclable.
          </p>
        </div>
      </div>
    </section>
  );
}
