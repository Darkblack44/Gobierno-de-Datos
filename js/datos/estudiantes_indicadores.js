// =============================================================
// DATOS DE ESTUDIANTES MATRICULADOS – UCundinamarca
// Fuente: SNIES – Ministerio de Educación Nacional
// Categoría usada: Matriculados (excluye Inscritos, Admitidos, Graduados)
// Período de referencia principal: 2025-IIPA
// Generado a partir de ESTUDIANTES.csv (11 169 filas)
// =============================================================

// ------------------------------------------------------------------
// 1. SNAPSHOT 2025-IIPA: 57 registros por programa
//    Campos: sede, nivel, nivelAcademico, programa, cantidad
// ------------------------------------------------------------------
const matriculados2025 = [
  { sede: 'Chía',        nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas y computación',                                                                      cantidad: 677 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas y computación',                                                                      cantidad: 670 },
  { sede: 'Facatativá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Contaduría publica',                                                                                        cantidad: 670 },
  { sede: 'Facatativá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Administración de empresas',                                                                                cantidad: 634 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Administración de empresas',                                                                                cantidad: 633 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Profesional en ciencias del deporte',                                                                       cantidad: 631 },
  { sede: 'Facatativá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas y computación',                                                                      cantidad: 608 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Contaduría pública',                                                                                        cantidad: 561 },
  { sede: 'Chía',        nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Administración de empresas',                                                                                cantidad: 532 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería industrial',                                                                                     cantidad: 480 },
  { sede: 'Girardot',    nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Administración de empresas',                                                                                cantidad: 457 },
  { sede: 'Girardot',    nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Enfermería',                                                                                                cantidad: 390 },
  { sede: 'Ubaté',       nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Contaduría publica',                                                                                        cantidad: 386 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de software',                                                                                    cantidad: 375 },
  { sede: 'Facatativá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Psicología',                                                                                               cantidad: 368 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería electrónica',                                                                                    cantidad: 334 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Zootecnia',                                                                                                cantidad: 324 },
  { sede: 'Facatativá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería ambiental',                                                                                      cantidad: 322 },
  { sede: 'Chía',        nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Contaduría publica',                                                                                        cantidad: 321 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería agronómica',                                                                                     cantidad: 318 },
  { sede: 'Facatativá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería agronómica',                                                                                     cantidad: 289 },
  { sede: 'Ubaté',       nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas y computación',                                                                      cantidad: 287 },
  { sede: 'Ubaté',       nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Administración de empresas',                                                                                cantidad: 281 },
  { sede: 'Ubaté',       nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Zootecnia',                                                                                                cantidad: 275 },
  { sede: 'Girardot',    nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de software',                                                                                    cantidad: 256 },
  { sede: 'Girardot',    nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería ambiental',                                                                                      cantidad: 253 },
  { sede: 'Chía',        nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería industrial',                                                                                     cantidad: 218 },
  { sede: 'Zipaquirá',   nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Música',                                                                                                   cantidad: 214 },
  { sede: 'Chía',        nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería mecatrónica',                                                                                    cantidad: 180 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Licenciatura',              programa: 'Licenciatura en ciencias sociales',                                                                         cantidad: 171 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Administración de empresas',                                                                                cantidad: 137 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Licenciatura',              programa: 'Licenciatura en educación básica con énfasis en educación física, recreación y deportes',                   cantidad: 134 },
  { sede: 'Chía',        nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas',                                                                                    cantidad: 68 },
  { sede: 'Ubaté',       nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas',                                                                                    cantidad: 57 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en gerencia para la transformación digital',                                                cantidad: 51 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en gestión pública',                                                                       cantidad: 45 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Tecnológico',               programa: 'Tecnología en desarrollo de software',                                                                      cantidad: 42 },
  { sede: 'Ubaté',       nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Medicina veterinaria y zootecnia',                                                                          cantidad: 41 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Contaduría pública',                                                                                        cantidad: 39 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en analítica aplicada a negocios',                                                         cantidad: 32 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en metodologías de calidad para el desarrollo del software',                                cantidad: 24 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en marketing digital',                                                                      cantidad: 22 },
  { sede: 'Soacha',      nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería topográfica y geomática',                                                                        cantidad: 22 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en analítica y ciencia de datos',                                                          cantidad: 22 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Doctorado',                 programa: 'Doctorado en ciencias de la educación',                                                                    cantidad: 18 },
  { sede: 'Facatativá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en gerencia para el desarrollo organizacional',                                             cantidad: 14 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en infraestructura y seguridad de redes',                                                  cantidad: 10 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en agroecología y desarrollo agroecoturístico',                                            cantidad: 10 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en agronegocios sostenibles',                                                              cantidad: 10 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en educación ambiental y desarrollo de la comunidad',                                      cantidad: 8 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Profesional universitario', programa: 'Ingeniería de sistemas',                                                                                    cantidad: 8 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Maestría',                  programa: 'Maestría en educación',                                                                                    cantidad: 5 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Especialización',           programa: 'Especialización en gerencia financiera y contable',                                                        cantidad: 4 },
  { sede: 'Fusagasugá',  nivel: 'Posgrado',  nivelAcademico: 'Maestría',                  programa: 'Maestría en ciencias ambientales',                                                                         cantidad: 4 },
  { sede: 'Girardot',    nivel: 'Pregrado',  nivelAcademico: 'Tecnológico',               programa: 'Tecnología en gestión turística y hotelera',                                                               cantidad: 3 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Licenciatura',              programa: 'Licenciatura en educación básica con énfasis en ciencias sociales',                                        cantidad: 2 },
  { sede: 'Fusagasugá',  nivel: 'Pregrado',  nivelAcademico: 'Tecnológico',               programa: 'Tecnología en cartografía',                                                                                cantidad: 2 }
];

// ------------------------------------------------------------------
// 2. SERIE HISTÓRICA: totales anuales por período (2007-2025)
//    Fuente: SNIES – solo Matriculados
// ------------------------------------------------------------------
const historico = [
  { anio: 2007, periodo: 'IPA',  total: 8984,  pregrado: 8984,  posgrado: 0 },
  { anio: 2007, periodo: 'IIPA', total: 8860,  pregrado: 8860,  posgrado: 0 },
  { anio: 2008, periodo: 'IPA',  total: 8864,  pregrado: 8863,  posgrado: 1 },
  { anio: 2008, periodo: 'IIPA', total: 9188,  pregrado: 8984,  posgrado: 204 },
  { anio: 2009, periodo: 'IPA',  total: 9491,  pregrado: 9227,  posgrado: 264 },
  { anio: 2009, periodo: 'IIPA', total: 9347,  pregrado: 9347,  posgrado: 0 },
  { anio: 2010, periodo: 'IPA',  total: 9464,  pregrado: 9462,  posgrado: 2 },
  { anio: 2010, periodo: 'IIPA', total: 9606,  pregrado: 9603,  posgrado: 3 },
  { anio: 2011, periodo: 'IPA',  total: 10067, pregrado: 10064, posgrado: 3 },
  { anio: 2011, periodo: 'IIPA', total: 9910,  pregrado: 9906,  posgrado: 4 },
  { anio: 2012, periodo: 'IPA',  total: 10105, pregrado: 9999,  posgrado: 106 },
  { anio: 2012, periodo: 'IIPA', total: 10484, pregrado: 10476, posgrado: 8 },
  { anio: 2013, periodo: 'IPA',  total: 11108, pregrado: 10920, posgrado: 188 },
  { anio: 2013, periodo: 'IIPA', total: 11698, pregrado: 11552, posgrado: 146 },
  { anio: 2014, periodo: 'IPA',  total: 12283, pregrado: 12128, posgrado: 155 },
  { anio: 2014, periodo: 'IIPA', total: 12472, pregrado: 12308, posgrado: 164 },
  { anio: 2015, periodo: 'IPA',  total: 13034, pregrado: 12834, posgrado: 200 },
  { anio: 2015, periodo: 'IIPA', total: 12957, pregrado: 12760, posgrado: 197 },
  { anio: 2016, periodo: 'IPA',  total: 13346, pregrado: 13179, posgrado: 167 },
  { anio: 2016, periodo: 'IIPA', total: 13550, pregrado: 13235, posgrado: 315 },
  { anio: 2017, periodo: 'IPA',  total: 14020, pregrado: 13567, posgrado: 453 },
  { anio: 2017, periodo: 'IIPA', total: 13735, pregrado: 13298, posgrado: 437 },
  { anio: 2018, periodo: 'IPA',  total: 13723, pregrado: 13314, posgrado: 409 },
  { anio: 2018, periodo: 'IIPA', total: 13500, pregrado: 13228, posgrado: 272 },
  { anio: 2019, periodo: 'IPA',  total: 13162, pregrado: 12880, posgrado: 282 },
  { anio: 2019, periodo: 'IIPA', total: 13415, pregrado: 13154, posgrado: 261 },
  { anio: 2020, periodo: 'IPA',  total: 13242, pregrado: 12940, posgrado: 302 },
  { anio: 2020, periodo: 'IIPA', total: 13283, pregrado: 13039, posgrado: 244 },
  { anio: 2021, periodo: 'IPA',  total: 13319, pregrado: 13105, posgrado: 214 },
  { anio: 2021, periodo: 'IIPA', total: 13589, pregrado: 13336, posgrado: 253 },
  { anio: 2022, periodo: 'IPA',  total: 13002, pregrado: 12768, posgrado: 234 },
  { anio: 2022, periodo: 'IIPA', total: 12859, pregrado: 12579, posgrado: 280 },
  { anio: 2023, periodo: 'IPA',  total: 12564, pregrado: 12289, posgrado: 275 },
  { anio: 2023, periodo: 'IIPA', total: 12108, pregrado: 11850, posgrado: 258 },
  { anio: 2024, periodo: 'IPA',  total: 11990, pregrado: 11768, posgrado: 222 },
  { anio: 2024, periodo: 'IIPA', total: 12115, pregrado: 11934, posgrado: 181 },
  { anio: 2025, periodo: 'IPA',  total: 12446, pregrado: 12252, posgrado: 194 },
  { anio: 2025, periodo: 'IIPA', total: 12949, pregrado: 12670, posgrado: 279 }
];

// ------------------------------------------------------------------
// 3. RESUMEN POR SEDE – 2025-IIPA (calculado del snapshot)
// ------------------------------------------------------------------
const resumenPorSede2025 = [
  { sede: 'Fusagasugá', pregrado: 3157, posgrado: 265, total: 3422 },
  { sede: 'Facatativá', pregrado: 2891, posgrado:  14, total: 2905 },
  { sede: 'Chía',       pregrado: 1996, posgrado:   0, total: 1996 },
  { sede: 'Soacha',     pregrado: 1726, posgrado:   0, total: 1726 },
  { sede: 'Ubaté',      pregrado: 1327, posgrado:   0, total: 1327 },
  { sede: 'Girardot',   pregrado: 1359, posgrado:   0, total: 1359 },
  { sede: 'Zipaquirá',  pregrado:  214, posgrado:   0, total:  214 }
];
