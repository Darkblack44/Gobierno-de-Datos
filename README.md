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
├── index.html                        # Documento principal (SPA)
├── css/
│   ├── estilos.css                   # Hoja de estilos global (~4500 lineas)
│   ├── responsivo.css                # Media queries y breakpoints
│   └── estilos-embebidos.css         # Estilos complementarios embebidos
├── js/
│   ├── configuracion.js              # Variables globales, roles, macroprocesos, sesion
│   ├── aplicacion.js                 # Inicializacion, arrastre de logos, scroll, resize
│   ├── movil.js                      # Deteccion de dispositivo movil
│   ├── datos/
│   │   ├── estudiantes.js            # Dataset JSON de matriculas por municipio/programa
│   │   └── tableros.js               # Base de datos de 57 tableros con metadatos
│   └── modulos/
│       ├── navegacion.js             # Sistema SPA de vistas, roles y autenticacion
│       ├── menu-movil.js             # Toggle del menu hamburguesa y cierre externo
│       ├── tableros.js               # Motor de renderizado de tarjetas y acordeones
│       ├── busqueda.js               # Busqueda en tiempo real con resaltado de terminos
│       ├── visualizaciones.js        # Mapa Leaflet, Chart.js, contadores animados
│       ├── lineamientos.js           # Vista de lineamientos (Gobierno de Datos / IA)
│       ├── interacciones.js          # Animaciones de scroll (IntersectionObserver)
│       └── api-colombia.js           # Enriquecimiento asincrono via API Colombia
└── assets/
    └── imagenes/
        ├── Banner.jpg                # Imagen hero del carrusel
        ├── logoudec2.png             # Logo institucional (pre-footer)
        └── *.png / *.jpg / *.webp    # Logos de certificaciones y entidades aliadas
```

---

## Secciones del Micrositio

### Vista Inicio (`vistaInicio`)
| Seccion | Descripcion |
|---------|-------------|
| **Hero Carrusel** | Banner rotativo con imagen institucional y controles de navegacion |
| **Propuesta de Valor** | Texto principal: mision del Gobierno de Datos |
| **Nuestro Proposito** | 3 tarjetas: Objetivo Principal, Alcance Institucional, Cumplimiento Normativo |
| **Principios del Gobierno de Datos** | 6 tarjetas glass con iconos animados (liquid fill via `background-clip: text`) |
| **Indicadores Institucionales** | Metricas: Estudiantes, Programas, Sedes con tarjetas de gradiente; cards glass de Pregrado/Posgrado; mapa Leaflet; grafico Chart.js de programas por matricula |
| **Areas de Trabajo** | 8 tarjetas numeradas (Analisis, Calidad, Visualizacion, Arquitectura, BBDD, Normatividad, Seguridad, Mineria) |
| **Sistemas Integrados de Gestion** | 5 certificaciones ISO con enlaces a UCundinamarca |

### Vista Lineamientos (`vistaLineamientos`)
- **Gobierno de Datos**: Resolucion 036/2025, objetivo, funciones, estructura organizacional, 9 pilares del marco
- **Inteligencia Artificial**: Resolucion complementaria, principios eticos, areas de aplicacion

### Vista Acceso (`vistaAcceso`)
- Formulario de login con modo demo activo (sin credenciales requeridas)
- Tres roles: Estudiante, Administrativo, Gestor del Conocimiento

### Portales por Rol (`vistaEstudiantes`, `vistaAdministrativos`, `vistaGestores`)
- Buscador en tiempo real con resaltado de coincidencias
- Contadores de tableros disponibles
- Acordeones de macroprocesos (Estrategico, Misional, Apoyo, Seguimiento) con sub-areas
- Tarjetas de tablero con header gradiente, icono hexagonal y boton de acceso

### Componentes Globales
| Componente | Descripcion |
|------------|-------------|
| **CTA Contacto** | Tarjeta verde con enlace a `gobiernodedatos@ucundinamarca.edu.co` |
| **Marquesina** | Texto "Gobierno De Datos" en scroll horizontal continuo |
| **Logos Institucionales** | Banda horizontal arrastrable de certificaciones y entidades aliadas |
| **Pre-footer** | Logo UCundinamarca, enlaces legales, enlaces de Gobierno de Datos, Transparencia |
| **Badge Inscribete** | Boton circular SVG con flecha pulsante anclado al footer |
| **Footer** | Contacto, informacion de Gobierno de Datos, notificaciones judiciales |
| **Boton Scroll Top** | Aparece al bajar, devuelve al inicio con scroll suave |

---

## Stack Tecnologico

| Tecnologia | Version | Uso |
|------------|---------|-----|
| **HTML5** | — | Estructura semantica, SPA con vistas ocultas |
| **CSS3** | — | Custom Properties, `@property` (Houdini), glassmorphism, `backdrop-filter`, `clip-path`, animaciones con `@keyframes` |
| **JavaScript ES6+** | Vanilla | Modular, sin bundler, sin frameworks |
| **Tailwind CSS** | CDN | Clases de utilidad para layout y espaciado |
| **Font Awesome** | 6.4.0 | Iconografia |
| **Leaflet.js** | 1.9.4 | Mapa interactivo con circulos proporcionales y popups |
| **Chart.js** | CDN | Grafico de barras horizontal (programas por matricula) |
| **Power BI** | Embebido | 57 dashboards via iframe en modal |
| **API Colombia** | REST | Enriquecimiento asincrono de datos geograficos del mapa |

---

## Caracteristicas Tecnicas

### Sistema de Diseno
- **Paleta institucional**: `#007B3E` (verde principal), `#00482B` (verde oscuro), `#79C000` (verde lima), `#FBE122` (amarillo), `#00A99D` (turquesa)
- **Tipografia**: Montserrat (principal), Century Gothic (secundaria)
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

