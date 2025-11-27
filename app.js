// ==========================================
// CONFIGURACIÓN DE DEBUG
// ==========================================
const DEBUG_MODE = false;
const DEMO_MODE = true; // Modo demo: login automático sin credenciales

function debugLog(message, data = null) {
  if (DEBUG_MODE) {
    if (data) {
      console.log(`[DEBUG] ${message}`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}

// ==========================================
// FUNCIÓN AUXILIAR PARA IDS SEGUROS Y ÚNICOS
// ==========================================
function generateSafeId(text, prefix = '') {
  if (!text) return prefix + 'unknown';
  
  const normalized = text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  
  const id = prefix ? `${prefix}-${normalized}` : normalized;
  debugLog(`ID generado: "${text}" → "${id}"`);
  return id || prefix + 'area-unknown';
}

// ==========================================
// SISTEMA DE ROLES Y USUARIOS
// ==========================================
const USERS = {
  'estudiante': { password: 'udec2024', role: 'Estudiante', name: 'Estudiante' },
  'admin': { password: 'udec2024', role: 'Administrativo', name: 'Administrativo' },
  'docente': { password: 'udec2024', role: 'Docente', name: 'Gestor del Conocimiento' }
};

let currentUser = null;

// ==========================================
// DATOS DE DASHBOARDS - COMPLETOS Y REORGANIZADOS
// ==========================================
const dashboards = [
  {
    "id": 1,
    "titulo": "Asesor Disciplinar",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzM4YTllZGUtOGQ1Yy00MWQ5LWFkN2UtNWFhMmViY2MxZTVkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "SNIES - Sistema Académico",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Tablero interactivo para el seguimiento y análisis del acompañamiento académico disciplinar brindado a estudiantes de pregrado.",
    "estado": "Activo",
    "observaciones": "Actualizado semestralmente con datos del Sistema Académico Institucional.",
    "esHistorico": false,
    "datasetName": "Asesorias_Disciplinares",
    "datasetAbstract": "Registro de asesorías disciplinares brindadas a estudiantes de pregrado por programa, periodo y estado de avance.",
    "columns": [
      {"name": "id_asesoria", "type": "number", "description": "Identificador único de la asesoría"},
      {"name": "codigo_estudiante", "type": "text", "description": "Código institucional del estudiante"},
      {"name": "programa_academico", "type": "text", "description": "Nombre del programa académico"},
      {"name": "periodo_academico", "type": "text", "description": "Periodo en formato AAAA-P"},
      {"name": "asignatura", "type": "text", "description": "Nombre de la asignatura asesorada"},
      {"name": "fecha_asesoria", "type": "date", "description": "Fecha de realización de la asesoría"},
      {"name": "duracion_minutos", "type": "number", "description": "Duración en minutos"},
      {"name": "modalidad", "type": "text", "description": "Presencial / Virtual / Híbrida"},
      {"name": "estado", "type": "text", "description": "Programada / Realizada / Cancelada"},
      {"name": "calificacion_estudiante", "type": "number", "description": "Calificación de satisfacción (1-5)"}
    ],
    "datasetSource": "Sistema Académico Institucional - Base de datos de asesorías",
    "datasetNotes": "Se actualizan cada fin de semestre. Los datos históricos se conservan desde 2020-1."
  },
  {
    "id": 2,
    "titulo": "CAI Cátedra Generación Siglo 21 V2",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWFkODZhODgtOTVmZi00ZTFhLTlmZjgtMDlhZjlhNjA0N2YwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma CAI",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Visualización de datos de participación, asistencia y desempeño estudiantil en la cátedra institucional Generación Siglo 21.",
    "estado": "Activo",
    "observaciones": "Datos recopilados de la plataforma CAI en tiempo real durante el periodo académico vigente.",
    "esHistorico": false,
    "datasetName": "CAI_Generacion_Siglo21",
    "datasetAbstract": "Participación, asistencia y calificaciones de estudiantes en la cátedra institucional Generación Siglo 21.",
    "columns": [
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "programa", "type": "text", "description": "Programa académico al que pertenece"},
      {"name": "periodo", "type": "text", "description": "Periodo académico"},
      {"name": "modulo", "type": "text", "description": "Nombre del módulo cursado"},
      {"name": "asistencias", "type": "number", "description": "Número de asistencias registradas"},
      {"name": "sesiones_totales", "type": "number", "description": "Total de sesiones del módulo"},
      {"name": "calificacion_final", "type": "number", "description": "Calificación final obtenida (0-5)"},
      {"name": "estado_aprobacion", "type": "text", "description": "Aprobado / Reprobado / En curso"}
    ],
    "datasetSource": "Plataforma CAI - Base de datos académica",
    "datasetNotes": "Actualización en tiempo real. Filtros aplicados por periodo y sede."
  },
  {
    "id": 3,
    "titulo": "CAI Viviendo el MEDIT",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZjdhZmFjYjEtZTUyMi00NzUwLTg0YzItMjEyYjgyNWZjYTBkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma CAI",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Dashboard dedicado al seguimiento de actividades y participación en la cátedra Viviendo el MEDIT (Modelo Educativo Digital Transmoderno).",
    "estado": "Activo",
    "observaciones": "Refleja el compromiso estudiantil con el modelo educativo institucional.",
    "esHistorico": false,
    "datasetName": "CAI_Viviendo_MEDIT",
    "datasetAbstract": "Seguimiento de la participación y rendimiento de los estudiantes en la cátedra institucional 'Viviendo el MEDIT'.",
    "columns": [
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "programa_academico", "type": "text", "description": "Programa académico del estudiante"},
      {"name": "periodo_academico", "type": "text", "description": "Periodo en formato AAAA-P"},
      {"name": "modulo_medit", "type": "text", "description": "Módulo o tema del MEDIT cursado"},
      {"name": "actividades_completadas", "type": "number", "description": "Número de actividades finalizadas"},
      {"name": "calificacion_promedio", "type": "number", "description": "Promedio de calificaciones en las actividades"},
      {"name": "fecha_ultima_actividad", "type": "date", "description": "Fecha de la última interacción del estudiante"}
    ],
    "datasetSource": "Plataforma CAI - Módulo de seguimiento académico",
    "datasetNotes": "Actualización en tiempo real durante el semestre. Los datos se consolidan al final del periodo."
  },
  {
    "id": 4,
    "titulo": "Campo Multidimensional de Aprendizaje (CMA)",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzdlYjNhNDAtYzQzOC00ZmRhLTk5NTktNWQ2YzA4NGI5YTc0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - CMA",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Tablero para analizar el avance y resultados de los estudiantes en los Campos Multidimensionales de Aprendizaje.",
    "estado": "Activo",
    "observaciones": "Incluye métricas de participación, evaluación y desarrollo de competencias transversales.",
    "esHistorico": false,
    "datasetName": "Rendimiento_CMA",
    "datasetAbstract": "Registro del rendimiento y avance de estudiantes en los diferentes Campos Multidimensionales de Aprendizaje (CMA).",
    "columns": [
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "nombre_cma", "type": "text", "description": "Nombre del Campo Multidimensional de Aprendizaje"},
      {"name": "competencia_desarrollada", "type": "text", "description": "Competencia específica que aborda el CMA"},
      {"name": "horas_cursadas", "type": "number", "description": "Total de horas certificadas"},
      {"name": "calificacion_final", "type": "number", "description": "Calificación obtenida en el CMA"},
      {"name": "periodo_cursado", "type": "text", "description": "Periodo académico de finalización"},
      {"name": "estado", "type": "text", "description": "Inscrito / En curso / Aprobado / Reprobado"}
    ],
    "datasetSource": "Sistema de Gestión de CMA - Integrado con Sistema Académico",
    "datasetNotes": "Actualización al finalizar cada periodo académico. Permite filtros por programa y sede."
  },
  {
    "id": 5,
    "titulo": "Diagnósticos y Nivelatorios - Informe",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZWQwOTI0ZDYtZTYxNC00MGFmLWE1OTUtNTM4MzViZDcwNDNkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Diagnósticos",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Reporte de resultados de las pruebas diagnósticas y cursos nivelatorios aplicados al inicio de cada periodo académico.",
    "estado": "Activo",
    "observaciones": "Permite identificar necesidades de refuerzo académico desde el ingreso de los estudiantes.",
    "esHistorico": false,
    "datasetName": "Resultados_Diagnosticos_Nivelatorios",
    "datasetAbstract": "Resultados de pruebas diagnósticas y cursos de nivelación para estudiantes de primer ingreso.",
    "columns": [
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante de primer ingreso"},
      {"name": "periodo_ingreso", "type": "text", "description": "Periodo de admisión del estudiante"},
      {"name": "prueba_diagnostica", "type": "text", "description": "Nombre de la prueba (Ej. Matemáticas, Lectoescritura)"},
      {"name": "puntaje_obtenido", "type": "number", "description": "Puntaje del estudiante en la prueba"},
      {"name": "percentil", "type": "number", "description": "Posición porcentual del estudiante respecto al grupo"},
      {"name": "requiere_nivelatorio", "type": "text", "description": "Indica si el puntaje sugiere un curso nivelatorio (Sí/No)"},
      {"name": "curso_nivelatorio_tomado", "type": "text", "description": "Nombre del curso de nivelación inscrito"},
      {"name": "aprobacion_nivelatorio", "type": "text", "description": "Resultado del curso de nivelación (Aprobado/Reprobado)"}
    ],
    "datasetSource": "Plataforma de Pruebas Diagnósticas Institucional",
    "datasetNotes": "Datos cargados al inicio de cada semestre. Se utiliza para la planificación de estrategias de apoyo académico temprano."
  },
  {
    "id": 6,
    "titulo": "Ingresos a Campo Multidimensional de Aprendizaje",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMDNjYzVmNjYtYzI4OS00NGEwLWJlNDgtODMzY2M2ZDMzY2Q2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - CMA",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Visualización de inscripciones y participación estudiantil en las diferentes áreas del Campo Multidimensional de Aprendizaje.",
    "estado": "Activo",
    "observaciones": "Datos actualizados al inicio de cada periodo académico.",
    "esHistorico": false,
    "datasetName": "Inscripciones_CMA",
    "datasetAbstract": "Registro de inscripciones de estudiantes a los diferentes Campos Multidimensionales de Aprendizaje (CMA) por periodo.",
    "columns": [
      {"name": "id_inscripcion", "type": "number", "description": "Identificador único de la inscripción"},
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "programa_academico", "type": "text", "description": "Programa del estudiante"},
      {"name": "periodo_inscripcion", "type": "text", "description": "Periodo en el que se realiza la inscripción"},
      {"name": "nombre_cma", "type": "text", "description": "Nombre del CMA al que se inscribe"},
      {"name": "area_conocimiento_cma", "type": "text", "description": "Área de conocimiento principal del CMA"},
      {"name": "fecha_inscripcion", "type": "date", "description": "Fecha exacta de la inscripción"}
    ],
    "datasetSource": "Sistema de Gestión de CMA",
    "datasetNotes": "La data se actualiza durante el periodo de inscripciones de cada semestre."
  },
  {
    "id": 7,
    "titulo": "Monitorías",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjdlNTVkNmItMDMwZi00ZjlkLWJhNzktNWYwMWQyYWY4MGFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Monitorías",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Tablero que muestra estadísticas de asignación, asistencia y efectividad de las monitorías académicas ofrecidas a estudiantes.",
    "estado": "Activo",
    "observaciones": "Incluye datos por programa académico, asignatura y tipo de monitoría.",
    "esHistorico": false,
    "datasetName": "Gestion_Monitorias_Academicas",
    "datasetAbstract": "Seguimiento de las monitorías académicas, incluyendo información del monitor, el estudiante asistido y la sesión.",
    "columns": [
      {"name": "id_monitoria", "type": "number", "description": "Identificador de la sesión de monitoría"},
      {"name": "codigo_monitor", "type": "text", "description": "Código del estudiante que ejerce como monitor"},
      {"name": "codigo_estudiante_asistente", "type": "text", "description": "Código del estudiante que recibe la monitoría"},
      {"name": "asignatura", "type": "text", "description": "Asignatura objeto de la monitoría"},
      {"name": "tema_tratado", "type": "text", "description": "Tema específico abordado en la sesión"},
      {"name": "fecha_monitoria", "type": "date", "description": "Fecha de la sesión"},
      {"name": "duracion_horas", "type": "number", "description": "Duración de la sesión en horas"},
      {"name": "evaluacion_satisfaccion", "type": "number", "description": "Calificación de la sesión por parte del asistente (1-5)"}
    ],
    "datasetSource": "Sistema de Gestión de Monitorías",
    "datasetNotes": "Actualización semanal durante el periodo académico. Los datos son anonimizados en los agregados."
  },
  {
    "id": 8,
    "titulo": "Tránsito de la Educación Media a la Educación Superior",
    "area": "Oficina de Desarrollo Académico",
    "macroproceso": "Misional",
    "subproceso": "Admisiones y Registro",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiN2IwOWQ0MTAtZjY1Mi00YmRjLTg2MmItYTJlYmZjZDk1YjY1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "SNIES - ICFES",
    "elaboradoPor": "Oficina de Desarrollo Académico",
    "descripcion": "Análisis del perfil de ingreso de estudiantes nuevos, incluyendo resultados de pruebas ICFES y características sociodemográficas.",
    "estado": "Activo",
    "observaciones": "Datos agregados del SNIES e ICFES para caracterización de población estudiantil.",
    "esHistorico": false,
    "datasetName": "Perfil_Ingresantes_Pruebas_Saber11",
    "datasetAbstract": "Caracterización de los estudiantes admitidos, cruzando datos sociodemográficos con los resultados de las pruebas de estado Saber 11.",
    "columns": [
      {"name": "periodo_admision", "type": "text", "description": "Periodo de ingreso del estudiante"},
      {"name": "programa_admitido", "type": "text", "description": "Programa al que fue admitido"},
      {"name": "tipo_colegio", "type": "text", "description": "Tipo de colegio de procedencia (Oficial/Privado)"},
      {"name": "puntaje_global_saber11", "type": "number", "description": "Puntaje global obtenido en la prueba Saber 11"},
      {"name": "puntaje_matematicas", "type": "number", "description": "Puntaje en el componente de matemáticas"},
      {"name": "puntaje_lectura_critica", "type": "number", "description": "Puntaje en el componente de lectura crítica"},
      {"name": "puntaje_ciencias_naturales", "type": "number", "description": "Puntaje en el componente de ciencias naturales"},
      {"name": "puntaje_sociales_ciudadanas", "type": "number", "description": "Puntaje en el componente de sociales y ciudadanas"},
      {"name": "estrato_socioeconomico", "type": "number", "description": "Estrato de la vivienda del estudiante"}
    ],
    "datasetSource": "Datos del ICFES y Sistema de Admisiones Institucional",
    "datasetNotes": "Datos actualizados anualmente. Se utilizan para establecer líneas base y estrategias de acompañamiento."
  },
  
  // ==========================================================================================
  // MACROPROCESO MISIONAL - EDUCACIÓN VIRTUAL Y A DISTANCIA
  // ==========================================================================================
  {
    "id": 9,
    "titulo": "Asesor Disciplinar",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTE5MTcyZjAtYjNkNy00ZTE0LTgyMDItNGQ0MGE4OTZlMDk0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma Virtual",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Seguimiento del acompañamiento académico disciplinar en modalidad virtual y a distancia.",
    "estado": "Activo",
    "observaciones": "Datos extraídos de la plataforma de educación virtual institucional.",
    "esHistorico": false,
    "datasetName": "Asesorias_Disciplinares_Virtual",
    "datasetAbstract": "Registro de asesorías disciplinares en modalidad virtual. Similar al presencial pero con métricas de interacción digital.",
    "columns": [
      {"name": "id_asesoria", "type": "number", "description": "Identificador único de la asesoría"},
      {"name": "codigo_estudiante", "type": "text", "description": "Código institucional del estudiante"},
      {"name": "programa_academico", "type": "text", "description": "Nombre del programa académico"},
      {"name": "periodo_academico", "type": "text", "description": "Periodo en formato AAAA-P"},
      {"name": "asignatura_virtual", "type": "text", "description": "Nombre de la asignatura o espacio virtual"},
      {"name": "fecha_asesoria", "type": "date", "description": "Fecha de la asesoría"},
      {"name": "tipo_interaccion", "type": "text", "description": "Foro / Chat / Videoconferencia"},
      {"name": "duracion_sesion_minutos", "type": "number", "description": "Duración en minutos"},
      {"name": "estado", "type": "text", "description": "Solicitada / Atendida / Cerrada"}
    ],
    "datasetSource": "LMS Institucional (Moodle/Canvas) - Módulo de tutorías",
    "datasetNotes": "Actualización semanal. Incluye análisis de tiempos de respuesta del tutor."
  },
  {
    "id": 10,
    "titulo": "Asesor Disciplinar V2",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzM4YTllZGUtOGQ1Yy00MWQ5LWFkN2UtNWFhMmViY2MxZTVkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma Virtual",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Versión mejorada del tablero de Asesor Disciplinar para programas virtuales, con métricas ampliadas de interacción y seguimiento.",
    "estado": "Activo",
    "observaciones": "Incluye análisis de interacciones en foros, chats y videoconferencias.",
    "esHistorico": false,
    "datasetName": "Asesorias_Disciplinares_Virtual_V2",
    "datasetAbstract": "Versión extendida del dataset de asesorías virtuales, con mayor granularidad en las interacciones y seguimiento.",
    "columns": [
      {"name": "id_interaccion", "type": "number", "description": "Identificador único de la interacción"},
      {"name": "id_asesoria", "type": "number", "description": "ID de la asesoría a la que pertenece"},
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "codigo_tutor", "type": "text", "description": "Código del tutor"},
      {"name": "asignatura_virtual", "type": "text", "description": "Espacio virtual de la asignatura"},
      {"name": "tipo_interaccion", "type": "text", "description": "Foro / Mensaje Directo / Tarea / Videoconferencia"},
      {"name": "fecha_interaccion", "type": "date", "description": "Fecha y hora de la interacción"},
      {"name": "contenido_analizado", "type": "text", "description": "Categoría del tema tratado (Ej. Conceptual, Procedimental)"},
      {"name": "tiempo_respuesta_tutor_horas", "type": "number", "description": "Tiempo que tardó el tutor en responder"}
    ],
    "datasetSource": "LMS Institucional y Plataforma de analíticas de aprendizaje",
    "datasetNotes": "Actualización diaria. Se utiliza para el monitoreo proactivo de la interacción tutorial."
  },
  {
    "id": 11,
    "titulo": "CAI Cátedra Generación Siglo 21",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNjQ3ODYwNzItZDRlMi00ZDljLTk1ODQtNjJlMGY1YTI2NTJjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma CAI",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Visualización de participación estudiantil en la cátedra institucional para programas de educación virtual.",
    "estado": "Activo",
    "observaciones": "Datos sincronizados con la plataforma CAI institucional.",
    "esHistorico": false,
    "datasetName": "CAI_Generacion_Siglo21_Virtual",
    "datasetAbstract": "Datos del tablero ID 2, filtrados y contextualizados para la modalidad virtual.",
    "columns": [
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "programa_virtual", "type": "text", "description": "Programa académico virtual"},
      {"name": "periodo", "type": "text", "description": "Periodo académico"},
      {"name": "modulo", "type": "text", "description": "Módulo de la cátedra cursado"},
      {"name": "interacciones_plataforma", "type": "number", "description": "Número de clics/vistas en el módulo"},
      {"name": "calificacion_final", "type": "number", "description": "Calificación final obtenida (0-5)"}
    ],
    "datasetSource": "Plataforma CAI - Base de datos académica (modalidad virtual)",
    "datasetNotes": "Actualización en tiempo real."
  },
  {
    "id": 12,
    "titulo": "CAI Cátedra Generación Siglo 21 V2",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWFkODZhODgtOTVmZi00ZTFhLTlmZjgtMDlhZjlhNjA0N2YwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma CAI",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Versión actualizada del tablero CAI Cátedra Generación Siglo 21 para modalidad virtual.",
    "estado": "Activo",
    "observaciones": "Incluye métricas de asistencia, participación y calificaciones.",
    "esHistorico": false,
    "datasetName": "CAI_GS21_Virtual_V2",
    "datasetAbstract": "Seguimiento integral de la Cátedra Generación Siglo 21 V2 con foco en entornos virtuales de aprendizaje.",
    "columns": [
      {"name": "id_estudiante", "type": "text", "description": "ID encriptado del estudiante"},
      {"name": "avance_contenidos", "type": "number", "description": "Porcentaje de contenidos visualizados"},
      {"name": "participacion_foros", "type": "number", "description": "Cantidad de aportes en foros de discusión"},
      {"name": "nota_parcial", "type": "number", "description": "Calificación acumulada del corte"},
      {"name": "tiempo_plataforma", "type": "number", "description": "Horas totales dedicadas en el aula virtual"},
      {"name": "ultimo_acceso", "type": "date", "description": "Fecha del último ingreso al curso"}
    ],
    "datasetSource": "Moodle Analytics / Reportes CAI",
    "datasetNotes": "Sincronización diaria a las 00:00 horas."
  },
  {
    "id": 13,
    "titulo": "CAI Viviendo el MEDIT",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZjdhZmFjYjEtZTUyMi00NzUwLTg0YzItMjEyYjgyNWZjYTBkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma CAI",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Dashboard de seguimiento de la cátedra Viviendo el MEDIT en modalidad virtual.",
    "estado": "Activo",
    "observaciones": "Refleja el compromiso estudiantil con el modelo educativo digital.",
    "esHistorico": false,
    "datasetName": "Viviendo_MEDIT_Virtual",
    "datasetAbstract": "Indicadores de apropiación del Modelo Educativo Digital Transmoderno en estudiantes virtuales.",
    "columns": [
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante"},
      {"name": "nivel_apropiacion", "type": "text", "description": "Bajo / Medio / Alto basado en cuestionarios"},
      {"name": "modulo_actual", "type": "text", "description": "Módulo temático en curso"},
      {"name": "actividades_gamificadas", "type": "number", "description": "Puntos obtenidos en actividades lúdicas"},
      {"name": "estado_curso", "type": "text", "description": "En progreso / Finalizado"}
    ],
    "datasetSource": "Plataforma CAI",
    "datasetNotes": "Los niveles de apropiación se calculan mediante algoritmo interno."
  },
  {
    "id": 14,
    "titulo": "Campo Multidimensional de Aprendizaje (CMA)",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzdlYjNhNDAtYzQzOC00ZmRhLTk5NTktNWQ2YzA4NGI5YTc0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - CMA",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Análisis del avance de estudiantes en modalidad virtual en los Campos Multidimensionales de Aprendizaje.",
    "estado": "Activo",
    "observaciones": "Incluye métricas específicas para entornos de aprendizaje virtual.",
    "esHistorico": false,
    "datasetName": "CMA_Virtual",
    "datasetAbstract": "Desempeño en campos multidimensionales adaptados a metodologías virtuales.",
    "columns": [
      {"name": "id_campo", "type": "text", "description": "Identificador del campo de aprendizaje"},
      {"name": "estudiante_virtual", "type": "text", "description": "ID Estudiante"},
      {"name": "interaccion_recursos", "type": "number", "description": "Cantidad de recursos digitales consultados"},
      {"name": "entregables_cargados", "type": "number", "description": "Archivos subidos a plataforma"},
      {"name": "retroalimentacion_recibida", "type": "text", "description": "Si / No (Feedback del tutor)"},
      {"name": "calificacion_final", "type": "number", "description": "Nota final del campo"}
    ],
    "datasetSource": "LMS y Sistema Académico",
    "datasetNotes": "Incluye trazabilidad de recursos educativos digitales."
  },
  {
    "id": 15,
    "titulo": "Campo Multidimensional de Aprendizaje (CMA) - Posgrados",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiY2RiZTJjMzktNGVhOC00YmZhLWFkNzItNTUzOTlhZTYyNTc4IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - CMA",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Tablero especializado para el seguimiento del CMA en programas de posgrado virtual.",
    "estado": "Activo",
    "observaciones": "Datos actualizados por cohorte de posgrado.",
    "esHistorico": false,
    "datasetName": "Rendimiento_CMA_Posgrados",
    "datasetAbstract": "Seguimiento del avance en CMA para estudiantes de posgrado en modalidad virtual.",
    "columns": [
      {"name": "codigo_estudiante_posgrado", "type": "text", "description": "Código del estudiante"},
      {"name": "programa_posgrado", "type": "text", "description": "Maestría o Especialización cursada"},
      {"name": "cohorte", "type": "text", "description": "Cohorte de ingreso"},
      {"name": "nombre_cma", "type": "text", "description": "Nombre del CMA"},
      {"name": "tipo_producto_cma", "type": "text", "description": "Tipo de producto final (Artículo, Pasantía, etc.)"},
      {"name": "estado_avance", "type": "text", "description": "Propuesta / En desarrollo / Finalizado"},
      {"name": "calificacion_producto", "type": "number", "description": "Calificación del producto final"}
    ],
    "datasetSource": "Sistema de Gestión de Posgrados y CMA",
    "datasetNotes": "Actualización semestral por cohorte."
  },
  {
    "id": 16,
    "titulo": "Cursos Autogestionados",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTBhNThkMTktNmU0OC00YmM5LTkyNDktNGFjMTA5NGFmNTdmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma Virtual",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Visualización de inscripciones, avance y finalización de cursos autogestionados ofrecidos por la universidad.",
    "estado": "Activo",
    "observaciones": "Incluye datos de cursos MOOC y microcredenciales digitales.",
    "esHistorico": false,
    "datasetName": "Participacion_Cursos_Autogestionados",
    "datasetAbstract": "Registro de la participación y finalización de estudiantes y público general en cursos abiertos y autogestionados.",
    "columns": [
      {"name": "id_curso", "type": "text", "description": "Identificador del curso"},
      {"name": "nombre_curso", "type": "text", "description": "Nombre del curso autogestionado"},
      {"name": "id_participante", "type": "text", "description": "Identificador del participante (estudiante o externo)"},
      {"name": "fecha_inscripcion", "type": "date", "description": "Fecha de inicio del curso"},
      {"name": "progreso_porcentaje", "type": "number", "description": "Porcentaje de avance en el curso"},
      {"name": "fecha_finalizacion", "type": "date", "description": "Fecha de finalización (si aplica)"},
      {"name": "certificado_emitido", "type": "text", "description": "Indica si se generó un certificado (Sí/No)"}
    ],
    "datasetSource": "Plataforma de Educación Continua (LMS)",
    "datasetNotes": "Actualización diaria. Abierto a la comunidad, no solo a estudiantes regulares."
  },
  {
    "id": 17,
    "titulo": "Diagnósticos y Nivelatorios - Informe",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZWQwOTI0ZDYtZTYxNC00MGFmLWE1OTUtNTM4MzViZDcwNDNkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Diagnósticos",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Reporte de diagnósticos y nivelatorios para estudiantes de modalidad virtual.",
    "estado": "Activo",
    "observaciones": "Permite estrategias de refuerzo adaptadas a la virtualidad.",
    "esHistorico": false,
    "datasetName": "Diagnosticos_Virtual",
    "datasetAbstract": "Resultados de pruebas de entrada para estudiantes de programas virtuales.",
    "columns": [
      {"name": "programa", "type": "text", "description": "Programa académico"},
      {"name": "competencia_digital", "type": "number", "description": "Puntaje en habilidades digitales"},
      {"name": "competencia_lectora", "type": "number", "description": "Puntaje en lectura crítica"},
      {"name": "requiere_refuerzo", "type": "text", "description": "Áreas sugeridas para nivelación"},
      {"name": "estado_nivelatorio", "type": "text", "description": "Inscrito / Completado"}
    ],
    "datasetSource": "Sistema de Pruebas Institucional",
    "datasetNotes": "Énfasis en competencias digitales previas."
  },
  {
    "id": 18,
    "titulo": "Graduados UCundinamarca",
    "area": "Graduados",
    "macroproceso": "Misional",
    "subproceso": "Graduados",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZjZkZmQ1MzUtMjA4Yy00OTIzLWE5N2QtMmU4NTE1Y2UwMWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Graduados - SNIES",
    "elaboradoPor": "Oficina de Graduados",
    "descripcion": "Dashboard con estadísticas de graduados: ubicación laboral, nivel de ingresos, sector de empleo y satisfacción.",
    "estado": "Activo",
    "observaciones": "Datos recopilados mediante encuestas a graduados y cruces con el SNIES.",
    "esHistorico": false,
    "datasetName": "Seguimiento_Graduados",
    "datasetAbstract": "Información sociodemográfica y laboral de los graduados, obtenida a través de encuestas de seguimiento y fuentes externas.",
    "columns": [
      {"name": "documento_graduado", "type": "text", "description": "Número de identificación del graduado (anonimizado)"},
      {"name": "programa_graduado", "type": "text", "description": "Programa del cual se graduó"},
      {"name": "anio_graduacion", "type": "number", "description": "Año de obtención del título"},
      {"name": "sector_laboral", "type": "text", "description": "Sector económico donde trabaja (Ej. Público, Privado, Educación)"},
      {"name": "tipo_contrato", "type": "text", "description": "Modalidad de contratación (Indefinido, Fijo, Prestación de servicios)"},
      {"name": "rango_salarial", "type": "text", "description": "Rango de ingresos mensuales"},
      {"name": "ciudad_residencia", "type": "text", "description": "Ciudad actual de residencia"},
      {"name": "fecha_seguimiento", "type": "date", "description": "Fecha de la última encuesta o actualización"}
    ],
    "datasetSource": "Sistema de Egresados y Graduados (SEG) y Observatorio Laboral del MEN",
    "datasetNotes": "Los datos se actualizan anualmente. La tasa de respuesta de la encuesta puede afectar la representatividad."
  },
  {
    "id": 19,
    "titulo": "Informe Final",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzdiN2I2ZWQtOWY4ZS00MWJiLWIyODUtZTViY2Q0ZTc3NDc2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Informe consolidado de resultados académicos finales para programas virtuales.",
    "estado": "Activo",
    "observaciones": "Generado al cierre de cada periodo académico.",
    "esHistorico": false,
    "datasetName": "Informe_Final_Virtual",
    "datasetAbstract": "Consolidado de aprobación, reprobación y promedios finales por periodo.",
    "columns": [
      {"name": "periodo", "type": "text", "description": "Periodo Académico"},
      {"name": "programa", "type": "text", "description": "Programa Virtual"},
      {"name": "total_matriculados", "type": "number", "description": "Estudiantes activos"},
      {"name": "tasa_aprobacion", "type": "number", "description": "Porcentaje de estudiantes que aprobaron todas las asignaturas"},
      {"name": "promedio_global", "type": "number", "description": "Promedio de notas del programa"}
    ],
    "datasetSource": "Sistema Académico",
    "datasetNotes": "Cierre oficial de notas."
  },
  {
    "id": 20,
    "titulo": "Ingresos a Campo Multidimensional de Aprendizaje",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMDNjYzVmNjYtYzI4OS00NGEwLWJlNDgtODMzY2M2ZDMzY2Q2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - CMA",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Visualización de inscripciones al CMA en modalidad virtual.",
    "estado": "Activo",
    "observaciones": "Datos actualizados al inicio de cada periodo académico.",
    "esHistorico": false,
    "datasetName": "Ingresos_CMA_Virtual",
    "datasetAbstract": "Estadísticas de matrícula e inscripción a CMAs virtuales.",
    "columns": [
      {"name": "cma_nombre", "type": "text", "description": "Nombre del campo"},
      {"name": "cupos_disponibles", "type": "number", "description": "Capacidad total"},
      {"name": "inscritos", "type": "number", "description": "Estudiantes matriculados"},
      {"name": "lista_espera", "type": "number", "description": "Estudiantes en espera"},
      {"name": "fecha_corte", "type": "date", "description": "Fecha de actualización del reporte"}
    ],
    "datasetSource": "Sistema de Matrícula",
    "datasetNotes": "Monitoreo de cobertura."
  },
  {
    "id": 21,
    "titulo": "Insignias Digitales",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYWQ1MmJiNzQtNzJkZS00MzYzLTg4YWEtMjFjOTAxNDMzYWJjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma de Insignias",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Tablero de seguimiento de obtención de insignias digitales por competencias adquiridas.",
    "estado": "Activo",
    "observaciones": "Incluye clasificación por tipo de competencia y programa académico.",
    "esHistorico": false,
    "datasetName": "Emision_Insignias_Digitales",
    "datasetAbstract": "Registro de todas las insignias digitales emitidas por la universidad, asociadas a competencias específicas.",
    "columns": [
      {"name": "id_insignia", "type": "text", "description": "Identificador único de la insignia emitida"},
      {"name": "nombre_insignia", "type": "text", "description": "Nombre de la insignia"},
      {"name": "codigo_estudiante", "type": "text", "description": "Código del estudiante que la recibió"},
      {"name": "competencia_acreditada", "type": "text", "description": "Competencia que certifica la insignia"},
      {"name": "fecha_emision", "type": "date", "description": "Fecha en que se otorgó la insignia"},
      {"name": "evento_asociado", "type": "text", "description": "Curso, taller o actividad que otorgó la insignia"},
      {"name": "plataforma_emision", "type": "text", "description": "Plataforma donde se aloja la insignia (Ej. Credly, Badgr)"}
    ],
    "datasetSource": "Plataforma de Gestión de Credenciales Digitales",
    "datasetNotes": "Actualización en tiempo real a medida que se emiten las insignias."
  },
  {
    "id": 22,
    "titulo": "Inventario de Recursos Educativos Digitales",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiN2JlODU1MGQtM2FiNi00NWU4LWI1YjItNWVmMGZlMmNlM2I5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Repositorio Institucional",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Catálogo visual de recursos educativos digitales disponibles para estudiantes y docentes.",
    "estado": "Activo",
    "observaciones": "Actualizado continuamente con nuevos recursos y materiales didácticos.",
    "esHistorico": false,
    "datasetName": "Repositorio_Recursos_Educativos_Digitales",
    "datasetAbstract": "Inventario y clasificación de los Recursos Educativos Digitales (RED) disponibles en el repositorio institucional.",
    "columns": [
      {"name": "id_recurso", "type": "text", "description": "Identificador único del recurso"},
      {"name": "titulo_recurso", "type": "text", "description": "Nombre del RED"},
      {"name": "tipo_recurso", "type": "text", "description": "Formato del recurso (Video, PDF, Interactivo, Simulación)"},
      {"name": "area_conocimiento", "type": "text", "description": "Área de conocimiento a la que pertenece"},
      {"name": "autor", "type": "text", "description": "Autor o creador del recurso"},
      {"name": "fecha_publicacion", "type": "date", "description": "Fecha de publicación en el repositorio"},
      {"name": "numero_descargas", "type": "number", "description": "Cantidad de veces que ha sido descargado o accedido"},
      {"name": "licencia_uso", "type": "text", "description": "Tipo de licencia (Ej. Creative Commons)"}
    ],
    "datasetSource": "Repositorio Institucional Digital",
    "datasetNotes": "Actualización mensual con los nuevos recursos catalogados."
  },
  {
    "id": 23,
    "titulo": "Monitorías",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjdlNTVkNmItMDMwZi00ZjlkLWJhNzktNWYwMWQyYWY4MGFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Monitorías",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Estadísticas de monitorías académicas virtuales: asignación, asistencia y efectividad.",
    "estado": "Activo",
    "observaciones": "Incluye datos por programa académico y asignatura.",
    "esHistorico": false,
    "datasetName": "Monitorias_Virtuales",
    "datasetAbstract": "Gestión de monitorías realizadas a través de medios digitales.",
    "columns": [
      {"name": "asignatura", "type": "text", "description": "Asignatura apoyada"},
      {"name": "monitor", "type": "text", "description": "Estudiante monitor"},
      {"name": "horas_sincronicas", "type": "number", "description": "Horas de encuentro en vivo"},
      {"name": "atencion_asincronica", "type": "number", "description": "Respuestas en foros/correo"},
      {"name": "estudiantes_atendidos", "type": "number", "description": "Total beneficiarios únicos"},
      {"name": "calificacion_servicio", "type": "number", "description": "Promedio encuestas satisfacción"}
    ],
    "datasetSource": "Registro de Monitorías Virtuales",
    "datasetNotes": "Corte semanal."
  },
  {
    "id": 24,
    "titulo": "Posgrados",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjFiNDQ4ODQtMWE4Mi00YjFmLWJiOTYtYWU1MGViNjQzOWI1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Tablero con indicadores de programas de posgrado virtual: matrículas, deserción, graduación.",
    "estado": "Activo",
    "observaciones": "Datos consolidados por cohorte y programa de posgrado.",
    "esHistorico": false,
    "datasetName": "Indicadores_Posgrados_Virtuales",
    "datasetAbstract": "Indicadores clave de gestión académica para los programas de posgrado en modalidad virtual.",
    "columns": [
      {"name": "programa_posgrado", "type": "text", "description": "Nombre de la especialización o maestría"},
      {"name": "cohorte", "type": "text", "description": "Cohorte de ingreso"},
      {"name": "numero_admitidos", "type": "number", "description": "Total de estudiantes admitidos en la cohorte"},
      {"name": "numero_matriculados", "type": "number", "description": "Total de estudiantes que formalizaron matrícula"},
      {"name": "tasa_desercion_periodo", "type": "number", "description": "Porcentaje de deserción en el último periodo"},
      {"name": "promedio_academico_cohorte", "type": "number", "description": "Promedio de notas de la cohorte"},
      {"name": "numero_graduados", "type": "number", "description": "Total de graduados de la cohorte hasta la fecha"},
      {"name": "tiempo_promedio_graduacion_meses", "type": "number", "description": "Tiempo promedio en meses para graduarse"}
    ],
    "datasetSource": "Sistema de Gestión de Posgrados",
    "datasetNotes": "Actualización semestral. Los datos son consolidados por cohorte para seguimiento longitudinal."
  },
  {
    "id": 25,
    "titulo": "Tránsito de la Educación Media a la Educación Superior",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Admisiones y Registro",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiN2IwOWQ0MTAtZjY1Mi00YmRjLTg2MmItYTJlYmZjZDk1YjY1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "SNIES - ICFES",
    "elaboradoPor": "Oficina de Educación Virtual",
    "descripcion": "Análisis del perfil de ingreso de estudiantes nuevos en programas virtuales.",
    "estado": "Activo",
    "observaciones": "Incluye caracterización sociodemográfica y resultados de pruebas ICFES.",
    "esHistorico": false,
    "datasetName": "Transito_Media_Superior_Virtual",
    "datasetAbstract": "Perfil de ingreso de estudiantes virtuales, origen geográfico y antecedentes académicos.",
    "columns": [
      {"name": "departamento_origen", "type": "text", "description": "Departamento de procedencia"},
      {"name": "municipio_origen", "type": "text", "description": "Municipio de procedencia"},
      {"name": "puntaje_saber11", "type": "number", "description": "Puntaje global ICFES"},
      {"name": "conectividad_hogar", "type": "text", "description": "Tipo de conexión a internet reportada"},
      {"name": "dispositivo_principal", "type": "text", "description": "PC / Laptop / Tablet / Móvil"}
    ],
    "datasetSource": "Encuesta de Caracterización de Ingreso",
    "datasetNotes": "Datos clave para cerrar brechas digitales."
  },

  // ==========================================================================================
  // MACROPROCESO ESTRATÉGICO Y DE APOYO - GESTIÓN ADMINISTRATIVA
  // ==========================================================================================
  {
    "id": 26,
    "titulo": "Indicadores del Sistema de Gestión Ambiental",
    "area": "Sistema de Gestión Ambiental",
    "macroproceso": "Estratégico",
    "subproceso": "Sistemas Integrados",
    "rol": "Administrativo",
    "url": "https://www.ucundinamarca.edu.co/index.php/servicios2022/sistema-de-gestion-ambiental",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Gestión Ambiental",
    "elaboradoPor": "Coordinación SGA",
    "descripcion": "Dashboard de indicadores de desempeño ambiental, incluyendo consumo de recursos, residuos y cumplimiento normativo.",
    "estado": "Activo",
    "observaciones": "Actualizado mensualmente con datos de todas las sedes de la universidad.",
    "esHistorico": false,
    "datasetName": "Indicadores_SGA",
    "datasetAbstract": "Mediciones de impacto ambiental de la universidad, incluyendo consumo de agua, energía y generación de residuos.",
    "columns": [
      {"name": "sede", "type": "text", "description": "Sede o unidad regional de la medición"},
      {"name": "periodo_medicion", "type": "text", "description": "Mes y año del registro (YYYY-MM)"},
      {"name": "consumo_agua_m3", "type": "number", "description": "Consumo de agua en metros cúbicos"},
      {"name": "consumo_energia_kwh", "type": "number", "description": "Consumo de energía eléctrica en kilovatios-hora"},
      {"name": "residuos_aprovechables_kg", "type": "number", "description": "Peso en kg de residuos reciclables generados"},
      {"name": "residuos_ordinarios_kg", "type": "number", "description": "Peso en kg de residuos no aprovechables"},
      {"name": "huella_carbono_ton_co2", "type": "number", "description": "Estimación de la huella de carbono en toneladas de CO2 equivalente"}
    ],
    "datasetSource": "Sistema de Gestión Ambiental (SGA) - Registros de servicios públicos y gestores de residuos",
    "datasetNotes": "Actualización mensual. La huella de carbono se calcula trimestralmente."
  },
  {
    "id": 27,
    "titulo": "Procesos de Contratación",
    "area": "Oficina de Compras",
    "macroproceso": "Apoyo",
    "subproceso": "Bienes y Servicios",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZTJkYjJlNmYtZjY3MC00Y2YxLWI2YzctNzNmMTUyYTlkNGU3IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Contratación - SECOP",
    "elaboradoPor": "Oficina de Compras",
    "descripcion": "Visualización de procesos de contratación: estados, montos, proveedores y tiempos de ejecución.",
    "estado": "Activo",
    "observaciones": "Sincronizado con el sistema SECOP para garantizar transparencia.",
    "esHistorico": false,
    "datasetName": "Procesos_Contratacion",
    "datasetAbstract": "Seguimiento detallado de procesos contractuales institucionales con estados, montos y proveedores.",
    "columns": [
      {"name": "numero_proceso", "type": "text", "description": "Identificador único del proceso"},
      {"name": "tipo_proceso", "type": "text", "description": "Licitación / Contratación directa / Menor cuantía"},
      {"name": "objeto_contrato", "type": "text", "description": "Descripción del objeto a contratar"},
      {"name": "valor_contrato", "type": "number", "description": "Valor en pesos colombianos"},
      {"name": "fecha_publicacion", "type": "date", "description": "Fecha de publicación en SECOP"},
      {"name": "fecha_adjudicacion", "type": "date", "description": "Fecha de adjudicación del contrato"},
      {"name": "proveedor", "type": "text", "description": "Razón social del proveedor adjudicado"},
      {"name": "estado", "type": "text", "description": "En curso / Adjudicado / Finalizado / Desierto"},
      {"name": "dependencia_solicitante", "type": "text", "description": "Dependencia que solicita el servicio"}
    ],
    "datasetSource": "Sistema de Contratación Institucional - SECOP II",
    "datasetNotes": "Sincronización diaria con SECOP. Históricos desde 2019."
  },
  {
    "id": 28,
    "titulo": "Tablero General de Indicadores",
    "area": "Control Interno",
    "macroproceso": "Seguimiento",
    "subproceso": "Control Interno",
    "rol": "Administrativo",
    "url": "https://www.ucundinamarca.edu.co/index.php/control-interno",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Control Interno",
    "elaboradoPor": "Oficina de Control Interno",
    "descripcion": "Dashboard consolidado de indicadores de control interno institucional, riesgos y planes de mejoramiento.",
    "estado": "Activo",
    "observaciones": "Actualizado trimestralmente con reportes de todas las dependencias.",
    "esHistorico": false,
    "datasetName": "Indicadores_Control_Interno_MECI",
    "datasetAbstract": "Consolidado de indicadores del Modelo Estándar de Control Interno (MECI), incluyendo gestión de riesgos y auditorías.",
    "columns": [
      {"name": "componente_meci", "type": "text", "description": "Componente del MECI evaluado"},
      {"name": "id_indicador", "type": "text", "description": "Código del indicador"},
      {"name": "nombre_indicador", "type": "text", "description": "Nombre del indicador de gestión"},
      {"name": "meta", "type": "number", "description": "Valor meta para el periodo"},
      {"name": "resultado", "type": "number", "description": "Valor obtenido en el periodo"},
      {"name": "porcentaje_cumplimiento", "type": "number", "description": "Porcentaje de cumplimiento de la meta"},
      {"name": "fecha_medicion", "type": "date", "description": "Fecha del corte de la medición"},
      {"name": "riesgo_asociado", "type": "text", "description": "Principal riesgo institucional asociado al indicador"}
    ],
    "datasetSource": "Sistema de Gestión de Calidad y Control Interno",
    "datasetNotes": "Actualización trimestral. Utilizado para los informes de gestión y auditorías."
  },
  {
    "id": 29,
    "titulo": "Participación en Eventos de SGSI",
    "area": "Sistema de Gestión de Seguridad de la Información - SGSI",
    "macroproceso": "Estratégico",
    "subproceso": "Sistemas Integrados",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzAyMTE5MzktZWNhNS00ZmQ0LWFjNmMtYjNmNmE4ODViYTQ5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema SGSI",
    "elaboradoPor": "Coordinación SGSI",
    "descripcion": "Tablero de seguimiento de participación en capacitaciones y eventos de seguridad de la información.",
    "estado": "Activo",
    "observaciones": "Incluye métricas de asistencia, certificación y cumplimiento.",
    "esHistorico": false,
    "datasetName": "Capacitacion_SGSI",
    "datasetAbstract": "Registro de participación de funcionarios en capacitaciones y campañas de sensibilización del SGSI.",
    "columns": [
      {"name": "id_evento", "type": "text", "description": "ID del evento de capacitación"},
      {"name": "nombre_evento", "type": "text", "description": "Nombre de la capacitación o campaña"},
      {"name": "fecha_evento", "type": "date", "description": "Fecha de realización"},
      {"name": "tipo_evento", "type": "text", "description": "Capacitación / Simulación Phishing / Charla"},
      {"name": "id_participante", "type": "text", "description": "Identificación del funcionario"},
      {"name": "area_participante", "type": "text", "description": "Área a la que pertenece el funcionario"},
      {"name": "asistencia_confirmada", "type": "text", "description": "Sí / No"},
      {"name": "evaluacion_aprobada", "type": "text", "description": "Sí / No / No Aplica"}
    ],
    "datasetSource": "Plataforma de capacitación y registros de asistencia SGSI",
    "datasetNotes": "Actualización después de cada evento de sensibilización o capacitación."
  },
  {
    "id": 30,
    "titulo": "Tablero de Planes de Mejoramiento",
    "area": "Control Interno",
    "macroproceso": "Seguimiento",
    "subproceso": "Control Interno",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzBmNDk1MGYtZjJiYi00OTBlLWI4ZDMtMWVhZDFjMDc0ZGUxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Control Interno",
    "elaboradoPor": "Oficina de Control Interno",
    "descripcion": "Visualización del estado de avance de planes de mejoramiento derivados de auditorías y evaluaciones institucionales.","estado": "Activo",
    "observaciones": "Actualizado bimensualmente con reportes de áreas responsables.",
    "esHistorico": false,
    "datasetName": "Seguimiento_Planes_Mejoramiento",
    "datasetAbstract": "Seguimiento al estado y avance de los planes de mejoramiento derivados de hallazgos de auditoría.",
    "columns": [
      {"name": "id_plan", "type": "text", "description": "Identificador del plan de mejoramiento"},
      {"name": "origen_hallazgo", "type": "text", "description": "Auditoría interna / Contraloría / Autoevaluación"},
      {"name": "proceso_responsable", "type": "text", "description": "Proceso o área responsable de la ejecución"},
      {"name": "descripcion_hallazgo", "type": "text", "description": "Descripción del hallazgo que origina el plan"},
      {"name": "accion_propuesta", "type": "text", "description": "Acción correctiva o preventiva a implementar"},
      {"name": "fecha_limite", "type": "date", "description": "Fecha límite para la implementación"},
      {"name": "porcentaje_avance", "type": "number", "description": "Porcentaje de avance reportado"},
      {"name": "estado_plan", "type": "text", "description": "Abierto / En Progreso / Cerrado / Vencido"}
    ],
    "datasetSource": "Software de Gestión de Auditorías y Planes de Mejoramiento",
    "datasetNotes": "Actualización mensual basada en los reportes de los líderes de proceso."
  },
  {
    "id": 31,
    "titulo": "Seguimiento de Proyectos",
    "area": "Dirección de Investigación",
    "macroproceso": "Misional",
    "subproceso": "Ciencia, Tecnología e Innovación",
    "rol": "Administrativo",
    "url": "https://www.ucundinamarca.edu.co/investigacion/index.php/proyectos",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Investigación",
    "elaboradoPor": "Dirección de Investigación",
    "descripcion": "Dashboard de seguimiento de proyectos de investigación: estados, financiación, productos y avances.",
    "estado": "Activo",
    "observaciones": "Incluye proyectos financiados interna y externamente.",
    "esHistorico": false,
    "datasetName": "Gestion_Proyectos_Investigacion",
    "datasetAbstract": "Información consolidada de los proyectos de investigación, desde su propuesta hasta su finalización y productos derivados.",
    "columns": [
      {"name": "codigo_proyecto", "type": "text", "description": "Código único del proyecto"},
      {"name": "titulo_proyecto", "type": "text", "description": "Nombre del proyecto"},
      {"name": "investigador_principal", "type": "text", "description": "Nombre del líder del proyecto"},
      {"name": "grupo_investigacion", "type": "text", "description": "Grupo de investigación asociado"},
      {"name": "fuente_financiacion", "type": "text", "description": "Interna / Externa (Minciencias, etc.)"},
      {"name": "presupuesto_asignado", "type": "number", "description": "Monto total del presupuesto en COP"},
      {"name": "fecha_inicio", "type": "date", "description": "Fecha de inicio del proyecto"},
      {"name": "fecha_fin", "type": "date", "description": "Fecha de finalización programada"},
      {"name": "estado_proyecto", "type": "text", "description": "Propuesta / Activo / Finalizado"},
      {"name": "productos_generados", "type": "number", "description": "Cantidad de productos (artículos, ponencias, etc.)"}
    ],
    "datasetSource": "Sistema de Información de la Investigación (HERMES/GRI)",
    "datasetNotes": "Actualización trimestral con el avance de los proyectos."
  },
  {
    "id": 32,
    "titulo": "Ejecución Activa",
    "area": "Vicerrectoría Administrativa y Financiera",
    "macroproceso": "Apoyo",
    "subproceso": "Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiM2UzMWM0ODEtYmMwNC00NzUzLWEyM2YtOThiMzAwZjZmMzRlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Financiero SAP",
    "elaboradoPor": "Vicerrectoría Administrativa",
    "descripcion": "Tablero de ejecución presupuestal de ingresos (activa) con análisis por fuente y periodo.",
    "estado": "Activo",
    "observaciones": "Datos actualizados mensualmente desde el sistema SAP.",
    "esHistorico": false,
    "datasetName": "Ejecucion_Presupuestal_Ingresos",
    "datasetAbstract": "Seguimiento de la ejecución del presupuesto de ingresos, comparando lo recaudado frente a lo proyectado.",
    "columns": [
      {"name": "rubro_ingreso", "type": "text", "description": "Concepto del ingreso (Matrículas, Transferencias, etc.)"},
      {"name": "fuente_financiacion", "type": "text", "description": "Fuente de los recursos (Nación, Propios, etc.)"},
      {"name": "presupuesto_apropiado", "type": "number", "description": "Valor presupuestado para el rubro en la vigencia"},
      {"name": "recaudo_acumulado", "type": "number", "description": "Valor total recaudado a la fecha de corte"},
      {"name": "porcentaje_ejecucion", "type": "number", "description": "Porcentaje del recaudo frente a lo apropiado"},
      {"name": "fecha_corte", "type": "date", "description": "Fecha de corte de los datos"},
      {"name": "dependencia_recaudadora", "type": "text", "description": "Oficina que gestiona el recaudo"}
    ],
    "datasetSource": "Sistema Integrado de Información Financiera (SAP - Módulo FI/PSM)",
    "datasetNotes": "Actualización mensual con cierre al último día del mes anterior."
  },
  {
    "id": 33,
    "titulo": "Ejecución Pasiva",
    "area": "Vicerrectoría Administrativa y Financiera",
    "macroproceso": "Apoyo",
    "subproceso": "Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWE4NGI1N2EtNGY2OC00MmMyLTkzMjMtYWUxZjA5OTk2ZGVhIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Financiero SAP",
    "elaboradoPor": "Vicerrectoría Administrativa",
    "descripcion": "Tablero de ejecución presupuestal de egresos (pasiva) con análisis por rubro y dependencia.",
    "estado": "Activo",
    "observaciones": "Actualizado mensualmente con datos del sistema financiero SAP.",
    "esHistorico": false,
    "datasetName": "Ejecucion_Presupuestal_Gastos",
    "datasetAbstract": "Seguimiento de la ejecución del presupuesto de gastos, detallando compromisos, obligaciones y pagos.",
    "columns": [
      {"name": "rubro_gasto", "type": "text", "description": "Concepto del gasto (Servicios Personales, Gastos Generales, etc.)"},
      {"name": "dependencia_ejecutora", "type": "text", "description": "Dependencia que ordena el gasto"},
      {"name": "presupuesto_apropiado", "type": "number", "description": "Valor presupuestado para el rubro"},
      {"name": "valor_comprometido", "type": "number", "description": "Valor de los contratos y compromisos adquiridos"},
      {"name": "valor_obligado", "type": "number", "description": "Valor de las obligaciones causadas (bienes/servicios recibidos)"},
      {"name": "valor_pagado", "type": "number", "description": "Valor total pagado a la fecha de corte"},
      {"name": "porcentaje_ejecucion_pago", "type": "number", "description": "Porcentaje pagado frente a lo apropiado"},
      {"name": "fecha_corte", "type": "date", "description": "Fecha de corte de los datos"}
    ],
    "datasetSource": "Sistema Integrado de Información Financiera (SAP - Módulo FI/PSM)",
    "datasetNotes": "Actualización mensual con cierre al último día del mes anterior."
  },
  {
    "id": 34,
    "titulo": "Planes de Mejoramiento",
    "area": "Vicerrectoría Administrativa y Financiera",
    "macroproceso": "Apoyo",
    "subproceso": "Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYjFhMTE5MjgtZjRmZS00ZDQzLWE3ZTktNjMyZDdiNjRhODlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Mejoramiento",
    "elaboradoPor": "Vicerrectoría Administrativa",
    "descripcion": "Seguimiento de planes de mejoramiento del área administrativa y financiera.",
    "estado": "Activo",
    "observaciones": "Incluye acciones derivadas de auditorías internas y externas.",
    "esHistorico": false,
    "datasetName": "Planes_Mejoramiento_VAF",
    "datasetAbstract": "Estado de las acciones correctivas y preventivas asignadas a la Vicerrectoría Administrativa.",
    "columns": [
      {"name": "id_accion", "type": "text", "description": "ID de la acción de mejora"},
      {"name": "tipo_auditoria", "type": "text", "description": "Fuente del hallazgo"},
      {"name": "descripcion_accion", "type": "text", "description": "Detalle de la tarea a realizar"},
      {"name": "responsable", "type": "text", "description": "Funcionario a cargo"},
      {"name": "porcentaje_avance", "type": "number", "description": "Progreso reportado"},
      {"name": "evidencia_cargada", "type": "text", "description": "Enlace a soporte documental"}
    ],
    "datasetSource": "Suite de Gestión de Calidad",
    "datasetNotes": "Seguimiento a compromisos con entes de control."
  },
  {
    "id": 35,
    "titulo": "Plan Mensual de Contratación",
    "area": "Vicerrectoría Administrativa y Financiera",
    "macroproceso": "Apoyo",
    "subproceso": "Bienes y Servicios",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZmNkOWQ1MTItOTM0Yy00YjgyLWFkNGYtNzEwNjBmNzM3YWM2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05N77mLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Contratación",
    "elaboradoPor": "Vicerrectoría Administrativa",
    "descripcion": "Visualización del plan mensual de contratación con proyecciones y avances de procesos.",
    "estado": "Activo",
    "observaciones": "Actualizado al inicio de cada mes con las necesidades de contratación institucional.",
    "esHistorico": false,
    "datasetName": "Plan_Adquisiciones_Mensual",
    "datasetAbstract": "Programación y seguimiento de la ejecución del Plan Anual de Adquisiciones (PAA) mes a mes.",
    "columns": [
      {"name": "mes_proyectado", "type": "text", "description": "Mes de inicio del proceso"},
      {"name": "codigo_unspsc", "type": "text", "description": "Clasificador de bienes y servicios"},
      {"name": "descripcion_necesidad", "type": "text", "description": "Objeto a contratar"},
      {"name": "valor_estimado", "type": "number", "description": "Presupuesto asignado"},
      {"name": "modalidad_seleccion", "type": "text", "description": "Mecanismo de contratación"},
      {"name": "estado_solicitud", "type": "text", "description": "En trámite / Publicado / Contratado"}
    ],
    "datasetSource": "Sistema PAA",
    "datasetNotes": "Herramienta de planeación contractual."
  },
  {
    "id": 36,
    "titulo": "Conexión Líneas de Profundización Pregrado-Posgrados",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTBmN2M3YjctOGFiMS00OWYyLWJkNGYtOWVkM2VjNDgyZDIxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - SNIES",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Análisis de articulación entre líneas de profundización de pregrado y programas de posgrado.",
    "estado": "Activo",
    "observaciones": "Permite identificar rutas académicas y oportunidades de articulación.",
    "esHistorico": false,
    "datasetName": "Articulacion_Pregrado_Posgrado",
    "datasetAbstract": "Matriz de correspondencia entre asignaturas electivas de pregrado y contenidos de posgrados.",
    "columns": [
      {"name": "programa_pregrado", "type": "text", "description": "Carrera base"},
      {"name": "linea_profundizacion", "type": "text", "description": "Énfasis electivo"},
      {"name": "posgrado_destino", "type": "text", "description": "Especialización/Maestría afín"},
      {"name": "creditos_homologables", "type": "number", "description": "Posibles créditos a reconocer"},
      {"name": "estudiantes_potenciales", "type": "number", "description": "Alumnos cursando la línea"}
    ],
    "datasetSource": "Comités Curriculares",
    "datasetNotes": "Insumo para estrategias de continuidad académica."
  },
  {
    "id": 37,
    "titulo": "Perfil de Estudiantes IDEP",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMGE4MjRlOWUtMDM5MC00YmFlLWJlYTEtZTgxNGUzOGVmYTIwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Caracterización de estudiantes del Instituto de Posgrados: perfil demográfico, académico y profesional.",
    "estado": "Activo",
    "observaciones": "Datos actualizados por cohorte de ingreso.",
    "esHistorico": false,
    "datasetName": "Caracterizacion_Posgrados",
    "datasetAbstract": "Datos demográficos y profesionales de estudiantes de nivel posgradual.",
    "columns": [
      {"name": "programa", "type": "text", "description": "Programa de posgrado"},
      {"name": "edad_promedio", "type": "number", "description": "Media de edad de la cohorte"},
      {"name": "genero", "type": "text", "description": "Distribución por género"},
      {"name": "sector_laboral", "type": "text", "description": "Sector donde labora (Público/Privado)"},
      {"name": "pregrado_origen", "type": "text", "description": "Profesión base"},
      {"name": "lugar_residencia", "type": "text", "description": "Ciudad de origen"}
    ],
    "datasetSource": "Formulario de Inscripción",
    "datasetNotes": "Datos anonimizados."
  },
  {
    "id": 38,
    "titulo": "Encuesta de Satisfacción de Programas",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYjEyOTYyN2MtNmZhYy00YjAzLThjNDgtMmU3Yjg1OWM1ZTQwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Encuestas",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Resultados de encuestas de satisfacción aplicadas a estudiantes de programas de posgrado.",
    "estado": "Activo",
    "observaciones": "Aplicadas al finalizar cada periodo académico.",
    "esHistorico": false,
    "datasetName": "Satisfaccion_Posgrados",
    "datasetAbstract": "Percepción de los estudiantes sobre calidad académica, infraestructura y servicios.",
    "columns": [
      {"name": "programa", "type": "text", "description": "Programa evaluado"},
      {"name": "dimension", "type": "text", "description": "Aspecto (Docentes, Currículo, Administrativo)"},
      {"name": "pregunta", "type": "text", "description": "Ítem evaluado"},
      {"name": "promedio_calificacion", "type": "number", "description": "Puntaje medio (1-5)"},
      {"name": "nps", "type": "number", "description": "Net Promoter Score"}
    ],
    "datasetSource": "Sistema de Evaluación Institucional",
    "datasetNotes": "Aplicación semestral obligatoria."
  },
  {
    "id": 39,
    "titulo": "Reporte de Opciones de Grado",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiODJlMjM2MTctOWI4NS00NzBjLWE4NTYtNDQxNzdkNzRhMWVmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Estadísticas de opciones de grado seleccionadas por estudiantes de posgrado.",
    "estado": "Activo",
    "observaciones": "Incluye tiempos promedio de culminación por modalidad de grado.",
    "esHistorico": false,
    "datasetName": "Opciones_Grado_Posgrados",
    "datasetAbstract": "Distribución de estudiantes por modalidad de trabajo de grado seleccionada y estado de avance.",
    "columns": [
      {"name": "modalidad", "type": "text", "description": "Tesis / Monografía / Pasantía / Creación"},
      {"name": "programa", "type": "text", "description": "Posgrado asociado"},
      {"name": "estado_proyecto", "type": "text", "description": "Anteproyecto / Desarrollo / Sustentación"},
      {"name": "tiempo_desarrollo_meses", "type": "number", "description": "Duración promedio"},
      {"name": "tasa_aprobacion", "type": "number", "description": "% de aprobación en primera instancia"}
    ],
    "datasetSource": "Comités de Grado",
    "datasetNotes": "Seguimiento a la eficiencia terminal."
  },
  {
    "id": 40,
    "titulo": "Boletín Estadístico",
    "area": "Dirección de Planeación",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZTYyOWU0ZGQtNzUxNS00MTdjLTgxMTMtODRjNzc4NThkMTYxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Planeación - SNIES",
    "elaboradoPor": "Dirección de Planeación",
    "descripcion": "Boletín estadístico institucional con indicadores clave de desempeño académico y administrativo.",
    "estado": "Activo",
    "observaciones": "Publicado semestralmente con datos consolidados de la institución.",
    "esHistorico": false,
    "datasetName": "Boletin_Estadistico_Consolidado",
    "datasetAbstract": "Cifras oficiales de la universidad reportadas al MEN y SNIES.",
    "columns": [
      {"name": "periodo", "type": "text", "description": "Semestre reportado"},
      {"name": "indicador", "type": "text", "description": "Nombre del indicador (Ej. Población estudiantil)"},
      {"name": "valor_total", "type": "number", "description": "Cifra consolidada"},
      {"name": "desagregacion_sede", "type": "text", "description": "Dato por sede"},
      {"name": "variacion_anual", "type": "number", "description": "% cambio vs año anterior"}
    ],
    "datasetSource": "Oficina de Planeación",
    "datasetNotes": "Datos oficiales para rendición de cuentas."
  },
  {
    "id": 41,
    "titulo": "Deserción",
    "area": "Dirección de Planeación",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTY0MDk3MDAtZDIzMy00MTk3LThlZmItYzgyNzk3YWU3YjNhIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico - SPADIES",
    "elaboradoPor": "Dirección de Planeación",
    "descripcion": "Análisis de tasas de deserción estudiantil por programa, cohorte y factores asociados.",
    "estado": "Activo",
    "observaciones": "Sincronizado con el sistema SPADIES del Ministerio de Educación.",
    "esHistorico": false,
    "datasetName": "Analisis_Desercion_SPADIES",
    "datasetAbstract": "Tasas de deserción por periodo y cohorte, con análisis de causas probables.",
    "columns": [
      {"name": "programa", "type": "text", "description": "Programa académico"},
      {"name": "tasa_desercion_periodo", "type": "number", "description": "% estudiantes no matriculados vs periodo anterior"},
      {"name": "tasa_desercion_cohorte", "type": "number", "description": "% acumulado de la cohorte"},
      {"name": "causa_reportada", "type": "text", "description": "Económica / Académica / Vocacional"},
      {"name": "riesgo_asociado", "type": "text", "description": "Nivel de riesgo de la población"}
    ],
    "datasetSource": "SPADIES",
    "datasetNotes": "Información crítica para bienestar universitario."
  },
  {
    "id": 42,
    "titulo": "Calendario Institucional",
    "area": "Dirección de Planeación",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTQzMDgxODgtMTFkYS00YWU2LWE2NTAtMjI0OTFiMTBmNWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Planeación",
    "elaboradoPor": "Dirección de Planeación",
    "descripcion": "Visualización interactiva del calendario académico y administrativo institucional.",
    "estado": "Activo",
    "observaciones": "Actualizado al inicio de cada vigencia académica.",
    "esHistorico": false,
    "datasetName": "Calendario_Actividades",
    "datasetAbstract": "Programación de hitos académicos y administrativos del año en curso.",
    "columns": [
      {"name": "actividad", "type": "text", "description": "Nombre del evento/hito"},
      {"name": "tipo", "type": "text", "description": "Académico / Administrativo / Financiero"},
      {"name": "fecha_inicio", "type": "date", "description": "Inicio programado"},
      {"name": "fecha_fin", "type": "date", "description": "Fin programado"},
      {"name": "responsable", "type": "text", "description": "Dependencia encargada"},
      {"name": "estado_ejecucion", "type": "text", "description": "Pendiente / En curso / Realizado"}
    ],
    "datasetSource": "Consejo Académico",
    "datasetNotes": "Base para la programación de todas las áreas."
  },
  {
    "id": 43,
    "titulo": "CAI Encuentros Dialógicos y Formativos",
    "area": "Dirección de Planeación",
    "macroproceso": "Estratégico",
    "subproceso": "Direccionamiento Estratégico",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjFlYmIzOTUtMDcyMy00MGNiLTllZjktNTY2ZjM2ZjgxMmVlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma CAI",
    "elaboradoPor": "Dirección de Planeación",
    "descripcion": "Seguimiento de encuentros dialógicos y formativos institucionales con indicadores de participación.",
    "estado": "Activo",
    "observaciones": "Incluye eventos de formación docente y administrativa.",
    "esHistorico": false,
    "datasetName": "Encuentros_CAI",
    "datasetAbstract": "Registro de espacios de diálogo y formación estratégica institucional.",
    "columns": [
      {"name": "nombre_evento", "type": "text", "description": "Título del encuentro"},
      {"name": "fecha", "type": "date", "description": "Fecha de realización"},
      {"name": "sede", "type": "text", "description": "Lugar o modalidad"},
      {"name": "asistentes_presenciales", "type": "number", "description": "Conteo físico"},
      {"name": "asistentes_virtuales", "type": "number", "description": "Conectados streaming"},
      {"name": "tematicas_abordadas", "type": "text", "description": "Ejes centrales de discusión"}
    ],
    "datasetSource": "Registros de Asistencia",
    "datasetNotes": "Medición de impacto en la comunidad universitaria."
  },
  {
    "id": 44,
    "titulo": "Experiencia de Aprendizaje Online",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWZiOWUyMjktODBiNi00ODRjLWJlNTUtOGE2ODA4NTM0NjljIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Plataforma de Aprendizaje",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Métricas de experiencia de usuario en plataformas de aprendizaje online: accesos, tiempos de uso y satisfacción.",
    "estado": "Activo",
    "observaciones": "Monitoreo continuo de plataformas educativas virtuales.",
    "esHistorico": false,
    "datasetName": "UX_LMS",
    "datasetAbstract": "Analítica de uso y navegación en el LMS institucional.",
    "columns": [
      {"name": "plataforma", "type": "text", "description": "Moodle / Teams / Canvas"},
      {"name": "usuarios_unicos_diarios", "type": "number", "description": "DAU (Daily Active Users)"},
      {"name": "tiempo_sesion_promedio", "type": "number", "description": "Minutos por visita"},
      {"name": "dispositivo_acceso", "type": "text", "description": "Móvil / Escritorio"},
      {"name": "horario_pico", "type": "text", "description": "Franja de mayor tráfico"},
      {"name": "errores_carga", "type": "number", "description": "Tasa de fallos reportados"}
    ],
    "datasetSource": "Logs de Servidor / Google Analytics",
    "datasetNotes": "Optimización de infraestructura TI."
  },
  {
    "id": 45,
    "titulo": "Horas Sustantivas de Docentes",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZGYyZjdmZGUtMzZhZi00Zjk4LTkwOTQtOWVjNjVkOGUzMzNjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Análisis de distribución de horas sustantivas docentes: docencia, investigación, extensión y administrativa.",
    "estado": "Activo",
    "observaciones": "Datos extraídos del sistema de gestión académica.",
    "esHistorico": false,
    "datasetName": "Carga_Academica_Docente",
    "datasetAbstract": "Distribución detallada del plan de trabajo docente por funciones sustantivas.",
    "columns": [
      {"name": "facultad", "type": "text", "description": "Facultad de adscripción"},
      {"name": "tipo_vinculacion", "type": "text", "description": "Planta / Ocasional"},
      {"name": "horas_docencia", "type": "number", "description": "Horas clase directa"},
      {"name": "horas_investigacion", "type": "number", "description": "Horas proyectos inv."},
      {"name": "horas_extension", "type": "number", "description": "Horas proyección social"},
      {"name": "horas_gestion", "type": "number", "description": "Horas administrativo-académicas"}
    ],
    "datasetSource": "Sistema de Gestión Académica",
    "datasetNotes": "Validación de planes de trabajo."
  },
  {
    "id": 46,
    "titulo": "Monitorias Académicas",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTk4ZWExYjMtYTNkYS00YmQzLTg4MWItZjA0N2VhNDRkMjQzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Dashboard técnico de monitorías académicas con análisis de datos del sistema.",
    "estado": "Activo",
    "observaciones": "Complementa el tablero de Monitorías con análisis técnico.",
    "esHistorico": false,
    "datasetName": "Operacion_Monitorias_Sist",
    "datasetAbstract": "Métricas operativas de la plataforma de gestión de monitorías.",
    "columns": [
      {"name": "registros_procesados", "type": "number", "description": "Total sesiones registradas"},
      {"name": "tiempo_carga", "type": "number", "description": "Latencia del módulo"},
      {"name": "usuarios_concurrentes", "type": "number", "description": "Pico de uso"},
      {"name": "incidencias_tecnicas", "type": "number", "description": "Tickets de soporte generados"}
    ],
    "datasetSource": "Logs de Aplicación",
    "datasetNotes": "Monitoreo de estabilidad del servicio."
  },
  {
    "id": 47,
    "titulo": "Inscripciones Ucundinamarca",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMmFmNWViOWMtMjIzMy00NTQ1LTgxYmEtZDVmZDFhOTkwYzdiIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Inscripciones",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Análisis de inscripciones a programas académicos: tendencias, canales y conversión.",
    "estado": "Activo",
    "observaciones": "Actualizado en tiempo real durante procesos de admisión.",
    "esHistorico": false,
    "datasetName": "Funnel_Inscripciones",
    "datasetAbstract": "Embudo de conversión del proceso de admisión, desde el registro hasta el pago.",
    "columns": [
      {"name": "periodo", "type": "text", "description": "Periodo académico"},
      {"name": "iniciados", "type": "number", "description": "Formularios abiertos"},
      {"name": "completados", "type": "number", "description": "Formularios guardados"},
      {"name": "pagados", "type": "number", "description": "Derechos de inscripción pagos"},
      {"name": "admitidos", "type": "number", "description": "Aspirantes seleccionados"},
      {"name": "tasa_conversion", "type": "number", "description": "% Pagados vs Iniciados"}
    ],
    "datasetSource": "Portal de Admisiones",
    "datasetNotes": "Datos clave para mercadeo."
  },
  {
    "id": 48,
    "titulo": "Horas de Interacción Social",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMGE3NGVjMWEtYzk1Yy00YTQ2LWJmNDYtYjc2OTZkYTc0NjllIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Interacción Social",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Seguimiento de horas dedicadas a actividades de interacción social y proyección comunitaria.",
    "estado": "Activo",
    "observaciones": "Incluye proyectos de extensión, consultorías y servicio social.",
    "esHistorico": false,
    "datasetName": "Horas_Interaccion_Social",
    "datasetAbstract": "Cuantificación del impacto social a través de horas hombre invertidas en comunidad.",
    "columns": [
      {"name": "proyecto", "type": "text", "description": "Nombre de la iniciativa"},
      {"name": "docentes_participantes", "type": "number", "description": "Cantidad de profesores"},
      {"name": "estudiantes_participantes", "type": "number", "description": "Cantidad de alumnos"},
      {"name": "horas_reportadas", "type": "number", "description": "Total horas ejecutadas"},
      {"name": "poblacion_beneficiada", "type": "number", "description": "Personas impactadas"}
    ],
    "datasetSource": "Módulo de Extensión",
    "datasetNotes": "Indicador de responsabilidad social."
  },
  {
    "id": 49,
    "titulo": "Matrícula Financiera",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzgyNDZlYTItODk4NC00MzczLWE1ODctMTJhODcxYTRlZGVmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Financiero",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Análisis de matrícula financiera: recaudos, comportamiento de pago y morosidad.",
    "estado": "Activo",
    "observaciones": "Datos sincronizados con el sistema financiero SAP.",
    "esHistorico": false,
    "datasetName": "Recaudo_Matriculas",
    "datasetAbstract": "Estado financiero del proceso de matrícula académica.",
    "columns": [
      {"name": "periodo", "type": "text", "description": "Semestre"},
      {"name": "referencias_generadas", "type": "number", "description": "Recibos emitidos"},
      {"name": "pagos_confirmados", "type": "number", "description": "Recibos pagados"},
      {"name": "valor_recaudado", "type": "number", "description": "Total en pesos"},
      {"name": "metodo_pago", "type": "text", "description": "PSE / Banco / Datáfono"},
      {"name": "cartera_pendiente", "type": "number", "description": "Saldo por cobrar"}
    ],
    "datasetSource": "Pasarela de Pagos / SAP",
    "datasetNotes": "Conciliación bancaria diaria."
  },
  {
    "id": 50,
    "titulo": "Programas Académicos",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZmI5MTZiZGEtMzE0Ny00NGZjLTg1NDctNzBlN2E5M2FiOTUzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema Académico",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Catálogo interactivo de programas académicos con indicadores de matrícula y estado.",
    "estado": "Activo",
    "observaciones": "Actualizado semestralmente con la oferta académica vigente.",
    "esHistorico": false,
    "datasetName": "Oferta_Academica_Vigente",
    "datasetAbstract": "Listado maestro de programas con sus códigos SNIES y estado actual.",
    "columns": [
      {"name": "codigo_snies", "type": "text", "description": "Registro oficial"},
      {"name": "nombre_programa", "type": "text", "description": "Denominación"},
      {"name": "nivel_formacion", "type": "text", "description": "Pregrado/Posgrado"},
      {"name": "modalidad", "type": "text", "description": "Presencial/Virtual"},
      {"name": "sedes_oferta", "type": "text", "description": "Municipios donde opera"},
      {"name": "estado_registro", "type": "text", "description": "Vigente / En renovación"}
    ],
    "datasetSource": "Sistema Académico",
    "datasetNotes": "Fuente oficial de oferta educativa."
  },
  {
    "id": 51,
    "titulo": "Microsoft Teams UCundinamarca",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTU2YWQwNDctYTRhZS00ZGZjLWFjMDAtMmNiNWZlMzM3ZDYzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Microsoft 365",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Métricas de uso de Microsoft Teams: usuarios activos, reuniones, colaboración y almacenamiento.",
    "estado": "Activo",
    "observaciones": "Datos extraídos de Microsoft 365 Analytics.",
    "esHistorico": false,
    "datasetName": "Uso_Teams",
    "datasetAbstract": "Estadísticas de adopción y uso de la plataforma colaborativa Teams.",
    "columns": [
      {"name": "usuarios_activos", "type": "number", "description": "Logins únicos últimos 30 días"},
      {"name": "reuniones_realizadas", "type": "number", "description": "Videoconferencias"},
      {"name": "mensajes_chat", "type": "number", "description": "Volumen de chat"},
      {"name": "archivos_compartidos", "type": "number", "description": "Documentos subidos"},
      {"name": "dispositivo_uso", "type": "text", "description": "Móvil / PC / Web"}
    ],
    "datasetSource": "Admin Center M365",
    "datasetNotes": "Indicador de transformación digital."
  },
  {
    "id": 52,
    "titulo": "Sesiones Virtuales de Sistemas y Tecnología",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzU1YTY1ZTUtMDcxZC00N2M3LWI3ODItNmQwYTQ0MDQ3NWM3IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Seguimiento",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Registro y análisis de sesiones virtuales organizadas por el área de Sistemas y Tecnología.",
    "estado": "Activo",
    "observaciones": "Incluye capacitaciones, soporte técnico y talleres virtuales.",
    "esHistorico": false,
    "datasetName": "Eventos_Virtuales_TI",
    "datasetAbstract": "Bitácora de eventos online realizados por el área de tecnología.",
    "columns": [
      {"name": "nombre_evento", "type": "text", "description": "Tema"},
      {"name": "fecha", "type": "date", "description": "Día del evento"},
      {"name": "asistentes", "type": "number", "description": "Participantes conectados"},
      {"name": "duracion", "type": "number", "description": "Minutos"},
      {"name": "grabacion_disponible", "type": "text", "description": "Sí / No"}
    ],
    "datasetSource": "Teams Events",
    "datasetNotes": "Gestión del conocimiento TI."
  },
  {
    "id": 53,
    "titulo": "Iniciativas Tecnológicas de Transformación PETI",
    "area": "Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Tecnología e Infraestructura",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNzNhZjE4NTgtZDlhZi00ZTMxLWEzZGEtZTVkOGQyMTg4MTFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "PETI Institucional",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Seguimiento de iniciativas del Plan Estratégico de Tecnologías de Información (PETI).",
    "estado": "Activo",
    "observaciones": "Incluye avance, presupuesto y resultados de proyectos tecnológicos.",
    "esHistorico": false,
    "datasetName": "Avance_PETI",
    "datasetAbstract": "Estado de ejecución de los proyectos definidos en el Plan Estratégico de TI.",
    "columns": [
      {"name": "iniciativa", "type": "text", "description": "Nombre del proyecto"},
      {"name": "objetivo_estrategico", "type": "text", "description": "Alineación institucional"},
      {"name": "porcentaje_avance", "type": "number", "description": "Ejecución física"},
      {"name": "presupuesto_ejecutado", "type": "number", "description": "Ejecución financiera"},
      {"name": "estado", "type": "text", "description": "En tiempo / Retrasado / Crítico"}
    ],
    "datasetSource": "Oficina de Proyectos TI",
    "datasetNotes": "Control estratégico de TI."
  },
  
  // ==========================================================================================
  // MACROPROCESO DE APOYO - TALENTO HUMANO (DOCENTES)
  // ==========================================================================================
  {
    "id": 54,
    "titulo": "Información sobre el cuerpo docente de la Ucundinamarca",
    "area": "Dirección de Talento Humano",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión del Talento Humano",
    "rol": "Docente",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMThlNDcyY2EtNDNlMC00MTUyLWI0ODMtMjNkYTllMTFjODljIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Módulos de Contratación - Sistema de Talento Humano",
    "elaboradoPor": "Dirección de Talento Humano",
    "descripcion": "Caracterización del cuerpo docente: perfiles académicos, vinculación, escalafón y producción académica.",
    "estado": "Activo",
    "observaciones": "Actualizado semestralmente con datos del sistema de talento humano.",
    "esHistorico": false,
    "datasetName": "Cuerpo_Docente",
    "datasetAbstract": "Información completa sobre el cuerpo docente institucional: formación, vinculación y producción académica.",
    "columns": [
      {"name": "cedula_docente", "type": "text", "description": "Número de identificación del docente"},
      {"name": "nombre_completo", "type": "text", "description": "Nombre completo del docente"},
      {"name": "tipo_vinculacion", "type": "text", "description": "Planta / Cátedra / Ocasional"},
      {"name": "nivel_formacion", "type": "text", "description": "Pregrado / Especialización / Maestría / Doctorado"},
      {"name": "escalafon", "type": "text", "description": "Categoría según escalafón docente"},
      {"name": "programa_adscrito", "type": "text", "description": "Programa al que está vinculado"},
      {"name": "sede", "type": "text", "description": "Sede de trabajo principal"},
      {"name": "fecha_ingreso", "type": "date", "description": "Fecha de ingreso a la universidad"},
      {"name": "produccion_academica", "type": "number", "description": "Número de publicaciones / proyectos"},
      {"name": "estado", "type": "text", "description": "Activo / Licencia / Comisión"}
    ],
    "datasetSource": "Sistema de Talento Humano - Módulo de contratación docente",
    "datasetNotes": "Actualización semestral. Datos protegidos según normativa de habeas data."
  },
  {
    "id": 55,
    "titulo": "Implementación Cursos Talento Humano",
    "area": "Dirección de Talento Humano",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión del Talento Humano",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiM2FkODU4MDktNjVlOC00MGQ5LTk5MWEtMjBmZGViYjI2NDQ0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Capacitación",
    "elaboradoPor": "Dirección de Talento Humano",
    "descripcion": "Seguimiento de implementación de cursos de formación para el talento humano institucional.",
    "estado": "Activo",
    "observaciones": "Incluye cobertura, certificación y evaluación de impacto.",
    "esHistorico": false,
    "datasetName": "Plan_Capacitacion_Talento_Humano",
    "datasetAbstract": "Seguimiento al Plan Institucional de Capacitación para docentes y administrativos.",
    "columns": [
      {"name": "id_curso", "type": "text", "description": "Identificador del curso de capacitación"},
      {"name": "nombre_curso", "type": "text", "description": "Nombre del curso"},
      {"name": "eje_tematico", "type": "text", "description": "Eje del plan de capacitación"},
      {"name": "publico_objetivo", "type": "text", "description": "Docentes / Administrativos / Ambos"},
      {"name": "numero_inscritos", "type": "number", "description": "Total de funcionarios inscritos"},
      {"name": "numero_certificados", "type": "number", "description": "Total de funcionarios que completaron y aprobaron"},
      {"name": "tasa_finalizacion", "type": "number", "description": "Porcentaje de finalización (Certificados/Inscritos)"},
      {"name": "satisfaccion_promedio", "type": "number", "description": "Calificación promedio de satisfacción del curso (1-5)"}
    ],
    "datasetSource": "Sistema de Gestión de la Capacitación (SGCap)",
    "datasetNotes": "Los datos se actualizan al finalizar cada cohorte de cursos."
  },
  
  // ==========================================================================================
  // MACROPROCESO ESTRATÉGICO - PROYECTOS ESPECIALES
  // ==========================================================================================
  {
    "id": 56,
    "titulo": "Tablero Informativo",
    "area": "Proyectos Especiales y Relaciones Interinstitucionales",
    "macroproceso": "Estratégico",
    "subproceso": "Proyectos Especiales y Relaciones Interinstitucionales",
    "rol": "Administrativo",
    "url": "https://www.ucundinamarca.edu.co/index.php/proyectos-especiales-y-relaciones-interinstitucionales",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sitio Web Institucional",
    "elaboradoPor": "Proyectos Especiales",
    "descripcion": "Dashboard informativo de proyectos especiales en desarrollo y alianzas interinstitucionales.",
    "estado": "Activo",
    "observaciones": "Publicado en el sitio web institucional con actualizaciones periódicas.",
    "esHistorico": false,
    "datasetName": "Proyectos_Relaciones_Interinstitucionales",
    "datasetAbstract": "Resumen de los proyectos especiales y convenios vigentes de la universidad.",
    "columns": [
      {"name": "nombre_proyecto_convenio", "type": "text", "description": "Nombre del proyecto o del convenio"},
      {"name": "tipo", "type": "text", "description": "Proyecto Especial / Convenio Marco / Convenio Específico"},
      {"name": "socio_estrategico", "type": "text", "description": "Entidad nacional o internacional con la que se colabora"},
      {"name": "objetivo", "type": "text", "description": "Objetivo principal del proyecto o convenio"},
      {"name": "estado_actual", "type": "text", "description": "Vigente / En formulación / Finalizado"},
      {"name": "fecha_inicio", "type": "date", "description": "Fecha de firma o inicio"},
      {"name": "fecha_fin_vigencia", "type": "date", "description": "Fecha de finalización"},
      {"name": "area_responsable_ucundinamarca", "type": "text", "description": "Área líder dentro de la universidad"}
    ],
    "datasetSource": "Sistema de Gestión de Convenios y Proyectos Especiales",
    "datasetNotes": "Actualización trimestral. Este es un resumen público, datos sensibles no se incluyen."
  },
  {
    "id": 57,
    "titulo": "Convenios y Proyectos",
    "area": "Proyectos Especiales y Relaciones Interinstitucionales",
    "macroproceso": "Estratégico",
    "subproceso": "Proyectos Especiales y Relaciones Interinstitucionales",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZGVhYjkwODUtZTc5YS00OThmLThkNGYtY2M2NDQ4NmNhOTFkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/03/2025",
    "fuente": "Sistema de Proyectos",
    "elaboradoPor": "Proyectos Especiales",
    "descripcion": "Visualización de convenios interinstitucionales y proyectos especiales: estados, alcance y resultados.",
    "estado": "Activo",
    "observaciones": "Incluye convenios nacionales e internacionales vigentes.",
    "esHistorico": false,
    "datasetName": "Gestion_Detallada_Convenios_Proyectos",
    "datasetAbstract": "Versión detallada para gestión interna de los convenios y proyectos, incluyendo aspectos financieros y de impacto.",
    "columns": [
      {"name": "id_convenio_proyecto", "type": "text", "description": "ID interno de gestión"},
      {"name": "nombre_convenio_proyecto", "type": "text", "description": "Nombre"},
      {"name": "socio", "type": "text", "description": "Entidad aliada"},
      {"name": "tipo_alianza", "type": "text", "description": "Nacional / Internacional"},
      {"name": "presupuesto_total", "type": "number", "description": "Presupuesto total (si aplica)"},
      {"name": "aporte_ucundinamarca", "type": "number", "description": "Aporte de la universidad en especie o efectivo"},
      {"name": "indicador_impacto_1", "type": "text", "description": "Principal indicador de resultado esperado"},
      {"name": "resultado_alcanzado_1", "type": "text", "description": "Resultado medido para el indicador 1"},
      {"name": "estado_actual", "type": "text", "description": "Vigente / En ejecución / Cerrado"}
    ],
    "datasetSource": "Sistema de Gestión de Convenios y Proyectos Especiales",
    "datasetNotes": "Actualización mensual para seguimiento de la gestión. Acceso restringido a personal administrativo."
  }
];


