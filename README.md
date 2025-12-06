# Gobierno de Datos - Universidad de Cundinamarca

Plataforma web institucional diseñada para centralizar la gestión, visualización y análisis de datos académicos y administrativos. Este sistema facilita la toma de decisiones basada en evidencia y promueve la transparencia mediante el acceso a **57 tableros de indicadores (dashboards) en Power BI** integrados.

El proyecto responde a la Resolución No. 036 del 17 de marzo de 2025, estableciendo un marco de gobernanza para la calidad, integridad y seguridad de la información, alineado con el Modelo Educativo Digital Transmoderno (MEDIT).

## Alcance y Naturaleza del Proyecto (Prototipo)

**Este desarrollo constituye un entorno de pruebas y maquetación conceptual (Beta).**

Ha sido elaborado en respuesta a la solicitud de los directivos encargados con el propósito exclusivo de brindar una aproximación visual y funcional de lo que será el futuro micrositio de Gobierno de Datos. Su objetivo es facilitar la comprensión del alcance, la navegación y la experiencia de usuario propuesta.

Es importante aclarar que:
* **Carácter Ilustrativo:** Tanto el diseño gráfico como la información contenida en este prototipo son representaciones preliminares y no constituyen datos reales de producción ni la imagen definitiva.
* **Sujeto a Cambios:** Esta versión no es el producto final. El desarrollo está sujeto a modificaciones sustanciales, adaptaciones técnicas y reestructuraciones de diseño para asegurar su total alineación con la identidad corporativa, los manuales de marca y la infraestructura tecnológica oficial de la Universidad de Cundinamarca.
* **Entorno de Validación:** Se presenta como una herramienta de validación para la toma de decisiones estratégicas previas al desarrollo e implementación final.

## Características Principales

### Gestión de Datos Institucionales y Métricas
El sistema centraliza información crítica para la institución, cubriendo un amplio espectro de datos:
* **Volumen de Datos:** Visualización de métricas clave que abarcan **18,390 estudiantes** y **54 programas activos**.
* **Cobertura Geográfica:** Desglose de información a través de **7 sedes municipales**.
* **Centralización de Información:** Acceso unificado a 62 tableros de control.
* **Múltiples Fuentes de Datos:** Simulación de integración con sistemas como SNIES, SPADIES, plataforma CAI y SAP.
* **Diccionario de Datos:** Visualización detallada de metadatos, tipos de variables y descripciones para cada conjunto de datos.

### Roles y Seguridad
El sistema implementa una simulación de control de acceso basado en roles (RBAC) para diferenciar la pertinencia de la información mostrada:
* **Estudiante:** Indicadores de desempeño académico y bienestar.
* **Administrativo:** Métricas de gestión, contratación y planeación.
* **Gestor del Conocimiento (Docente):** Tableros sobre producción académica y carga docente.

### Visualización y Experiencia de Usuario
* **Interfaz Interactiva:** Integración de reportes visuales dinámicos.
* **Panel de Información Ajustable:** Funcionalidad para redimensionar manualmente el área de detalles.
* **Diseño Responsivo:** Adaptabilidad total a dispositivos móviles, tabletas y escritorio.
* **Georreferenciación:** Mapa interactivo basado en Leaflet para visualizar la distribución por sedes.

## Tecnologías Utilizadas

El prototipo se ha construido utilizando tecnologías web estándar para facilitar su visualización en cualquier navegador moderno:

* **HTML5 / CSS3:** Estructura semántica y hojas de estilo en cascada.
* **JavaScript (Vanilla):** Lógica de interacción y manipulación del DOM sin dependencias pesadas.
* **Tailwind CSS:** Framework de utilidades para agilidad en el diseño y responsividad.
* **Librerías de Visualización:**
    * `Leaflet.js`: Para la gestión de mapas interactivos.
    * `Chart.js`: Para la renderización de gráficos estadísticos nativos.
* **Integración BI:** Iframes optimizados para Power BI.

## Estructura del Proyecto

La organización de archivos del proyecto es la siguiente:

* `index.html`: Estructura principal y contenedores de la aplicación.
* `styles.css`: Hoja de estilos globales y variables de diseño.
* `responsive.css`: Adaptaciones específicas para diferentes tamaños de pantalla (Media Queries).
* `app.js`: Lógica principal del prototipo y orquestador de funciones.
* `data-dashboards.js`: Repositorio de datos estructurados (JSON) que alimenta los tableros y estadísticas.
* `mobile.js`: Lógica específica para optimización de experiencia en dispositivos móviles y menús táctiles.

## Configuración para Visualización

Al ser una aplicación estática (client-side), no requiere instalación de servidores complejos para su visualización:

1.  Clonar o descargar el repositorio.
2.  Abrir el archivo `index.html` en un navegador web moderno (Chrome, Edge, Firefox).
3.  El sistema iniciará en **Modo Demo** para facilitar la navegación por todas las secciones sin restricciones de autenticación real.

## Ver sitio web
[https://darkblack44.github.io/Gobierno-de-Datos/](https://darkblack44.github.io/Gobierno-de-Datos/)

## Licencia y Derechos

© 2025 Universidad de Cundinamarca. Todos los derechos reservados.
El uso de este prototipo está restringido a fines de revisión institucional, académicos y de planeación autorizados por la Dirección de Planeación.
