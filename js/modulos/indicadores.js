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

// --- Paletas institucionales ---
const _PAL_COM   = ['#007B3E','#00482B','#79C000','#00A99D','#DAAA00','#F7931E','#4D4D4D'];
const _PAL_INFRA = ['#007B3E','#00A99D','#79C000'];

// ==========================================
// HELPERS: LECTURA DE FILTROS POR TAB
// ==========================================

function _leerFiltrosComunidad() {
  return {
    sede:          document.getElementById('filtroComSede')?.value      || 'todas',
    categoria:     document.getElementById('filtroComCategoria')?.value || 'Matriculados',
    nivel:         document.getElementById('filtroComNivel')?.value     || 'todos',
    nivelAcademico:document.getElementById('filtroComNivelAc')?.value   || 'todos',
    anio:          document.getElementById('filtroComAnio')?.value      || 'ultimo',
    periodo:       document.getElementById('filtroComPeriodo')?.value   || 'ambos'
  };
}

function _leerFiltrosInfra() {
  return {
    sede: document.getElementById('filtroInfraSede')?.value || 'todas'
  };
}

function _leerFiltrosHistorico() {
  return {
    sede:      document.getElementById('filtroHistSede')?.value     || 'todas',
    categoria: document.getElementById('filtroHistCategoria')?.value || 'Matriculados',
    nivel:     document.getElementById('filtroHistNivel')?.value    || 'todos',
    periodo:   document.getElementById('filtroHistPeriodo')?.value  || 'ambos'
  };
}

// ==========================================
// ENTRY POINT
// ==========================================

function inicializarVistaIndicadores() {
  registrarDepuracion('=== INICIALIZANDO VISTA INDICADORES ===');

  _setEstadoUI('cargando');

  cargarDatosIndicadores(function (estado) {
    _setEstadoUI(estado);

    if (estado === 'listo' || estado === 'fallback') {
      _poblarFiltros();
      _inicializarTabsIndicadores();
      _inicializarFiltrosComunidad();
      _inicializarFiltrosInfra();
      _inicializarFiltrosHistorico();

      if (estado === 'fallback') {
        const nota = document.getElementById('notaFallback');
        if (nota) nota.classList.remove('hidden');
      }

      // Renderizar Tab 1 inicial
      _tabsInd.comunidad = true;
      _renderTabComunidad();
    }
  });

  registrarDepuracion('✔ Vista Indicadores: carga iniciada');
}

// ==========================================
// ESTADO UI (carga / listo / fallback)
// ==========================================

function _setEstadoUI(estado) {
  const spinner = document.getElementById('indEstadoCarga');

  if (estado === 'cargando') {
    if (spinner) spinner.classList.remove('hidden');
    document.querySelectorAll('.ind-select-filtro').forEach(s => (s.disabled = true));
    document.querySelectorAll('.ind-btn-reset').forEach(b => (b.disabled = true));
    return;
  }

  if (spinner) spinner.classList.add('hidden');
  document.querySelectorAll('.ind-select-filtro').forEach(s => (s.disabled = false));
  document.querySelectorAll('.ind-btn-reset').forEach(b => (b.disabled = false));
}

// ==========================================
// POBLAR FILTROS CON DATOS REALES
// ==========================================

function _poblarFiltros() {
  // Sedes (Tab 1 y Tab 3) — dinámico desde CSV
  const sedes = obtenerSedesDisponibles();
  ['filtroComSede', 'filtroHistSede'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    while (sel.options.length > 1) sel.remove(1);
    sedes.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s; opt.textContent = s;
      sel.appendChild(opt);
    });
  });

  // Año de referencia (Tab 1) — desc para que el más reciente quede primero
  const selectAnio = document.getElementById('filtroComAnio');
  if (selectAnio) {
    while (selectAnio.options.length > 1) selectAnio.remove(1);
    const anios = obtenerAniosDisponibles();
    [...anios].reverse().forEach(a => {
      const opt = document.createElement('option');
      opt.value = a; opt.textContent = a;
      selectAnio.appendChild(opt);
    });
  }

  // Nivel académico inicial (Tab 1) — reactivo al cambio de filtros
  _actualizarOpcionesNivelAcademico();
}