const MACROPROCESOS = {
  'Estratégico': {
    icon: 'fa-bullseye',
    color: 'estrategico',
    areas: ['Dirección de Planeación', 'Sistema de Gestión Ambiental', 'Sistema de Gestión de Seguridad de la Información - SGSI', 'Proyectos Especiales y Relaciones Interinstitucionales']
  },
  'Misional': {
    icon: 'fa-users',
    color: 'misional',
    areas: [
      'Oficina de Desarrollo Académico',
      'Oficina de Educación Virtual y a Distancia',
      'Instituto de Posgrados',
      'Graduados',
      'Dirección de Investigación'
    ]
  },
  'Apoyo': {
    icon: 'fa-handshake',
    color: 'apoyo',
    areas: [
      'Vicerrectoría Administrativa y Financiera',
      'Oficina de Compras',
      'Sistemas y Tecnología',
      'Dirección de Talento Humano'
    ]
  },
  'Seguimiento': {
    icon: 'fa-search',
    color: 'seguimiento',
    areas: [
      'Control Interno'
    ]
  }
};

const AREA_ICONS = {
  'Oficina de Desarrollo Académico': 'fa-chalkboard-teacher',
  'Oficina de Educación Virtual y a Distancia': 'fa-laptop-code',
  'Instituto de Posgrados': 'fa-user-graduate',
  'Graduados': 'fa-graduation-cap',
  'Dirección de Investigación': 'fa-microscope',
  'Dirección de Planeación': 'fa-sitemap',
  'Sistema de Gestión Ambiental': 'fa-leaf',
  'Sistema de Gestión de Seguridad de la Información - SGSI': 'fa-shield-alt',
  'Vicerrectoría Administrativa y Financiera': 'fa-coins',
  'Oficina de Compras': 'fa-shopping-cart',
  'Control Interno': 'fa-clipboard-check',
  'Sistemas y Tecnología': 'fa-cogs',
  'Dirección de Talento Humano': 'fa-users-cog',
  'Proyectos Especiales y Relaciones Interinstitucionales': 'fa-project-diagram'
};

