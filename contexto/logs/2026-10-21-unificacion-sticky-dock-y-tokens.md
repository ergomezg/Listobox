# Log de Sesión: Unificación de StickyDock y Reconciliación de Tokens Figma

- **Fecha:** 2026-10-21
- **Objetivo:** Unificar los docks y botones inferiores flotantes en un único componente modular `StickyDock`, ajustar tokens semánticos en `globals.css` según capturas Figma y prevenir solapamientos visuales.
- **Archivos modificados:**
  - `src/components/ui/StickyBoxDock.tsx`: Soporte para variantes Split (Paso 3), Banner + Full CTA (Pasos 1, 2, 4) y CTA + Disclaimer (Checkout).
  - `src/components/screens/WizardStep1Screen.tsx`, `WizardStep2Screen.tsx`, `WizardStep3Screen.tsx`, `WizardStep4Screen.tsx`, `CheckoutScreen.tsx`: Integración de `StickyDock` y agregado de `pb-120` en `<main>`.
  - `src/app/globals.css` y `src/app/layout.tsx`: Reconciliación de valores hex (`surface-card`, `danger-*`, `whatsapp-green`, etc.) y eliminación de clase background obsoleta.
  - `src/components/ui/RecipeCard.tsx`, `SelectableCard.tsx`, `IngredientSwapSheet.tsx`, `AllergenBlockModal.tsx`, `TopNav.tsx`: Consistencia en tokens y opacidades.
  - `contexto/design.md`, `contexto/state/actual.md`, `contexto/decisiones.md`: Sincronización de memoria y decisiones.
- **Estado de Verificación:**
  - `npx tsc --noEmit`: 0 errores.
  - `next build`: Exitoso con 4/4 páginas generadas estáticamente.
