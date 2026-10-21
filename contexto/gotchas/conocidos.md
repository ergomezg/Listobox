# Gotchas y Problemas Conocidos — ListoBox PWA

## 1. Escala de Espaciado `1:1 px` en Tailwind v4 (`src/app/globals.css`)
- **Problema:** En Tailwind estándar, `p-16` significa `4rem` (`64px`). En este proyecto, `@theme` redefine `--spacing-N: Npx` para coincidir con medidas de Figma (`p-16` = `16px`, `mt-20` = `20px`, `h-180` = `180px`, `w-260` = `260px`).
- **Excepción crítica:** `--spacing-11` vale **`44px`** (no `11px`) específicamente para que `min-h-11 min-w-11` garantice el touch target mínimo de `44x44px`.
- **Solución:** Antes de usar una clase `p-*`, `m-*`, `w-*`, `h-*` o `gap-*`, verifica en `src/app/globals.css` (líneas 116–146) qué valores `--spacing-*` existen. Nunca agregues un número que no esté declarado en `@theme` sin añadir primero el token.

## 2. Truncamiento de Reglas por Sintaxis `@[...]` en `AGENTS.md`
- **Problema:** Usar `@[DESIGN](docs/DESIGN.md)` y `@[PRD](docs/PRD.md)` dentro de un archivo con `trigger: always_on` hace que el entorno expanda ~42 KB de documentación inline en el system prompt, superando el límite de tamaño y truncando el resto de `AGENTS.md`.
- **Solución:** Nunca usar `@[...]` en `AGENTS.md`. Referenciar rutas con texto/código (`contexto/design.md`, `docs/PRD.md`) y leerlas bajo demanda.

## 3. Directiva `"use client"` con `@phosphor-icons/react`
- **Problema:** Importar iconos desde `"@phosphor-icons/react"` en un Server Component de Next.js 15 provoca errores de compilación porque los componentes estándar de Phosphor usan `createContext` internamente.
- **Solución:** Añadir `"use client";` en la línea 1 del componente, o importar desde `"@phosphor-icons/react/ssr"` si el componente debe permanecer en el servidor.

## 4. Hidratación de `localStorage` en Next.js (`ListoBoxContext.tsx`)
- **Problema:** Leer `window.localStorage` directamente en el estado inicial de `useReducer` causa *Hydration Mismatch* entre el HTML renderizado por el servidor y el cliente.
- **Solución:** Inicializar siempre `useReducer` con `INITIAL_LISTOBOX_STATE` determinista y despachar `HYDRATE_STATE` dentro de un `useEffect` tras el montaje (ver `src/context/ListoBoxContext.tsx`, líneas 449–462).

## 5. Apilamiento de Barras Fijas (`StickyBoxDock` + `BottomNav`)
- **Problema:** `BottomNav` ocupa la franja inferior (`sticky bottom-0 z-40`). Si otra barra fija se coloca en `bottom-0`, queda tapada por `BottomNav`.
- **Solución:** Las barras flotantes de acción sobre el menú inferior (`StickyBoxDock` en Paso 3 y `WizardStep4Screen`) deben usar `sticky bottom-60 z-30` o `sticky bottom-64 z-30` para flotar justo encima de `BottomNav`. En `HomeGuestScreen` dicho CTA inferior fue removido para evitar duplicidad con el CTA del Hero.

## 6. Estado del Botón en `StickyBoxDock.tsx`
- **Problema:** En `src/components/ui/StickyBoxDock.tsx` (línea 70), cuando el usuario deselecciona una receta en el Paso 3 (`missingCount > 0`), el botón muestra `"Falta 1 receta"` pero aún dispara `onContinue` si se hace clic.
- **Solución:** Si se interviene `StickyBoxDock.tsx`, añadir `disabled={missingCount > 0}` al `<button>` para cumplir estrictamente la Regla de Negocio #2 del PRD.