let currentDashboard = null;
let currentView = 'home';
let topProgramsChartInstance = null;
let map = null;
let mapCircles = [];
let isFullscreen = false;
let expandedMacroprocesos = {};
let expandedAreas = {};
let resizeTimeout;
let infoPanelExpanded = false;

const studentData = [
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Contaduría Pública", "Estudiantes": 39},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Gerencia Financiera Y Contable", "Estudiantes": 4},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Gerencia Para La Transformación Digital", "Estudiantes": 51},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 670},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Contaduría Publica", "Estudiantes": 670},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 608},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Ingeniería Agronómica", "Estudiantes": 318},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Psicología", "Estudiantes": 368},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Ingeniería De Software", "Estudiantes": 375},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Especialización En Gerencia Para El Desarrollo Organizacional", "Estudiantes": 14},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Educación Ambiental Y Desarrollo De La Comunidad", "Estudiantes": 8},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Licenciatura En Educación Física, Recreación Y Deportes ", "Estudiantes": 134},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería Industrial", "Estudiantes": 218},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Administración De Empresas", "Estudiantes": 634},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Ingeniería Electrónica", "Estudiantes": 334},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Ingeniería Industrial", "Estudiantes": 480},
  {"MUNICIPIO_PROGRAMA": "Zipaquirá", "Programa": "Música", "Estudiantes": 214},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 677},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería Mecatrónica", "Estudiantes": 180},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Administración De Empresas", "Estudiantes": 633},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Contaduría Pública", "Estudiantes": 561},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Doctorado En Ciencias De La Educación", "Estudiantes": 18},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Maestría En Ciencias Ambientales", "Estudiantes": 4},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Maestría En Educación", "Estudiantes": 5},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería De Sistemas", "Estudiantes": 68},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Ingeniería De Sistemas", "Estudiantes": 8},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Ingeniería De Sistemas", "Estudiantes": 57},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Zootecnia", "Estudiantes": 324},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Profesional En Ciencias Del Deporte", "Estudiantes": 631},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 287},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Ingeniería Agronómica", "Estudiantes": 289},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Licenciatura En Ciencias Sociales", "Estudiantes": 171},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Administración De Empresas", "Estudiantes": 532},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Contaduría Publica", "Estudiantes": 321},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Administración De Empresas", "Estudiantes": 137},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Contaduría Publica", "Estudiantes": 386},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Tecnología En Desarrollo De Software", "Estudiantes": 42},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Gestión Pública", "Estudiantes": 45},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Infraestructura Y Seguridad De Redes", "Estudiantes": 10},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Marketing Digital", "Estudiantes": 22},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Ingeniería Topográfica Y Geomática ", "Estudiantes": 22},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Licenciatura En Educación Básica Con Énfasis En Ciencias Sociales", "Estudiantes": 2},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Metodologías De Calidad Para El Desarrollo Del Software", "Estudiantes": 24},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Agroecología Y Desarrollo Agro ecoturístico", "Estudiantes": 10},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Agronegocios Sostenibles", "Estudiantes": 10},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Analítica Aplicada A Negocios", "Estudiantes": 32},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Especialización En Analítica Y Ciencia De Datos", "Estudiantes": 22},
  {"MUNICIPIO_PROGRAMA": "Fusagasugá", "Programa": "Tecnología En Cartografía", "Estudiantes": 2},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Administración De Empresas", "Estudiantes": 457},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Ingeniería De Software", "Estudiantes": 256},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Ingeniería Ambiental", "Estudiantes": 253},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Enfermería", "Estudiantes": 390},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Ingeniería Ambiental", "Estudiantes": 322},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Tecnología En Gestión Turística Y Hotelera", "Estudiantes": 3},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Administración De Empresas", "Estudiantes": 281},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Medicina Veterinaria Y Zootecnia ", "Estudiantes": 41},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Zootecnia", "Estudiantes": 275}
];

