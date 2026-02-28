// =============================================================
// DATOS DE PLANTA FÍSICA – UCundinamarca
// Fuente: OAPC – UCundinamarca
// Nota técnica: el CSV fuente presenta 14 valores numéricos por
// fila frente a 13 columnas en el encabezado. La columna sin
// nombre (entre M2_AREA_LABORATORIOS y NUM_AULAS_DE_CLASE) se
// excluye de las visualizaciones. Chía es la única sede que
// coincide exactamente con las 13 columnas del encabezado.
// =============================================================

const datosPlantaFisica = [
  {
    sede: 'Fusagasugá',
    m2Total: 56082, m2Util: 78,   m2Deportivo: 9717,
    m2Aulas: 38367, m2Laboratorios: 4038,
    numAulas: 57, asientosPorAula: 40,
    aulasComputo: 10, auditorios: 7,
    laboratorios: 26, aulasEspecializadas: 57,
    puestosAulas: 1904, puestosLab: 834
  },
  {
    sede: 'Facatativá',
    m2Total: 16822, m2Util: 57,   m2Deportivo: 2886,
    m2Aulas: 658,   m2Laboratorios: 1906,
    numAulas: 45, asientosPorAula: 35,
    aulasComputo: 5, auditorios: 1,
    laboratorios: 10, aulasEspecializadas: 40,
    puestosAulas: 1350, puestosLab: 468
  },
  {
    sede: 'Soacha',
    m2Total: 35926, m2Util: 4,    m2Deportivo: 6154,
    m2Aulas: 13795, m2Laboratorios: 5723,
    numAulas: 35, asientosPorAula: 40,
    aulasComputo: 5, auditorios: 3,
    laboratorios: 9, aulasEspecializadas: 39,
    puestosAulas: 1497, puestosLab: 276
  },
  {
    sede: 'Chía',
    m2Total: 20353, m2Util: 4025, m2Deportivo: 3400,
    m2Aulas: 1450,  m2Laboratorios: 700,
    numAulas: 28, asientosPorAula: 40,
    aulasComputo: 7, auditorios: 3,
    laboratorios: 3, aulasEspecializadas: 28,
    puestosAulas: 906, puestosLab: 126
  },
  {
    sede: 'Zipaquirá',
    m2Total: 9442,  m2Util: 15,   m2Deportivo: 227,
    m2Aulas: 0,     m2Laboratorios: 338,
    numAulas: 30, asientosPorAula: 5,
    aulasComputo: 1, auditorios: 4,
    laboratorios: 1, aulasEspecializadas: 57,
    puestosAulas: 333, puestosLab: 11
  },
  {
    sede: 'Girardot',
    m2Total: 10200, m2Util: 83,   m2Deportivo: 3513,
    m2Aulas: 8081,  m2Laboratorios: 1710,
    numAulas: 34, asientosPorAula: 35,
    aulasComputo: 6, auditorios: 4,
    laboratorios: 18, aulasEspecializadas: 34,
    puestosAulas: 1069, puestosLab: 219
  },
  {
    sede: 'Ubaté',
    m2Total: 7577,  m2Util: 21,   m2Deportivo: 2263,
    m2Aulas: 462,   m2Laboratorios: 1136,
    numAulas: 18, asientosPorAula: 40,
    aulasComputo: 8, auditorios: 3,
    laboratorios: 6, aulasEspecializadas: 17,
    puestosAulas: 670, puestosLab: 200
  }
];
