// ============================================================
// MOTOR DE DATOS DINÁMICOS – Indicadores Institucionales
// ============================================================
// Carga ESTUDIANTES.csv y Planta_Fisica.csv en tiempo real.
// Si los archivos no están disponibles (ej: protocolo file://), el estado pasa a 'error'
// y todas las APIs devuelven null/[] — la UI muestra estado vacío controlado (–).
//
// API pública (globalThis):
//   cargarDatosIndicadores(onEstado?)            → Promise
//   getEstadoCargaIndicadores()                  → 'idle'|'cargando'|'listo'|'error'
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
  let _estado    = 'idle'; // idle | cargando | listo | error

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
    if (_estado === 'listo' || _estado === 'error') {
      onEstado?.(_estado);
      return;
    }
    _estado = 'cargando';
    onEstado?.('cargando');

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
      registrarDepuracion('✔ Datos CSV cargados: ' + _rawEst.length + ' registros totales');
    } catch (err) {
      console.error(
        '⚠ DATOS INDICADORES: No se pudo cargar el CSV (' + err.message + ').\n' +
        '  Causa probable: el portal se abrió con protocolo file://\n' +
        '  Solución: usa "Open with Live Server" en VSCode o cualquier servidor local.'
      );
      registrarDepuracion('⚠ fetch CSV falló (' + err.message + ') → modo fallback');
      _activarFallback();
    }
    onEstado?.(_estado);
  };

  // ============================================================
  // PARSERS CSV
  // ============================================================

  // ESTUDIANTES.csv: programa puede contener comas sin comillas
  // → parseo desde el final de cada línea para reconstruir el nombre
  function _parsearEstudiantes(texto) {
    const lineas = texto.replaceAll(/\r\n?/g, '\n').trim().split('\n');
    const resultado = [];
    for (let i = 1; i < lineas.length; i++) {
      const p = lineas[i].split(',');
      if (p.length < 8) continue;
      const categoria = p[0].trim();
      const periodo   = p[p.length - 1].trim();
      const anio      = Number.parseInt(p[p.length - 2]);
      const cantidad  = Number.parseInt(p[p.length - 3]);
      if (Number.isNaN(anio) || Number.isNaN(cantidad)) continue;
      resultado.push({
        categoria,
        sede:           p[1].trim(),
        nivel:          p[2].trim(),
        nivelAcademico: p[3].trim(),
        programa:       p.slice(4, -3).join(',').trim(),
        cantidad, anio, periodo
      });
    }
    return resultado;
  }

  // Planta_Fisica.csv: anomalía de columna extra (ver nota en planta_fisica.js)
  function _parsearPlanta(texto) {
    const lineas = texto.replaceAll(/\r\n?/g, '\n').trim().split('\n').slice(1);
    return lineas.filter(l => l.trim()).map(linea => {
      const p     = linea.split(',');
      const sede  = _NORM[p[0].trim()] || p[0].trim();
      const n     = p.slice(1).map(v => Number.parseInt(v.trim()));
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
  // ERROR DE CARGA → estado vacío controlado
  // ============================================================
  function _activarFallback() {
    _rawEst    = null;
    _rawPlanta = null;
    _estado    = 'error';
  }

  // ============================================================
  // API PÚBLICA
  // ============================================================

  globalThis.getEstadoCargaIndicadores = () => _estado;

  globalThis.obtenerSedesDisponibles = function () {
    if (!_rawEst) return [];
    return [...new Set(_rawEst.map(r => r.sede))].sort((a, b) => a.localeCompare(b, 'es'));
  };

  globalThis.obtenerAniosDisponibles = function (filtros = {}) {
    if (!_rawEst) return [];
    let d = _rawEst;
    if (filtros.sede && filtros.sede !== 'todas') d = d.filter(r => r.sede === filtros.sede);
    return [...new Set(d.map(r => r.anio))].sort((a, b) => a - b);
  };

  globalThis.obtenerCategoriasDisponibles = function () {
    if (!_rawEst) return ['Matriculados'];
    return [...new Set(_rawEst.map(r => r.categoria || 'Matriculados'))].sort((a, b) => a.localeCompare(b, 'es'));
  };

  globalThis.obtenerNivelesAcademicosDisponibles = function (filtros = {}) {
    if (!_rawEst) return [];
    const cat = filtros.categoria || 'Matriculados';
    let d = _rawEst;
    if (filtros.sede  && filtros.sede  !== 'todas') d = d.filter(r => r.sede  === filtros.sede);
    if (filtros.nivel && filtros.nivel !== 'todos') d = d.filter(r => r.nivel === filtros.nivel);
    d = d.filter(r => (r.categoria || 'Matriculados') === cat);
    return [...new Set(d.map(r => r.nivelAcademico))].sort((a, b) => a.localeCompare(b, 'es'));
  };

  // --- Snapshot de comunidad (Tab 1) ---
  globalThis.calcularSnapshotComunidad = function (filtros = {}) {
    if (!_rawEst) return null;

    const cat = filtros.categoria || 'todos';
    let d = _rawEst;
    if (filtros.sede           && filtros.sede           !== 'todas') d = d.filter(r => r.sede           === filtros.sede);
    if (filtros.nivel          && filtros.nivel          !== 'todos') d = d.filter(r => r.nivel          === filtros.nivel);
    if (filtros.nivelAcademico && filtros.nivelAcademico !== 'todos') d = d.filter(r => r.nivelAcademico === filtros.nivelAcademico);
    if (cat !== 'todos') {
      d = d.filter(r => (r.categoria || 'Matriculados') === cat);
    }

    // Determinar año de referencia
    const aniosDisp = [...new Set(d.map(r => r.anio))].sort((a, b) => a - b);
    const anio = (filtros.anio && aniosDisp.includes(+filtros.anio))
      ? +filtros.anio
      : (aniosDisp.at(-1) || 2025);

    // Filtrar por año y período
    const periodos = (!filtros.periodo || filtros.periodo === 'ambos')
      ? ['IPA', 'IIPA'] : [filtros.periodo];
    d = d.filter(r => r.anio === anio && periodos.includes(r.periodo));

    const total    = d.reduce((s, r) => s + r.cantidad, 0);
    const pregrado = d.filter(r => r.nivel === 'Pregrado').reduce((s, r) => s + r.cantidad, 0);
    const posgrado = d.filter(r => r.nivel === 'Posgrado').reduce((s, r) => s + r.cantidad, 0);

    const porPrograma = {};
    const programasPorNivel = { Pregrado: new Set(), Posgrado: new Set() };
    d.forEach(r => {
      porPrograma[r.programa] = (porPrograma[r.programa] || 0) + r.cantidad;
      if (r.nivel === 'Pregrado') programasPorNivel.Pregrado.add(r.programa);
      else if (r.nivel === 'Posgrado') programasPorNivel.Posgrado.add(r.programa);
    });
    const programasTop = Object.entries(porPrograma).sort(([, a], [, b]) => b - a);
    const pregradoProgramas = programasPorNivel.Pregrado.size;
    const posgradoProgramas = programasPorNivel.Posgrado.size;

    const porSede = {};
    d.forEach(r => {
      if (!porSede[r.sede]) porSede[r.sede] = { pregrado: 0, posgrado: 0, total: 0 };
      porSede[r.sede].total += r.cantidad;
      if (r.nivel === 'Pregrado') porSede[r.sede].pregrado += r.cantidad;
      else porSede[r.sede].posgrado += r.cantidad;
    });

    return { anio, periodos, total, pregrado, posgrado, pregradoProgramas, posgradoProgramas, programasTop, porSede, categoria: cat };
  };

  // --- Serie histórica (Tab 3) ---
  globalThis.calcularHistoricoIndicadores = function (filtros = {}) {
    const cat = filtros.categoria || 'todos';
    if (!_rawEst) return [];
    let d = _rawEst;
    if (filtros.sede  && filtros.sede  !== 'todas') d = d.filter(r => r.sede  === filtros.sede);
    if (filtros.nivel && filtros.nivel !== 'todos') d = d.filter(r => r.nivel === filtros.nivel);
    if (cat !== 'todos') {
      d = d.filter(r => (r.categoria || 'Matriculados') === cat);
    }

    const mapa = {};
    d.forEach(r => {
      const k = r.anio + '_' + r.periodo;
      if (!mapa[k]) mapa[k] = { anio: r.anio, periodo: r.periodo, total: 0, pregrado: 0, posgrado: 0 };
      mapa[k].total += r.cantidad;
      if (r.nivel === 'Pregrado') mapa[k].pregrado += r.cantidad;
      else mapa[k].posgrado += r.cantidad;
    });

    return Object.values(mapa).sort((a, b) =>
      a.anio === b.anio ? a.periodo.localeCompare(b.periodo) : a.anio - b.anio
    );
  };

  // --- Infraestructura (Tab 2) ---
  globalThis.obtenerPlantaFisicaFiltrada = function (filtros = {}) {
    if (!_rawPlanta) return [];
    if (filtros.sede && filtros.sede !== 'todas') return _rawPlanta.filter(r => r.sede === filtros.sede);
    return _rawPlanta;
  };
  registrarDepuracion('✔ Motor datos-indicadores.js cargado');

})(); // fin IIFE
