# Índice de Decisiones Vigentes — ListoBox PWA

> Detalle completo y razonamiento en `contexto/decisions/001-arquitectura-y-ux-mvp.md`.

## Decisiones de Arquitectura y Estado
1. **D-01 (Navegación SPA en cliente con persistencia LocalStorage):**
   - Las 8 pantallas del flujo (`ScreenId`) se orquestan desde `src/app/page.tsx` y `src/context/ListoBoxContext.tsx` (`useReducer`).
   - El estado completo se sincroniza en `localStorage` bajo `listobox_mvp_state_v2` para garantizar la Regla de Negocio #6 (transición *Guest-to-User* sin pérdida de datos ni recargas).
2. **D-02 (Reconciliación de Tokens Desktop vs. Mobile en Tailwind v4):**
   - `docs/DESIGN.md` definía solo 9 colores base pensados para web desktop. Se extendió `@theme` en `src/app/globals.css` con los tokens semánticos exigidos por `docs/PRD.md` y `docs/figma-refs/` (`danger-*`, `surface-card`, `whatsapp-green`, `bottom-nav`, `text-heading-mobile`, y spacing `1:1 px`).
3. **D-03 (Sheet de Swap integrado en el flujo de `MobileShell`):**
   - Cuando `swapSheetRecipeId` está activo, `IngredientSwapSheet` se monta en el contenedor principal mientras `MobileShell` atenúa `TopNav` (`brightness-50 pointer-events-none`) y oculta `BottomNav`, replicando fielmente `05 - Bottomsheet cambio ingrediente.png`.

## Decisiones de Producto y UX (Aprobadas)
4. **D-04 (CTAs explícitos "Continuar" en Wizard Pasos 1 y 2):**
   - Además de la navegación por `WizardProgressBar`, se añadieron botones primarios `<PillButton variant="lime">Continuar</PillButton>` al final de `WizardStep1Screen` y `WizardStep2Screen` para evitar callejones sin salida en móvil.
5. **D-05 (UX Pruning P1–P3 en Catálogo y `RecipeCard`):**
   - **P1/P2:** Recetas con títulos y descripciones únicas en `RECIPES_CATALOG` (`src/mocks/listoboxData.ts`).
   - **P3:** Eliminación de tiempos de preparación duplicados en la fila de metadatos de tarjetas bloqueadas por alérgeno (el tiempo se muestra una sola vez en el badge sobre la foto).
6. **D-06 (Checkout Local Unificado + Pantalla de Éxito):**
   - `CheckoutScreen.tsx` integra selector interactivo para los 4 medios de pago colombianos del PRD (`tarjeta`, `pse`, `nequi`, `daviplata`) y redirige a `CheckoutSuccessScreen.tsx` (Orden `#LK-84920`) antes de pasar a `HomeActiveScreen.tsx`.
7. **D-07 (Pausa Semanal / Skip Week en 1 Tap):**
   - En `HomeActiveScreen.tsx` se incluye el botón interactivo `Pausar semana / Reactivar` (`TOGGLE_SKIP_WEEK`) junto al indicador de progreso de caja para cumplir la Regla de Negocio #8 del PRD.
