// ==========================================
// MÓDULO – INDICADORES INSTITUCIONALES
// ==========================================
// Depende de:
//   js/modulos/datos-indicadores.js  → API de datos (fetch CSV + fallback)
//   js/modulos/visualizaciones.js    → animarContador()
//   Chart.js (CDN)
// ==========================================

// --- Instancias Chart.js (una por canvas) ---
let graficoProgramasInd   = null;
let graficoDoughnutSede   = null;
let graficoM2Sedes        = null;
let graficoApilado        = null;
let graficoLineaHistorico = null;

// --- Tabs inicializados (lazy rendering) ---
const _tabsInd = { comunidad: false, infraestructura: false, historico: false };

// --- Tab activo actual ---
let _tabActivo = 'comunidad';

// --- Custom dropdown: flag anti-duplicado ---
let _ddInicializado = false;

// --- Paletas institucionales ---
const _PAL_COM   = ['#007B3E','#00482B','#79C000','#00A99D','#DAAA00','#F7931E','#4D4D4D'];
const _PAL_INFRA = ['#007B3E','#00A99D','#79C000'];

// --- Nombres institucionales de sede (solo display, no afectan los datos) ---
const _SEDE_DISPLAY = {
  'Fusagasugá':  'Sede Fusagasugá',
  'Girardot':    'Seccional Girardot',
  'Ubaté':       'Seccional Ubaté',
  'Chía':        'Extensión Chía',
  'Facatativá':  'Extensión Facatativá',
  'Soacha':      'Extensión Soacha',
  'Zipaquirá':   'Extensión Zipaquirá',
  'Chocontá':    'Extensión Chocontá',
  'Bogotá':      'Oficinas en Bogotá'
};

function _displaySede(sede) {
  return _SEDE_DISPLAY[sede] || sede;
}

// ==========================================
// HELPERS: CUSTOM DROPDOWNS
// ==========================================

/** Lee el valor seleccionado del wrapper .ind-dropdown */
function _getDD(id) {
  const el = document.getElementById(id);
  return el ? (el.dataset.value || '') : '';
}

