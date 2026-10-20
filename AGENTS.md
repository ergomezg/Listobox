---
trigger: always_on
description: "Archivo central de control, invariantes y sistema de memoria persistente de ListoBox PWA."
---

# AGENTS.md — Control Central ListoBox PWA

## 1. Identidad y Propósito del Proyecto
**ListoBox** es una PWA *mobile-first* de suscripción semanal de *meal-kits* en Colombia (Prueba Interrapidísimo, MVP v2.0.0).
- **Propuesta de valor (Value-First / Guest-First):** Exploración abierta del catálogo, configuración del plan (1–6 personas, 3–5 recetas/semana), exclusión de alérgenos con bloqueo síncrono de seguridad vital, intercambio (*swap*) de proteínas/guarniciones en $\le 2$ taps con recálculo optimista en COP, registro contextual *Guest-to-User* sin pérdida de estado y checkout local simulado (Tarjeta, PSE, Nequi, Daviplata).

---

## 2. Reglas de Comportamiento con el Contexto (Obligatorias)
- **El context window es caro y volátil. La memoria real debe vivir en archivos.**
- **Nunca cargar todo el historial ni todos los archivos del proyecto.**
- **Cargar solo lo estrictamente necesario para la tarea actual.**
- **Preferir referenciar archivos antes que copiar contenido largo al prompt.** (Prohibido usar la sintaxis `@[...]` en este archivo porque inyecta documentos completos inline y trunca las reglas).
- **Al final de cada sesión importante: actualizar `contexto/state/`, registrar decisiones en `contexto/decisions/` (y `contexto/decisiones.md`) y comprimir lo valioso en `contexto/logs/`.**
- **Convertir procedimientos repetitivos en skills reutilizables** dentro de `contexto/skills/`.
- **Mantener `AGENTS.md` conciso y de alta densidad de información** (límite estricto: $\le 250\text{–}300$ líneas).
- **Al cerrar una sesión importante, correr `contexto/skills/actualizar-contexto.md`.**

---

## 3. Orden de Lectura Preferido (Carga Progresiva)
Al iniciar una sesión o tarea, lee en este orden exacto y detente en cuanto tengas el contexto suficiente:
1. `AGENTS.md` / `contexto/AGENTS.md` (control central e invariantes).
2. `contexto/state/actual.md` — Estado actual (hecho, pendiente, blockers).
3. `contexto/reglas.md` y `contexto/gotchas/conocidos.md` — Prohibiciones detectables y trampas técnicas (ej. escala `--spacing-*` 1:1 en px).
4. `contexto/design.md` y `contexto/decisiones.md` — Resumen comprimido de tokens UI y decisiones de arquitectura/UX vigentes.
5. **Solo los archivos de `src/` que vayas a tocar:**
   - Tipos/Contratos: `src/types/listobox.ts`
   - Estado/Acciones: `src/context/ListoBoxContext.tsx`
   - Tokens CSS: `src/app/globals.css`
   - Componentes/Pantallas específicas en `src/components/ui/` o `src/components/screens/`
6. **Bajo demanda estricta (NO cargar por defecto):** `docs/PRD.md`, `docs/DESIGN.md` y capturas individuales en `docs/figma-refs/` únicamente cuando debas contrastar un requerimiento original o una pantalla específica de Figma.

---

## 4. Punteros al Sistema de Memoria Persistente (`contexto/`)
| Ruta | Propósito | Cuándo consultarlo / actualizarlo |
| :--- | :--- | :--- |
| `contexto/AGENTS.md` | Archivo central de control en `contexto/` (espejo de `/AGENTS.md`) | Mantener <= 300 líneas |
| `contexto/reglas.md` | Líneas rojas binarias y verificables (lo que nunca debes hacer) | Antes de editar código; actualizar si cambia una restricción |
| `contexto/design.md` | Tokens de color, tipografía, spacing 1:1 px y superficies | Antes de crear o ajustar estilos/UI |
| `contexto/decisiones.md` | Resumen ejecutivo de decisiones de producto, UX y código | Antes de modificar flujos o lógica de estado |
| `contexto/state/actual.md` | Snapshot del proyecto: Hecho / Pendiente / Blockers | Al inicio y al cierre de cada sesión importante |
| `contexto/decisions/` | Registros ADR detallados con fecha y razonamiento | Cuando se toma o cambia una decisión técnica/UX |
| `contexto/gotchas/conocidos.md` | Bugs/trampas conocidas del repo y su solución probada | Antes de tocar Tailwind, iconos, hidratación o modales |
| `contexto/logs/` | Resúmenes comprimidos de sesiones importantes | Al cerrar una sesión mediante `contexto/skills/actualizar-contexto.md` |
| `contexto/skills/actualizar-contexto.md` | Procedimiento de poda, compresión y cierre de sesión | Ejecutar al finalizar una sesión importante |

---

