# Gobierno de Datos - Universidad de Cundinamarca

Plataforma web institucional diseñada para centralizar la gestión, visualización y análisis de datos académicos y administrativos. Este sistema facilita la toma de decisiones basada en evidencia y promueve la transparencia mediante el acceso a tableros de indicadores (dashboards) integrados con Power BI.

El proyecto responde a la Resolución No. 036 del 17 de marzo de 2025, estableciendo un marco de gobernanza para la calidad, integridad y seguridad de la información, alineado con el Modelo Educativo Digital Transmoderno (MEDIT).

## Características Principales

### Gestión de Datos Institucionales
*   **Centralización de Información:** Acceso unificado a más de 50 tableros de control activos.
*   **Múltiples Fuentes de Datos:** Integración con sistemas como SNIES, SPADIES, plataforma CAI, SAP y LMS institucional.
*   **Diccionario de Datos:** Visualización detallada de metadatos, tipos de variables y descripciones para cada conjunto de datos (dataset).

### Roles y Seguridad
El sistema implementa un control de acceso basado en roles (RBAC) para garantizar la seguridad y pertinencia de la información mostrada:
*   **Estudiante:** Acceso a indicadores de desempeño académico, bienestar y seguimiento curricular.
*   **Administrativo:** Visualización de métricas de gestión, contratación, financiera y planeación estratégica.
*   **Gestor del Conocimiento (Docente):** Tableros específicos sobre producción académica, escalafón y carga docente.

### Visualización y Experiencia de Usuario
*   **Interfaz Interactiva:** Integración fluida de reportes de Power BI mediante iframes seguros.
*   **Panel de Información Ajustable:** Funcionalidad para redimensionar el área de metadatos, mejorando la legibilidad en diferentes resoluciones.
*   **Diseño Responsivo:** Adaptabilidad total a dispositivos móviles, tabletas y escritorio.
*   **Georreferenciación:** Mapa interactivo para visualizar la distribución estudiantil por sedes regionales.

## Tecnologías Implementadas

El desarrollo se ha realizado utilizando tecnologías web estándar para asegurar compatibilidad y rendimiento:

*   **HTML5 / CSS3:** Estructura semántica y estilos personalizados.
*   **JavaScript (Vanilla):** Lógica de negocio, gestión de sesión y manipulación del DOM sin dependencias de frameworks pesados.
*   **Tailwind CSS:** Framework de utilidad para agilizar el diseño de componentes.
*   **Leaflet.js:** Librería para la visualización de mapas interactivos.
*   **Chart.js:** Renderizado de gráficos estadísticos nativos en el navegador.

## Estructura del Proyecto

El repositorio se organiza de la siguiente manera:

*   `index.html`: Punto de entrada principal de la aplicación. Contiene la estructura base y los contenedores dinámicos.
*   `styles.css`: Hoja de estilos global, definición de variables CSS y temas institucionales.
*   `responsive.css`: Reglas de medios (media queries) para adaptar la interfaz a diferentes tamaños de pantalla.
*   `app.js`: Archivo principal de lógica. Maneja la autenticación simulada, renderizado de dashboards, interactividad del mapa y lógica de negocio.

## Configuración y Despliegue

Este proyecto es una aplicación estática (client-side), lo que facilita su despliegue en cualquier servidor web estándar.

1.  **Requisitos:** Un navegador web moderno (Chrome, Firefox, Edge). No requiere backend ni base de datos para su funcionamiento básico en modo demostración.
2.  **Instalación:** Clonar el repositorio y abrir el archivo `index.html` en el navegador.
3.  **Modo Demo:** La aplicación incluye un modo de demostración activo por defecto para facilitar la revisión de funcionalidades sin credenciales reales.

## Consideraciones Técnicas

*   **Autenticación:** El sistema actual utiliza una simulación de autenticación basada en `sessionStorage` para fines demostrativos y de prototipado. En un entorno de producción, esto debe integrarse con el directorio activo o sistema de identidad institucional (SSO).
*   **Redimensionamiento:** Se implementó una lógica personalizada con `requestAnimationFrame` para optimizar el rendimiento al redimensionar paneles laterales, evitando retrasos (lag) visuales.

## Licencia y Derechos

© 2025 Universidad de Cundinamarca. Todos los derechos reservados.
El uso de este software está restringido a fines institucionales y académicos autorizados por la Dirección de Planeación y la Dirección de Sistemas y Tecnología.