/** Establece valor + texto visible en el dropdown, sin disparar eventos */
function _setDDValue(id, valor, texto) {
  const wrapper = document.getElementById(id);
  if (!wrapper) return;
  wrapper.dataset.value = valor;
  const span = wrapper.querySelector('.ind-dropdown-texto');
  if (span) span.textContent = texto || valor;
  wrapper.querySelectorAll('.ind-dropdown-opcion').forEach(op => {
    op.classList.toggle('activa', op.dataset.value === valor);
  });
  wrapper.classList.remove('abierto');
  const btn = wrapper.querySelector('.ind-dropdown-btn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

/** Reconstruye las opciones del menú; restaura selección si todavía existe.
 *  opciones: array de [valor, texto] */
function _setDDOptions(id, opciones) {
  const wrapper = document.getElementById(id);
  if (!wrapper) return;
  const menu = wrapper.querySelector('.ind-dropdown-menu');
  if (!menu) return;
  const valorActual = wrapper.dataset.value;
  menu.innerHTML = '';
  let valorExiste = false;
  opciones.forEach(([val, txt]) => {
    const div = document.createElement('div');
    div.className = 'ind-dropdown-opcion' + (val === valorActual ? ' activa' : '');
    div.dataset.value = val;
    div.textContent = txt;
    menu.appendChild(div);
    if (val === valorActual) valorExiste = true;
  });
  if (!valorExiste && opciones.length > 0) {
    _setDDValue(id, opciones[0][0], opciones[0][1]);
  } else if (valorExiste) {
    const span = wrapper.querySelector('.ind-dropdown-texto');
    const opt = opciones.find(([v]) => v === valorActual);
    if (span && opt) span.textContent = opt[1];
  }
}

/** Selecciona una opción y dispara el re-render del tab correspondiente */
function _ddSeleccionar(id, valor, texto) {
  _setDDValue(id, valor, texto);
  const tabCom  = ['filtroComSede','filtroComCategoria','filtroComNivel',
                   'filtroComNivelAc','filtroComAnio','filtroComPeriodo'];
  const tabInfra = ['filtroInfraSede'];
  const tabHist  = ['filtroHistSede','filtroHistCategoria','filtroHistNivel','filtroHistPeriodo'];
  if (tabCom.includes(id)) {
    if (id !== 'filtroComNivelAc' && id !== 'filtroComAnio' && id !== 'filtroComPeriodo') {
      _actualizarOpcionesNivelAcademico();
    }
    if (_tabsInd.comunidad) _renderTabComunidad();
  } else if (tabInfra.includes(id)) {
    if (_tabsInd.infraestructura) _renderTabInfraestructura();
  } else if (tabHist.includes(id)) {
    if (_tabsInd.historico) _renderTabHistorico();
  }
}

// ── Tooltip flotante para opciones largas del dropdown ──────────────────────
const _ddTooltip = document.createElement('div');
_ddTooltip.className = 'ind-opcion-tooltip';
_ddTooltip.style.cssText = [
  'position:fixed', 'display:none', 'background:#1f2937', 'color:#f9fafb',
  'padding:5px 11px', 'border-radius:7px', 'font-size:12px', 'font-weight:500',
  'letter-spacing:0.2px', 'line-height:1.4', 'z-index:10000',
  'pointer-events:none', 'white-space:nowrap',
  'box-shadow:0 4px 14px rgba(0,0,0,0.25)', 'border:1px solid rgba(255,255,255,0.08)'
].join(';');
document.body.appendChild(_ddTooltip);

document.addEventListener('mouseover', (e) => {
  const op = e.target.closest('.ind-dropdown-opcion');
  if (op) {
    const texto = op.textContent.trim();
    _ddTooltip.textContent = texto;
    _ddTooltip.style.display = 'block';
  }
});
document.addEventListener('mousemove', (e) => {
  if (_ddTooltip.style.display === 'block') {
    const tx = e.clientX + 14;
    const ty = e.clientY - 10;
    const tw = _ddTooltip.offsetWidth;
    // Evitar que desborde por la derecha
    _ddTooltip.style.left = (tx + tw > globalThis.innerWidth ? e.clientX - tw - 8 : tx) + 'px';
    _ddTooltip.style.top  = ty + 'px';
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest('.ind-dropdown-opcion')) _ddTooltip.style.display = 'none';
});

/** Inicializa interacción de todos los .ind-dropdown de vistaIndicadores (solo una vez) */
function _initDropdownsInd() {
  if (_ddInicializado) return;
  _ddInicializado = true;

  document.addEventListener('click', (e) => {
    // Abrir / cerrar al pulsar el botón
    const btn = e.target.closest('.ind-dropdown-btn');
    if (btn) {
      const wrapper = btn.closest('.ind-dropdown');
      if (!wrapper || wrapper.classList.contains('disabled')) return;
      const isOpen = wrapper.classList.contains('abierto');
      document.querySelectorAll('.ind-dropdown.abierto').forEach(d => {
        d.classList.remove('abierto');
        d.querySelector('.ind-dropdown-btn')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        wrapper.classList.add('abierto');
        btn.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    // Selección de opción
    const opcion = e.target.closest('.ind-dropdown-opcion');
    if (opcion) {
      const wrapper = opcion.closest('.ind-dropdown');
      if (!wrapper) return;
      _ddSeleccionar(wrapper.id, opcion.dataset.value, opcion.textContent.trim());
      return;
    }

    // Cerrar al hacer clic fuera
    if (!e.target.closest('.ind-dropdown')) {
      document.querySelectorAll('.ind-dropdown.abierto').forEach(d => {
        d.classList.remove('abierto');
        d.querySelector('.ind-dropdown-btn')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

// ==========================================
// HELPERS: LECTURA DE FILTROS POR TAB
// ==========================================

function _leerFiltrosComunidad() {
  return {
    sede:          _getDD('filtroComSede')      || 'todas',
    categoria:     _getDD('filtroComCategoria') || 'Matriculados',
    nivel:         _getDD('filtroComNivel')     || 'todos',
    nivelAcademico:_getDD('filtroComNivelAc')  || 'todos',
    anio:          _getDD('filtroComAnio')      || 'ultimo',
    periodo:       _getDD('filtroComPeriodo')   || 'ambos'
  };
}

function _leerFiltrosInfra() {
  return {
    sede: _getDD('filtroInfraSede') || 'todas'
  };
}

function _leerFiltrosHistorico() {
  return {
    sede:      _getDD('filtroHistSede')      || 'todas',
    categoria: _getDD('filtroHistCategoria') || 'Matriculados',
    nivel:     _getDD('filtroHistNivel')     || 'todos',
    periodo:   _getDD('filtroHistPeriodo')   || 'ambos'
  };
}

// ==========================================
// ENTRY POINT
// ==========================================

function inicializarVistaIndicadores() {
  registrarDepuracion('=== INICIALIZANDO VISTA INDICADORES ===');

  _initDropdownsInd();
  _setEstadoUI('cargando');

  cargarDatosIndicadores(function (estado) {
    _setEstadoUI(estado);

    if (estado === 'listo') {
      _poblarFiltros();
      _inicializarTabsIndicadores();
      _inicializarFiltrosComunidad();
      _inicializarFiltrosInfra();
      _inicializarFiltrosHistorico();

      // Renderizar Tab 1 inicial
      _tabsInd.comunidad = true;
      _renderTabComunidad();
    } else if (estado === 'error') {
      const nota = document.getElementById('notaFallback');
      if (nota) {
        nota.textContent = 'No se encontraron los archivos CSV. Verifique que ESTUDIANTES.csv y Planta_Fisica.csv estén en la raíz del proyecto y acceda mediante un servidor local (no file://).';
        nota.classList.remove('hidden');
      }
    }
  });

  registrarDepuracion('✔ Vista Indicadores: carga iniciada');
}

// ==========================================
// ESTADO UI (carga / listo / error)
// ==========================================

function _setEstadoUI(estado) {
  const spinner = document.getElementById('indEstadoCarga');

  if (estado === 'cargando') {
    if (spinner) spinner.classList.remove('hidden');
    document.querySelectorAll('.ind-dropdown').forEach(d => d.classList.add('disabled'));
    document.querySelectorAll('.ind-btn-reset').forEach(b => (b.disabled = true));
    return;
  }

  if (spinner) spinner.classList.add('hidden');
  document.querySelectorAll('.ind-dropdown').forEach(d => d.classList.remove('disabled'));
  document.querySelectorAll('.ind-btn-reset').forEach(b => (b.disabled = false));
}

// ==========================================
// POBLAR FILTROS CON DATOS REALES
// ==========================================

function _poblarFiltros() {
  // Sedes (Tab 1 y Tab 3) — dinámico desde CSV con nombres institucionales
  const sedes = obtenerSedesDisponibles();
  const opsSedes = [['todas', 'Todas las sedes'], ...sedes.map(s => [s, _displaySede(s)])];
  _setDDOptions('filtroComSede',  opsSedes);
  _setDDOptions('filtroHistSede', opsSedes);

  // Categorías (Tab 1 y Tab 3) — dinámico desde CSV
  const cats = obtenerCategoriasDisponibles();
  const opsCats = [['todos', 'Todos'], ...cats.map(c => [c, c])];
  _setDDOptions('filtroComCategoria',  opsCats);
  _setDDOptions('filtroHistCategoria', opsCats);

  // Año de referencia (Tab 1) — desc para que el más reciente quede primero
  const anios = [...obtenerAniosDisponibles()].reverse();
  const opsAnios = [['ultimo', 'Más reciente'], ...anios.map(a => [String(a), String(a)])];
  _setDDOptions('filtroComAnio', opsAnios);

  // Sede infraestructura (Tab 2) — dinámico desde CSV de Planta Física
  const sedesInfra = obtenerPlantaFisicaFiltrada({}).map(r => r.sede).filter(Boolean);
  const unicas = [...new Set(sedesInfra)].sort((a, b) => a.localeCompare(b));
  const opsInfra = [['todas', 'Todas'], ...unicas.map(s => [s, _displaySede(s)])];
  _setDDOptions('filtroInfraSede', opsInfra);

  // Nivel académico inicial (Tab 1) — reactivo al cambio de filtros
  _actualizarOpcionesNivelAcademico();
}

// Actualiza opciones de Modalidad Educativa según sede + nivel + categoría actuales
function _actualizarOpcionesNivelAcademico() {
  const filtros = {
    sede:      _getDD('filtroComSede')      || 'todas',
    nivel:     _getDD('filtroComNivel')     || 'todos',
    categoria: _getDD('filtroComCategoria') || 'Matriculados'
  };
  const niveles = obtenerNivelesAcademicosDisponibles(filtros);
  const ops = [['todos', 'Todos'], ...niveles.map(n => [n, n])];
  _setDDOptions('filtroComNivelAc', ops);
}

// ==========================================
// TABS (lazy)
// ==========================================

function _inicializarTabsIndicadores() {
  const contenedor = document.getElementById('indTabsContenedor');
  if (!contenedor) return;

  contenedor.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      contenedor.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('activo'));
      document.querySelectorAll('.ind-tab-contenido').forEach(c => c.classList.remove('activo'));

      btn.classList.add('activo');
      _tabActivo = btn.dataset.tab;
      const id    = 'tab' + _tabActivo.charAt(0).toUpperCase() + _tabActivo.slice(1);
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('activo');

      if (!_tabsInd[_tabActivo]) _tabsInd[_tabActivo] = true;
      _renderTab(_tabActivo);
    });
  });
}

// ==========================================
// INICIALIZADORES DE FILTROS POR TAB
// ==========================================

function _inicializarFiltrosComunidad() {
  // Los cambios de opción los maneja _ddSeleccionar() vía _initDropdownsInd()
  const resetBtn = document.getElementById('btnResetComunidad');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      _setDDValue('filtroComSede',      'todas',  'Todas las sedes');
      _setDDValue('filtroComCategoria', 'todos',  'Todos');
      _setDDValue('filtroComNivel',     'todos',  'Todos');
      _setDDValue('filtroComAnio',      'ultimo', 'Más reciente');
      _setDDValue('filtroComPeriodo',   'ambos',  'IPA + IIPA');
      _actualizarOpcionesNivelAcademico();
      _renderTabComunidad();
    });
  }
}

function _inicializarFiltrosInfra() {
  const resetBtn = document.getElementById('btnResetInfra');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      _setDDValue('filtroInfraSede', 'todas', 'Todas');
      _renderTabInfraestructura();
    });
  }
}