## 5. Qué Skill Usar según el Tipo de Tarea
- **Cerrar sesión importante / consolidar avances / podar contexto:** Leer y ejecutar `contexto/skills/actualizar-contexto.md`.
- **Auditar accesibilidad (WCAG AA, áreas táctiles 44x44px, contraste, ARIA):** Usar skill `a11y-debugging`.
- **Verificar renderizado real en navegador o depurar UI/estado:** Usar skill `chrome-devtools`.
- **Optimizar tiempos de carga o Largest Contentful Paint (LCP $\le 2.0\text{s}$):** Usar skill `debug-optimize-lcp`.

---

## 6. Reglas Duras e Invariantes del Proyecto

### 6.1 Fidelidad Visual y Design System ("Sweetgreen Farm-Stand")
- **Cero invención estética:** Prohibido usar *glassmorphism*, gradientes decorativos, sombras de neón, modo oscuro o colores fuera de `src/app/globals.css` y `contexto/design.md`.
- **Superficies oficiales:** Base `#f4f3e7` (`bg-cream-canvas`), bandas `#d8e5d6` (`bg-sage-mist`) y `#e8dcc6` (`bg-warm-sand`), tarjetas `#efeee4` (`bg-surface-card`) o `#ffffff` (`bg-surface-white`), acento primario `#00473c` (`bg-deep-forest` / `text-deep-forest`), CTA primario `#e6ff55` (`bg-lime-glow`) con texto `#0e150e` (`text-forest-shadow`).
- **Tipografía única:** `Plus Jakarta Sans` cargada en `src/app/fonts.ts` (`--font-sans`, `--font-display`, `--font-accent`).

### 6.2 Stack Tecnológico Estricto
- **Next.js 15 (App Router) + React 19 + TypeScript estricto:**
  - Prohibido usar `any`, `@ts-ignore` o `@ts-expect-error`.
  - Todo componente con hooks (`useState`, `useReducer`, `useContext`), eventos o iconos estándar de `@phosphor-icons/react` debe iniciar con `"use client";`.
- **Tailwind CSS v4 (CSS-First en `src/app/globals.css`):**
  - Prohibido crear `tailwind.config.js` o `tailwind.config.ts`.
  - Prohibido usar valores arbitrarios (`bg-[#...]`, `text-[13px]`, `p-[18px]`), salvo `pt-[env(safe-area-inset-top)]` y `pb-[env(safe-area-inset-bottom)]`.
  - **Invariante de Spacing:** En `src/app/globals.css`, `--spacing-N` equivale a `N px` (ej. `p-16` = `16px`, `mt-20` = `20px`, `h-180` = `180px`), con la única excepción de `--spacing-11: 44px` para garantizar touch targets con `min-h-11 min-w-11`.
- **Iconografía exclusiva (`@phosphor-icons/react`):**
  - Prohibido usar `lucide-react`, `heroicons`, `react-icons`, emojis como iconos o `<svg>` manuales.
  - Todo icono de Phosphor debe declarar explícitamente `weight` (`"regular"` | `"bold"` | `"fill"` | etc.) y `size={number}`.

### 6.3 Ergonomía Mobile-First y Reglas de Negocio
- **Shell móvil:** Contenedor centrado `max-w-md mx-auto min-h-dvh relative overflow-x-hidden` (`MobileShell.tsx`).
- **Touch targets:** Todo elemento interactivo (`button`, `input`, tab, chip) debe incluir `min-h-11 min-w-11` ($\ge 44\times 44\text{ px}$).
- **Reglas de negocio críticas:**
  1. *Guest-First:* Navegación libre de Home y Wizard Pasos 1–4 sin *login wall* obligatorio previo.
  2. *Cuota de caja:* El plan exige seleccionar exactamente `mealsPerWeek` recetas (3, 4 o 5).
  3. *Seguridad de alérgenos:* Si una receta contiene un alérgeno en `vetoedAllergens`, se bloquea síncronamente y cualquier toque abre `AllergenBlockModal`.
  4. *Swap en $\le 2$ taps:* Cambios de proteína/guarnición actualizan calorías, gramos de proteína y sobrecosto en COP de forma optimista.
  5. *Persistencia:* Estado sincronizado en `localStorage` bajo la clave `listobox_mvp_state_v2`.

---

## 7. Definition of Done (DoD)
Una tarea solo está terminada cuando cumple **todos** estos puntos:
1. **Typecheck y Build:** `npx tsc --noEmit` pasa con 0 errores.
2. **Cumplimiento de `contexto/reglas.md`:** Cero clases arbitrarias de Tailwind, cero `<svg>` o iconos ajenos a Phosphor, cero `any`, y `min-h-11 min-w-11` en todo control interactivo nuevo o modificado.
3. **Coherencia de Estado:** Las acciones en `ListoBoxContext.tsx` mantienen compatibilidad con `listobox_mvp_state_v2` y recalculan totales en COP (`formatCOP`).
4. **Higiene de Memoria:** Si la tarea resolvió un bug no obvio, tomó una decisión de diseño/arquitectura o cerró una sesión importante, se ejecutó `contexto/skills/actualizar-contexto.md`.
