# Sistema de Diseño Comprimido — ListoBox PWA

> **Fuente de verdad en código:** `src/app/globals.css` (`@theme`) y `src/app/fonts.ts`.  
> Consultar `docs/DESIGN.md` y `docs/figma-refs/` solo bajo demanda.

## 1. Paleta de Colores (`@theme` en `globals.css`)

### Colores Base (Sweetgreen Farm-Stand)
| Token CSS | Clase Tailwind | Hex | Rol Principal |
| :--- | :--- | :--- | :--- |
| `--color-deep-forest` | `bg-deep-forest` / `text-deep-forest` | `#00473c` | Marca primaria, titulares, botones oscuros, bordes activos |
| `--color-lime-glow` | `bg-lime-glow` / `text-lime-glow` | `#e6ff55` | CTA primario (siempre con `text-forest-shadow`), badges clave |
| `--color-cream-canvas` | `bg-cream-canvas` | `#f4f3e7` | Fondo base global de la PWA |
| `--color-sage-mist` | `bg-sage-mist` | `#d8e5d6` | Bandas de sección alternas, chips secundarios |
| `--color-warm-sand` | `bg-warm-sand` | `#e8dcc6` | Contenedores alternos, divisores, placeholders de imagen |
| `--color-forest-shadow` | `text-forest-shadow` / `bg-forest-shadow` | `#0e150e` | Texto primario de máximo contraste, texto sobre `lime-glow` |
| `--color-slate-gray` | `text-slate-gray` | `#555555` | Subtítulos, descripciones secundarias, metadatos |
| `--color-warm-gray` | `text-warm-gray` / `border-warm-gray` | `#8c8c82` | Bordes medios, precios tachados |

### Superficies y Semánticos Móviles (Figma + PRD)
| Token CSS | Clase Tailwind | Hex | Uso Específico |
| :--- | :--- | :--- | :--- |
| `--color-surface-white` | `bg-surface-white` / `text-surface-white` | `#ffffff` | Tarjetas carrusel, texto sobre `deep-forest` |
| `--color-surface-card` | `bg-surface-card` | `#efeee2` | Superficie de tarjetas en Checkout y contenedores |
| `--color-surface-muted` | `bg-surface-muted` | `#e6e4d6` | Botones circulares de cierre (`X`) |
| `--color-bottom-nav` | `bg-bottom-nav` | `#dfded3` | Barra de navegación inferior fija (`BottomNav`) |
| `--color-olive-accent` | `text-olive-accent` / `bg-olive-accent` | `#4d6b14` | Indicadores de ahorro, checks secundarios |
| `--color-lime-pill-inner` | `bg-lime-pill-inner` | `#c6dc4a` | Sub-badge de precio dentro de `PillButton` y `StickyDock` |
| `--color-whatsapp-green` | `bg-whatsapp-green` | `#25d366` | Botón de registro rápido vía WhatsApp |
| `--color-danger-red` | `text-danger-red` | `#c33a39` | Iconos de prohibición en bloqueo de alérgenos |
| `--color-danger-dark` | `text-danger-dark` / `bg-danger-dark` | `#b3261e` | Texto de alerta médica en `AllergenBlockModal` y tarjetas |
| `--color-danger-light` | `bg-danger-light` | `#fce8e6` | Fondo de alerta por alérgenos |
| `--color-danger-badge` | `bg-danger-badge` | `#fdded9` | Pill "Bloqueada" / detalle de alérgeno |
| `--color-danger-border` | `border-danger-border` | `#e6bdb4` | Borde de contenedores de peligro |

## 2. Tipografía (`Plus Jakarta Sans`)
- **Fuentes (`src/app/fonts.ts`):** `--font-sans` (pesos 400, 700), `--font-display`, `--font-accent` (peso 200).
- **Escala móvil frecuente:**
  - `text-micro`: `11px` (lh `1.25`, tracking `0.2px`) — Badges superiores y etiquetas compactas.
  - `text-caption`: `12px` (lh `1.33`, tracking `0.2px`) — Metadatos, chips, notas al pie.
  - `text-body-sm`: `14px` (lh `1.29`, tracking `0.24px`) — Descripciones de tarjetas, botones compactos.
  - `text-body`: `16px` (lh `1.25`, tracking `0.27px`) — Cuerpo base e inputs.
  - `text-body-lg`: `18px` (lh `1.33`, tracking `0.54px`) — Subtítulos destacados, CTAs `lg`.
  - `text-subheading`: `20px` (lh `1.2`, tracking `0.6px`) — Títulos de `RecipeCard` y secciones.
  - `text-heading-sm`: `24px` (lh `1.21`, tracking `1.2px`) — Wordmark `listobox`, títulos de modales.
  - `text-heading-mobile`: `32px` (lh `1.08`, tracking `-0.5px`) — `h1` principal en vistas móviles.

## 3. Escala de Espaciado (`1:1 px`) y Radios
- **CRÍTICO — Escala 1:1 en píxeles (`globals.css`):**
  - `--spacing-N` = `N px` para: `0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 60, 64, 72, 80, 96, 120, 160, 180, 200, 220, 260`.
  - Ejemplo: `px-16 py-24` aplica `padding: 24px 16px`; `h-180` aplica `height: 180px`; `w-260` aplica `width: 260px`.
  - **Excepción única:** `--spacing-11: 44px` $\rightarrow$ Usar siempre `min-h-11 min-w-11` para cumplir el área táctil mínima de `44x44px`.
- **Radios de borde:**
  - `rounded-md` (`4px`), `rounded-lg` (`8px` — inputs), `rounded-xl` (`16px`), `rounded-2xl` (`20px` — fotos de comida y bloques internos), `rounded-3xl` (`24px` — tarjetas principales y modales), `rounded-full` (`9999px` — todos los botones y pills).
- **Sombra única:** `shadow-xl` (`rgba(14, 21, 14, 0.4) 3px 3px 32px -10px`).