function _inicializarFiltrosHistorico() {
  const resetBtn = document.getElementById('btnResetHistorico');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      _setDDValue('filtroHistSede',      'todas', 'Todas las sedes');
      _setDDValue('filtroHistCategoria', 'todos', 'Todos');
      _setDDValue('filtroHistNivel',     'todos', 'Todos');
      _setDDValue('filtroHistPeriodo',   'ambos', 'IPA + IIPA');
      _renderTabHistorico();
    });
  }
}

// ==========================================
// DISPATCH DE RENDERIZADO
// ==========================================

function _renderTab(tab) {
  if      (tab === 'comunidad')      _renderTabComunidad();
  else if (tab === 'infraestructura') _renderTabInfraestructura();
  else if (tab === 'historico')      _renderTabHistorico();
}

// ==========================================
// TAB 1 – COMUNIDAD ACADÉMICA
// ==========================================

function _renderTabComunidad() {
  const filtros = _leerFiltrosComunidad();
  const snap    = calcularSnapshotComunidad(filtros);
  if (!snap) return;

  const cat      = snap.categoria;
  const catLabel = cat === 'todos' ? 'todas las categorías' : cat.toLowerCase();
  const etiqueta = snap.anio + ' · ' + snap.periodos.join('+') + ' · ' +
                   (filtros.sede === 'todas' ? 'Todas las sedes' : _displaySede(filtros.sede));

  const elProg = document.getElementById('subtituloPrograma');
  if (elProg) elProg.textContent = etiqueta;
  const elDou  = document.getElementById('subtituloDoughnut');
  if (elDou)  elDou.textContent  = etiqueta;

  // Título dinámico del gráfico de programas
  const elTitulo = document.getElementById('tituloTopProgramas');
  if (elTitulo) elTitulo.textContent = catLabel;

  _renderizarKPIsComunidad(snap, cat);
  _crearGraficoProgramas(snap, cat);
  _crearGraficoDoughnutSedes(snap);
}

