// data-dashboards.js
// Base de datos de dashboards institucionales
// Actualizado automáticamente desde Dashboards_Micrositio.csv

// ==========================================
// REPOSITORIO DE DATOS: DASHBOARDS
// ==========================================
const dashboards = [
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 1,
    "titulo": "Experiencia de Aprendizaje Online con Efectividad",
    "area": "Dirección de Sistemas y Tecnología - Área de Desarrollo de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWZiOWUyMjktODBiNi00ODRjLWJlNTUtOGE2ODA4NTM0NjljIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Desarrollo de Sistemas de Información",
    "descripcion": "Tablero interactivo para el análisis de la efectividad y calidad de la experiencia de aprendizaje en modalidad online.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte General.",
    "esHistorico": false,
    "datasetName": "Experiencia_de_Aprendizaje_Online_con_Efectividad",
    "datasetAbstract": "Datos relacionados con Experiencia de Aprendizaje Online con Efectividad para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 2,
    "titulo": "Horas Sustantivas de Docentes",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Gestor",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZGYyZjdmZGUtMzZhZi00Zjk4LTkwOTQtOWVjNjVkOGUzMzNjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistema de Gestión de Talento Humano",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Seguimiento y análisis de las horas sustantivas dedicadas por los docentes a actividades académicas.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Académico.",
    "esHistorico": false,
    "datasetName": "Horas_Sustantivas_de_Docentes",
    "datasetAbstract": "Información de gestión del conocimiento y datos del cuerpo docente relacionados con Horas Sustantivas de Docentes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "identificacion_docente",
        "type": "text",
        "description": "Identificación del docente"
      },
      {
        "name": "nombre_docente",
        "type": "text",
        "description": "Nombre completo del docente"
      },
      {
        "name": "tipo_vinculacion",
        "type": "text",
        "description": "Tipo de vinculación docente"
      },
      {
        "name": "programa_adscrito",
        "type": "text",
        "description": "Programa al que está adscrito"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistema de Gestión de Talento Humano",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 3,
    "titulo": "Monitorias",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTk4ZWExYjMtYTNkYS00YmQzLTg4MWItZjA0N2VhNDRkMjQzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Sistema de seguimiento y evaluación del programa de monitorías académicas institucional.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Seguimiento Académico.",
    "esHistorico": false,
    "datasetName": "Monitorias",
    "datasetAbstract": "Datos relacionados con Monitorias para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 4,
    "titulo": "Inscripciones UCundinamarca",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMmFmNWViOWMtMjIzMy00NTQ1LTgxYmEtZDVmZDFhOTkwYzdiIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Análisis de datos de inscripciones por programa, sede y periodo académico.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Inscripciones.",
    "esHistorico": false,
    "datasetName": "Inscripciones_UCundinamarca",
    "datasetAbstract": "Datos relacionados con Inscripciones UCundinamarca para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 5,
    "titulo": "Horas de Interacción Social",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMGE3NGVjMWEtYzk1Yy00YTQ2LWJmNDYtYjc2OTZkYTc0NjllIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "12/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Reporte analítico de Horas de Interacción Social con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Interacción.",
    "esHistorico": false,
    "datasetName": "Horas_de_Interacci_n_Social",
    "datasetAbstract": "Datos relacionados con Horas de Interacción Social para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 6,
    "titulo": "Matrícula Financiera UCundinamarca",
    "area": "Dirección de Sistemas y Tecnología - Área de Desarrollo de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzgyNDZlYTItODk4NC00MzczLWE1ODctMTJhODcxYTRlZGVmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "04/12/2025",
    "fuente": "Sistema Académico Institucional",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Desarrollo de Sistemas de Información",
    "descripcion": "Dashboard de análisis financiero de matrículas, ingresos y proyecciones presupuestales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Financiero.",
    "esHistorico": false,
    "datasetName": "Matr_cula_Financiera_UCundinamarca",
    "datasetAbstract": "Datos relacionados con Matrícula Financiera UCundinamarca para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "monto",
        "type": "number",
        "description": "Monto en pesos colombianos"
      },
      {
        "name": "concepto",
        "type": "text",
        "description": "Concepto del movimiento"
      },
      {
        "name": "rubro_presupuestal",
        "type": "text",
        "description": "Rubro presupuestal"
      }
    ],
    "datasetSource": "Sistema Académico Institucional",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 7,
    "titulo": "Grupos Académicos",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZmI5MTZiZGEtMzE0Ny00NGZjLTg1NDctNzBlN2E5M2FiOTUzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistema Académico Institucional",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Información sobre la conformación y distribución de grupos académicos por programa y sede.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Académico.",
    "esHistorico": false,
    "datasetName": "Grupos_Acad_micos",
    "datasetAbstract": "Datos relacionados con Grupos Académicos para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistema Académico Institucional",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 8,
    "titulo": "Atención al Ciudadano (PQRSFyD)",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMGM0MTY1OGQtZjkyYy00ZDIyLThmMzctZWYwMjdkYjA3NmU4IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistema de Atención al Ciudadano",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Sistema de seguimiento y gestión de Peticiones, Quejas, Reclamos, Sugerencias, Felicitaciones y Denuncias.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Gestión PQRSFyD.",
    "esHistorico": false,
    "datasetName": "Atenci_n_al_Ciudadano__PQRSFyD",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Atención al Ciudadano (PQRSFyD).",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistema de Atención al Ciudadano",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: NO ESPECIFICADA
  // ==========================================================================================
  {
    "id": 9,
    "titulo": "Convenios",
    "area": "No especificada",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación y Desarrollo Institucional",
    "rol": "Administrativo",
    "url": "Sí",
    "fechaActualizacion": "Reporte Convenios",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "No especificada",
    "descripcion": "Tablero de seguimiento de convenios interinstitucionales, proyectos especiales y alianzas estratégicas.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Proyectos Especiales y Relaciones Interinstitucionales.",
    "esHistorico": false,
    "datasetName": "Convenios",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Convenios.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 10,
    "titulo": "Eventos UCundinamarca - Interacción Redes Sociales",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTZkZDlmZTYtZDRiNi00ODMxLWFmYTMtOTlkMzU0MjdlYzA0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Análisis de la interacción en redes sociales y alcance de eventos institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Eventos.",
    "esHistorico": false,
    "datasetName": "Eventos_UCundinamarca___Interacci_n_Redes_Sociales",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Eventos UCundinamarca - Interacción Redes Sociales.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 11,
    "titulo": "Tasa de Graduación",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiODNiNmI2MjUtY2Y1OC00M2QzLWI4YzItYmFlZTliODRhYjI5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection5303c09078171b834cd7",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Indicador institucional de graduación oportuna por programa y cohorte.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Indicador Académico.",
    "esHistorico": false,
    "datasetName": "Tasa_de_Graduaci_n",
    "datasetAbstract": "Datos relacionados con Tasa de Graduación para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 12,
    "titulo": "Desarrollo de la Lengua Extranjera Inglés de la UCundinamarca",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNDliNzdjMzAtMTg1MC00NDY2LTkxZjItYTA0YzQ2MmUyOWVlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Seguimiento del desarrollo de competencias en lengua extranjera (inglés) de la comunidad estudiantil.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación por Fases.",
    "esHistorico": false,
    "datasetName": "Desarrollo_de_la_Lengua_Extranjera_Ingl_s_de_la_UC",
    "datasetAbstract": "Datos relacionados con Desarrollo de la Lengua Extranjera Inglés de la UCundinamarca para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 13,
    "titulo": "Plan de Aprendizaje Digital",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZGE3MWY4OGYtYTFmMi00NTYwLThhZjYtOGFmNTE5OWFhYWFiIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "04/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Reporte analítico de Plan de Aprendizaje Digital con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte PAD.",
    "esHistorico": false,
    "datasetName": "Plan_de_Aprendizaje_Digital",
    "datasetAbstract": "Datos relacionados con Plan de Aprendizaje Digital para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 14,
    "titulo": "Seguimiento CADI 2020-2",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzU4OWQ2ODAtOGNiZS00MTE0LWE2ZWQtN2E3MDcwMzA0OWM4IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Seguimiento de los Centros de Apoyo Digital Institucional y su impacto en la formación.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Seguimiento CADI.",
    "esHistorico": false,
    "datasetName": "Seguimiento_CADI_2020_2",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Seguimiento CADI 2020-2.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 15,
    "titulo": "Ejecución CADI 2021-1",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMGY4MTYxODUtOTQ2ZC00NGU4LWEzMzUtMWJiNzZmZGE0MWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Seguimiento de los Centros de Apoyo Digital Institucional y su impacto en la formación.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Ejecución CADI.",
    "esHistorico": false,
    "datasetName": "Ejecuci_n_CADI_2021_1",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Ejecución CADI 2021-1.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 16,
    "titulo": "Analítica Resultados Saber PRO - Saber TyT 2018-2019-2020-2021",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNWQ4MmQ3NzAtNDQwYS00YmEyLThhODYtNmViMzkzYjdkMGM1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSectionbb5377277b1ac3a3c699",
    "fechaActualizacion": "01/01/2024",
    "fuente": "ICFES - Sistema Académico",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Análisis de resultados institucionales en las pruebas Saber PRO y Saber TyT del ICFES.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación Saber PRO.",
    "esHistorico": false,
    "datasetName": "Anal_tica_Resultados_Saber_PRO___Saber_TyT_2018_20",
    "datasetAbstract": "Datos relacionados con Analítica Resultados Saber PRO - Saber TyT 2018-2019-2020-2021 para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "ICFES - Sistema Académico",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 17,
    "titulo": "Resultados del Análisis y Sistematización de los Aportes al Reglamento Estudiantil V3",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNzNhZjE4NTgtZDlhZi00ZTMxLWEzZGEtZTVkOGQyMTg4MTFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Sistematización y análisis de aportes al proceso de actualización del reglamento estudiantil.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación Reglamento.",
    "esHistorico": false,
    "datasetName": "Resultados_del_An_lisis_y_Sistematizaci_n_de_los_A",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Resultados del Análisis y Sistematización de los Aportes al Reglamento Estudiantil V3.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 18,
    "titulo": "Sesiones Virtuales de la Dirección de Sistemas y Tecnología",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzU1YTY1ZTUtMDcxZC00N2M3LWI3ODItNmQwYTQ0MDQ3NWM3IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "04/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Estadísticas de uso y participación en sesiones virtuales institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Sesiones.",
    "esHistorico": false,
    "datasetName": "Sesiones_Virtuales_de_la_Direcci_n_de_Sistemas_y_T",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Sesiones Virtuales de la Dirección de Sistemas y Tecnología.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 19,
    "titulo": "Microsoft Teams UCundinamarca",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTU2YWQwNDctYTRhZS00ZGZjLWFjMDAtMmNiNWZlMzM3ZDYzIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Microsoft Teams - Analytics",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Análisis de uso y adopción de Microsoft Teams como herramienta de trabajo colaborativo.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Teams.",
    "esHistorico": false,
    "datasetName": "Microsoft_Teams_UCundinamarca",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Microsoft Teams UCundinamarca.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Microsoft Teams - Analytics",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 20,
    "titulo": "ICFES Saber PRO y TyT UCundinamarca",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de la Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNzk2YTg3MTctOTk3My00ZDliLWI0MDEtZGM4MWFkMjE2ZWZiIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "ICFES - Sistema Académico",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de la Información",
    "descripcion": "Análisis de resultados institucionales en las pruebas Saber PRO y Saber TyT del ICFES.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación ICFES.",
    "esHistorico": false,
    "datasetName": "ICFES_Saber_PRO_y_TyT_UCundinamarca",
    "datasetAbstract": "Datos relacionados con ICFES Saber PRO y TyT UCundinamarca para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "ICFES - Sistema Académico",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 21,
    "titulo": "Bienestar Universitario Digital",
    "area": "Dirección de Sistemas y Tecnología - Área de Desarrollo de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWE4YzYzOWUtZThhNy00MGJmLWIxODctYTNiYWE3NDJmZDlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "4/12/2025",
    "fuente": "Sistema de Bienestar Universitario",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Desarrollo de Sistemas de Información",
    "descripcion": "Dashboard de seguimiento de programas y servicios de bienestar universitario.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación BU Digital.",
    "esHistorico": false,
    "datasetName": "Bienestar_Universitario_Digital",
    "datasetAbstract": "Datos relacionados con Bienestar Universitario Digital para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistema de Bienestar Universitario",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 22,
    "titulo": "Sistema de Gestión de Seguridad de la Información - SGSI",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzAyMTE5MzktZWNhNS00ZmQ0LWFjNmMtYjNmNmE4ODViYTQ5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Sistema de Gestión de Seguridad de la Información: seguimiento de indicadores y controles de seguridad.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación SGSI.",
    "esHistorico": false,
    "datasetName": "Sistema_de_Gesti_n_de_Seguridad_de_la_Informaci_n_",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Sistema de Gestión de Seguridad de la Información - SGSI.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 23,
    "titulo": "Inteligencia Emocional UCundinamarca Seccional Girardot",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de la Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTk3ODg3ODctYmU1Yy00Y2QyLThkNTItMzkxMWE5NTMzNDlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de la Información",
    "descripcion": "Evaluación y seguimiento del desarrollo de competencias socioemocionales en estudiantes.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación IE.",
    "esHistorico": false,
    "datasetName": "Inteligencia_Emocional_UCundinamarca_Seccional_Gir",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Inteligencia Emocional UCundinamarca Seccional Girardot.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 24,
    "titulo": "Proceso de Digitalización CADIs",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTVjYzY5YjMtNDg1My00NWQzLTk3OTYtMDY5OGY4MzE4N2U1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Seguimiento de los Centros de Apoyo Digital Institucional y su impacto en la formación.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Digitalización.",
    "esHistorico": false,
    "datasetName": "Proceso_de_Digitalizaci_n_CADIs",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Proceso de Digitalización CADIs.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 25,
    "titulo": "Implementación Cursos Talento Humano",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Gestor",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiM2FkODU4MDktNjVlOC00MGQ5LTk5MWEtMjBmZGViYjI2NDQ0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistema de Gestión de Talento Humano",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Implementación y seguimiento del plan de capacitación y desarrollo del talento humano.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación Cursos TH.",
    "esHistorico": false,
    "datasetName": "Implementaci_n_Cursos_Talento_Humano",
    "datasetAbstract": "Información de gestión del conocimiento y datos del cuerpo docente relacionados con Implementación Cursos Talento Humano.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "identificacion_docente",
        "type": "text",
        "description": "Identificación del docente"
      },
      {
        "name": "nombre_docente",
        "type": "text",
        "description": "Nombre completo del docente"
      },
      {
        "name": "tipo_vinculacion",
        "type": "text",
        "description": "Tipo de vinculación docente"
      },
      {
        "name": "programa_adscrito",
        "type": "text",
        "description": "Programa al que está adscrito"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistema de Gestión de Talento Humano",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 26,
    "titulo": "Dirección de Bienes y Servicios",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYjhiMzZlMWUtNWI3Zi00MGFmLTgzZjgtM2EyNDczNTg4MjZkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9&pageName=ReportSection",
    "fechaActualizacion": "12/11/2023",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Gestión y control de bienes y servicios institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación DBS.",
    "esHistorico": false,
    "datasetName": "Direcci_n_de_Bienes_y_Servicios",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Dirección de Bienes y Servicios.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 27,
    "titulo": "Fanpage Facultades UCundinamarca",
    "area": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNzBhYmE1ZGItZTM4YS00MzdiLWExNmUtOWVkMTI3NmRmODUxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "29/09/2023",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Sistemas de Información",
    "descripcion": "Reporte analítico de Fanpage Facultades UCundinamarca con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Reporte Redes Sociales.",
    "esHistorico": false,
    "datasetName": "Fanpage_Facultades_UCundinamarca",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Fanpage Facultades UCundinamarca.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 28,
    "titulo": "Matriculados Totales",
    "area": "Dirección de Sistemas y Tecnología - Área de Desarrollo",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión de Recursos",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjdlZWI3Y2EtNjIwOS00Y2Y5LTgwOGEtMWE2NDA3OWYwOGM5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Sistemas y Tecnología - Área de Desarrollo",
    "descripcion": "Dashboard institucional de Matriculados Totales con información actualizada y visualizaciones interactivas.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Histórico Matriculados.",
    "esHistorico": false,
    "datasetName": "Matriculados_Totales",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Matriculados Totales.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: OFICINA DE EDUCACIÓN VIRTUAL Y A DISTANCIA
  // ==========================================================================================
  {
    "id": 29,
    "titulo": "Asesor Disciplinar",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzM4YTllZGUtOGQ1Yy00MWQ5LWFkN2UtNWFhMmViY2MxZTVkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Seguimiento del programa de asesorías disciplinares para estudiantes.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Asesorías.",
    "esHistorico": false,
    "datasetName": "Asesor_Disciplinar",
    "datasetAbstract": "Datos relacionados con Asesor Disciplinar para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 30,
    "titulo": "CAI Cátedra Generación Siglo XXI",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWFkODZhODgtOTVmZi00ZTFhLTlmZjgtMDlhZjlhNjA0N2YwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Reporte analítico de CAI Cátedra Generación Siglo XXI con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte CAI.",
    "esHistorico": false,
    "datasetName": "CAI_C_tedra_Generaci_n_Siglo_XXI",
    "datasetAbstract": "Datos relacionados con CAI Cátedra Generación Siglo XXI para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 31,
    "titulo": "CAI Viviendo el MEDIT",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZjdhZmFjYjEtZTUyMi00NzUwLTg0YzItMjEyYjgyNWZjYTBkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Dashboard interactivo de navegación y exploración de datos relacionados con CAI Viviendo el MEDIT.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Navegación MEDIT.",
    "esHistorico": false,
    "datasetName": "CAI_Viviendo_el_MEDIT",
    "datasetAbstract": "Datos relacionados con CAI Viviendo el MEDIT para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 32,
    "titulo": "Campo Multidimensional de Aprendizaje CMA - Pregrado",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMzdlYjNhNDAtYzQzOC00ZmRhLTk5NTktNWQ2YzA4NGI5YTc0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "26/11/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Dashboard interactivo de navegación y exploración de datos relacionados con Campo Multidimensional de Aprendizaje CMA - Pregrado.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Navegación CMA Pregrado.",
    "esHistorico": false,
    "datasetName": "Campo_Multidimensional_de_Aprendizaje_CMA___Pregra",
    "datasetAbstract": "Datos relacionados con Campo Multidimensional de Aprendizaje CMA - Pregrado para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 33,
    "titulo": "Diagnósticos y Nivelatorios",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZWQwOTI0ZDYtZTYxNC00MGFmLWE1OTUtNTM4MzViZDcwNDNkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "27/06/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Reporte analítico de Diagnósticos y Nivelatorios con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte DN.",
    "esHistorico": false,
    "datasetName": "Diagn_sticos_y_Nivelatorios",
    "datasetAbstract": "Datos relacionados con Diagnósticos y Nivelatorios para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 34,
    "titulo": "Ingresos al Campo Multidimensional de Aprendizaje",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMDNjYzVmNjYtYzI4OS00NGEwLWJlNDgtODMzY2M2ZDMzY2Q2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "17/06/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Reporte analítico de Ingresos al Campo Multidimensional de Aprendizaje con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Ingresos CMA.",
    "esHistorico": false,
    "datasetName": "Ingresos_al_Campo_Multidimensional_de_Aprendizaje",
    "datasetAbstract": "Datos relacionados con Ingresos al Campo Multidimensional de Aprendizaje para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 35,
    "titulo": "Monitorias (OEVD)",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjdlNTVkNmItMDMwZi00ZjlkLWJhNzktNWYwMWQyYWY4MGFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Sistema de seguimiento y evaluación del programa de monitorías académicas institucional.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Monitorias.",
    "esHistorico": false,
    "datasetName": "Monitorias__OEVD",
    "datasetAbstract": "Datos relacionados con Monitorias (OEVD) para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 36,
    "titulo": "Tránsito de la Educación Media a la Educación Superior",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiN2IwOWQ0MTAtZjY1Mi00YmRjLTg2MmItYTJlYmZjZDk1YjY1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "28/07/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Reporte analítico de Tránsito de la Educación Media a la Educación Superior con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Transición.",
    "esHistorico": false,
    "datasetName": "Tr_nsito_de_la_Educaci_n_Media_a_la_Educaci_n_Supe",
    "datasetAbstract": "Datos relacionados con Tránsito de la Educación Media a la Educación Superior para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 37,
    "titulo": "Asesor Disciplinar (Detalle)",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTE5MTcyZjAtYjNkNy00ZTE0LTgyMDItNGQ0MGE4OTZlMDk0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Seguimiento del programa de asesorías disciplinares para estudiantes.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Asesorías Detalle.",
    "esHistorico": false,
    "datasetName": "Asesor_Disciplinar__Detalle",
    "datasetAbstract": "Datos relacionados con Asesor Disciplinar (Detalle) para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 38,
    "titulo": "CAI Cátedra Generación Siglo 21 - Estrategia Institucional Saber PRO",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNjQ3ODYwNzItZDRlMi00ZDljLTk1ODQtNjJlMGY1YTI2NTJjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "ICFES - Sistema Académico",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Análisis de resultados institucionales en las pruebas Saber PRO y Saber TyT del ICFES.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte CAI Saber PRO.",
    "esHistorico": false,
    "datasetName": "CAI_C_tedra_Generaci_n_Siglo_21___Estrategia_Insti",
    "datasetAbstract": "Datos relacionados con CAI Cátedra Generación Siglo 21 - Estrategia Institucional Saber PRO para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "ICFES - Sistema Académico",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 39,
    "titulo": "Campo Multidimensional de Aprendizaje CMA - Posgrados",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiY2RiZTJjMzktNGVhOC00YmZhLWFkNzItNTUzOTlhZTYyNTc4IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "19/11/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Información detallada sobre programas de posgrado: oferta, matrícula y graduados.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Navegación CMA Posgrados.",
    "esHistorico": false,
    "datasetName": "Campo_Multidimensional_de_Aprendizaje_CMA___Posgra",
    "datasetAbstract": "Datos relacionados con Campo Multidimensional de Aprendizaje CMA - Posgrados para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 40,
    "titulo": "Cursos Autogestionados",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTBhNThkMTktNmU0OC00YmM5LTkyNDktNGFjMTA5NGFmNTdmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "26/08/202409:34:17",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Seguimiento de la oferta de cursos en modalidad autogestionada.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Cursos.",
    "esHistorico": false,
    "datasetName": "Cursos_Autogestionados",
    "datasetAbstract": "Datos relacionados con Cursos Autogestionados para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: OFICINA DE EDUCACIÓN VIRTUAL Y A DISTANCIA (OFICINA DE GRADUADOS)
  // ==========================================================================================
  {
    "id": 41,
    "titulo": "Graduados UCundinamarca",
    "area": "Oficina de Educación Virtual y a Distancia (Oficina de Graduados)",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZjZkZmQ1MzUtMjA4Yy00OTIzLWE5N2QtMmU4NTE1Y2UwMWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "5/12/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia (Oficina de Graduados)",
    "descripcion": "Caracterización y seguimiento de egresados de la universidad.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Análisis General Graduados.",
    "esHistorico": false,
    "datasetName": "Graduados_UCundinamarca",
    "datasetAbstract": "Datos relacionados con Graduados UCundinamarca para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "fecha_grado",
        "type": "date",
        "description": "Fecha de graduación"
      },
      {
        "name": "opcion_grado",
        "type": "text",
        "description": "Modalidad de opción de grado"
      },
      {
        "name": "distincion",
        "type": "text",
        "description": "Distinción obtenida"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: OFICINA DE EDUCACIÓN VIRTUAL Y A DISTANCIA
  // ==========================================================================================
  {
    "id": 42,
    "titulo": "Informe Final",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzdiN2I2ZWQtOWY4ZS00MWJiLWIyODUtZTViY2Q0ZTc3NDc2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "16/06/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Dashboard interactivo de navegación y exploración de datos relacionados con Informe Final.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Navegación Informes.",
    "esHistorico": false,
    "datasetName": "Informe_Final",
    "datasetAbstract": "Datos relacionados con Informe Final para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 43,
    "titulo": "Insignias Digitales",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYWQ1MmJiNzQtNzJkZS00MzYzLTg4YWEtMjFjOTAxNDMzYWJjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "28/10/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Sistema de reconocimiento mediante insignias digitales de logros académicos.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Insignias.",
    "esHistorico": false,
    "datasetName": "Insignias_Digitales",
    "datasetAbstract": "Datos relacionados con Insignias Digitales para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 44,
    "titulo": "Inventario Recursos Educativos Digitales",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión Administrativa y Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiN2JlODU1MGQtM2FiNi00NWU4LWI1YjItNWVmMGZlMmNlM2I5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Inventario y gestión de recursos educativos digitales institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte RED.",
    "esHistorico": false,
    "datasetName": "Inventario_Recursos_Educativos_Digitales",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Inventario Recursos Educativos Digitales.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 45,
    "titulo": "Posgrados",
    "area": "Oficina de Educación Virtual y a Distancia",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjFiNDQ4ODQtMWE4Mi00YjFmLWJiOTYtYWU1MGViNjQzOWI1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "11/09/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Oficina de Educación Virtual y a Distancia",
    "descripcion": "Información detallada sobre programas de posgrado: oferta, matrícula y graduados.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Posgrados.",
    "esHistorico": false,
    "datasetName": "Posgrados",
    "datasetAbstract": "Datos relacionados con Posgrados para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE SISTEMAS Y TECNOLOGÍA
  // ==========================================================================================
  {
    "id": 46,
    "titulo": "Sistema de Gestión Ambiental Indicadores",
    "area": "Dirección de Sistemas y Tecnología",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión de Recursos",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMDE0YTAyN2ItZWVjZi00MGMyLTkwZWYtOTdlYmNlZTU2MDVmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2025",
    "fuente": "Sistema de Gestión Ambiental",
    "elaboradoPor": "Dirección de Sistemas y Tecnología",
    "descripcion": "Sistema de Gestión Ambiental: seguimiento de indicadores y plan integral de gestión ambiental.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por Dirección de Sistemas y Tecnología. Navegación SGA.",
    "esHistorico": false,
    "datasetName": "Sistema_de_Gesti_n_Ambiental_Indicadores",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Sistema de Gestión Ambiental Indicadores.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistema de Gestión Ambiental",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: SISTEMA DE GESTIÓN AMBIENTAL
  // ==========================================================================================
  {
    "id": 47,
    "titulo": "Plan Integral de Gestión Ambiental -PIGA-",
    "area": "Sistema de Gestión Ambiental",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión Administrativa y Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiNzBiM2U2MDgtNTRlNy00ZmIxLTliZGEtZWYwYzZhNjY5NjFkIiwidCI6IjE5YzMxMzBjLTZjNTgtNGRiZi1iOWEyLTY3OWQzZDBlN2YwMCIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistema de Gestión Ambiental",
    "elaboradoPor": "Sistema de Gestión Ambiental",
    "descripcion": "Sistema de Gestión Ambiental: seguimiento de indicadores y plan integral de gestión ambiental.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte PIGA.",
    "esHistorico": false,
    "datasetName": "Plan_Integral_de_Gesti_n_Ambiental__PIGA",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Plan Integral de Gestión Ambiental -PIGA-.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistema de Gestión Ambiental",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: VICERRECTORÍA ADMINISTRATIVA Y FINANCIERA
  // ==========================================================================================
  {
    "id": 48,
    "titulo": "Seguimiento ABS",
    "area": "Vicerrectoría Administrativa y Financiera - Oficina de Compras",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión de Recursos",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZTJkYjJlNmYtZjY3MC00Y2YxLWI2YzctNzNmMTUyYTlkNGU3IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Vicerrectoría Administrativa y Financiera - Oficina de Compras",
    "descripcion": "Reporte analítico de Seguimiento ABS con información actualizada y métricas institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte ABS.",
    "esHistorico": false,
    "datasetName": "Seguimiento_ABS",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Seguimiento ABS.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE CONTROL INTERNO
  // ==========================================================================================
  {
    "id": 49,
    "titulo": "Matriz Estado de Avance Planes de Mejoramiento",
    "area": "Dirección de Control Interno",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación y Desarrollo Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYzBmNDk1MGYtZjJiYi00OTBlLWI4ZDMtMWVhZDFjMDc0ZGUxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2025",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Control Interno",
    "descripcion": "Sistema de seguimiento al estado de avance de planes de mejoramiento institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Planes Mejoramiento.",
    "esHistorico": false,
    "datasetName": "Matriz_Estado_de_Avance_Planes_de_Mejoramiento",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Matriz Estado de Avance Planes de Mejoramiento.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: VICERRECTORÍA ADMINISTRATIVA Y FINANCIERA
  // ==========================================================================================
  {
    "id": 50,
    "titulo": "Ejecución Activa",
    "area": "Vicerrectoría Administrativa y Financiera - Oficina de Tesorería",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión de Recursos",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiM2UzMWM0ODEtYmMwNC00NzUzLWEyM2YtOThiMzAwZjZmMzRlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Vicerrectoría Administrativa y Financiera - Oficina de Tesorería",
    "descripcion": "Seguimiento de la ejecución presupuestal activa y pasiva de la universidad.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Presupuestal.",
    "esHistorico": false,
    "datasetName": "Ejecuci_n_Activa",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Ejecución Activa.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: VICERRECTORÍA ADMINISTRATIVA Y FINANCIERA
  // ==========================================================================================
  {
    "id": 51,
    "titulo": "Ejecución Pasiva",
    "area": "Vicerrectoría Administrativa y Financiera - Oficina de Presupuesto",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión Administrativa y Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMWE4NGI1N2EtNGY2OC00MmMyLTkzMjMtYWUxZjA5OTk2ZGVhIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Vicerrectoría Administrativa y Financiera - Oficina de Presupuesto",
    "descripcion": "Seguimiento de la ejecución presupuestal activa y pasiva de la universidad.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Presupuestal.",
    "esHistorico": false,
    "datasetName": "Ejecuci_n_Pasiva",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Ejecución Pasiva.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: VICERRECTORÍA ADMINISTRATIVA Y FINANCIERA
  // ==========================================================================================
  {
    "id": 52,
    "titulo": "Planes de Mejoramiento",
    "area": "Vicerrectoría Administrativa y Financiera - Dirección de Control Interno",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación y Desarrollo Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYjFhMTE5MjgtZjRmZS00ZDQzLWE3ZTktNjMyZDdiNjRhODlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Vicerrectoría Administrativa y Financiera - Dirección de Control Interno",
    "descripcion": "Sistema de seguimiento al estado de avance de planes de mejoramiento institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Planes.",
    "esHistorico": false,
    "datasetName": "Planes_de_Mejoramiento",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Planes de Mejoramiento.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: VICERRECTORÍA ADMINISTRATIVA Y FINANCIERA
  // ==========================================================================================
  {
    "id": 53,
    "titulo": "Plan Contratación Mensual 2025",
    "area": "Vicerrectoría Administrativa y Financiera",
    "macroproceso": "Apoyo",
    "subproceso": "Gestión Administrativa y Financiera",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZmNkOWQ1MTItOTM0Yy00YjgyLWFkNGYtNzEwNjBmNzM3YWM2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Vicerrectoría Administrativa y Financiera",
    "descripcion": "Seguimiento al plan de contratación mensual y ejecución contractual.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Reporte Contratación.",
    "esHistorico": false,
    "datasetName": "Plan_Contrataci_n_Mensual_2025",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Plan Contratación Mensual 2025.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: INSTITUTO DE POSGRADOS
  // ==========================================================================================
  {
    "id": 54,
    "titulo": "Conexión Líneas Profundización Pregrado y Programas Posgrado",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTBmN2M3YjctOGFiMS00OWYyLWJkNGItOWVkM2VjNDgyZDIxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Dashboard institucional de Conexión Líneas Profundización Pregrado y Programas Posgrado con información actualizada y visualizaciones interactivas.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Ruta de Aprendizaje.",
    "esHistorico": false,
    "datasetName": "Conexi_n_L_neas_Profundizaci_n_Pregrado_y_Programa",
    "datasetAbstract": "Datos relacionados con Conexión Líneas Profundización Pregrado y Programas Posgrado para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 55,
    "titulo": "Perfil Sociodemográfico de Estudiantes Actuales",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMGE4MjRlOWUtMDM5MC00YmFlLWJlYTEtZTgxNGUzOGVmYTIwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistema Académico Institucional",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Caracterización sociodemográfica de la población estudiantil.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Estudio Sociodemográfico.",
    "esHistorico": false,
    "datasetName": "Perfil_Sociodemogr_fico_de_Estudiantes_Actuales",
    "datasetAbstract": "Datos relacionados con Perfil Sociodemográfico de Estudiantes Actuales para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistema Académico Institucional",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 56,
    "titulo": "Encuesta Satisfacción Programas",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYjEyOTYyN2MtNmZhYy00YjAzLThjNDgtMmU3Yjg1OWM1ZTQwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Encuesta de satisfacción de estudiantes con programas y servicios institucionales.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Estudio Satisfacción.",
    "esHistorico": false,
    "datasetName": "Encuesta_Satisfacci_n_Programas",
    "datasetAbstract": "Datos relacionados con Encuesta Satisfacción Programas para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 57,
    "titulo": "Reporte de Opciones de Grado",
    "area": "Instituto de Posgrados",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiODJlMjM2MTctOWI4NS00NzBjLWE4NTYtNDQxNzdkNzRhMWVmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Instituto de Posgrados",
    "descripcion": "Análisis de las modalidades de grado elegidas por estudiantes de posgrado.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Análisis Opciones de Grado.",
    "esHistorico": false,
    "datasetName": "Reporte_de_Opciones_de_Grado",
    "datasetAbstract": "Datos relacionados con Reporte de Opciones de Grado para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  
  // ==========================================================================================
  // ÁREA: DIRECCIÓN DE PLANEACIÓN INSTITUCIONAL
  // ==========================================================================================
  {
    "id": 58,
    "titulo": "Dirección de Planeación Institucional - Boletín Estadístico XV",
    "area": "Dirección de Planeación Institucional",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación y Desarrollo Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiZTYyOWU0ZGQtNzUxNS00MTdjLTgxMTMtODRjNzc4NThkMTYxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Planeación Institucional",
    "descripcion": "Boletín estadístico institucional con indicadores clave de gestión académica y administrativa.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Boletín Estadístico.",
    "esHistorico": false,
    "datasetName": "Direcci_n_de_Planeaci_n_Institucional___Bolet_n_Es",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Dirección de Planeación Institucional - Boletín Estadístico XV.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 59,
    "titulo": "Indicadores Deserción y Permanencia",
    "area": "Dirección de Planeación Institucional",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación y Desarrollo Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiYTY0MDk3MDAtZDIzMy00MTk3LThlZmItYzgyNzk3YWU3YjNhIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Planeación Institucional",
    "descripcion": "Indicadores institucionales de deserción estudiantil y estrategias de permanencia.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Navegación Indicadores.",
    "esHistorico": false,
    "datasetName": "Indicadores_Deserci_n_y_Permanencia",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con Indicadores Deserción y Permanencia.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 60,
    "titulo": "UCundinamarca - Calendario Institucional 2025",
    "area": "Dirección de Planeación Institucional",
    "macroproceso": "Estratégico",
    "subproceso": "Planeación y Desarrollo Institucional",
    "rol": "Administrativo",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiOTQzMDgxODgtMTFkYS00YWU2LWE2NTAtMjI0OTFiMTBmNWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "01/01/2024",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Planeación Institucional",
    "descripcion": "Calendario institucional con eventos académicos y administrativos relevantes.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. Calendario Eventos.",
    "esHistorico": false,
    "datasetName": "UCundinamarca___Calendario_Institucional_2025",
    "datasetAbstract": "Datos administrativos y de gestión institucional relacionados con UCundinamarca - Calendario Institucional 2025.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "dependencia",
        "type": "text",
        "description": "Dependencia responsable"
      },
      {
        "name": "periodo",
        "type": "text",
        "description": "Periodo de reporte"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      },
      {
        "name": "estado",
        "type": "text",
        "description": "Estado del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },
  {
    "id": 61,
    "titulo": "Campo de Aprendizaje Institucional - Encuentros Dialógicos y Formativos",
    "area": "Dirección de Planeación Institucional",
    "macroproceso": "Misional",
    "subproceso": "Formación y Aprendizaje",
    "rol": "Estudiante",
    "url": "https://app.powerbi.com/view?r=eyJrIjoiMjFlYmIzOTUtMDcyMy00MGNiLTllZjktNTY2ZjM2ZjgxMmVlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9",
    "fechaActualizacion": "No especificada (Uso para consulta)",
    "fuente": "Sistemas de Información Institucionales",
    "elaboradoPor": "Dirección de Planeación Institucional",
    "descripcion": "Dashboard institucional de Campo de Aprendizaje Institucional - Encuentros Dialógicos y Formativos con información actualizada y visualizaciones interactivas.",
    "estado": "Activo",
    "observaciones": "Dashboard gestionado por la dependencia responsable. CAI Encuentros.",
    "esHistorico": false,
    "datasetName": "Campo_de_Aprendizaje_Institucional___Encuentros_Di",
    "datasetAbstract": "Datos relacionados con Campo de Aprendizaje Institucional - Encuentros Dialógicos y Formativos para el seguimiento académico y formativo de estudiantes.",
    "columns": [
      {
        "name": "id_registro",
        "type": "number",
        "description": "Identificador único del registro"
      },
      {
        "name": "codigo_estudiante",
        "type": "text",
        "description": "Código del estudiante"
      },
      {
        "name": "programa_academico",
        "type": "text",
        "description": "Programa académico"
      },
      {
        "name": "periodo_academico",
        "type": "text",
        "description": "Periodo en formato AAAA-P"
      },
      {
        "name": "sede",
        "type": "text",
        "description": "Sede de la universidad"
      },
      {
        "name": "fecha_registro",
        "type": "date",
        "description": "Fecha del registro"
      }
    ],
    "datasetSource": "Sistemas de Información Institucionales",
    "datasetNotes": "Datos actualizados periódicamente según calendario institucional. Los datos históricos se conservan con fines de análisis de tendencias."
  },

  // ==========================================================================================
  // ÁREA DE APOYO: GESTIÓN DE TALENTO HUMANO (DOCENTE)
  // ==========================================================================================
  {
    "id": 62,
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
    "id": 63,
    "titulo": "Implementación Cursos Talento Humano - RH",
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
];
