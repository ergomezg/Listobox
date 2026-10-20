# Documento de Requerimientos de Producto (PRD) — ListoBox PWA
**Proyecto / Contexto:** Prueba Interrapidísimo — Modelo de Suscripción Meal-Kit / Comida Lista para Preparar  
**Versión:** 2.0.0 (Actualizada y Consolidada)  
**Fecha:** Octubre 2026  
**Estado:** Aprobado para Ejecución de MVP (Release 1 / V0)  
**Mesa Triada Responsable:** Product Manager, Senior UX/UI Designer, Senior Developer Lead  
**Stack Tecnológico:** React 18+ / Next.js (App Router, PWA Mobile-First), Tailwind CSS v4, `@phosphor-icons/react`  

---

## 1. Resumen Ejecutivo y Visión del Producto

**ListoBox** es una Progressive Web App (PWA) *mobile-first* de suscripción semanal de *meal-kits* adaptada al mercado colombiano. El servicio entrega a domicilio kits de ingredientes frescos dosificados al gramo junto con recetarios guiados para preparar cenas caseras saludables en 20–25 minutos.

### Propuesta de Valor
Resolver la alimentación semanal eliminando la fatiga mental de planificar menús, las compras en supermercados y el desperdicio de alimentos. ListoBox se diferencia radicalmente de los modelos tradicionales al operar bajo una arquitectura **Value-First** (exploración y personalización completa de la caja en modo invitado antes de exigir registro o pago), flexibilidad modular (selección de 3 de 5 platos y sustitución de proteínas en 1 tap), validación síncrona de inventario y un sistema estricto de seguridad alimentaria con bloqueo preventivo ante alérgenos de riesgo vital.

---

## 2. Definición del Problema y Objetivos de Negocio (KPIs)

### 2.1 Problem Statement Auditado (V2.0)
> *"Los profesionales urbanos en Colombia que intentan ordenar comida por suscripción lista para preparar en casa están abandonando el flujo antes de pagar (60% de carritos incompletos en la etapa de checkout).*  
> *Observamos que los usuarios con restricciones dietéticas o requerimientos específicos encuentran menús predeterminados rígidos, lo que incrementa la fricción de decisión y detiene la conversión final de compra."*

### 2.2 Fricciones Raíz Identificadas
1. **Barreras de autenticación forzada:** Exigencia de crear cuenta o ingresar tarjeta de crédito (*paywall*) antes de permitir al usuario evaluar las recetas reales.
2. **Inflexibilidad dietética:** Catálogos rígidos sin capacidad de excluir ingredientes o sustituir proteínas según alergias o preferencias.
3. **Fricción transaccional y ansiedad por recurrencia:** Desconfianza ante cobros automáticos sin mecanismos transparentes de pausa (*skip week*) o falta de medios de pago locales familiares (PSE, Nequi, Daviplata).

### 2.3 Objetivos de Negocio y KPIs Cuantitativos
* **Tasa de Abandono en Checkout (Drop-off):** Reducir la tasa de abandono de carritos del $60\%$ actual a menos del $40\%$.
* **Conversión de Primer Pedido (Visitor-to-Paid Signup):** Incrementar la conversión en al menos $+15\%$ a $+18\%$ mediante la experiencia abierta *Guest Mode*.
* **Tiempo de Configuración Semanal:** Permitir el armado y personalización completa de la caja en menos de $3\text{ minutos}$.
* **Conversión Guest-to-User:** Lograr una tasa de conversión $\ge 70\%$ desde la confirmación de la caja hacia el formulario de registro rápido.
* **Retención de Suscriptores (Semana 4):** Aumentar la retención en $+12\%$ facilitando la pausa semanal (*Skip Week*) en un solo clic frente a cancelaciones definitivas.

---

## 3. Público Objetivo (User Persona)

