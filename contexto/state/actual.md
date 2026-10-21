# Estado Actual del Proyecto — ListoBox PWA

**Última actualización:** 2026-10-21  
**Versión:** MVP 2.0.0 (Release 1 / V0)

## 1. Hecho (Implementado y Funcional)
- **Infraestructura y Design System (`src/app/`):**
  - Configuración Next.js 15 App Router + React 19 + TypeScript estricto + Tailwind CSS v4 (`globals.css` con `@theme` completo y `fonts.ts` con `Plus Jakarta Sans`).
  - Contenedor móvil PWA (`MobileShell.tsx`), `TopNav.tsx`, `BottomNav.tsx` y `PullToRefreshContainer.tsx`.
- **Componente Único y Modular `StickyDock` (`src/components/ui/StickyBoxDock.tsx`):**
  - Unificación del dock flotante para las 5 pantallas según capturas Figma (`02`, `03`, `04`, `06`, `07`):
    - `WizardStep1Screen`: banner *"Haz diseñado tu semana gourmet"* + CTA full *"Continuar →"*.
    - `WizardStep2Screen`: banner *"Haz configurado tus ingredientes favoritos / vetos médicos y alérgenos"* + CTA full *"Continuar →"*.
    - `WizardStep3Screen`: banner split con cuota de caja, puntos dinámicos, subtotal COP y CTA condicional (*"Falta 1 receta →"* deshabilitado / *"Confirmar y continuar →"* activo).
    - `WizardStep4Screen`: banner *"Sin cláusulas de permanencia..."* + CTA split con `ShoppingBag`, *"IR AL CHECKOUT"* y badge dinámico de precio con cupón (`+formatCOP(discountedTotalCOP) COP →`).
    - `CheckoutScreen`: CTA split con `ShoppingBag`, *"Comenzar suscripción"*, badge dinámico de precio (`+formatCOP(discountedTotalCOP) COP →`) y disclaimer legal inferior centrado.
  - Cero desbordamiento (`truncate`, `min-w-0`), touch target accesible $\ge 44\times 44\text{ px}$ (`min-h-11 min-w-11`), y scroll padding `pb-120` en `<main>` para evitar solapamientos.
- **Estado y Datos (`src/context/`, `src/mocks/`, `src/types/`):**
  - `ListoBoxContext.tsx` con `useReducer`, cálculo en tiempo real de porciones/precios/descuentos en COP y persistencia en `localStorage` (`listobox_mvp_state_v2`).
  - Catálogo completo en `listoboxData.ts` (recetas, alérgenos, swaps de proteína con macros y sobrecostos, guarniciones y FAQs).
- **Flujo Completo de 8 Pantallas (`src/components/screens/`):**
  1. `HomeGuestScreen.tsx` (Hero con CTA a Wizard, 3 pasos, transparencia, carrusel de menú abierto, FAQ con pb-24 ergonómico; removido CTA inferior redundante sobre BottomNav).
  2. `WizardStep1Screen.tsx` (Tamaño de hogar 1/2/4/6, comidas/semana 3/4/5, callout dinámico).
  3. `WizardStep2Screen.tsx` (Vetos médicos/alérgenos, opción "Sin alergias", afinidades proteicas, tiempo de cocción).
  4. `WizardStep3Screen.tsx` (Resumen de progreso de caja, filtros por categoría dietética, feed de `RecipeCard`, `StickyBoxDock` con bloqueo `disabled` cuando `selectedCount < targetCount`, indicadores de puntos dinámicos `bg-lime-glow` / `bg-sage-mist/30` y contención estricta de CTA).
  5. `WizardStep4Screen.tsx` (Resumen financiero con cupón `COSECHA15`, filtro de alérgenos activo, registro contextual Guest-to-User con Google/WhatsApp/PIN móvil).
  6. `CheckoutScreen.tsx` (Dirección de entrega, día sugerido, pasarela local Tarjeta/PSE/Nequi/Daviplata, resumen de cobro).
  7. `CheckoutSuccessScreen.tsx` (Confirmación de orden `#LK-84920`, fecha de arribo y cut-off).
  8. `HomeActiveScreen.tsx` (Vista de suscriptor activo con recetas en caja, tarjeta bloqueada por alérgeno y botón 1-tap `Pausar semana / Reactivar`).
- **Modales Críticos (`src/components/ui/`):**
  - `AllergenBlockModal.tsx` (Bloqueo síncrono de seguridad vital con reemplazo en 1 tap por alternativa segura).
  - `IngredientSwapSheet.tsx` (Bottom sheet de cambio de proteína/guarnición e impacto nutricional en vivo).

## 2. Pendiente / Oportunidades de Mejora Detectadas
- [x] **Validación estricta de cuota y contención en `StickyBoxDock.tsx`:** Resuelto (`disabled={isIncomplete}`, `disabled:opacity-50 disabled:cursor-not-allowed`, puntos inactivos `bg-sage-mist/30`, texto `"Confirmar y continuar"` y contención flexbox sin desbordamiento).
- [ ] **Optimización de imágenes externas:** Las fotos de recetas en `src/mocks/listoboxData.ts` usan `<img>` apuntando a Unsplash; si se requiere optimización LCP adicional, evaluar `next/image` con `remotePatterns` o assets WebP locales.
- [ ] **Limpieza de artefacto de compilación:** `tsconfig.tsbuildinfo` (~636 KB) está en la raíz; conviene mantenerlo ignorado en control de versiones.

## 3. Blockers Actuales
- Ninguno. El proyecto compila y todas las pantallas del flujo están conectadas.