function _renderizarKPIsComunidad(snap, cat) {
  const kpis = [
    { id:'indKpiTotal', valor:snap.total,    etiqueta:cat + ' totales',   icono:'fa-users',          badge:String(snap.anio),  color:'verde' },
    { id:'indKpiPre',   valor:snap.pregrado, etiqueta:'Pregrado – ' + cat, icono:'fa-graduation-cap', badge:'Pregrado',         color:'verde' },
    { id:'indKpiPos',   valor:snap.posgrado, etiqueta:'Posgrado – ' + cat, icono:'fa-user-tie',       badge:'Posgrado',         color:'teal'  }
  ];

  const cont = document.getElementById('indKpisComunidad');
  if (!cont) return;
  cont.innerHTML = kpis.map(k => `
    <div class="kpi-ind-card kpi-ind-card--${k.color}">
      <i class="fas ${k.icono} kpi-ind-card__watermark"></i>
      <div class="kpi-ind-card__top">
        <span class="kpi-ind-card__etiqueta">${k.etiqueta}</span>
        <span class="kpi-ind-card__badge">${k.badge}</span>
      </div>
      <div id="${k.id}" class="kpi-ind-card__numero">0</div>
      <div class="kpi-ind-card__pie"><i class="fas fa-map-marker-alt mr-1"></i>UCundinamarca · 7 sedes</div>
    </div>
  `).join('');
  kpis.forEach(k => animarContador(k.id, k.valor));
}