* **Arquetipo:** Lucía Martínez (32 años).
* **Ocupación:** Key Account Manager con esquema de teletrabajo híbrido; nivel socioeconómico medio-alto.
* **Estilo de Vida:** Agendas corporativas saturadas, videollamadas continuas y poco tiempo libre disponible para compras o preparación exhaustiva.
* **Jobs-to-be-Done (JTBD):** *"Cuando estoy agotada tras una jornada laboral, quiero resolver mis comidas semanales de forma rápida y saludable, para disfrutar cocinando sin el estrés de planificar menús ni ir al supermercado."*
* **Dolores Principales:**
  * Fatiga mental al final del día (*"¿qué cocino hoy?"*).
  * Desperdicio recurrente de alimentos frescos en la nevera.
  * Rechazo absoluto a registrarse o entregar datos bancarios antes de conocer la oferta del menú.
  * Alergia severa a mariscos e intolerancia a lácteos sin opciones de control preventivo seguro en plataformas convencionales.
* **Expectativas:** PWA ultra-fluida, costos por porción transparentes, feedback visual inmediato al cambiar ingredientes y control total sobre pausas de suscripción.

---

## 4. Alcance del Producto (Scoping)

### 4.1 En Alcance (MVP — Release 1 / V0)
* **Modo Invitado (Guest Mode):** Acceso total e irrestricto al catálogo semanal y selector de porciones sin inicio de sesión.
* **Configurador Progresivo (Wizard):** Calibración de porciones (comensales y días), metas, hábitos, exclusión de alérgenos (máx. 8) y estilos culinarios (máx. 6).
* **Catálogo Facetado por Dieta:** 5 categorías nutricionales estándar organizadas en pills horizontales.
* **Tarjeta de Receta Dinámica (5 estados):** *Default*, *Selected*, *Swapped*, *Locked-Allergen*, *Skeleton*.
* **Motor de Swap de Proteína:** Intercambio directo desde la tarjeta o Quick View con actualización de costos en COP.
* **Seguridad de Alérgenos:** Detección síncrona y despliegue del **Modal Intrusivo de Bloqueo** ante riesgos vitales.
* **Barra Persistente (Sticky Dock):** Contador de slots dinámicos, cálculo de precio en tiempo real y habilitación condicional del CTA.
* **Registro Contextual Guest-to-User:** Alta rápida (1-tap social o correo/contraseña) preservando el estado de la caja armada en LocalStorage.
* **Checkout Local Simulado:** Captura de dirección, franja de entrega y pasarela local recurrente (PSE, Billeteras Nequi/Daviplata, Tarjetas locales).
* **Pantalla de Éxito & Resumen:** Número de orden `#LK-xxxxx`, fecha de primer arribo y fecha de corte (*cut-off*).

### 4.2 Fuera de Alcance para el MVP (Roadmap Futuro)
* Integración de Inteligencia Artificial (IA) o algoritmos predictivos de menú en cualquiera de los flujos (**Restricción estricta de fase inicial**).
* Modo cocina digital con temporizadores interactivos paso a paso (reservado para fase post-compra avanzada).
* Sistema de fidelización gamificada por medallas, rachas o programas de referidos.
* Venta a la carta de mercado de despensa adicional o utensilios fuera del kit de comida.

---

## 5. Reglas de Negocio Oficiales

1. **Modelo de Acceso y Exploración Libre (Guest-First):** Ningún muro de autenticación (*login wall*) puede bloquear la navegación del catálogo, el uso de filtros o el ajuste de porciones antes de completar la caja.
2. **Integridad de Cuota de Caja Semanal:** El usuario debe cumplir exactamente con el cupo de recetas de su plan (ej. 3 de 5 platos). El botón de confirmación en el Sticky Dock permanece deshabilitado hasta alcanzar la cuota precisa.
3. **Personalización e Intercambio (Swap):** Las sustituciones de componentes o proteínas se realizan en un máximo de 2 taps desde la tarjeta o el Bottom Sheet, actualizando la UI de forma optimista (*Optimistic UI*) sin recargar la página.
4. **Seguridad Alimentaria y Bloqueo por Alérgenos Críticos:** La validación síncrona cruza los ingredientes de cada plato con la lista de alérgenos vetados por el usuario. Ante una coincidencia médica, la tarjeta se renderiza bloqueada (opacidad reducida, fondo semántico de peligro) y cualquier interacción dispara obligatoriamente el **Modal Intrusivo de Bloqueo**.
5. **Validación Síncrona de Inventario:** El sistema valida en tiempo real la disponibilidad de stock de insumos antes de consolidar la adición o swap de una receta.
6. **Persistencia en la Transición Contextual:** Al confirmar la caja, la conversión de *Guest* a cliente registrado debe transferir de forma íntegra e idéntica la selección y parámetros configurados al nuevo ID de cuenta sin reiniciar el flujo.
7. **Facturación y Pasarela Local:** Los cobros recurrentes se procesan en pesos colombianos (COP) mediante integración con medios locales (PSE, Nequi, Daviplata, Tarjetas nacionales) desglosando flete transparente ($0 en primer pedido).
8. **Temporizador de Corte (Cut-off Timer) y Pausas (Skip Week):** Las modificaciones semanales, saltos de entrega o pausas de cuenta se gestionan en 1 clic y deben realizarse antes del martes a las 23:59. Posterior a este hito, la orden se congela para despacho logístico.