### Mapa Interactivo
- 7 municipios: Fusagasuga, Facatativa, Chia, Soacha, Zipaquira, Ubate, Girardot
- Circulos proporcionales al numero de estudiantes con popups informativos
- Modo pantalla completa con boton toggle
- **Enriquecimiento via API Colombia** (`api-colombia.com/api/v1`): poblacion, superficie, descripcion
- Cache en `localStorage` con TTL de 24 horas y reintentos con backoff exponencial

### Navegacion
- SPA client-side: cambio de vistas via `navegarA()` / `navegarALineamiento()`
- Menu hamburguesa en movil con cierre al navegar y al click externo
- Estado activo sincronizado entre menu desktop y movil
- Sesion via `sessionStorage` (no persistente entre pestanas)

### Busqueda
- Filtrado en tiempo real por titulo, area, macroproceso, fuente y descripcion
- Resaltado de terminos con `<mark>`
- Debounce de 300ms para optimizar rendimiento

### Logos Arrastrables
- Animacion CSS `translateX(-50%)` en 40s loop infinito
- Drag horizontal via mouse/touch con pausa de animacion (`style.animation = 'none'`)
- Reanudacion con `animationDelay` negativo calculado desde posicion final

---

## Instalacion y Ejecucion

Es una aplicacion 100% estatica (client-side). No requiere servidor backend ni compilacion.

### Opcion 1: Abrir directamente
```
Abrir index.html en un navegador moderno (Chrome, Edge, Firefox)
```

### Opcion 2: Servidor local (recomendado para evitar restricciones CORS)
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con VS Code
Instalar extension "Live Server" y hacer clic en "Go Live"
```

### Modo Demo
El sistema inicia con `MODO_DEMO = true` en `js/configuracion.js`. Al hacer clic en "Iniciar sesion" se accede directamente sin credenciales. Para desactivar, cambiar a `false`.

---

## Configuracion

### Variables clave (`js/configuracion.js`)
| Variable | Tipo | Descripcion |
|----------|------|-------------|
| `MODO_DEPURACION` | `boolean` | Activa logs detallados en consola |
| `MODO_DEMO` | `boolean` | Permite acceso sin credenciales |
| `USUARIOS` | `object` | Mapa de usuarios demo (estudiante, admin, docente) |
| `MACROPROCESOS` | `object` | Configuracion de 4 macroprocesos (icono, color, areas) |
| `ICONOS_AREA` | `object` | Mapeo de area a icono Font Awesome |

### Datos (`js/datos/`)
- **`tableros.js`**: Array de 61 objetos con `id`, `titulo`, `area`, `macroproceso`, `rol`, `url` (Power BI), `fechaActualizacion`, `fuente`, `elaboradoPor`, `columnas` (metadatos del dataset)
- **`estudiantes.js`**: Array de registros `{MUNICIPIO_PROGRAMA, Programa, Estudiantes}` — fuente SNIES 2025-2

---

## Arquitectura de Vistas

```
index.html (SPA)
├── Barra de utilidades (accesibilidad, idioma)
├── Header (logo, buscador, accesos rapidos, nav desktop, menu movil)
├── Hero Carrusel
├── vistaInicio .............. Home publica
├── vistaLineamientos ....... Gobierno de Datos / IA
├── vistaAcceso ............. Login (modo demo)
├── vistaEstudiantes ........ Portal Creadores de Oportunidades
├── vistaAdministrativos .... Portal Administrativos
├── vistaGestores ........... Portal Gestores del Conocimiento
├── Modal Tablero ........... Iframe Power BI + panel de metadatos
├── CTA Contacto
├── Marquesina
├── Logos Institucionales
├── Pre-footer
├── Badge Inscribete
└── Footer
```

---

## Licencia

© 2026 Universidad de Cundinamarca — Todos los derechos reservados.
Uso restringido a fines de revision institucional, academicos y de planeacion autorizados por la Direccion de Planeacion.