// ==========================================
// GESTIÓN DE SESIÓN PERSISTENTE CON ROLES
// ==========================================

function checkSession() {
  const session = sessionStorage.getItem('isAuthenticated');
  const role = sessionStorage.getItem('userRole');
  return { authenticated: session === 'true', role: role };
}

function saveSession(role) {
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('userRole', role);
}

function clearSession() {
  sessionStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('userRole');
  currentUser = null;
}

const sessionData = checkSession();
if (sessionData.authenticated && sessionData.role) {
  currentUser = { role: sessionData.role };
}

// ==========================================
// NAVEGACIÓN CON SISTEMA DE ROLES MEJORADO
// ==========================================

function navigateTo(view) {
  debugLog(`Navegando a: ${view}`);

  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }

  const protectedViews = {
    'administrativos': 'Administrativo',
    'gestores': 'Docente'
  };

  // Sección de estudiantes ahora es pública (sin protección)
  if (view === 'estudiantes') {
    // Acceso directo sin autenticación
    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
    document.getElementById('estudiantesView').classList.add('active');
    currentView = view;
    renderDashboardsByRole('Estudiante');
    return;
  }

  if (protectedViews[view]) {
    if (!currentUser) {
      showLoginForRole(view);
      return;
    } else if (currentUser.role !== protectedViews[view]) {
      alert(`Acceso denegado. Esta sección es solo para ${protectedViews[view]}s.`);
      return;
    }
  }

  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById(`${view}View`).classList.add('active');
  currentView = view;
  
  if (view === 'estudiantes' && currentUser && currentUser.role === 'Estudiante') {
    renderDashboardsByRole('Estudiante');
  } else if (view === 'administrativos' && currentUser && currentUser.role === 'Administrativo') {
    renderDashboardsByRole('Administrativo');
  } else if (view === 'gestores' && currentUser && currentUser.role === 'Docente') {
    renderDashboardsByRole('Docente');
  }
  
  if (view === 'home') {
    setTimeout(() => {
      handleResize();
    }, 500);
  }
}

