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
- **Flujo Completo de 11 Pantallas (`src/components/screens/`):**
  1. `HomeGuestScreen.tsx`, `WizardStep1Screen.tsx`, `WizardStep2Screen.tsx`, `WizardStep3Screen.tsx`, `WizardStep4Screen.tsx`, `CheckoutScreen.tsx`, `CheckoutSuccessScreen.tsx` y `HomeActiveScreen.tsx`.
  2. **3 Pantallas Raíz de `BottomNav` (`docs/figma-refs/`):**
     - `MyBoxScreen.tsx` (`"my-box"`, conectada a `"Mi Caja"`): refleja estrictamente `state.selectedSlots`, reutiliza `RecipeCard` (`mode="catalog-feed"`) y `QualityPromiseSection.tsx`.
     - `CalendarScreen.tsx` (`"calendar"`, conectada a `"Calendario"`): agenda semanal, tarjeta `Logística en Frío`, timeline `Planificador de Frescura`, banda `Próxima Caja Semanal` y soporte concierge.
     - `ProfileScreen.tsx` (`"profile"`, conectada a `"Perfil"`): cabecera de usuario, `Huella de Impacto Sostenible`, `Plan Dúo Vital`, `Perfil Dietético & Alérgenos`, `Dirección Principal` y `Método de Pago`.
- **Modales y Bottom Sheets Críticos (`src/components/ui/`):**
  - `AllergenBlockModal.tsx` (Bloqueo síncrono de seguridad vital con reemplazo en 1 tap por alternativa segura).
  - `IngredientSwapSheet.tsx` (Bottom sheet de cambio de proteína/guarnición e impacto nutricional en vivo).
  - `SkipWeekModal.tsx` (Modal de confirmación de pausa semanal con resumen `$0 COP` y próxima entrega).
  - `HelpCenterSheet.tsx` (Bottom sheet de Centro de Ayuda con buscador, filtro por categorías, 6 FAQs oficiales con iconos de Phosphor y bloque de soporte directo por WhatsApp / reporte de incidente).

## 2. Pendiente / Oportunidades de Mejora Detectadas
- [x] **Validación estricta de cuota y contención en `StickyBoxDock.tsx`:** Resuelto (`disabled={isIncomplete}`, `disabled:opacity-50 disabled:cursor-not-allowed`, puntos inactivos `bg-sage-mist/30`, texto `"Confirmar y continuar"` y contención flexbox sin desbordamiento).
- [ ] **Optimización de imágenes externas:** Las fotos de recetas en `src/mocks/listoboxData.ts` usan `<img>` apuntando a Unsplash; si se requiere optimización LCP adicional, evaluar `next/image` con `remotePatterns` o assets WebP locales.
- [ ] **Limpieza de artefacto de compilación:** `tsconfig.tsbuildinfo` (~636 KB) está en la raíz; conviene mantenerlo ignorado en control de versiones.

## 3. Blockers Actuales
- Ninguno. El proyecto compila y todas las pantallas del flujo están conectadas.