function _crearGraficoProgramas(snap, cat) {
  const TOP_N    = 25; // más programas visibles gracias al scroll
  const top      = snap.programasTop.slice(0, TOP_N);
  const etiquetas = top.map(([p]) => p.length > 50 ? p.slice(0, 48) + '…' : p);
  const valores   = top.map(([, v]) => v);

  const ctx = document.getElementById('graficoProgramasInd');
  if (!ctx) return;
  if (graficoProgramasInd) graficoProgramasInd.destroy();

  // Altura dinámica: 32px por barra + margen, permite scroll en el contenedor exterior
  const wrap = document.getElementById('graficoProgramasWrap');
  if (wrap) wrap.style.height = Math.max(32 * top.length + 50, 180) + 'px';

  graficoProgramasInd = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: etiquetas,
      datasets: [{ label: cat, data: valores, backgroundColor: _PAL_COM[0], borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ' ' + c.parsed.x.toLocaleString('es-CO') + ' estudiantes' } }
      },
      scales: {
        x: { beginAtZero: true, grid: { color: '#f3f4f6' } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

function _crearGraficoDoughnutSedes(snap) {
  const porSede  = snap.porSede;
  const sedes    = Object.keys(porSede).sort((a, b) => a.localeCompare(b, 'es'));
  const valores  = sedes.map(s => porSede[s].total);
  const labels   = sedes.map(s => _displaySede(s));

  const ctx = document.getElementById('graficoDoughnutSede');
  if (!ctx) return;
  if (graficoDoughnutSede) graficoDoughnutSede.destroy();

  const tipo = sedes.length === 1 ? 'bar' : 'doughnut';

  if (tipo === 'doughnut') {
    graficoDoughnutSede = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data: valores, backgroundColor: _PAL_COM, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '62%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12, usePointStyle: true } },
          tooltip: { callbacks: { label: c => ' ' + c.label + ': ' + c.parsed.toLocaleString('es-CO') } }
        }
      }
    });
  } else {
    const datos = porSede[sedes[0]];
    graficoDoughnutSede = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pregrado', 'Posgrado'],
        datasets: [{ data: [datos.pregrado, datos.posgrado], backgroundColor: [_PAL_COM[0], _PAL_COM[3]], borderRadius: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' ' + c.parsed.y.toLocaleString('es-CO') } } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#f3f4f6' } } }
      }
    });
  }
}

// ==========================================
// TAB 2 – INFRAESTRUCTURA
// ==========================================

function _renderTabInfraestructura() {
  const filtros = _leerFiltrosInfra();
  const planta  = obtenerPlantaFisicaFiltrada(filtros);

  _renderizarKPIsInfraestructura(planta);
  _crearGraficoM2Sedes(planta);
  _crearGraficoApilado(planta);
  _renderizarTarjetasCampus(planta);
}