---

## 6. Arquitectura de Información (IA) y Jerarquía

```
[ NIVEL 0: HOME / CATÁLOGO PRINCIPAL (PWA Mobile-First) ]
 │
 ├── [ NIVEL 1: 1.0 ONBOARDING WIZARD (Configurador Guiado de Plan) ]
 │    ├── [ NIVEL 2: 1.1 Dimensionamiento de Porciones ] (Comensales 1-4+, Días 1-7, Cálculo dinámico)
 │    ├── [ NIVEL 2: 1.2 Objetivos & Formato de Comida ] (Metas de vida, Exprés <20 min, Familiar, Batch)
 │    ├── [ NIVEL 2: 1.3 Perfil Nutricional & Alérgenos ] (Hábito base, Vetos a evitar: Máx. 8)
 │    └── [ NIVEL 2: 1.4 Preferencias Gastronómicas ] (Ingredientes clave, Tradiciones culinarias: Máx. 6)
 │
 ├── [ NIVEL 1: 2.0 MENÚ SEMANAL & ARMADO DE CAJA (Vista Core del Catálogo) ]
 │    ├── [ NIVEL 2: 2.1 Segmentador Dietético Principal ] (5 categorías nutricionales en pills)
 │    ├── [ NIVEL 2: 2.2 Tarjeta de Receta (Recipe Card - Feed Principal) ]
 │    │    └── [ NIVEL 3: 2.2.1 Micro-selector de Swap de Proteína ]
 │    ├── [ NIVEL 2: 2.3 Detalle Rápido (Quick View Bottom Sheet) ]
 │    │    └── [ NIVEL 3: 2.3.1 Modal de Confirmación de Swap con Costo COP ]
 │    ├── [ NIVEL 2: 2.4 Modal Intrusivo de Bloqueo por Alérgenos ]
 │    └── [ NIVEL 2: 2.5 Sticky Dock Persistente de Progreso de Caja ]
 │
 ├── [ NIVEL 1: 3.0 CONVERSIÓN & CHECKOUT (Embudo de Contratación) ]
 │    ├── [ NIVEL 2: 3.1 Registro Rápido Contextual (Guest-to-User) ] (1-Tap Google/Apple, Correo)
 │    ├── [ NIVEL 2: 3.2 Dirección de Entrega & Logística ] (Nomenclatura urbana, Horario, Portería)
 │    ├── [ NIVEL 2: 3.3 Pasarela de Pago Local ] (PSE, Nequi/Daviplata, Tarjetas locales)
 │    └── [ NIVEL 2: 3.4 Pantalla de Éxito (Success Screen) ] (Orden #LK, Fecha estimada de arribo)
 │
 ├── [ NIVEL 1: 4.0 MI CUENTA & GESTIÓN DE SUSCRIPCIÓN (Área de Cliente) ]
 │    ├── [ NIVEL 2: 4.1 Gestor de "Mi Semana" & Calendario ]
 │    │    └── [ NIVEL 3: 4.1.1 Confirmación de Pausa / Skip Week ] (1 tap antes de corte)
 │    ├── [ NIVEL 2: 4.2 Modo Cocina (Recetario Digital Post-Compra) ]
 │    │    └── [ NIVEL 3: 4.2.1 Ficha Técnica Paso a Paso con Temporizadores ]
 │    ├── [ NIVEL 2: 4.3 Preferencias de Plan & Frecuencia ]
 │    ├── [ NIVEL 2: 4.4 Perfil de Alérgenos & Restricciones ]
 │    └── [ NIVEL 2: 4.5 Facturación & Métodos de Pago Guardados ]
 │         └── [ NIVEL 3: 4.5.1 Historial de Cobros y Recibos ]
 │
 └── [ NIVEL 1: 5.0 CENTRO DE AYUDA & LEGAL (Páginas Secundarias e Institucionales) ]
      ├── [ NIVEL 2: 5.1 Preguntas Frecuentes (FAQ & Cómo Funciona) ]
      ├── [ NIVEL 2: 5.2 Cobertura & Zonas de Reparto ]
      ├── [ NIVEL 2: 5.3 Contacto & Soporte Directo ] (WhatsApp y soporte)
      ├── [ NIVEL 2: 5.4 Términos y Condiciones del Servicio ] (Cláusulas de corte y cobro recurrente)
      └── [ NIVEL 2: 5.5 Política de Privacidad & Tratamiento de Datos ] (Habeas Data)
```