// Actualiza el <select> de Nivel Académico según sede + nivel + categoría actuales
function _actualizarOpcionesNivelAcademico() {
  const sel = document.getElementById('filtroComNivelAc');
  if (!sel) return;
  const anterior = sel.value;
  const filtros  = {
    sede:      document.getElementById('filtroComSede')?.value      || 'todas',
    nivel:     document.getElementById('filtroComNivel')?.value     || 'todos',
    categoria: document.getElementById('filtroComCategoria')?.value || 'Matriculados'
  };
  const niveles = obtenerNivelesAcademicosDisponibles(filtros);
  while (sel.options.length > 1) sel.remove(1);
  niveles.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n; opt.textContent = n;
    sel.appendChild(opt);
  });
  // Restaurar selección previa si todavía está disponible
  if (niveles.includes(anterior)) sel.value = anterior;
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
  ['filtroComSede','filtroComCategoria','filtroComNivel','filtroComNivelAc',
   'filtroComAnio','filtroComPeriodo'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      // Al cambiar sede, categoría o nivel → recalcular opciones de nivel académico
      if (id !== 'filtroComNivelAc' && id !== 'filtroComAnio' && id !== 'filtroComPeriodo') {
        _actualizarOpcionesNivelAcademico();
      }
      if (_tabsInd.comunidad) _renderTabComunidad();
    });
  });

  const resetBtn = document.getElementById('btnResetComunidad');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      [['filtroComSede','todas'],['filtroComCategoria','Matriculados'],
       ['filtroComNivel','todos'],['filtroComNivelAc','todos'],
       ['filtroComAnio','ultimo'],['filtroComPeriodo','ambos']].forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
      });
      _actualizarOpcionesNivelAcademico();
      _renderTabComunidad();
    });
  }
}

function _inicializarFiltrosInfra() {
  const sede = document.getElementById('filtroInfraSede');
  if (sede) sede.addEventListener('change', () => {
    if (_tabsInd.infraestructura) _renderTabInfraestructura();
  });

  const resetBtn = document.getElementById('btnResetInfra');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const s = document.getElementById('filtroInfraSede');
      if (s) s.value = 'todas';
      _renderTabInfraestructura();
    });
  }
}

function _inicializarFiltrosHistorico() {
  ['filtroHistSede','filtroHistCategoria','filtroHistNivel','filtroHistPeriodo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => {
      if (_tabsInd.historico) _renderTabHistorico();
    });
  });

  const resetBtn = document.getElementById('btnResetHistorico');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      [['filtroHistSede','todas'],['filtroHistCategoria','Matriculados'],
       ['filtroHistNivel','todos'],['filtroHistPeriodo','ambos']].forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
      });
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
  const etiqueta = snap.anio + ' · ' + snap.periodos.join('+') + ' · ' +
                   (filtros.sede === 'todas' ? 'Todas las sedes' : filtros.sede);

  const elProg = document.getElementById('subtituloPrograma');
  if (elProg) elProg.textContent = etiqueta;
  const elDou  = document.getElementById('subtituloDoughnut');
  if (elDou)  elDou.textContent  = etiqueta;

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
  const TOP_N    = 12;
  const top      = snap.programasTop.slice(0, TOP_N);
  const etiquetas = top.map(([p]) => p.length > 50 ? p.slice(0, 48) + '…' : p);
  const valores   = top.map(([, v]) => v);

  const ctx = document.getElementById('graficoProgramasInd');
  if (!ctx) return;
  if (graficoProgramasInd) graficoProgramasInd.destroy();

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
  const porSede = snap.porSede;
  const sedes   = Object.keys(porSede).sort();
  const valores  = sedes.map(s => porSede[s].total);

  const ctx = document.getElementById('graficoDoughnutSede');
  if (!ctx) return;
  if (graficoDoughnutSede) graficoDoughnutSede.destroy();

  const tipo = sedes.length === 1 ? 'bar' : 'doughnut';

  if (tipo === 'doughnut') {
    graficoDoughnutSede = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: sedes,
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
      labels: ordenado.map(r => r.sede),
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
      labels: planta.map(r => r.sede),
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
  cont.innerHTML = planta.map(c => `
    <div class="tarjeta-campus">
      <div class="tarjeta-campus-header" onclick="toggleTarjetaCampus(this.parentElement)">
        <div>
          <div class="tarjeta-campus-nombre"><i class="fas fa-map-marker-alt text-teal-600 mr-2"></i>${c.sede}</div>
          <div class="tarjeta-campus-m2">${c.m2Total.toLocaleString('es-CO')} m² construidos</div>
        </div>
        <i class="fas fa-chevron-down tarjeta-campus-chevron"></i>
      </div>
      <div class="tarjeta-campus-cuerpo">
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
  `).join('');
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
  const estado  = getEstadoCargaIndicadores();

  const sede  = filtros.sede  === 'todas' ? 'Todas las sedes'  : filtros.sede;
  const nivel = filtros.nivel === 'todos' ? 'Todos los niveles': filtros.nivel;
  const el    = document.getElementById('subtituloHistorico');

  if (el) {
    if (estado === 'fallback') {
      el.textContent = 'Datos agregados 2007-2025 (modo sin servidor – solo Matriculados)';
    } else if (serie.length === 0) {
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
