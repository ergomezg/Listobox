# Reglas Duras (Lo que el Agente NUNCA debe hacer)

Este archivo contiene **únicamente prohibiciones binarias, verificables y detectables** mediante inspección estática o revisión de código.

## 1. Contexto y Memoria
1. **NUNCA usar la sintaxis `@[Nombre](ruta)` dentro de `AGENTS.md` o `contexto/AGENTS.md`:** Inyecta el contenido completo del archivo referenciado en el prompt del sistema en cada turno y trunca las reglas por límite de bytes.
2. **NUNCA dejar que `AGENTS.md` supere las 300 líneas:** Si crece por encima de ese límite, comprime o mueve el detalle a `contexto/design.md`, `contexto/decisions/` o `contexto/gotchas/`.
3. **NUNCA leer todos los archivos de `src/` o todas las imágenes de `docs/figma-refs/` de golpe:** Carga solo los archivos directamente involucrados en la tarea actual.
4. **NUNCA pegar volcados largos de código o logs crudos en archivos de memoria (`contexto/state/`, `contexto/logs/`, `contexto/decisions/`):** Usa resúmenes de alta densidad y enlaces a rutas/líneas.

## 2. Estilos y Tailwind CSS v4
5. **NUNCA crear archivos `tailwind.config.js`, `tailwind.config.ts` o `tailwind.config.mjs`:** Toda configuración vive exclusivamente en el bloque `@theme` de `src/app/globals.css`.
6. **NUNCA usar valores arbitrarios entre corchetes en clases de Tailwind** (ej. `bg-[#00473c]`, `text-[15px]`, `p-[18px]`, `rounded-[20px]`, `w-[260px]`): Usa exclusivamente los tokens definidos en `@theme` de `src/app/globals.css`. *Única excepción permitida:* `pt-[env(safe-area-inset-top)]` y `pb-[env(safe-area-inset-bottom)]`.
7. **NUNCA asumir la escala de espaciado por defecto de Tailwind (`1 unidad = 4px`) para valores definidos en `@theme`:** En `src/app/globals.css`, `--spacing-N` está mapeado `1:1` en píxeles (`p-16` = `16px`, `mt-24` = `24px`, `w-48` = `48px`), excepto `--spacing-11: 44px` (`min-h-11 min-w-11`).
8. **NUNCA aplicar gradientes CSS (`bg-linear-*`, `bg-gradient-*`, `linear-gradient`), sombras de neón, *glassmorphism* decorativo o modo oscuro (`dark:*`):** El sistema visual es 100% plano sobre fondo `#f4f3e7` (`bg-cream-canvas`).
9. **NUNCA invertir los colores del CTA primario (`variant="lime"`):** El fondo `#e6ff55` (`bg-lime-glow`) siempre lleva texto oscuro `#0e150e` (`text-forest-shadow`), jamás texto blanco.
10. **NUNCA renderizar botones principales o secundarios con bordes cuadrados o rectangulares:** Todo botón de acción debe usar `rounded-full` (`9999px`).

## 3. Iconografía y Componentes React / Next.js
11. **NUNCA instalar ni importar librerías de iconos distintas a `@phosphor-icons/react`:** Prohibido `lucide-react`, `heroicons`, `react-icons` o `@mui/icons-material`.
12. **NUNCA escribir etiquetas `<svg>` manuales ni usar emojis (`🥗`, `⚠️`, `✅`, `🔥`) como sustitutos de iconos en la UI:** Todo icono visual debe ser un componente de `@phosphor-icons/react`.
13. **NUNCA instanciar un icono de `@phosphor-icons/react` sin declarar explícitamente los props `weight` y `size`:** Ejemplo obligatorio: `<Clock weight="regular" size={14} />`.
14. **NUNCA omitir `"use client";` en la línea 1 de componentes que usen hooks de React (`useState`, `useReducer`, `useContext`, `useEffect`), manejadores de eventos (`onClick`, `onChange`) o imports desde `@phosphor-icons/react`.**
15. **NUNCA usar el tipo `any`, `@ts-ignore` ni `@ts-expect-error` en archivos `.ts` o `.tsx`.**

## 4. Ergonomía PWA y Reglas de Negocio
16. **NUNCA crear un botón, tab, chip interactivo, enlace o `<input>` sin área táctil mínima de `44x44px` (`min-h-11 min-w-11`).**
17. **NUNCA romper el contenedor móvil `max-w-md mx-auto` con anchos fijos en píxeles que excedan el viewport móvil (375px–448px) sin `overflow-x-auto`.**
18. **NUNCA introducir un muro de login/registro obligatorio (*login wall*) antes del Paso 4 del Wizard / Checkout:** Los pasos 1, 2 y 3 y el Home Guest deben ser 100% operables sin autenticación.
19. **NUNCA permitir que una receta que contenga un alérgeno presente en `state.vetoedAllergens` se agregue a `state.selectedSlots`:** Cualquier intento de selección debe disparar `OPEN_ALLERGEN_MODAL`.
20. **NUNCA inventar llamadas `fetch`/`axios` a backends externos inexistentes ni agregar pantallas fuera del alcance de `ScreenId` (`home-guest`, `wizard-step-1..4`, `checkout`, `checkout-success`, `home-active`) sin solicitud explícita del usuario.**