### Categorías Nutricionales del Segmentador (Nivel 2.1)
1. **Equilibradas & Diarias:** 450 a 650 kcal por porción.
2. **Altas en Proteína:** $> 35\text{g}$ de proteína por porción.
3. **Bajas en Carbohidratos / Keto-Friendly:** $< 25\text{g}$ netos de carbohidratos.
4. **Vegetarianas & Plant-Based:** Opciones ovo-lacto y 100% vegetales.
5. **Pescatarianas:** Proteínas marinas y ácidos grasos omega-3.

---

## 7. Product Backlog: Historias de Usuario Detalladas

### HU-01: Exploración libre del catálogo y configuración flexible de porciones
* **Prioridad:** Alta (P0 — Core MVP) | **Complejidad:** M (5 pts)
* **Perfil de Usuario:** Usuario Invitado (*Guest*).
* **Descripción:** Permite acceder a la PWA, ajustar comensales y días semanales, y explorar todo el menú sin autenticación.
* **Estructura BDD:**
  * **Given** que el usuario ingresa a la PWA por primera vez en modo invitado,
  * **When** manipula el selector de comensales (1 a 4+) y la frecuencia semanal (1 a 7 días),
  * **Then** el sistema calcula en tiempo real el total de raciones semanales y actualiza el catálogo de recetas sin presentar muros de registro (*login wall*).
* **Criterios Funcionales:** Grid mobile-first con tarjetas en proporción 4:3, badges de tiempo y calorías; cero interrupciones de registro.
* **Criterios No Funcionales:** LCP $< 2.0\text{s}$ en redes 4G móviles; cumplimiento WCAG AA (áreas táctiles mínimas de $48 \times 48\text{ px}$).
* **Dependencias:** Ninguna (Historia Raíz).

---

### HU-02: Detección síncrona y bloqueo preventivo por alérgenos críticos
* **Prioridad:** Alta (P0 — Seguridad Médica Crítica) | **Complejidad:** L (8 pts)
* **Perfil de Usuario:** Usuario con restricciones dietéticas severas o alergias.
* **Descripción:** Compara en tiempo real los ingredientes de cada plato con la lista de alérgenos vetados (máx. 8) en el perfil, bloqueando su adición.
* **Estructura BDD:**
  * **Given** que el usuario ha marcado alérgenos críticos en su configuración (ej. mariscos o maní),
  * **When** intenta seleccionar o interactuar con una receta que contiene dichos componentes,
  * **Then** el sistema bloquea síncronamente la acción, renderiza la tarjeta en estado `Locked-Allergen` (opacidad al 50%, borde de alerta) y despliega el **Modal Intrusivo de Bloqueo** con alternativas seguras.
