# Log de Sesión: Integración de Pantallas Secundarias (Mi Caja, Calendario, Perfil) y Modales de Soporte

- **Fecha:** 2026-10-21
- **Objetivo:** Implementar las pantallas restantes conectadas a BottomNav y TopNav (`my-box`, `calendar`, `profile`), el modal de pausa semanal (`SkipWeekModal`) y el centro de ayuda (`HelpCenterSheet`).
- **Archivos modificados y creados:**
  - `src/types/listobox.ts`: Extensión de `ScreenId` con `'my-box' | 'calendar' | 'profile'`.
  - `src/components/screens/MyBoxScreen.tsx`: Gestión activa de caja, recetas asignadas, alérgenos detectados y modal de confirmación de pausa/reanudación.
  - `src/components/screens/CalendarScreen.tsx`: Vista de entregas semanales programadas, estado de cobro, cut-off y pausas.
  - `src/components/screens/ProfileScreen.tsx`: Preferencias dietéticas, dirección de entrega, medios de pago guardados y acceso a soporte.
  - `src/components/ui/SkipWeekModal.tsx`: Modal interactivo para pausar o reanudar semana con consecuencias explicadas.
  - `src/components/ui/HelpCenterSheet.tsx`: Bottom sheet para el botón `?` de TopNav con soporte vía WhatsApp y FAQs.
  - `src/components/ui/BottomNav.tsx`: Navegación activa entre Inicio, Mi Caja, Calendario y Perfil.
  - `src/components/ui/TopNav.tsx`: Integración de trigger para `HelpCenterSheet` y navegación al perfil.
  - `src/app/page.tsx`: Enrutamiento SPA con las nuevas pantallas.
  - `contexto/decisiones.md` y `contexto/state/actual.md`: Sincronización del estado de implementación y nuevas decisiones.
- **Estado de Verificación:**
  - `npx tsc --noEmit`: 0 errores.
  - `next build`: Exitoso (4/4 páginas estáticas compiladas).