function _renderizarKPIsInfraestructura(planta) {
  const totalM2    = planta.reduce((s, r) => s + r.m2Total, 0);
  const totalAulas = planta.reduce((s, r) => s + r.numAulas, 0);
  const totalLabs  = planta.reduce((s, r) => s + r.laboratorios, 0);

  const kpis = [
    { id:'indKpiM2',    valor:totalM2,    etiqueta:'M² Área Total',   icono:'fa-ruler-combined', badge:planta.length + ' campus', color:'teal' },
    { id:'indKpiAulas', valor:totalAulas, etiqueta:'Aulas de Clase',  icono:'fa-chalkboard',     badge:'OAPC',                   color:'teal' },
    { id:'indKpiLabs',  valor:totalLabs,  etiqueta:'Laboratorios',    icono:'fa-flask',          badge:'OAPC',                   color:'teal' }
  ];

  const cont = document.getElementById('indKpisInfra');
  if (!cont) return;
  cont.innerHTML = kpis.map(k => `
    <div class="kpi-ind-card kpi-ind-card--${k.color}">
      <i class="fas ${k.icono} kpi-ind-card__watermark"></i>
      <div class="kpi-ind-card__top">
        <span class="kpi-ind-card__etiqueta">${k.etiqueta}</span>
        <span class="kpi-ind-card__badge">${k.badge}</span>
      </div>
      <div id="${k.id}" class="kpi-ind-card__numero">0</div>
      <div class="kpi-ind-card__pie"><i class="fas fa-university mr-1"></i>Planta física institucional</div>
    </div>
  `).join('');
  kpis.forEach(k => animarContador(k.id, k.valor));
}

function _crearGraficoM2Sedes(planta) {
  const ctx = document.getElementById('graficoM2Sedes');
  if (!ctx) return;
  if (graficoM2Sedes) graficoM2Sedes.destroy();

  const ordenado = [...planta].sort((a, b) => b.m2Total - a.m2Total);
  graficoM2Sedes = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ordenado.map(r => _displaySede(r.sede)),
      datasets: [{ label: 'M² construidos', data: ordenado.map(r => r.m2Total), backgroundColor: '#007B3E', borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' ' + c.parsed.x.toLocaleString('es-CO') + ' m²' } } },
      scales: { x: { beginAtZero: true, grid: { color: '#f3f4f6' } }, y: { grid: { display: false } } }
    }
  });
}

function _crearGraficoApilado(planta) {
  const ctx = document.getElementById('graficoApilado');
  if (!ctx) return;
  if (graficoApilado) graficoApilado.destroy();

  graficoApilado = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: planta.map(r => _displaySede(r.sede)),
      datasets: [
        { label: 'M² Aulas',        data: planta.map(r => r.m2Aulas),        backgroundColor: _PAL_INFRA[0], borderRadius: 0 },
        { label: 'M² Laboratorios', data: planta.map(r => r.m2Laboratorios), backgroundColor: _PAL_INFRA[1], borderRadius: 0 },
        { label: 'M² Deportivo',    data: planta.map(r => r.m2Deportivo),    backgroundColor: _PAL_INFRA[2], borderRadius: 2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true } },
        tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': ' + c.parsed.y.toLocaleString('es-CO') + ' m²' } }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { stacked: true, beginAtZero: true, grid: { color: '#f3f4f6' },
             ticks: { callback: v => (v / 1000).toFixed(0) + ' k' } }
      }
    }
  });
}

