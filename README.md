# Gobierno de Datos - Universidad de Cundinamarca

Plataforma web institucional diseñada para centralizar la gestión, visualización y análisis de datos académicos y administrativos. Este sistema facilita la toma de decisiones basada en evidencia y promueve la transparencia mediante el acceso a **57 tableros de indicadores (dashboards) en Power BI** integrados.

El proyecto responde a la Resolución No. 036 del 17 de marzo de 2025, estableciendo un marco de gobernanza para la calidad, integridad y seguridad de la información, alineado con el Modelo Educativo Digital Transmoderno (MEDIT).

## Alcance y Naturaleza del Proyecto (Prototipo)

**Este desarrollo constituye un entorno de pruebas y maquetación conceptual (beta).**

Ha sido elaborado en respuesta a la solicitud de los directivos encargados, con el propósito exclusivo de brindar una aproximación visual y funcional de lo que será el futuro micrositio de Gobierno de Datos. Su objetivo es facilitar la comprensión del alcance, la navegación y la experiencia de usuario propuesta.

Es importante aclarar que:
* **Carácter ilustrativo:** tanto el diseño gráfico como la información contenida en este prototipo son representaciones preliminares y no constituyen datos reales de producción ni la imagen definitiva.
* **Sujeto a cambios:** esta versión no es el producto final. El desarrollo está sujeto a modificaciones sustanciales, adaptaciones técnicas y reestructuraciones de diseño para asegurar su total alineación con la identidad corporativa, los manuales de marca y la infraestructura tecnológica oficial de la Universidad de Cundinamarca.
* **Entorno de validación:** se presenta como una herramienta de validación para la toma de decisiones estratégicas previas al desarrollo e implementación final.

## Características Principales

### Gestión de Datos Institucionales y Métricas
El sistema centraliza información crítica para la institución, cubriendo un amplio espectro de datos:
* **Volumen de datos:** visualización de métricas clave que abarcan **18,390 estudiantes** y **54 programas activos**.
* **Cobertura geográfica:** desglose de información a través de **7 sedes municipales**.
* **Centralización de la información:** acceso unificado a 62 tableros de control.
* **Múltiples fuentes de datos:** simulación de integración con sistemas como SNIES, SPADIES, plataforma CAI y SAP.
* **Diccionario de datos:** visualización detallada de metadatos, tipos de variables y descripciones para cada conjunto de datos.

### Roles y Seguridad
El sistema implementa una simulación de control de acceso basado en roles (RBAC) para diferenciar la pertinencia de la información mostrada:
* **Estudiante:** indicadores de desempeño académico y bienestar.
* **Administrativo:** métricas de gestión, contratación y planeación.
* **Gestor del Conocimiento (Docente):** tableros sobre producción académica y carga docente.

### Visualización y Experiencia de Usuario
* **Interfaz interactiva:** integración de reportes visuales dinámicos.
* **Panel de información ajustable:** funcionalidad para redimensionar manualmente el área de detalles.
* **Diseño responsivo:** adaptabilidad total a dispositivos móviles, tabletas y escritorio.
* **Georreferenciación:** mapa interactivo basado en Leaflet para visualizar la distribución por sedes.

## Tecnologías Utilizadas

El prototipo se ha construido utilizando tecnologías web estándar para facilitar su visualización en cualquier navegador moderno:

* **HTML5 / CSS3:** estructura semántica y hojas de estilo en cascada.
* **JavaScript (Vanilla):** lógica de interacción y manipulación del DOM sin dependencias pesadas.
* **Tailwind CSS:** framework de utilidades para agilidad en el diseño y responsividad.
* **Librerías de visualización:**
    * `Leaflet.js`: para la gestión de mapas interactivos.
    * `Chart.js`: para la renderización de gráficos estadísticos nativos.
* **Integración BI:** iframes optimizados para Power BI.

## Estructura del Proyecto

La organización de archivos del proyecto es la siguiente:

* `index.html`: estructura principal y contenedores de la aplicación.
* `css/estilos.css`: hoja de estilos globales y variables de diseño.
* `css/responsivo.css`: adaptaciones específicas para diferentes tamaños de pantalla (media queries).
* `css/estilos-embebidos.css`: estilos extraídos de bloques embebidos.
* `js/configuracion.js`: configuración y estado global del sitio.
* `js/aplicacion.js`: inicialización general y orquestación.
* `js/modulos/`: lógica modularizada por responsabilidad (navegación, tableros, visualizaciones, etc.).
* `js/datos/tableros.js`: repositorio de datos estructurados (JSON) que alimenta los tableros y estadísticas.
* `js/datos/estudiantes.js`: datos agregados para métricas y gráficas.
* `js/movil.js`: optimizaciones de experiencia en dispositivos móviles y menús táctiles.
* `assets/imagenes/Banner.jpg`: imagen principal de portada.

## Configuración para Visualización

Al ser una aplicación estática (client-side), no requiere instalación de servidores complejos para su visualización:

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en un navegador web moderno (Chrome, Edge, Firefox).
3. El sistema iniciará en **Modo Demo** para facilitar la navegación por todas las secciones sin restricciones de autenticación real.

## Ver sitio web
[https://darkblack44.github.io/Gobierno-de-Datos/](https://darkblack44.github.io/Gobierno-de-Datos/)

## Licencia y Derechos

© 2025 Universidad de Cundinamarca. Todos los derechos reservados.
El uso de este prototipo está restringido a fines de revisión institucional, académicos y de planeación autorizados por la Dirección de Planeación.