* **Criterios Funcionales:** El modal no se puede cerrar por clic exterior accidental; ofrece botones explícitos: *"Ver opciones alternativas seguras"* y *"Entendido, volver al menú"*.
* **Criterios No Funcionales:** Validación local/backend ejecutada en $< 100\text{ms}$ para evitar parpadeos visuales (*CLS* = 0).
* **Dependencias:** HU-01.

---

### HU-03: Selección de menú semanal e intercambio (Swap) de proteínas
* **Prioridad:** Alta (P0 — Personalización Core) | **Complejidad:** L (8 pts)
* **Perfil de Usuario:** Usuario configurando su caja semanal.
* **Descripción:** Permite seleccionar recetas (ej. 3 de 5) e intercambiar componentes clave (proteínas) desde la tarjeta o Quick View.
* **Estructura BDD:**
  * **Given** que el usuario visualiza una receta en el catálogo,
  * **When** hace clic en el selector de Swap y selecciona un sustituto (ej. cambiar pollo por tofu o salmón),
  * **Then** la tarjeta adopta el estado `Swapped`, exhibe el badge de modificación activa, ajusta el costo adicional en COP si aplica y recalcula el resumen de la caja mediante *Optimistic UI*.
* **Criterios Funcionales:** Sustitución operable en máximo 2 taps; visualización transparente de sobrecostos antes de confirmar.
* **Criterios No Funcionales:** Transición de estados animada con CSS en $< 200\text{ms}$.
* **Dependencias:** HU-01, HU-02.

---

### HU-04: Control síncrono de stock y barra de progreso persistente (Sticky Dock)
* **Prioridad:** Alta (P0 — Usabilidad y Control) | **Complejidad:** M (5 pts)
* **Perfil de Usuario:** Usuario armando su pedido semanal.
* **Descripción:** Barra anclada al pie de pantalla que muestra slots cubiertos, subtotal y valida stock en tiempo real.
* **Estructura BDD:**
  * **Given** que el usuario agrega o retira recetas del menú,
  * **When** el sistema valida el inventario síncrono en backend,
  * **Then** el Sticky Dock actualiza el contador de slots (ej. `3 de 4 seleccionadas [●][●][●][○]`), muestra el precio total en COP y mantiene el botón de avance deshabilitado hasta que la cuota esté completa.
* **Criterios Funcionales:** Al alcanzar el cupo total, el botón cambia de estado inactivo a habilitado con el texto *"Confirmar caja y continuar"*.
* **Criterios No Funcionales:** Posición persistente (`z-index: 50`) con padding inferior compensatorio en el layout de al menos 80px para evitar solapamientos.
* **Dependencias:** HU-01, HU-03.

---

### HU-05: Transición contextual a registro rápido (Guest-to-User)
* **Prioridad:** Alta (P1 — Conversión de Funnel) | **Complejidad:** M (5 pts)
* **Perfil de Usuario:** Usuario Invitado que completó su caja.
* **Descripción:** Despliegue de un Bottom Sheet al presionar confirmar para registrar la cuenta sin perder el progreso previo.
* **Estructura BDD:**
  * **Given** que un usuario invitado llena su caja y presiona *"Confirmar caja y continuar"*,
  * **When** el sistema detecta sesión no autenticada,
  * **Then** despliega un modal ligero que resume la caja armada y provee registro en 1 tap (Google / Apple) o formulario simple (correo y contraseña), asociando la selección al nuevo usuario.
* **Criterios Funcionales:** Persistencia de estado en LocalStorage transferida a la base de datos tras la creación del usuario; formulario de no más de 2 campos obligatorios.
* **Criterios No Funcionales:** Tasa de éxito de vinculación de estado del 100% sin recargas destructivas de ventana.
* **Dependencias:** HU-04.

---

### HU-06: Ingreso logístico y pasarela de pago local
* **Prioridad:** Alta (P1 — Transacción Financiera) | **Complejidad:** M (5 pts)
* **Perfil de Usuario:** Cliente recién registrado en checkout.
* **Descripción:** Captura de dirección física e integración simulada con medios de pago locales (PSE, Nequi, Daviplata, Tarjetas).
* **Estructura BDD:**
  * **Given** que el cliente llega a la pantalla de checkout,
  * **When** ingresa su dirección de despacho y selecciona su método de pago local preferido,
  * **Then** el sistema presenta el resumen financiero transparente ($0 en envío para primera semana) y programa la facturación recurrente.