function _renderizarTarjetasCampus(planta) {
  const cont = document.getElementById('tarjetasCampus');
  if (!cont) return;
  if (planta.length === 0) {
    cont.innerHTML = '<p class="text-gray-400 col-span-full text-center py-8">Sin datos de infraestructura para el filtro seleccionado.</p>';
    return;
  }
  cont.innerHTML = planta.map(c => {
    const nombre   = _displaySede(c.sede);
    const imgSrc   = encodeURI('assets/imagenes/Infraestructura/' + nombre + '.png');
    return `
    <div class="tarjeta-campus">
      <div class="tarjeta-campus-header" onclick="toggleTarjetaCampus(this.parentElement)">
        <div>
          <div class="tarjeta-campus-nombre"><i class="fas fa-map-marker-alt text-teal-600 mr-2"></i>${nombre}</div>
          <div class="tarjeta-campus-m2">${c.m2Total.toLocaleString('es-CO')} m² construidos</div>
        </div>
        <i class="fas fa-chevron-down tarjeta-campus-chevron"></i>
      </div>
      <div class="tarjeta-campus-cuerpo">
        <div class="tarjeta-campus-portada">
          <img src="${imgSrc}" alt="${nombre}" loading="lazy"
               onerror="this.parentElement.style.display='none'">
        </div>
        <div class="campus-metricas-grid">
          <div class="campus-metrica-item"><span class="campus-metrica-label">Aulas de clase</span><span class="campus-metrica-valor">${c.numAulas}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">Laboratorios</span><span class="campus-metrica-valor">${c.laboratorios}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">Aulas de cómputo</span><span class="campus-metrica-valor">${c.aulasComputo}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">Auditorios</span><span class="campus-metrica-valor">${c.auditorios}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">Aulas especializadas</span><span class="campus-metrica-valor">${c.aulasEspecializadas}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">Puestos en aulas</span><span class="campus-metrica-valor">${c.puestosAulas.toLocaleString('es-CO')}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">Puestos en labs</span><span class="campus-metrica-valor">${c.puestosLab}</span></div>
          <div class="campus-metrica-item"><span class="campus-metrica-label">M² área deportiva</span><span class="campus-metrica-valor">${c.m2Deportivo.toLocaleString('es-CO')}</span></div>
        </div>
        <p class="fuente-datos mt-3">Fuente: OAPC – UCundinamarca</p>
      </div>
    </div>
  `;
  }).join('');
}

function toggleTarjetaCampus(tarjeta) {
  tarjeta.classList.toggle('abierta');
}

// ==========================================
// TAB 3 – EVOLUCIÓN HISTÓRICA
// ==========================================

function _renderTabHistorico() {
  const filtros = _leerFiltrosHistorico();
  const serie   = calcularHistoricoIndicadores(filtros);

  const sede  = filtros.sede  === 'todas' ? 'Todas las sedes'  : filtros.sede;
  const nivel = filtros.nivel === 'todos' ? 'Todos los niveles': filtros.nivel;
  const el    = document.getElementById('subtituloHistorico');

  if (el) {
    if (serie.length === 0) {
      el.textContent = 'Sin datos disponibles para los filtros seleccionados';
    } else {
      const maxAnio = Math.max(...serie.map(r => r.anio));
      el.textContent = `2007-${maxAnio} · ${filtros.categoria} · ${sede} · ${nivel}`;
    }
  }

  _crearGraficoHistorico(serie, filtros.periodo, filtros.categoria);
}

function _crearGraficoHistorico(serie, periodo, cat) {
  const ctx = document.getElementById('graficoLineaHistorico');
  if (!ctx) return;
  if (graficoLineaHistorico) graficoLineaHistorico.destroy();

  if (serie.length === 0) {
    graficoLineaHistorico = null;
    return;
  }

  const anios  = [...new Set(serie.map(r => r.anio))].sort((a, b) => a - b);
  const getArr = (per) => anios.map(y => {
    const r = serie.find(h => h.anio === y && h.periodo === per);
    return r ? r.total : null;
  });

  const label    = cat || 'Matriculados';
  const datasets = [];

  if (periodo === 'IPA' || periodo === 'ambos') {
    datasets.push({
      label: label + ' · IPA (1.er semestre)',
      data: getArr('IPA'),
      borderColor: '#79C000', backgroundColor: 'rgba(121,192,0,0.06)',
      borderDash: [5, 4], tension: 0.3, fill: false, pointRadius: 3, pointHoverRadius: 5
    });
  }
  if (periodo === 'IIPA' || periodo === 'ambos') {
    datasets.push({
      label: label + ' · IIPA (2.º semestre)',
      data: getArr('IIPA'),
      borderColor: '#007B3E', backgroundColor: 'rgba(0,123,62,0.08)',
      tension: 0.3, fill: true, pointRadius: 3, pointHoverRadius: 5
    });
  }

  graficoLineaHistorico = new Chart(ctx, {
    type: 'line',
    data: { labels: anios, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 12 }, usePointStyle: true } },
        tooltip: { callbacks: { label: c => ' ' + c.dataset.label + ': ' + c.parsed.y.toLocaleString('es-CO') } }
      },
      scales: {
        x: { grid: { color: '#f3f4f6' } },
        y: { beginAtZero: false, grid: { color: '#f3f4f6' }, ticks: { callback: v => v.toLocaleString('es-CO') } }
      }
    }
  });
}

registrarDepuracion('✔ Módulo indicadores.js cargado');
