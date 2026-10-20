# ADR 001 — Decisiones de Arquitectura, Estado y UX del MVP ListoBox

**Fecha:** 2026-10-20  
**Estado:** Vigente  

## 1. Estado Global y Navegación SPA con Persistencia (`ListoBoxContext`)
- **Decisión:** Implementar una máquina de estados cliente en `src/context/ListoBoxContext.tsx` con `useReducer` y sincronización automática en `localStorage` (`listobox_mvp_state_v2`).
- **Razonamiento:** La Regla de Negocio #6 del PRD exige preservar el armado de la caja (porciones, alérgenos, recetas y swaps) durante la transición *Guest-to-User* sin recargas destructivas ni backend real en la fase MVP V0.

## 2. Reconciliación de Tokens en Tailwind CSS v4 (`src/app/globals.css`)
- **Decisión:** Mantener los 9 colores base de `docs/DESIGN.md` y extender `@theme` con los colores semánticos de `docs/PRD.md` y `docs/figma-refs/` (`danger-*`, `surface-card`, `whatsapp-green`, `bottom-nav`, `olive-accent`) más una escala `--spacing-N` `1:1` en píxeles (con `--spacing-11: 44px`).
- **Razonamiento:** `DESIGN.md` provenía de una extracción web desktop sin estados de peligro médico ni superficies de navegación móvil, mientras que `reglas.md` prohíbe valores arbitrarios (`bg-[#...]`, `p-[16px]`). Mapear los tokens en `@theme` permite fidelidad exacta a Figma con clases semánticas puras.

## 3. Avance Explícito en Wizard y UX Pruning (P1–P3)
- **Decisión:**
  1. Añadir botones primarios `Continuar` al final de `WizardStep1Screen` y `WizardStep2Screen`.
  2. Eliminar duplicados de recetas/descripciones en `RECIPES_CATALOG` (P1/P2) y eliminar la repetición del tiempo de cocción en el texto inferior de `RecipeCard` bloqueada (P3).
- **Razonamiento:** Evita que el usuario móvil quede atrapado buscando la barra superior para avanzar de paso y reduce ruido visual en tarjetas de catálogo.

## 4. Flujo de Cierre: Medios de Pago Locales, Éxito y Skip Week
- **Decisión:** Incluir selector de 4 métodos locales (`tarjeta`, `pse`, `nequi`, `daviplata`) en `CheckoutScreen.tsx`, vista intermedia `CheckoutSuccessScreen.tsx` (`#LK-84920`) y botón `Pausar semana / Reactivar` en `HomeActiveScreen.tsx`.
- **Razonamiento:** Cubre de extremo a extremo las Historias de Usuario HU-05, HU-06, HU-07 y la Regla de Negocio #8 del PRD.

## 5. Desacoplamiento de `docs/` del Prompt del Sistema (`AGENTS.md`)
- **Decisión:** Eliminar las directivas `@[DESIGN](docs/DESIGN.md)` y `@[PRD](docs/PRD.md)` de `AGENTS.md` y reemplazarlas por resúmenes de alta densidad en `contexto/` y lectura bajo demanda.
- **Razonamiento:** La inclusión inline inyectaba ~42 KB en cada turno y truncaba las reglas técnicas de `AGENTS.md`.