* **Criterios Funcionales:** Validación de cobertura por ciudad/municipio; selección de franjas horarias de recepción.
* **Criterios No Funcionales:** Encriptación de datos transaccionales bajo protocolo HTTPS / TLS 1.3.
* **Dependencias:** HU-05.

---

### HU-07: Procesamiento transaccional y confirmación de suscripción exitosa
* **Prioridad:** Alta (P1 — Cierre de Venta) | **Complejidad:** M (5 pts)
* **Perfil de Usuario:** Suscriptor completando la transacción.
* **Descripción:** Confirmación de la orden aprobada, visualización de fecha de entrega y gobernanza de corte semanal.
* **Estructura BDD:**
  * **Given** que el cliente presiona *"Confirmar suscripción y pagar"*,
  * **When** la pasarela aprueba síncronamente la transacción,
  * **Then** el sistema redirige a la pantalla de éxito con el número de orden `#LK-xxxxx`, la fecha del primer despacho y la fecha límite de corte (*cut-off*) para modificar la próxima semana.
* **Criterios Funcionales:** Disparo de orden al motor de suscripción; visualización de botón para gestionar la semana o ver recetas.
* **Criterios No Funcionales:** Generación de confirmación en pantalla en menos de 1.5 segundos post-aprobación.
* **Dependencias:** HU-06.

---

## 8. Requerimientos No Funcionales y UI Design Tokens

### 8.1 Performance y Compatibilidad PWA
* **Métricas Core Web Vitals:** Largest Contentful Paint (LCP) $\le 2.0\text{ segundos}$ en conexiones 4G; Cumulative Layout Shift (CLS) $\le 0.02$.
* **Carga de Medios:** Imágenes optimizadas en formato WebP con relación de aspecto fija 4:3 y carga diferida (*lazy loading*).

### 8.2 Estándares de Accesibilidad (WCAG AA)
* **Contraste de Color:** Ratios de contraste mínimos de $4.5:1$ en texto normal y $3:1$ en texto grande o componentes de interfaz.
* **Áreas Táctiles:** Controles, steppers y botones con dimensiones físicas mínimas de $48 \times 48\text{ px}$.

### 8.3 Design Tokens de la PWA (Tailwind CSS v4)
* **Brand Primary:**
  * Deep Forest: `#00473c` (Encabezados, textos de énfasis, bordes activos)
  * Emerald: `#10b981` (Botones de acción primaria, badges positivos, checks)
* **Brand Accent:**
  * Lime Glow: `#e6ff55` (Badges de tiempo y dinamismo)
  * Amber / Cobre: `#f59e0b` (Alertas informativas, acentos cálidos)
* **Feedback Danger:**
  * Red: `#dc2626` (Modal de alérgenos críticos, bordes de advertencia)
  * Danger Light: `#fef2f2` (Fondo de recetas con alérgenos bloqueados)
* **Surfaces & Neutrals:**
  * Cream Canvas: `#f4f3e7` (Fondo global de la PWA)
  * Warm Sand: `#e8dcc6` (Contenedores secundarios, divisores suaves)
  * Sage Mist: `#d8e5d6` (Banners de soporte informativo)
  * Forest Shadow: `#0e150e` (Textos primarios de alto contraste)
  * White: `#ffffff` (Tarjetas y superficies modales)
* **Tipografía:** *Plus Jakarta Sans* (cuerpo y titulares principales); *Bodoni Moda* (peso 200, acentos de marca secundarios).
* **Iconografía:** Exclusivamente `@phosphor-icons/react`.

---

## 9. Modelo de Dominio de Datos (Entity-Relationship)