// ==========================================
// FUNCIONES DE AUTENTICACIÓN POR ROLES
// ==========================================

function showLoginForRole(targetView) {
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById('loginView').classList.add('active');
  currentView = 'login';
  
  const loginTitle = document.getElementById('loginTitle');
  const loginSubtitle = document.getElementById('loginSubtitle');
  const loginIcon = document.getElementById('loginIcon');
  
  if (targetView === 'estudiantes') {
    loginTitle.textContent = 'Acceso Estudiantes';
    loginSubtitle.textContent = 'Ingrese sus credenciales para ver tableros académicos';
    loginIcon.className = 'fas fa-user-graduate text-white text-2xl';
    document.getElementById('loginForm').dataset.targetRole = 'Estudiante';
    document.getElementById('loginForm').dataset.targetView = 'estudiantes';
  } else if (targetView === 'administrativos') {
    loginTitle.textContent = 'Acceso Administrativos';
    loginSubtitle.textContent = 'Ingrese sus credenciales para ver tableros institucionales';
    loginIcon.className = 'fas fa-briefcase text-white text-2xl';
    document.getElementById('loginForm').dataset.targetRole = 'Administrativo';
    document.getElementById('loginForm').dataset.targetView = 'administrativos';
  } else if (targetView === 'gestores') {
    loginTitle.textContent = 'Acceso Gestores del Conocimiento';
    loginSubtitle.textContent = 'Ingrese sus credenciales para ver información docente';
    loginIcon.className = 'fas fa-chalkboard-teacher text-white text-2xl';
    document.getElementById('loginForm').dataset.targetRole = 'Docente';
    document.getElementById('loginForm').dataset.targetView = 'gestores';
  }
}

