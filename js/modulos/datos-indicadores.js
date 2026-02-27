// ============================================================
// MOTOR DE DATOS DINÁMICOS – Indicadores Institucionales
// ============================================================
// Carga ESTUDIANTES.csv y Planta_Fisica.csv en tiempo real.
// Si el fetch falla (protocolo file:// o sin servidor),
// activa automáticamente el modo fallback con datos estáticos
// integrados, garantizando la visualización en todo entorno.
//
// API pública (globalThis):
//   cargarDatosIndicadores(onEstado?)            → Promise
//   getEstadoCargaIndicadores()                  → 'idle'|'cargando'|'listo'|'fallback'
//   obtenerSedesDisponibles()                    → string[]
//   obtenerAniosDisponibles(filtros?)            → number[]
//   obtenerCategoriasDisponibles()               → string[]
//   obtenerNivelesAcademicosDisponibles(filtros) → string[]
//   calcularSnapshotComunidad(filtros)           → objeto
//   calcularHistoricoIndicadores(filtros)        → array
//   obtenerPlantaFisicaFiltrada(filtros)         → array
// ============================================================

(function () {

  // ── Rutas CSV (relativas a index.html) ─────────────────────
  const _CSV_EST   = 'ESTUDIANTES.csv';
  const _CSV_PLANTA = 'Planta_Fisica.csv';

  // ── Estado interno ──────────────────────────────────────────
  let _rawEst    = null;   // filas parseadas (todas las categorías)
  let _rawPlanta = null;   // objetos campus parseados
  let _estado    = 'idle'; // idle | cargando | listo | fallback
  let _modoFallback = false;

  // ── Normalización sede (CSV Planta no tiene tildes) ─────────
  const _NORM = {
    Fusagasuga: 'Fusagasugá', Facatativa: 'Facatativá',
    Soacha: 'Soacha', Chia: 'Chía', Zipaquira: 'Zipaquirá',
    Girardot: 'Girardot', Ubate: 'Ubaté'
  };

  // ============================================================
  // CARGA ASÍNCRONA
  // ============================================================
  globalThis.cargarDatosIndicadores = async function (onEstado) {
    if (_estado === 'listo' || _estado === 'fallback') {
      onEstado && onEstado(_estado);
      return;
    }
    _estado = 'cargando';
    onEstado && onEstado('cargando');

    try {
      const [rE, rP] = await Promise.all([
        fetch(_CSV_EST),
        fetch(_CSV_PLANTA)
      ]);
      if (!rE.ok || !rP.ok) throw new Error('HTTP ' + rE.status);
      const [tE, tP] = await Promise.all([rE.text(), rP.text()]);

      _rawEst    = _parsearEstudiantes(tE);
      _rawPlanta = _parsearPlanta(tP);
      _estado    = 'listo';
      _modoFallback = false;
      registrarDepuracion('✔ Datos CSV cargados: ' + _rawEst.length + ' registros totales');
    } catch (err) {
      registrarDepuracion('⚠ fetch CSV falló (' + err.message + ') → modo fallback');
      _activarFallback();
    }
    onEstado && onEstado(_estado);
  };

  // ============================================================
  // PARSERS CSV
  // ============================================================

  // ESTUDIANTES.csv: programa puede contener comas sin comillas
  // → parseo desde el final de cada línea para reconstruir el nombre
  function _parsearEstudiantes(texto) {
    const lineas = texto.replace(/\r\n?/g, '\n').trim().split('\n');
    const resultado = [];
    for (let i = 1; i < lineas.length; i++) {
      const p = lineas[i].split(',');
      if (p.length < 8) continue;
      const categoria = p[0].trim();
      const periodo   = p[p.length - 1].trim();
      const anio      = parseInt(p[p.length - 2]);
      const cantidad  = parseInt(p[p.length - 3]);
      if (isNaN(anio) || isNaN(cantidad)) continue;
      resultado.push({
        categoria,
        sede:           p[1].trim(),
        nivel:          p[2].trim(),
        nivelAcademico: p[3].trim(),
        programa:       p.slice(4, p.length - 3).join(',').trim(),
        cantidad, anio, periodo
      });
    }
    return resultado;
  }

  // Planta_Fisica.csv: anomalía de columna extra (ver nota en planta_fisica.js)
  function _parsearPlanta(texto) {
    const lineas = texto.replace(/\r\n?/g, '\n').trim().split('\n').slice(1);
    return lineas.filter(l => l.trim()).map(linea => {
      const p     = linea.split(',');
      const sede  = _NORM[p[0].trim()] || p[0].trim();
      const n     = p.slice(1).map(v => parseInt(v.trim()));
      const extra = n.length >= 14 ? 1 : 0; // columna sin nombre en el encabezado
      return {
        sede,
        m2Total: n[0], m2Util: n[1], m2Deportivo: n[2],
        m2Aulas: n[3], m2Laboratorios: n[4],
        numAulas: n[5 + extra], asientosPorAula: n[6 + extra],
        aulasComputo: n[7 + extra], auditorios: n[8 + extra],
        laboratorios: n[9 + extra], aulasEspecializadas: n[10 + extra],
        puestosAulas: n[11 + extra], puestosLab: n[12 + extra]
      };
    });
  }

  // ============================================================
  // MODO FALLBACK (datos embebidos)
  // ============================================================
  function _activarFallback() {
    _rawEst    = _FB_ROWS.slice();
    _rawPlanta = _FB_PLANTA.slice();
    _estado    = 'fallback';
    _modoFallback = true;
  }

  // ============================================================
  // API PÚBLICA
  // ============================================================

  globalThis.getEstadoCargaIndicadores = () => _estado;

  globalThis.obtenerSedesDisponibles = function () {
    if (!_rawEst) return [];
    return [...new Set(_rawEst.map(r => r.sede))].sort();
  };

  globalThis.obtenerAniosDisponibles = function (filtros = {}) {
    if (!_rawEst) return [];
    let d = _rawEst;
    if (filtros.sede && filtros.sede !== 'todas') d = d.filter(r => r.sede === filtros.sede);
    return [...new Set(d.map(r => r.anio))].sort((a, b) => a - b);
  };

  globalThis.obtenerCategoriasDisponibles = function () {
    if (!_rawEst) return ['Matriculados'];
    return [...new Set(_rawEst.map(r => r.categoria || 'Matriculados'))].sort();
  };

  globalThis.obtenerNivelesAcademicosDisponibles = function (filtros = {}) {
    if (!_rawEst) return [];
    const cat = filtros.categoria || 'Matriculados';
    let d = _rawEst;
    if (filtros.sede  && filtros.sede  !== 'todas') d = d.filter(r => r.sede  === filtros.sede);
    if (filtros.nivel && filtros.nivel !== 'todos') d = d.filter(r => r.nivel === filtros.nivel);
    d = d.filter(r => (r.categoria || 'Matriculados') === cat);
    return [...new Set(d.map(r => r.nivelAcademico))].sort();
  };

  // --- Snapshot de comunidad (Tab 1) ---
  globalThis.calcularSnapshotComunidad = function (filtros = {}) {
    if (!_rawEst) return null;

    const cat = filtros.categoria || 'Matriculados';
    let d = _rawEst;
    if (filtros.sede           && filtros.sede           !== 'todas') d = d.filter(r => r.sede           === filtros.sede);
    if (filtros.nivel          && filtros.nivel          !== 'todos') d = d.filter(r => r.nivel          === filtros.nivel);
    if (filtros.nivelAcademico && filtros.nivelAcademico !== 'todos') d = d.filter(r => r.nivelAcademico === filtros.nivelAcademico);
    // En fallback _FB_ROWS no tiene campo categoria → se asume Matriculados
    d = d.filter(r => (r.categoria || 'Matriculados') === cat);

    // Determinar año de referencia
    const aniosDisp = [...new Set(d.map(r => r.anio))].sort((a, b) => a - b);
    const anio = (filtros.anio && aniosDisp.includes(+filtros.anio))
      ? +filtros.anio
      : (aniosDisp[aniosDisp.length - 1] || 2025);

    // Filtrar por año y período
    const periodos = (!filtros.periodo || filtros.periodo === 'ambos')
      ? ['IPA', 'IIPA'] : [filtros.periodo];
    d = d.filter(r => r.anio === anio && periodos.includes(r.periodo));

    const total    = d.reduce((s, r) => s + r.cantidad, 0);
    const pregrado = d.filter(r => r.nivel === 'Pregrado').reduce((s, r) => s + r.cantidad, 0);
    const posgrado = d.filter(r => r.nivel === 'Posgrado').reduce((s, r) => s + r.cantidad, 0);

    const porPrograma = {};
    d.forEach(r => { porPrograma[r.programa] = (porPrograma[r.programa] || 0) + r.cantidad; });
    const programasTop = Object.entries(porPrograma).sort(([, a], [, b]) => b - a);

    const porSede = {};
    d.forEach(r => {
      if (!porSede[r.sede]) porSede[r.sede] = { pregrado: 0, posgrado: 0, total: 0 };
      porSede[r.sede].total += r.cantidad;
      if (r.nivel === 'Pregrado') porSede[r.sede].pregrado += r.cantidad;
      else porSede[r.sede].posgrado += r.cantidad;
    });

    return { anio, periodos, total, pregrado, posgrado, programasTop, porSede, categoria: cat };
  };

  // --- Serie histórica (Tab 3) ---
  globalThis.calcularHistoricoIndicadores = function (filtros = {}) {
    const cat = filtros.categoria || 'Matriculados';
    // En fallback: solo disponible para Matriculados (datos pre-agregados)
    if (_modoFallback) {
      if (cat !== 'Matriculados') return [];
      return _FB_HISTORICO.slice();
    }

    if (!_rawEst) return [];
    let d = _rawEst;
    if (filtros.sede  && filtros.sede  !== 'todas') d = d.filter(r => r.sede  === filtros.sede);
    if (filtros.nivel && filtros.nivel !== 'todos') d = d.filter(r => r.nivel === filtros.nivel);
    d = d.filter(r => (r.categoria || 'Matriculados') === cat);

    const mapa = {};
    d.forEach(r => {
      const k = r.anio + '_' + r.periodo;
      if (!mapa[k]) mapa[k] = { anio: r.anio, periodo: r.periodo, total: 0, pregrado: 0, posgrado: 0 };
      mapa[k].total += r.cantidad;
      if (r.nivel === 'Pregrado') mapa[k].pregrado += r.cantidad;
      else mapa[k].posgrado += r.cantidad;
    });

    return Object.values(mapa).sort((a, b) =>
      a.anio !== b.anio ? a.anio - b.anio : a.periodo.localeCompare(b.periodo)
    );
  };

  // --- Infraestructura (Tab 2) ---
  globalThis.obtenerPlantaFisicaFiltrada = function (filtros = {}) {
    if (!_rawPlanta) return [];
    if (filtros.sede && filtros.sede !== 'todas') return _rawPlanta.filter(r => r.sede === filtros.sede);
    return _rawPlanta;
  };

  // ============================================================
  // DATOS EMBEBIDOS (FALLBACK)
  // ============================================================
  // Snapshot Matriculados 2025-IIPA (57 registros)
  const _FB_ROWS = [
    { sede:'Chía',       nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas y computación',                                                                     cantidad:677,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas y computación',                                                                     cantidad:670,  anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Contaduría publica',                                                                                       cantidad:670,  anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Administración de empresas',                                                                               cantidad:634,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Administración de empresas',                                                                               cantidad:633,  anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Profesional en ciencias del deporte',                                                                      cantidad:631,  anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas y computación',                                                                     cantidad:608,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Contaduría pública',                                                                                       cantidad:561,  anio:2025, periodo:'IIPA' },
    { sede:'Chía',       nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Administración de empresas',                                                                               cantidad:532,  anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería industrial',                                                                                    cantidad:480,  anio:2025, periodo:'IIPA' },
    { sede:'Girardot',   nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Administración de empresas',                                                                               cantidad:457,  anio:2025, periodo:'IIPA' },
    { sede:'Girardot',   nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Enfermería',                                                                                               cantidad:390,  anio:2025, periodo:'IIPA' },
    { sede:'Ubaté',      nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Contaduría publica',                                                                                       cantidad:386,  anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de software',                                                                                   cantidad:375,  anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Psicología',                                                                                              cantidad:368,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería electrónica',                                                                                   cantidad:334,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Zootecnia',                                                                                               cantidad:324,  anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería ambiental',                                                                                     cantidad:322,  anio:2025, periodo:'IIPA' },
    { sede:'Chía',       nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Contaduría publica',                                                                                       cantidad:321,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería agronómica',                                                                                    cantidad:318,  anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería agronómica',                                                                                    cantidad:289,  anio:2025, periodo:'IIPA' },
    { sede:'Ubaté',      nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas y computación',                                                                     cantidad:287,  anio:2025, periodo:'IIPA' },
    { sede:'Ubaté',      nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Administración de empresas',                                                                               cantidad:281,  anio:2025, periodo:'IIPA' },
    { sede:'Ubaté',      nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Zootecnia',                                                                                               cantidad:275,  anio:2025, periodo:'IIPA' },
    { sede:'Girardot',   nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de software',                                                                                   cantidad:256,  anio:2025, periodo:'IIPA' },
    { sede:'Girardot',   nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería ambiental',                                                                                     cantidad:253,  anio:2025, periodo:'IIPA' },
    { sede:'Chía',       nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería industrial',                                                                                    cantidad:218,  anio:2025, periodo:'IIPA' },
    { sede:'Zipaquirá',  nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Música',                                                                                                  cantidad:214,  anio:2025, periodo:'IIPA' },
    { sede:'Chía',       nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería mecatrónica',                                                                                   cantidad:180,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Licenciatura',              programa:'Licenciatura en ciencias sociales',                                                                        cantidad:171,  anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Administración de empresas',                                                                               cantidad:137,  anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Licenciatura',              programa:'Licenciatura en educación básica con énfasis en educación física, recreación y deportes',                  cantidad:134,  anio:2025, periodo:'IIPA' },
    { sede:'Chía',       nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas',                                                                                   cantidad:68,   anio:2025, periodo:'IIPA' },
    { sede:'Ubaté',      nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas',                                                                                   cantidad:57,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en gerencia para la transformación digital',                                               cantidad:51,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en gestión pública',                                                                      cantidad:45,   anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Tecnológico',               programa:'Tecnología en desarrollo de software',                                                                     cantidad:42,   anio:2025, periodo:'IIPA' },
    { sede:'Ubaté',      nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Medicina veterinaria y zootecnia',                                                                         cantidad:41,   anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Contaduría pública',                                                                                       cantidad:39,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en analítica aplicada a negocios',                                                        cantidad:32,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en metodologías de calidad para el desarrollo del software',                               cantidad:24,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en marketing digital',                                                                     cantidad:22,   anio:2025, periodo:'IIPA' },
    { sede:'Soacha',     nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería topográfica y geomática',                                                                       cantidad:22,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en analítica y ciencia de datos',                                                         cantidad:22,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Doctorado',                 programa:'Doctorado en ciencias de la educación',                                                                   cantidad:18,   anio:2025, periodo:'IIPA' },
    { sede:'Facatativá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en gerencia para el desarrollo organizacional',                                            cantidad:14,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en infraestructura y seguridad de redes',                                                 cantidad:10,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en agroecología y desarrollo agroecoturístico',                                           cantidad:10,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en agronegocios sostenibles',                                                             cantidad:10,   anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en educación ambiental y desarrollo de la comunidad',                                     cantidad:8,    anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Profesional universitario', programa:'Ingeniería de sistemas',                                                                                   cantidad:8,    anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Maestría',                  programa:'Maestría en educación',                                                                                   cantidad:5,    anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Especialización',           programa:'Especialización en gerencia financiera y contable',                                                       cantidad:4,    anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Posgrado', nivelAcademico:'Maestría',                  programa:'Maestría en ciencias ambientales',                                                                        cantidad:4,    anio:2025, periodo:'IIPA' },
    { sede:'Girardot',   nivel:'Pregrado', nivelAcademico:'Tecnológico',               programa:'Tecnología en gestión turística y hotelera',                                                              cantidad:3,    anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Licenciatura',              programa:'Licenciatura en educación básica con énfasis en ciencias sociales',                                       cantidad:2,    anio:2025, periodo:'IIPA' },
    { sede:'Fusagasugá', nivel:'Pregrado', nivelAcademico:'Tecnológico',               programa:'Tecnología en cartografía',                                                                               cantidad:2,    anio:2025, periodo:'IIPA' }
  ];

  // Serie histórica 2007-2025 (agregados totales sin desglose por sede)
  const _FB_HISTORICO = [
    { anio:2007, periodo:'IPA',  total:8984,  pregrado:8984,  posgrado:0   },
    { anio:2007, periodo:'IIPA', total:8860,  pregrado:8860,  posgrado:0   },
    { anio:2008, periodo:'IPA',  total:8864,  pregrado:8863,  posgrado:1   },
    { anio:2008, periodo:'IIPA', total:9188,  pregrado:8984,  posgrado:204 },
    { anio:2009, periodo:'IPA',  total:9491,  pregrado:9227,  posgrado:264 },
    { anio:2009, periodo:'IIPA', total:9347,  pregrado:9347,  posgrado:0   },
    { anio:2010, periodo:'IPA',  total:9464,  pregrado:9462,  posgrado:2   },
    { anio:2010, periodo:'IIPA', total:9606,  pregrado:9603,  posgrado:3   },
    { anio:2011, periodo:'IPA',  total:10067, pregrado:10064, posgrado:3   },
    { anio:2011, periodo:'IIPA', total:9910,  pregrado:9906,  posgrado:4   },
    { anio:2012, periodo:'IPA',  total:10105, pregrado:9999,  posgrado:106 },
    { anio:2012, periodo:'IIPA', total:10484, pregrado:10476, posgrado:8   },
    { anio:2013, periodo:'IPA',  total:11108, pregrado:10920, posgrado:188 },
    { anio:2013, periodo:'IIPA', total:11698, pregrado:11552, posgrado:146 },
    { anio:2014, periodo:'IPA',  total:12283, pregrado:12128, posgrado:155 },
    { anio:2014, periodo:'IIPA', total:12472, pregrado:12308, posgrado:164 },
    { anio:2015, periodo:'IPA',  total:13034, pregrado:12834, posgrado:200 },
    { anio:2015, periodo:'IIPA', total:12957, pregrado:12760, posgrado:197 },
    { anio:2016, periodo:'IPA',  total:13346, pregrado:13179, posgrado:167 },
    { anio:2016, periodo:'IIPA', total:13550, pregrado:13235, posgrado:315 },
    { anio:2017, periodo:'IPA',  total:14020, pregrado:13567, posgrado:453 },
    { anio:2017, periodo:'IIPA', total:13735, pregrado:13298, posgrado:437 },
    { anio:2018, periodo:'IPA',  total:13723, pregrado:13314, posgrado:409 },
    { anio:2018, periodo:'IIPA', total:13500, pregrado:13228, posgrado:272 },
    { anio:2019, periodo:'IPA',  total:13162, pregrado:12880, posgrado:282 },
    { anio:2019, periodo:'IIPA', total:13415, pregrado:13154, posgrado:261 },
    { anio:2020, periodo:'IPA',  total:13242, pregrado:12940, posgrado:302 },
    { anio:2020, periodo:'IIPA', total:13283, pregrado:13039, posgrado:244 },
    { anio:2021, periodo:'IPA',  total:13319, pregrado:13105, posgrado:214 },
    { anio:2021, periodo:'IIPA', total:13589, pregrado:13336, posgrado:253 },
    { anio:2022, periodo:'IPA',  total:13002, pregrado:12768, posgrado:234 },
    { anio:2022, periodo:'IIPA', total:12859, pregrado:12579, posgrado:280 },
    { anio:2023, periodo:'IPA',  total:12564, pregrado:12289, posgrado:275 },
    { anio:2023, periodo:'IIPA', total:12108, pregrado:11850, posgrado:258 },
    { anio:2024, periodo:'IPA',  total:11990, pregrado:11768, posgrado:222 },
    { anio:2024, periodo:'IIPA', total:12115, pregrado:11934, posgrado:181 },
    { anio:2025, periodo:'IPA',  total:12446, pregrado:12252, posgrado:194 },
    { anio:2025, periodo:'IIPA', total:12949, pregrado:12670, posgrado:279 }
  ];

  // Planta física por campus (snapshot OAPC)
  const _FB_PLANTA = [
    { sede:'Fusagasugá', m2Total:56082, m2Util:78,   m2Deportivo:9717,  m2Aulas:38367, m2Laboratorios:4038, numAulas:57, asientosPorAula:40, aulasComputo:10, auditorios:7, laboratorios:26, aulasEspecializadas:57, puestosAulas:1904, puestosLab:834 },
    { sede:'Facatativá', m2Total:16822, m2Util:57,   m2Deportivo:2886,  m2Aulas:658,   m2Laboratorios:1906, numAulas:45, asientosPorAula:35, aulasComputo:5,  auditorios:1, laboratorios:10, aulasEspecializadas:40, puestosAulas:1350, puestosLab:468 },
    { sede:'Soacha',     m2Total:35926, m2Util:4,    m2Deportivo:6154,  m2Aulas:13795, m2Laboratorios:5723, numAulas:35, asientosPorAula:40, aulasComputo:5,  auditorios:3, laboratorios:9,  aulasEspecializadas:39, puestosAulas:1497, puestosLab:276 },
    { sede:'Chía',       m2Total:20353, m2Util:4025, m2Deportivo:3400,  m2Aulas:1450,  m2Laboratorios:700,  numAulas:28, asientosPorAula:40, aulasComputo:7,  auditorios:3, laboratorios:3,  aulasEspecializadas:28, puestosAulas:906,  puestosLab:126 },
    { sede:'Zipaquirá',  m2Total:9442,  m2Util:15,   m2Deportivo:227,   m2Aulas:0,     m2Laboratorios:338,  numAulas:30, asientosPorAula:5,  aulasComputo:1,  auditorios:4, laboratorios:1,  aulasEspecializadas:57, puestosAulas:333,  puestosLab:11  },
    { sede:'Girardot',   m2Total:10200, m2Util:83,   m2Deportivo:3513,  m2Aulas:8081,  m2Laboratorios:1710, numAulas:34, asientosPorAula:35, aulasComputo:6,  auditorios:4, laboratorios:18, aulasEspecializadas:34, puestosAulas:1069, puestosLab:219 },
    { sede:'Ubaté',      m2Total:7577,  m2Util:21,   m2Deportivo:2263,  m2Aulas:462,   m2Laboratorios:1136, numAulas:18, asientosPorAula:40, aulasComputo:8,  auditorios:3, laboratorios:6,  aulasEspecializadas:17, puestosAulas:670,  puestosLab:200 }
  ];

  registrarDepuracion('✔ Motor datos-indicadores.js cargado');

})(); // fin IIFE