```
┌──────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
│    GUEST     │────0..*──│   USER_PREFERENCES   │────1..1──│         USER         │
└──────────────┘          └──────────────────────┘          └──────────────────────┘
                                                                       │ 1..*
                                                                       ▼
┌──────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
│  INGREDIENT  │────0..*──│     RECIPE_SLOT      │────0..*──│     SUBSCRIPTION     │
└──────────────┘          └──────────────────────┘          └──────────────────────┘
       │ 0..*                        │ 1..1                            │ 1..1
       ▼                             ▼                                 ▼
┌──────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
│   ALLERGEN   │          │  SWAP_CUSTOMIZATION  │          │     WEEKLY_BOX       │
└──────────────┘          └──────────────────────┘          └──────────────────────┘
                                                                       │ 1..*
                                                                       ▼
                                                            ┌──────────────────────┐
                                                            │ PAYMENT_TRANSACTION  │
                                                            └──────────────────────┘
```

### Entidades y Reglas Lógicas
1. **Guest:** Identificador temporal (`guestId`), almacena selecciones en `localStorage` antes de la autenticación.
2. **User:** Identificador permanente (`userId`), credenciales encriptadas o proveedor social (`Google`, `Apple`), dirección y teléfono.
3. **UserPreferences:** Relación de comensales predeterminados (1–4+), frecuencia de días (1–7), objetivos de bienestar, lista de estilos favoritos (máx. 6) y lista de alérgenos vetados de riesgo vital (máx. 8).
4. **Subscription:** Estado (`ACTIVE`, `PAUSED`, `CANCELLED`), fecha límite de corte (`nextCutOffDate`), total semanal recurrente en COP.
5. **WeeklyBox:** Ciclo semanal de entrega, estado de la caja (`DRAFT`, `CONFIRMED`, `DISPATCHED`), agregador de slots de recetas.
6. **RecipeSlot:** Instancia de una receta asignada a la caja con indicador de bloqueo (`isLocked`).
7. **Recipe & Ingredient:** Catálogo de platillos con metadatos (kcal, tiempo, categoría dietética), materias primas dosificadas e inventario de stock disponible.
8. **Allergen:** Catálogo de alérgenos con flag de criticidad (`isCriticalRisk`). Evaluado síncronamente contra el perfil del usuario.
9. **SwapCustomization:** Registro transaccional de cambio de ingrediente/proteína (`originalIngredientId` $\rightarrow$ `substitutedIngredientId`) con ajuste financiero (`extraCostCOP`).
10. **PaymentTransaction:** Registro de pagos locales con estado (`APPROVED`, `REJECTED`), monto cobrado y token de recurrencia.

---

## 10. Matriz de Validación de Supuestos y Riesgos (Pre-Código)

| Dimensión / Hipótesis | Señal de Éxito Validada | Mecanismo de Validación Recomendado | Plan de Contingencia si Falla |
| :--- | :--- | :--- | :--- |
| **H1: Causa Raíz de Abandono**<br>El 60% de caída en checkout responde a falta de personalización del menú y no a costos o pasarela. | $> 40\%$ de los abandonos atribuyen el abandono a "no encontré platos aptos para mi dieta". | Exit-Intent Micro-Survey en checkout (1 pregunta cerrada al intentar abandonar la pantalla). | Si el fallo se debe a costos de envío o pasarela, congelar desarrollo de menú y optimizar fletes y PSE. |
| **H2: Demanda de Swap**<br>Permitir cambiar la proteína o excluir ingredientes aumenta la intención de compra final. | CTR en botón de personalización / Swap $> 30\%$ y reducción de carritos caídos en $\ge 15\%$. | Prueba de puerta falsa (*Fake Door*) en tarjetas de receta midiendo clics en *"Cambiar proteína"*. | Si el CTR es bajo, pivotar hacia cajas cerradas por nicho ("Caja Vegana", "Caja Alta Proteína") sin micro-swap. |
| **H3: Filtros vs. Configuración Granular**<br>El usuario prefiere catálogo prefiltrado por tipo de dieta antes que armar recetas ingrediente a ingrediente. | Mayor velocidad de avance y conversión en catálogo prefiltrado frente a constructor granular. | Test A/B de navegación (Filtros facetados globales vs. Selector manual plato por plato). | Adoptar arquitectura de selección en 1 solo tap mediante las 5 categorías dietéticas consolidadas. |