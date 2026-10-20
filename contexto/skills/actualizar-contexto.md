# Skill: Actualizar y Comprimir el Contexto (`actualizar-contexto`)

## 1. Cuándo correr esta skill
- **Ejecutar ÚNICAMENTE al cerrar una sesión importante**, al completar un hito funcional (ej. nueva pantalla, refactor de estado, corrección de un bug complejo) o cuando el usuario lo pida explícitamente.
- **NUNCA ejecutar en cada mensaje** ni en consultas rápidas de solo lectura.

---

## 2. Qué archivos revisar y actualizar (dentro de `contexto/`)
Sigue este checklist en orden:

1. **`contexto/state/actual.md` (Obligatorio en cada cierre de sesión):**
   - Mueve las tareas completadas de *Pendiente* a *Hecho* (en una sola línea concisa por ítem).
   - Añade nuevos pendientes o deuda técnica detectada durante la sesión.
   - Actualiza *Blockers* (elimina los resueltos, documenta los nuevos con el archivo/línea exacto).
   - Actualiza la fecha de última sincronización en el encabezado.

2. **`contexto/decisions/` y `contexto/decisiones.md` (Solo si hubo decisiones nuevas o cambios):**
   - Si se tomó una decisión de arquitectura, modelo de datos o UX/UI, regístrala con fecha, decisión y motivo en `contexto/decisions/` y actualiza el resumen en `contexto/decisiones.md`.
   - Si una decisión anterior fue reemplazada, márcala como `Obsoleta` o sobrescríbela en el resumen activo para no dejar reglas contradictorias.

3. **`contexto/gotchas/conocidos.md` (Solo si se descubrió o resolvió una trampa técnica):**
   - Documenta en formato: **Síntoma $\rightarrow$ Causa raíz $\rightarrow$ Solución exacta (archivo/línea)**.

4. **`contexto/reglas.md` (Solo si cambió una línea roja):**
   - Añade únicamente reglas binarias y detectables (qué NUNCA hacer).

5. **`contexto/design.md` (Solo si cambiaron tokens en `src/app/globals.css`):**
   - Sincroniza cualquier token nuevo de `@theme` para que el resumen coincida 100% con `globals.css`.

6. **`contexto/logs/` (Obligatorio al cerrar sesión importante):**
   - Crea o actualiza el archivo `contexto/logs/YYYY-MM-DD-resumen.md` con máximo 15–25 líneas:
     - Objetivo de la sesión.
     - Archivos modificados.
     - Decisiones/gotchas clave extraídos.
     - Estado de verificación (`tsc` / build).

---

## 3. Reglas de Eficiencia y Poda (Cómo mantenerlo corto)
- **Comprimir lo viejo:** Si `contexto/state/actual.md` acumula más de 15 ítems en *Hecho*, agrupa los antiguos en un bloque de 2–3 líneas por módulo y conserva detallados solo los recientes.
- **Borrar lo que ya no sirve:** Elimina tareas descartadas, blockers ya resueltos y notas temporales. No guardes "código comentado" ni texto tachado en los archivos de estado.
- **Prohibido copiar historial al prompt o a los archivos:** No transcribas conversaciones; guarda solo conclusiones accionables.
- **Auditar longitud de `AGENTS.md` y `contexto/AGENTS.md`:** Verifica que tengan **menos de 300 líneas** (idealmente 100–200 líneas) y que no contengan directivas `@[...]` que inyecten archivos pesados inline. Mantén `/AGENTS.md` y `contexto/AGENTS.md` sincronizados.

---

## 4. Resultado esperado de la skill
Al finalizar la ejecución de esta skill:
1. Todos los archivos en `contexto/` reflejan la realidad exacta del código en `src/`.
2. El volumen total de texto activo a leer en la próxima sesión (`contexto/AGENTS.md` + `contexto/state/actual.md`) es **más corto o igual de compacto que al empezar**, sin información obsoleta ni duplicada.