function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');
  const form = document.getElementById('loginForm');
  const targetRole = form.dataset.targetRole;
  const targetView = form.dataset.targetView;
  
  // MODO DEMO: Acceso directo sin validación de credenciales
  if (DEMO_MODE) {
    // Asignar usuario demo según el rol objetivo
    if (targetRole === 'Administrativo') {
      currentUser = { password: 'demo', role: 'Administrativo', name: 'Usuario Demo - Administrativo' };
    } else if (targetRole === 'Docente') {
      currentUser = { password: 'demo', role: 'Docente', name: 'Usuario Demo - Gestor' };
    } else {
      currentUser = { password: 'demo', role: 'Estudiante', name: 'Usuario Demo - Estudiante' };
    }
    
    saveSession(currentUser.role);
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    errorDiv.classList.add('hidden');
    navigateTo(targetView);
    return;
  }
  
  // Modo normal (deshabilitado en demo)
  if (USERS[username] && USERS[username].password === password && USERS[username].role === targetRole) {
    currentUser = USERS[username];
    saveSession(currentUser.role);
    
    document.getElementById('logoutBtn').classList.remove('hidden');
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    errorDiv.classList.add('hidden');
    
    navigateTo(targetView);
  } else {
    errorDiv.textContent = 'Usuario o contraseña incorrectos para este rol';
    errorDiv.classList.remove('hidden');
  }
}

