# Gobierno de Datos — Universidad de Cundinamarca

Micrositio institucional que centraliza la gestión, visualización y acceso a indicadores de datos académicos y administrativos de la Universidad de Cundinamarca. Integra **61 tableros de Power BI**, métricas en tiempo real, georreferenciación interactiva y un sistema de navegación por roles.

Responde a la **Resolución No. 036 del 17 de marzo de 2025** que crea el Grupo Interno de Trabajo de Gobierno de Datos, alineado con el Modelo Educativo Digital Transmoderno (MEDIT).

> **Nota:** Este desarrollo constituye un entorno de pruebas y maquetación conceptual (beta). El diseño y la información son representaciones preliminares sujetas a modificaciones para alinearse con la identidad corporativa oficial.

---

## Sitio en produccion

[https://darkblack44.github.io/Gobierno-de-Datos/](https://darkblack44.github.io/Gobierno-de-Datos/)

---

## Estructura del Proyecto

```
Gobierno de Datos/
├── index.html                          # Documento principal (SPA, ~1543 líneas)
├── VALIDACION.md                       # Guía de validación y pruebas
├── ESTUDIANTES.csv                     # Dataset histórico de matrículas (fuente SNIES)
├── Planta_Fisica.csv                   # Dataset de infraestructura por campus
├── css/
│   ├── estilos.css                     # Hoja de estilos global
│   ├── responsivo.css                  # Media queries y breakpoints
│   ├── estilos-embebidos.css           # Estilos complementarios (buscador, dropdowns, navbar)
│   └── indicadores.css                 # Estilos exclusivos de vistaIndicadores
├── js/
│   ├── configuracion.js                # Variables globales, roles, macroprocesos, sesión
│   ├── aplicacion.js                   # Inicialización, arrastre de logos, scroll, resize
│   ├── movil.js                        # Detección de dispositivo móvil
│   ├── datos/
│   │   ├── tableros.js                 # Base de 61 tableros con metadatos completos
│   │   ├── estudiantes.js              # Dataset JSON de matrículas por municipio/programa
│   │   ├── estudiantes_indicadores.js  # Snapshot y serie histórica para vistaIndicadores
│   │   └── planta_fisica.js            # Datos de infraestructura física por campus (fallback)
│   └── modulos/
│       ├── navegacion.js               # Sistema SPA de vistas, roles y autenticación
│       ├── menu-movil.js               # Toggle del menú hamburguesa y cierre externo
│       ├── tableros.js                 # Motor de renderizado de tarjetas y acordeones
│       ├── busqueda.js                 # Búsqueda en tiempo real con resaltado de términos
│       ├── visualizaciones.js          # Mapa Leaflet, Chart.js, contadores animados
│       ├── lineamientos.js             # Vista de lineamientos (Gobierno de Datos / IA)
│       ├── interacciones.js            # Atajos de teclado y animaciones IntersectionObserver
│       ├── indicadores.js              # Módulo completo de vistaIndicadores (tabs, gráficos)
│       ├── datos-indicadores.js        # Motor de datos dinámicos: parseo CSV + modo fallback
│       └── api-colombia.js             # Enriquecimiento asíncrono vía API Colombia
└── assets/
    └── imagenes/
        ├── Banner.jpg                  # Imagen hero del carrusel
        ├── logoudec2.png               # Logo institucional (pre-footer)
        ├── Infraestructura/            # Fotos de los 7 campus universitarios
        │   ├── Sede Fusagasugá.png
        │   ├── Extensión Chía.png
        │   ├── Extensión Facatativá.png
        │   ├── Extensión Soacha.png
        │   ├── Extensión Zipaquirá.png
        │   ├── Seccional Girardot.png
        │   ├── Seccional Ubaté.png
        │   └── Oficinas en Bogotá.png
        └── *.png / *.jpg / *.webp      # Logos de certificaciones y entidades aliadas (22 imágenes)
```

---

## Secciones del Micrositio

### Vista Inicio (`vistaInicio`)
| Sección | Descripción |
|---------|-------------|
| **Hero Carrusel** | Banner rotativo con imagen institucional y controles de navegación |
| **Propuesta de Valor** | Texto principal: misión del Gobierno de Datos |
| **Nuestro Propósito** | 3 tarjetas: Objetivo Principal, Alcance Institucional, Cumplimiento Normativo |
| **Principios del Gobierno de Datos** | 6 tarjetas glass con iconos animados (liquid fill via `background-clip: text`) |
| **Indicadores Institucionales** | KPIs: Estudiantes (12 949), Programas (49), Sedes (7); tarjetas glass de Pregrado/Posgrado; mapa Leaflet; gráfico Chart.js de programas por matrícula |
| **Áreas de Trabajo** | 8 tarjetas numeradas (Análisis, Calidad, Visualización, Arquitectura, BBDD, Normatividad, Seguridad, Minería) |
| **Sistemas Integrados de Gestión** | 5 certificaciones ISO con enlaces a UCundinamarca |

### Vista Indicadores (`vistaIndicadores`) ← nueva
Sistema de análisis institucional profundo con carga dinámica de `ESTUDIANTES.csv` y `Planta_Fisica.csv`. Si `fetch` falla (protocolo `file://`), activa automáticamente el modo fallback con datos embebidos.

| Tab | Contenido |
|-----|-----------|
| **Comunidad Académica** | KPIs: Total / Pregrado / Posgrado (Matriculados 2025-IIPA); gráfico de barras horizontales Top-N programas (filtrable); doughnut de distribución por sede |
| **Infraestructura** | KPIs: m² totales, aulas, laboratorios; barras horizontales m² por sede; barras apiladas (m²Aulas + m²Lab + m²Deportivo); 7 tarjetas campus con acordeón de detalles |
| **Evolución Histórica** | Gráfico de línea 2007-2025 (matriculados); toggle IPA / IIPA / Ambos; nota metodológica con fuente SNIES |

### Vista Lineamientos (`vistaLineamientos`)
- **Gobierno de Datos**: Resolución 036/2025, objetivo, funciones, estructura organizacional, 9 pilares del marco
- **Inteligencia Artificial**: Resolución complementaria, principios éticos, áreas de aplicación

### Vista Acceso (`vistaAcceso`)
- Formulario de login con modo demo activo (`MODO_DEMO = true`)
- Tres roles: Estudiante, Administrativo, Gestor del Conocimiento
- Atajo de teclado: `Enter` ejecuta el acceso

### Portales por Rol (`vistaEstudiantes`, `vistaAdministrativos`, `vistaGestores`)
- Buscador en tiempo real con resaltado de coincidencias (`<span class="resaltado">`)
- Contadores de tableros disponibles por rol
- Acordeones de macroprocesos (Estratégico, Misional, Apoyo, Seguimiento) con sub-áreas
- Tarjetas de tablero con header gradiente, icono hexagonal y botón de acceso

### Componentes Globales
| Componente | Descripción |
|------------|-------------|
| **CTA Contacto** | Tarjeta verde con enlace a `gobiernodedatos@ucundinamarca.edu.co` |
| **Marquesina** | Texto "Gobierno De Datos" en scroll horizontal continuo |
| **Logos Institucionales** | Banda horizontal arrastrable de certificaciones y entidades aliadas |
| **Pre-footer** | Logo UCundinamarca, enlaces legales, enlaces de Gobierno de Datos, Transparencia |
| **Badge Inscríbete** | Botón circular SVG con flecha pulsante anclado al footer |
| **Footer** | Contacto, información de Gobierno de Datos, notificaciones judiciales |
| **Botón Scroll Top** | Aparece al bajar, devuelve al inicio con scroll suave |

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | — | Estructura semántica, SPA con vistas ocultas |
| **CSS3** | — | Custom Properties, `@property` (Houdini), glassmorphism, `backdrop-filter`, `clip-path`, animaciones con `@keyframes` |
| **JavaScript ES6+** | Vanilla | Modular, sin bundler, sin frameworks |
| **Tailwind CSS** | CDN | Clases de utilidad para layout y espaciado |
| **Font Awesome** | 6.4.0 | Iconografía |
| **Leaflet.js** | 1.9.4 | Mapa interactivo con círculos proporcionales y popups |
| **Chart.js** | CDN | Gráficos (barras horizontales, doughnut, línea) |
| **Power BI** | Embebido | 61 tableros vía iframe en modal |
| **API Colombia** | REST | Enriquecimiento asíncrono de datos geográficos del mapa |

---

## Características Técnicas

### Sistema de Diseño
- **Paleta institucional**: `#007B3E` (verde principal), `#00482B` (verde oscuro), `#79C000` (verde lima), `#FBE122` (amarillo), `#00A99D` (turquesa)
- **Tipografía**: Montserrat (principal), Century Gothic (secundaria)
- **Glassmorphism**: `backdrop-filter: blur()` + fondos semitransparentes + bordes verdes sutiles
- **Efecto liquid fill en iconos**: `@property --icon-fill` + `background-clip: text` con gradiente animable
- **Tarjetas de tablero**: header con gradiente aurora, icono hexagonal (`clip-path: polygon`), cuerpo glass
- **Macroprocesos**: header gradiente flotante (pill redondeado) + contenido glass separado con `opacity` animada

### Responsividad
Breakpoints en `responsivo.css`:
- `1440px` (extra large)
- `1280px`, `1024px` (desktop)
- `769-900px` (tablet landscape)
- `768px` (tablet)
- `640px` (mobile large)
- `480px` (mobile)
- `360px` (mobile small)
- Soporte para `prefers-reduced-motion`, `orientation: landscape`, y `@media print`

### Mapa Interactivo (Leaflet)
- 7 sedes: Fusagasugá, Facatativá, Chía, Soacha, Zipaquirá, Ubaté, Girardot
- Círculos proporcionales al número de estudiantes con popups informativos
- Tooltip personalizado fuera del `overflow: hidden` del contenedor, posicionado por `containerPoint`
- Modo pantalla completa con botón toggle (Fullscreen API)
- **Enriquecimiento vía API Colombia** (`api-colombia.com/api/v1`): población, superficie, código postal, descripción
- Caché en `localStorage` con TTL 24 h; reintentos con backoff exponencial (3 intentos, base 600 ms)

### Navegación
- SPA client-side: cambio de vistas vía `navegarA()` / `navegarALineamiento()`
- Menú hamburguesa en móvil con cierre al navegar y al click externo
- Estado activo sincronizado entre menú desktop y móvil (dropdown con hover CSS + toggle táctil)
- Sesión vía `sessionStorage` (no persistente entre pestañas)
- Atajo de teclado: `Escape` cierra el modal de tablero

### Motor de Datos Dinámicos (`datos-indicadores.js`)
- Carga `ESTUDIANTES.csv` y `Planta_Fisica.csv` vía `fetch` + `Promise.all`
- Si el fetch falla (ej. protocolo `file://`), activa modo fallback con datos estáticos embebidos
- Estado interno: `idle` → `cargando` → `listo` | `fallback`
- API pública en `globalThis`: `cargarDatosIndicadores`, `calcularSnapshotComunidad`, `calcularHistoricoIndicadores`, `obtenerPlantaFisicaFiltrada`, etc.

### Búsqueda
- Filtrado en tiempo real por título, área, macroproceso, fuente y descripción
- Resaltado de términos con `<span class="resaltado">`
- Debounce de 300 ms para optimizar rendimiento
- Restaura el estado de expansión de acordeones al limpiar la búsqueda

### Logos Arrastrables
- Animación CSS `translateX(-50%)` en 40 s loop infinito
- Drag horizontal vía mouse/touch con pausa de animación (`style.animation = 'none'`)
- Reanudación con `animationDelay` negativo calculado desde posición final

---

## Instalación y Ejecución

Es una aplicación 100% estática (client-side). No requiere servidor backend ni compilación.

### Opción 1: Abrir directamente
```
Abrir index.html en un navegador moderno (Chrome, Edge, Firefox)
```
> Los CSVs de `vistaIndicadores` no cargarán con `file://` → el sistema activa el modo fallback automáticamente.

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con VS Code
Instalar extensión "Live Server" y hacer clic en "Go Live"
```

### Modo Demo
El sistema inicia con `MODO_DEMO = true` en `js/configuracion.js`. Al hacer clic en "Iniciar sesión" se accede directamente sin credenciales. Para desactivar, cambiar a `false`.

---

## Configuración

### Variables clave (`js/configuracion.js`)
| Variable | Tipo | Descripción |
|----------|------|-------------|
| `MODO_DEPURACION` | `boolean` | Activa logs detallados en consola |
| `MODO_DEMO` | `boolean` | Permite acceso sin credenciales |
| `USUARIOS` | `object` | Mapa de usuarios demo (estudiante, admin, docente) |
| `MACROPROCESOS` | `object` | Configuración de 4 macroprocesos (icono, color, áreas) |
| `ICONOS_AREA` | `object` | Mapeo de área a icono Font Awesome |

### Datos (`js/datos/`)
| Archivo | Descripción |
|---------|-------------|
| `tableros.js` | Array de **61 objetos** con `id`, `titulo`, `area`, `macroproceso`, `rol`, `url` (Power BI), `fechaActualizacion`, `fuente`, `elaboradoPor`, `columnas` (metadatos del dataset) |
| `estudiantes.js` | Array de registros `{MUNICIPIO_PROGRAMA, Programa, Estudiantes}` — fuente SNIES 2025-IIPA; alimenta el gráfico de programas en `vistaInicio` |
| `estudiantes_indicadores.js` | Snapshot Matriculados 2025-IIPA y serie histórica 2007-2025 para `vistaIndicadores` |
| `planta_fisica.js` | Datos de infraestructura por campus — fallback cuando `Planta_Fisica.csv` no está disponible |

### Fuentes de datos externas
| Fuente | Descripción |
|--------|-------------|
| `ESTUDIANTES.csv` | Datos históricos de matrícula por sede, nivel, programa y período (2007-2025) |
| `Planta_Fisica.csv` | Infraestructura física por campus: m², aulas, laboratorios, puestos |
| API Colombia (`api-colombia.com`) | Datos oficiales de municipios (población, superficie, código postal) |

---

## Arquitectura de Vistas

```
index.html (SPA — 1543 líneas)
├── Barra de utilidades (accesibilidad, selector de idioma ENG/ESP)
├── Header (logo UCundinamarca, buscador prominente, accesos rápidos, nav desktop, menú móvil)
├── Hero Carrusel
├── vistaInicio ............... Home pública (activa por defecto)
├── vistaIndicadores .......... Indicadores institucionales: 3 tabs analíticos
├── vistaLineamientos ......... Gobierno de Datos / Inteligencia Artificial
├── vistaAcceso ............... Login (modo demo)
├── vistaEstudiantes .......... Portal Creadores de Oportunidades
├── vistaAdministrativos ...... Portal Administrativos (protegida)
├── vistaGestores ............. Portal Gestores del Conocimiento (protegida)
├── Modal Tablero ............. Iframe Power BI + panel de metadatos lateral
├── CTA Contacto
├── Marquesina
├── Logos Institucionales (arrastrables)
├── Pre-footer
├── Badge Inscríbete
└── Footer
```

### Orden de carga de scripts
```
js/movil.js                    ← detección de dispositivo (antes del body)
js/configuracion.js            ← variables y sesión globales
js/datos/tableros.js           ← 61 tableros
js/datos/estudiantes.js        ← datos del gráfico de inicio
js/modulos/menu-movil.js
js/modulos/navegacion.js
js/modulos/tableros.js
js/modulos/visualizaciones.js
js/modulos/lineamientos.js
js/modulos/busqueda.js
js/modulos/interacciones.js
js/modulos/api-colombia.js
js/modulos/datos-indicadores.js
js/modulos/indicadores.js
js/aplicacion.js               ← inicialización y overrides finales
```

---

## Licencia

© 2026 Universidad de Cundinamarca — Todos los derechos reservados.
Uso restringido a fines de revisión institucional, académicos y de planeación autorizados por la Dirección de Planeación.
