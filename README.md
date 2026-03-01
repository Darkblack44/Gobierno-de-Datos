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
├── index.html                          # Documento principal (SPA)
├── iniciar.bat                         # Servidor local con doble clic (Python o Node, sin VS Code)
├── VALIDACION.md                       # Guía de validación y pruebas
├── ESTUDIANTES.csv                     # Fuente de verdad: matrículas históricas 2007-2025 (SNIES)
├── Planta_Fisica.csv                   # Fuente de verdad: infraestructura física por campus
├── css/
│   ├── estilos.css                     # Hoja de estilos global
│   ├── responsivo.css                  # Media queries y breakpoints
│   ├── estilos-embebidos.css           # Estilos complementarios (buscador, dropdowns, navbar)
│   └── indicadores.css                 # Estilos exclusivos de vistaIndicadores
├── js/
│   ├── configuracion.js                # Variables globales, roles, macroprocesos, sesión
│   ├── aplicacion.js                   # Inicialización async: carga CSV → mapa → métricas
│   ├── movil.js                        # Detección de dispositivo móvil
│   ├── datos/
│   │   └── tableros.js                 # Base de 61 tableros Power BI con metadatos completos
│   └── modulos/
│       ├── navegacion.js               # Sistema SPA de vistas, roles y autenticación
│       ├── menu-movil.js               # Toggle del menú hamburguesa y cierre externo
│       ├── tableros.js                 # Motor de renderizado de tarjetas y acordeones
│       ├── busqueda.js                 # Búsqueda en tiempo real con resaltado de términos
│       ├── visualizaciones.js          # Mapa Leaflet, Chart.js, contadores animados (datos desde CSV)
│       ├── lineamientos.js             # Vista de lineamientos (Gobierno de Datos / IA)
│       ├── interacciones.js            # Atajos de teclado y animaciones IntersectionObserver
│       ├── indicadores.js              # Módulo completo de vistaIndicadores (tabs, gráficos)
│       ├── datos-indicadores.js        # Motor CSV: parseo + API pública calcularSnapshotComunidad
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
| **Indicadores Institucionales** | KPIs dinámicos desde CSV (Matriculados 2025-IIPA): Estudiantes totales, Programas activos, Sedes regionales; tarjetas glass Pregrado/Posgrado; mapa Leaflet con círculos proporcionales; gráfico Chart.js Top 5 programas |
| **Áreas de Trabajo** | 8 tarjetas numeradas (Análisis, Calidad, Visualización, Arquitectura, BBDD, Normatividad, Seguridad, Minería) |
| **Sistemas Integrados de Gestión** | 5 certificaciones ISO con enlaces a UCundinamarca |

### Vista Indicadores (`vistaIndicadores`)
Sistema de análisis institucional con carga dinámica de `ESTUDIANTES.csv` y `Planta_Fisica.csv`. Los CSVs son la única fuente de verdad; si `fetch` falla (protocolo `file://`), los indicadores muestran estado vacío controlado (`–`) sin datos simulados.

| Tab | Contenido |
|-----|-----------|
| **Comunidad Académica** | KPIs: Total / Pregrado / Posgrado (Matriculados 2025-IIPA); gráfico de barras horizontales Top-N programas (filtrable); doughnut de distribución por sede |
| **Infraestructura** | KPIs: m² totales, aulas, laboratorios; barras horizontales m² por sede; barras apiladas (m²Aulas + m²Lab + m²Deportivo); 7 tarjetas campus con acordeón de detalles |
| **Evolución Histórica** | Gráfico de línea 2007-2025 (matriculados); toggle IPA / IIPA / Ambos; filtros por sede y nivel; nota metodológica con fuente SNIES |

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
- Carga `ESTUDIANTES.csv` y `Planta_Fisica.csv` vía `fetch` + `Promise.all` (requiere servidor HTTP)
- Si el fetch falla (protocolo `file://`): `_rawEst = null` → estado `error` → APIs devuelven `null`/`[]` → guardias `if (!snap) return` activan estado vacío silencioso (`–`)
- **Sin datos embebidos**: los CSVs son la única fuente de verdad; no existe fallback estático
- Estado interno: `idle` → `cargando` → `listo` | `error`
- API pública en `globalThis`: `cargarDatosIndicadores`, `calcularSnapshotComunidad`, `calcularHistoricoIndicadores`, `obtenerPlantaFisicaFiltrada`, `obtenerSedesDisponibles`, `obtenerAniosDisponibles`, etc.

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
Los CSVs se cargan vía `fetch`, que **requiere un servidor HTTP** para funcionar. Sin servidor, los indicadores muestran `–` (estado vacío).

### Opción 1: iniciar.bat (recomendado — sin VS Code)
Doble clic en `iniciar.bat` en la raíz del proyecto. Detecta automáticamente Python o Node.js, inicia el servidor en `http://localhost:8000` y abre el navegador.

### Opción 2: Servidor local manual
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve .

# Con VS Code
Instalar extensión "Live Server" → clic derecho en index.html → "Open with Live Server"
```

### Opción 3: GitHub Pages / servidor web
Subir todos los archivos (incluyendo `ESTUDIANTES.csv` y `Planta_Fisica.csv`) al repositorio. GitHub Pages sirve los archivos vía HTTPS y `fetch` funciona correctamente.

### Abrir index.html directamente (sin servidor)
```
Los KPIs e indicadores mostrarán – (estado vacío silencioso).
No hay datos embebidos de respaldo. Usar iniciar.bat para ver datos.
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

### Fuentes de datos
| Fuente | Descripción |
|--------|-------------|
| `ESTUDIANTES.csv` | **Fuente principal**: matrícula histórica por sede, nivel, programa y período (2007-2025). Actualizar este archivo actualiza todos los KPIs e indicadores automáticamente. |
| `Planta_Fisica.csv` | **Fuente principal**: infraestructura física por campus (m², aulas, laboratorios, puestos). |
| API Colombia (`api-colombia.com`) | Enriquecimiento asíncrono de municipios: población, superficie, código postal, descripción. Caché `localStorage` 24 h. |

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
js/datos/tableros.js           ← 61 tableros Power BI
js/modulos/menu-movil.js
js/modulos/navegacion.js
js/modulos/tableros.js
js/modulos/visualizaciones.js  ← define inicializarMapa, inicializarMetricas (datos desde CSV)
js/modulos/lineamientos.js
js/modulos/busqueda.js
js/modulos/interacciones.js
js/modulos/api-colombia.js
js/modulos/datos-indicadores.js ← expone calcularSnapshotComunidad en globalThis
js/modulos/indicadores.js
js/aplicacion.js               ← DOMContentLoaded async: await cargarDatosIndicadores() → inicializarMapa() → inicializarMetricas()
```

---

## Licencia

© 2026 Universidad de Cundinamarca — Todos los derechos reservados.
Uso restringido a fines de revisión institucional, académicos y de planeación autorizados por la Dirección de Planeación.