function logout() {
  clearSession();
  document.getElementById('logoutBtn').classList.add('hidden');
  navigateTo('home');
}

// ==========================================
// RENDERIZAR DASHBOARDS POR ROL
// ==========================================

function renderDashboardsByRole(role) {
  debugLog(`Renderizando dashboards para rol: ${role}`);
  
  const roleDashboards = dashboards.filter(d => d.rol === role);
  const containerId = role === 'Estudiante' ? 'estudiantesDashboards' :
                      role === 'Administrativo' ? 'administrativosDashboards' :
                      'gestoresDashboards';
  
  const container = document.getElementById(containerId);
  
  const grouped = {};
  roleDashboards.forEach(d => {
    if (!grouped[d.macroproceso]) grouped[d.macroproceso] = {};
    if (!grouped[d.macroproceso][d.area]) grouped[d.macroproceso][d.area] = [];
    grouped[d.macroproceso][d.area].push(d);
  });
  
  container.innerHTML = Object.entries(grouped).map(([macroproceso, areas]) => {
    const config = MACROPROCESOS[macroproceso];
    const macroprocesoId = generateSafeId(`${role}-${macroproceso}`, 'macro');
    
    return `
      <div class="macroproceso-section ${config.color}">
        <div class="macroproceso-header" data-macroproceso-id="${macroprocesoId}">
          <div class="macroproceso-title">
            <div class="macroproceso-icon">
              <i class="fas ${config.icon}"></i>
            </div>
            <span>Macroproceso ${macroproceso}</span>
          </div>
          <i class="fas fa-chevron-down collapse-icon expanded" id="icon-${macroprocesoId}"></i>
        </div>
        <div class="macroproceso-content expanded" id="content-${macroprocesoId}">
          ${Object.entries(areas).map(([area, items], index) => 
            createAreaCard(area, items, config.color, index, `${role}-${macroproceso}-`)
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  Object.keys(grouped).forEach((macroproceso) => {
    const macroprocesoId = generateSafeId(`${role}-${macroproceso}`, 'macro');
    expandedMacroprocesos[macroprocesoId] = true;
  });
  
  debugLog(`Dashboards renderizados para ${role}`);
}

// ==========================================
// TOGGLE MACROPROCESO/ÁREA
// ==========================================

function toggleMacroproceso(macroprocesoId) {
  debugLog(`Toggle macroproceso: ${macroprocesoId}`);
  
  const content = document.getElementById(`content-${macroprocesoId}`);
  const icon = document.getElementById(`icon-${macroprocesoId}`);
  
  if (!content || !icon) {
    console.error(`✗ No se encontraron elementos para macroproceso: ${macroprocesoId}`);
    return;
  }
  
  const isExpanded = expandedMacroprocesos[macroprocesoId];
  
  if (isExpanded) {
    content.classList.remove('expanded');
    icon.classList.remove('expanded');
    expandedMacroprocesos[macroprocesoId] = false;
  } else {
    content.classList.add('expanded');
    icon.classList.add('expanded');
    expandedMacroprocesos[macroprocesoId] = true;
  }
}

function toggleArea(areaId) {
  debugLog(`Toggle área: ${areaId}`);
  
  const container = document.getElementById(`dashboards-${areaId}`);
  const card = document.getElementById(`area-card-${areaId}`);
  
  if (!container || !card) {
    console.error(`✗ No se encontraron elementos para área: ${areaId}`);
    return;
  }
  
  const isExpanded = expandedAreas[areaId];
  
  if (isExpanded) {
    container.classList.remove('expanded');
    card.classList.remove('expanded');
    expandedAreas[areaId] = false;
  } else {
    container.classList.add('expanded');
    card.classList.add('expanded');
    expandedAreas[areaId] = true;
  }
}

// ==========================================
// EVENT DELEGATION
// ==========================================

function setupEventDelegation() {
  debugLog('Configurando event delegation para acordeones');
  
  document.addEventListener('click', function(e) {
    const header = e.target.closest('.macroproceso-header');
    if (header) {
      e.stopPropagation();
      const macroprocesoId = header.dataset.macroprocesoId;
      if (macroprocesoId) {
        toggleMacroproceso(macroprocesoId);
      }
    }
  });
  
  document.addEventListener('click', function(e) {
    const header = e.target.closest('.area-card-header');
    if (header) {
      e.stopPropagation();
      const areaId = header.dataset.areaId;
      if (areaId) {
        toggleArea(areaId);
      }
    }
  });
  
  debugLog('Event delegation configurado ✓');
}

// ==========================================
// CREAR TARJETA DE ÁREA
// ==========================================

function createAreaCard(area, dashboardsInArea, macroprocesoColor, index, context = '') {
  const areaId = generateSafeId(area, context + 'area');
  const iconClass = AREA_ICONS[area] || 'fa-folder-open';
  const dashboardCount = dashboardsInArea.length;
  
  debugLog(`Creando tarjeta para área: "${area}" con ID único: "${areaId}"`);
  
  return `
    <div class="area-card" id="area-card-${areaId}" style="animation-delay: ${index * 0.1}s;">
      <div class="area-card-header" data-area-id="${areaId}">
        <div class="area-card-icon ${macroprocesoColor}">
          <i class="fas ${iconClass}"></i>
        </div>
        <div class="area-card-info">
          <div class="area-card-title">${area}</div>
          <div class="area-card-subtitle">
            <span class="area-card-badge">
              <i class="fas fa-chart-bar"></i>
              ${dashboardCount} tablero${dashboardCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <i class="fas fa-chevron-down area-card-expand"></i>
      </div>
      <div class="area-dashboards-container" id="dashboards-${areaId}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${dashboardsInArea.map(d => createDashboardCard(d)).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// CREAR TARJETA DE DASHBOARD
// ==========================================

function createDashboardCard(dashboard) {
  const isExternalLink = !dashboard.url.includes('powerbi.com');
  
  const buttonIcon = isExternalLink ? 'fa-external-link-alt' : 'fa-chart-line';
  const buttonText = isExternalLink ? 'Visitar Sitio' : 'Ver Dashboard';

  return `
    <div class="dashboard-card">
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <h4 class="font-bold text-gray-800 flex-1 pr-2 text-base leading-tight">${dashboard.titulo}</h4>
          <i class="fas fa-chart-line text-green-600 flex-shrink-0"></i>
        </div>
        <div class="dashboard-metadata">
          <div class="dashboard-metadata-item">
            <i class="fas fa-calendar-alt"></i>
            <span><strong>Actualización:</strong> ${dashboard.fechaActualizacion}</span>
          </div>
          <div class="dashboard-metadata-item">
            <i class="fas fa-database"></i>
            <span><strong>Fuente:</strong> ${dashboard.fuente}</span>
          </div>
          <div class="dashboard-metadata-item">
            <i class="fas fa-user-edit"></i>
            <span><strong>Elaborado por:</strong> ${dashboard.elaboradoPor}</span>
          </div>
        </div>
        <button onclick="openDashboard(${dashboard.id}); event.stopPropagation();" class="btn-primary w-full justify-center mt-4">
          <i class="fas ${buttonIcon}"></i><span>${buttonText}</span>
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// MODAL DASHBOARD CON PANEL INFORMATIVO
// ==========================================

// --- INICIO DE CÓDIGO MEJORADO ---
function getTypeClass(type) {
  if (type === 'text') return 'type-text';
  if (type === 'number') return 'type-number';
  if (type === 'date') return 'type-date';
  return 'type-text';
}

function renderDatasetInfo(dashboard) {
  if (!dashboard.datasetName) return '';
  
  const columnsHTML = dashboard.columns ? `
    <table class="columns-table">
      <thead>
        <tr>
          <th>Campo</th>
          <th>Tipo</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        ${dashboard.columns.map(col => `
          <tr>
            <td><strong>${col.name}</strong></td>
            <td><span class="column-type ${getTypeClass(col.type)}">${col.type}</span></td>
            <td>${col.description}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : '';
  
  return columnsHTML;
}

function openDashboard(id) {
  const dashboard = dashboards.find(d => d.id === id);
  if (!dashboard) return;

  const isExternalLink = !dashboard.url.includes('powerbi.com');

  if (isExternalLink) {
    window.open(dashboard.url, '_blank');
    return;
  }

  currentDashboard = dashboard;
  infoPanelExpanded = false;
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = dashboard.titulo;
  const cleanTitle = tempDiv.textContent || tempDiv.innerText || "";
  
  document.getElementById('modalTitle').textContent = cleanTitle;
  document.getElementById('modalArea').textContent = dashboard.area;
  document.getElementById('iframeContainer').innerHTML = 
    `<iframe src="${dashboard.url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
  
  document.getElementById('infoDescripcion').textContent = dashboard.descripcion || 'Sin descripción disponible';
  
  const estadoBadge = document.getElementById('infoEstado');
  estadoBadge.textContent = dashboard.estado || 'Sin información';
  estadoBadge.className = 'status-badge status-' + (dashboard.estado === 'Activo' ? 'active' : 'inactive');
  
  const historicoSection = document.getElementById('infoHistoricoSection');
  if (dashboard.esHistorico) {
    historicoSection.style.display = 'block';
    document.getElementById('infoHistorico').textContent = 'Este tablero contiene datos históricos sin actualización periódica.';
  } else {
    historicoSection.style.display = 'none';
  }
  
  document.getElementById('infoObservaciones').textContent = dashboard.observaciones || 'Sin observaciones adicionales';
  
  // Lógica para el diccionario de datos
  if (dashboard.datasetName) {
    document.getElementById('datasetName').textContent = dashboard.datasetName;
    document.getElementById('datasetAbstract').textContent = dashboard.datasetAbstract || 'Dataset del tablero de indicadores institucionales.';
    document.getElementById('datasetColumnsContainer').innerHTML = renderDatasetInfo(dashboard);
    document.getElementById('datasetSource').textContent = dashboard.datasetSource || dashboard.fuente;
    document.getElementById('datasetNotes').textContent = dashboard.datasetNotes || 'Consultar documentación técnica para más detalles.';
  } else {
    // Comportamiento por defecto para tableros sin metadatos extendidos
    document.getElementById('datasetName').textContent = dashboard.titulo;
    document.getElementById('datasetAbstract').textContent = 'Dataset de indicadores institucionales sin especificación detallada.';
    document.getElementById('datasetColumnsContainer').innerHTML = '<p class="text-gray-600 text-sm">Información de campos no disponible.</p>';
    document.getElementById('datasetSource').textContent = dashboard.fuente;
    document.getElementById('datasetNotes').textContent = 'Consultar con el área responsable para información técnica detallada.';
  }
  
  const infoPanel = document.getElementById('dashboardInfoPanel');
  infoPanel.classList.remove('expanded');
  
  document.body.style.overflow = 'hidden';
  document.getElementById('dashboardModal').classList.add('active');
}
// --- FIN DE CÓDIGO MEJORADO ---

function toggleInfoPanel() {
  const panel = document.getElementById('dashboardInfoPanel');
  const toggleBtn = document.getElementById('toggleInfoPanelBtn');
  
  infoPanelExpanded = !infoPanelExpanded;
  
  if (infoPanelExpanded) {
    panel.classList.add('expanded');
    toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
    toggleBtn.title = 'Ocultar información';
  } else {
    panel.classList.remove('expanded');
    toggleBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    toggleBtn.title = 'Mostrar información del tablero';
  }
}

function closeDashboardModal() {
  document.body.style.overflow = '';
  document.getElementById('dashboardModal').classList.remove('active');
  document.getElementById('iframeContainer').innerHTML = '';
  currentDashboard = null;
  infoPanelExpanded = false;
}

function openInNewTab() {
  if (currentDashboard) {
    window.open(currentDashboard.url, '_blank');
  }
}

function downloadCSV() {
  if (!currentDashboard) return;
  
  const csvContent = `Tablero,Área,Fecha Actualización,Fuente,Elaborado Por,Descripción,Estado,Observaciones
"${currentDashboard.titulo}","${currentDashboard.area}","${currentDashboard.fechaActualizacion}","${currentDashboard.fuente}","${currentDashboard.elaboradoPor}","${currentDashboard.descripcion}","${currentDashboard.estado}","${currentDashboard.observaciones}"`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${currentDashboard.titulo.replace(/[^a-z0-9]/gi, '_')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// MAPA
// ==========================================

function initializeMap() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded.');
    return;
  }

  const mapData = [
    { name: "Fusagasugá", coords: [4.3391, -74.3636], students: 3422 },
    { name: "Soacha", coords: [4.579, -74.214], students: 1726 },
    { name: "Facatativá", coords: [4.814, -74.356], students: 2905 },
    { name: "Chía", coords: [4.858, -74.053], students: 1996 },
    { name: "Ubaté", coords: [5.313, -73.816], students: 1327 },
    { name: "Girardot", coords: [4.304, -74.804], students: 1359 },
    { name: "Zipaquirá", coords: [5.025, -74.004], students: 214 }
  ];

  map = L.map('map', {
    center: [4.5, -74.0],
    zoom: 8,
    scrollWheelZoom: true,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  const maxStudents = Math.max(...mapData.map(item => item.students));

  mapData.forEach((municipality) => {
    const baseRadius = (municipality.students / maxStudents) * 15000;
    
    const circle = L.circle(municipality.coords, {
      color: '#16a34a',
      fillColor: '#22c55e',
      fillOpacity: 0.6,
      radius: baseRadius,
      weight: 2
    }).addTo(map);

    mapCircles.push({ circle, baseRadius, municipality });

    const popupContent = `
      <div style="text-align: center; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 16px; font-weight: bold;">
          ${municipality.name}
        </h3>
        <div style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
          ${municipality.students.toLocaleString('es-CO')}
        </div>
        <div style="font-size: 12px; color: #6b7280;">
          Estudiantes
        </div>
      </div>
    `;

    circle.bindPopup(popupContent);

    const tooltipContent = `
      <strong>${municipality.name}</strong><br>
      ${municipality.students.toLocaleString('es-CO')} estudiantes
    `;

    circle.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      className: 'custom-tooltip'
    });

    const markerHtml = `
      <div style="
        background: white;
        border: 2px solid #16a34a;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 10px;
        color: #16a34a;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <i class="fas fa-map-marker-alt"></i>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: markerHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker(municipality.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  map.on('zoomend', function() {
    const currentZoom = map.getZoom();
    const zoomFactor = Math.pow(1.15, currentZoom - 8);
    
    mapCircles.forEach(({ circle, baseRadius }) => {
      const maxScale = 3;
      const minScale = 0.5;
      const finalScale = Math.min(Math.max(zoomFactor, minScale), maxScale);
      circle.setRadius(baseRadius * finalScale);
    });
  });
}

function toggleFullscreenMap() {
  const mapContainer = document.getElementById('map').parentElement;
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  
  if (!isFullscreen) {
    if (mapContainer.requestFullscreen) {
      mapContainer.requestFullscreen();
    } else if (mapContainer.webkitRequestFullscreen) {
      mapContainer.webkitRequestFullscreen();
    } else if (mapContainer.msRequestFullscreen) {
      mapContainer.msRequestFullscreen();
    }
    
    isFullscreen = true;
    fullscreenIcon.classList.remove('fa-expand');
    fullscreenIcon.classList.add('fa-compress');
    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    isFullscreen = false;
    fullscreenIcon.classList.remove('fa-compress');
    fullscreenIcon.classList.add('fa-expand');
    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }
}

document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement) {
    isFullscreen = false;
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    if (fullscreenIcon) {
      fullscreenIcon.classList.remove('fa-compress');
      fullscreenIcon.classList.add('fa-expand');
      setTimeout(() => map.invalidateSize(), 300);
    }
  }
});

// ==========================================
// MÉTRICAS
// ==========================================

function animateCounter(id, end) {
  const element = document.getElementById(id);
  const duration = 1500;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentCount = Math.round(end * progress);
    element.textContent = currentCount.toLocaleString('es-CO');
    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = end.toLocaleString('es-CO');
    }
  }, frameRate);
}

function initializeMetrics() {
  animateCounter('totalStudentsCounter', 12949);
  animateCounter('totalProgramsCounter', 49);
  animateCounter('totalCampusesCounter', 7);

  updateTopProgramsChart(5);
}

function updateTopProgramsChart(topN) {
  const programTotals = studentData.reduce((acc, item) => {
    acc[item.Programa] = (acc[item.Programa] || 0) + item.Estudiantes;
    return acc;
  }, {});
  
  const topPrograms = Object.entries(programTotals).sort(([, a], [, b]) => b - a).slice(0, topN);
  renderTopProgramsChart(topPrograms.map(p => p[0]), topPrograms.map(p => p[1]));
}

function renderTopProgramsChart(labels, data) {
  const ctx = document.getElementById('topProgramsChart').getContext('2d');
  if (topProgramsChartInstance) {
    topProgramsChartInstance.destroy();
  }
  topProgramsChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Número de Estudiantes',
        data: data,
        backgroundColor: 'rgba(22, 163, 74, 0.7)',
        borderColor: 'rgba(21, 128, 61, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#E5E7EB' } },
        y: { grid: { display: false } }
      }
    }
  });
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('dashboardModal').classList.contains('active')) {
    closeDashboardModal();
  }
  if (e.key === 'Enter' && currentView === 'login') {
    handleLogin();
  }
});

// ==========================================
// MENÚ MÓVIL RESPONSIVE
// ==========================================
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// ==========================================
// MANEJADOR DE REDIMENSIONAMIENTO
// ==========================================
function handleResize() {
  if (currentView === 'home') {
    debugLog('🔄 Iniciando redimensionamiento...');
    
    const mapContainer = document.getElementById('map');
    const chartContainer = document.getElementById('topProgramsChart');
    
    if (mapContainer) {
      void mapContainer.offsetHeight;
    }
    if (chartContainer) {
      void chartContainer.offsetHeight;
    }
    
    if (map && mapContainer) {
      setTimeout(() => {
        map.invalidateSize({
          pan: false,
          animate: false
        });
      }, 50);
      
      setTimeout(() => {
        map.invalidateSize({
          pan: false,
          animate: false
        });
      }, 200);
      
      setTimeout(() => {
        map.invalidateSize();
      }, 350);
    }
    
    if (topProgramsChartInstance && chartContainer) {
      const canvas = chartContainer;
      const parent = canvas.parentElement;
      
      setTimeout(() => {
        if (parent) {
          const parentWidth = parent.clientWidth;
          const parentHeight = parent.clientHeight;
          
          if (parentWidth > 0 && parentHeight > 0) {
            canvas.style.width = parentWidth + 'px';
            canvas.style.height = parentHeight + 'px';
          }
        }
        
        topProgramsChartInstance.resize();
      }, 50);
      
      setTimeout(() => {
        topProgramsChartInstance.resize();
        topProgramsChartInstance.update('none');
      }, 200);
      
      setTimeout(() => {
        topProgramsChartInstance.resize();
        topProgramsChartInstance.update('resize');
      }, 350);
    }
  }
}

// ==========================================
// FUNCIÓN PARA CAMBIAR PESTAÑAS DE LINEAMIENTOS
// ==========================================
function mostrarLineamiento(tipo) {
  debugLog(`Cambiando a pestaña: ${tipo}`);
  
  // Obtener referencias a los contenedores de contenido
  const contenidoGobierno = document.getElementById('contenidoGobiernoDatos');
  const contenidoIA = document.getElementById('contenidoInteligenciaArtificial');
  
  // Obtener referencias a los botones
  const btnGobierno = document.getElementById('btnGobiernoDatos');
  const btnIA = document.getElementById('btnInteligenciaArtificial');
  
  // Validar que existan los elementos antes de intentar modificarlos
  if (!contenidoGobierno || !contenidoIA || !btnGobierno || !btnIA) {
    console.error("Error: No se encontraron los elementos de las pestañas en el DOM.");
    return;
  }

  if (tipo === 'gobierno-datos') {
    // Activar Gobierno de Datos
    contenidoGobierno.classList.add('active');
    contenidoIA.classList.remove('active');
    
    // Estilos de botones
    btnGobierno.classList.add('active');
    btnIA.classList.remove('active');
    
  } else if (tipo === 'inteligencia-artificial') {
    // Activar Inteligencia Artificial
    contenidoGobierno.classList.remove('active');
    contenidoIA.classList.add('active');
    
    // Estilos de botones
    btnGobierno.classList.remove('active');
    btnIA.classList.add('active');
  }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  debugLog('=== INICIALIZANDO APLICACIÓN ===');
  
  setupEventDelegation();
  initializeMap();
  initializeMetrics();
  setupMobileMenu();
  
  if (currentUser) {
    document.getElementById('logoutBtn').classList.remove('hidden');
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 400);
  });
  
  debugLog('=== APLICACIÓN INICIALIZADA ===');
});
