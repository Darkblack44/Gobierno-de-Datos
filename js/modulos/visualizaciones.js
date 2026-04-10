// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN DEL MAPA
// ==========================================
/* global mapa, esPantallaCompleta, instanciaGraficoProgramas, calcularSnapshotComunidad, obtenerPlantaFisicaFiltrada */

// ── Genera el contenido HTML del popup ──────────────────────────────────
// Muestra datos de matrícula + infraestructura institucional por sede.
// Todos los datos provienen de los CSVs (ESTUDIANTES + Planta_Fisica).
function generarContenidoPopup(municipio) {
  const p = municipio._planta;

  let seccionInfra = '';
  if (p) {
    const fila = (icono, label, valor, unidad) =>
      `<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0;">
         <span style="color:#6b7280;"><i class="fas ${icono}" style="width:14px;text-align:center;margin-right:4px;font-size:10px;color:#0d9488;"></i>${label}</span>
         <strong>${valor.toLocaleString('es-CO')}${unidad ? ' ' + unidad : ''}</strong>
       </div>`;

    const capacidad = (p.puestosAulas || 0) + (p.puestosLab || 0);

    seccionInfra = `
      <div style="border-top:1px solid #e5e7eb;margin-top:10px;padding-top:10px;
                  font-size:12px;text-align:left;">
        <div style="font-size:10px;font-weight:600;color:#0d9488;text-transform:uppercase;
                    letter-spacing:0.5px;margin-bottom:6px;">
          <i class="fas fa-building" style="margin-right:4px;"></i>Infraestructura
        </div>
        ${fila('fa-ruler-combined', 'M² construidos', p.m2Total, 'm²')}
        ${fila('fa-chalkboard', 'Aulas de clase', p.numAulas, '')}
        ${fila('fa-flask', 'Laboratorios', p.laboratorios, '')}
        ${fila('fa-microphone', 'Auditorios', p.auditorios, '')}
        ${fila('fa-laptop', 'Aulas de cómputo', p.aulasComputo, '')}
        ${fila('fa-running', 'M² deportivo', p.m2Deportivo, 'm²')}
        ${fila('fa-users', 'Capacidad (puestos)', capacidad, '')}
        <div style="margin-top:6px;font-size:9px;color:#d1d5db;text-align:right;">
          Fuente: OAPC – UCundinamarca
        </div>
      </div>`;
  }

  return `
    <div style="text-align:center;padding:8px;min-width:200px;">
      <h3 style="margin:0 0 8px 0;color:#16a34a;font-size:16px;font-weight:bold;">
        ${municipio.nombre}
      </h3>
      <div style="font-size:24px;font-weight:bold;color:#1f2937;margin-bottom:4px;">
        ${municipio.estudiantes.toLocaleString('es-CO')}
      </div>
      <div style="font-size:12px;color:#6b7280;">
        Estudiantes UCundinamarca
      </div>
      ${seccionInfra}
    </div>`;
}

// Tabla de lookup geográfica (coordenadas no están en el CSV)
const _COORD_SEDES = {
  'Fusagasugá': { coordenadas: [4.3391, -74.3636], nombre: 'Fusagasugá' },
  'Soacha':     { coordenadas: [4.579,  -74.214],  nombre: 'Soacha' },
  'Facatativá': { coordenadas: [4.814,  -74.356],  nombre: 'Facatativá' },
  'Chía':       { coordenadas: [4.858,  -74.053],  nombre: 'Chía' },
  'Ubaté':      { coordenadas: [5.313,  -73.816],  nombre: 'Ubaté' },
  'Girardot':   { coordenadas: [4.304,  -74.804],  nombre: 'Girardot' },
  'Zipaquirá':  { coordenadas: [5.025,  -74.004],  nombre: 'Zipaquirá' }
};

function inicializarMapa() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded.');
    return;
  }

  // ── Datos desde CSV vía calcularSnapshotComunidad + obtenerPlantaFisicaFiltrada ──
  const snap = _snapshotActual();
  if (!snap) return;

  // Lookup de infraestructura indexado por sede (Planta_Fisica.csv)
  const _plantaPorSede = {};
  obtenerPlantaFisicaFiltrada({}).forEach(r => { _plantaPorSede[r.sede] = r; });

  const datosMapa = Object.entries(snap.porSede)
    .filter(([sede]) => _COORD_SEDES[sede])
    .map(([sede, datos]) => ({
      nombre:       _COORD_SEDES[sede].nombre,
      coordenadas:  _COORD_SEDES[sede].coordenadas,
      estudiantes:  datos.total,
      _planta:      _plantaPorSede[sede] || null
    }));

  mapa = L.map('mapa', {
    center: [4.5, -74],
    zoom: 8,
    scrollWheelZoom: true,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(mapa);

  // ── Tooltip personalizado fuera del overflow:hidden del mapa ─────────────
  // Leaflet posiciona sus tooltips dentro de #mapa (overflow:hidden), por lo
  // que cualquier contenido que salga del borde queda cortado. Se crea un
  // elemento propio en el wrapper padre (position:relative, sin overflow:hidden)
  // y se posiciona mediante containerPoint en cada evento mousemove.
  const _wrapperMapa = document.getElementById('mapa').parentElement;
  const _tooltipMapa = document.createElement('div');
  _tooltipMapa.className = 'tooltip-personalizado tooltip-mapa-custom';
  _wrapperMapa.appendChild(_tooltipMapa);

  const _mostrarTooltip = (html, pt) => {
    _tooltipMapa.innerHTML = html;
    _tooltipMapa.style.left = pt.x + 'px';
    _tooltipMapa.style.top  = (pt.y - 14) + 'px';
    _tooltipMapa.style.display = 'block';
  };
  const _ocultarTooltip = () => { _tooltipMapa.style.display = 'none'; };

  if (datosMapa.length === 0) return;

  const maximoEstudiantes = Math.max(...datosMapa.map(registro => registro.estudiantes));

  datosMapa.forEach((municipio) => {
    const radioBase = (municipio.estudiantes / maximoEstudiantes) * 15000;

    const circulo = L.circle(municipio.coordenadas, {
      color: '#16a34a',
      fillColor: '#22c55e',
      fillOpacity: 0.6,
      radius: radioBase,
      weight: 2
    }).addTo(mapa);

    // Popup inicial (datos originales, idéntico al anterior)
    circulo.bindPopup(generarContenidoPopup(municipio));

    const contenidoTooltip = `
      <div style="text-align:center;line-height:1.5;min-width:120px;">
        <div style="font-size:11px;font-weight:700;color:#16a34a;letter-spacing:0.4px;text-transform:uppercase;">${municipio.nombre}</div>
        <div style="font-size:18px;font-weight:800;color:#1f2937;margin:2px 0;">${municipio.estudiantes.toLocaleString('es-CO')}</div>
        <div style="font-size:10px;color:#6b7280;letter-spacing:0.3px;">estudiantes</div>
      </div>
    `;

    // Tooltip propio (fuera del overflow:hidden) + feedback visual en el círculo
    circulo.on('mouseover', function(e) {
      this.setStyle({ fillOpacity: 0.88, weight: 3 });
      _mostrarTooltip(contenidoTooltip, e.containerPoint);
    });
    circulo.on('mousemove', function(e) {
      _mostrarTooltip(contenidoTooltip, e.containerPoint);
    });
    circulo.on('mouseout', function() {
      this.setStyle({ fillOpacity: 0.6, weight: 2 });
      _ocultarTooltip();
    });

    const htmlMarcador = `
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

    const iconoPersonalizado = L.divIcon({
      className: 'marcador-personalizado',
      html: htmlMarcador,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marcador = L.marker(municipio.coordenadas, { icon: iconoPersonalizado })
      .addTo(mapa)
      .bindPopup(generarContenidoPopup(municipio));

    // El marcador cubre el centro del círculo: también muestra el tooltip propio
    marcador.on('mouseover mousemove', function(e) {
      _mostrarTooltip(contenidoTooltip, e.containerPoint);
    });
    marcador.on('mouseout', _ocultarTooltip);

    // Guardar referencia al marcador para actualizar popup post-enriquecimiento
    circulosMapa.push({ circulo, radioBase, municipio, marcador });
  });

  // Ajuste automático de vista: centra y hace zoom para que todos los puntos
  // queden visibles con margen uniforme, sin depender de center/zoom fijos.
  const limitesMapa = L.latLngBounds(datosMapa.map(m => m.coordenadas));
  mapa.fitBounds(limitesMapa, { padding: [40, 40] });

  mapa.on('zoomend', function() {
    const zoomActual = mapa.getZoom();
    const factorZoom = Math.pow(1.15, zoomActual - 8);

    circulosMapa.forEach(({ circulo, radioBase }) => {
      const escalaMaxima = 3;
      const escalaMinima = 0.5;
      const escalaFinal = Math.min(Math.max(factorZoom, escalaMinima), escalaMaxima);
      circulo.setRadius(radioBase * escalaFinal);
    });
  });

  // Nota: API Colombia ya no se usa para los popups del mapa.
  // Toda la información proviene de ESTUDIANTES.csv y Planta_Fisica.csv.
}

function alternarMapaPantallaCompleta() {
  const contenedorMapa = document.getElementById('mapa').parentElement;
  const iconoPantallaCompleta = document.getElementById('iconoPantallaCompleta');
  
  if (esPantallaCompleta) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    esPantallaCompleta = false;
    iconoPantallaCompleta.classList.remove('fa-compress');
    iconoPantallaCompleta.classList.add('fa-expand');

    setTimeout(() => {
      mapa.invalidateSize();
    }, 300);
  } else {
    if (contenedorMapa.requestFullscreen) {
      contenedorMapa.requestFullscreen();
    } else if (contenedorMapa.webkitRequestFullscreen) {
      contenedorMapa.webkitRequestFullscreen();
    } else if (contenedorMapa.msRequestFullscreen) {
      contenedorMapa.msRequestFullscreen();
    }

    esPantallaCompleta = true;
    iconoPantallaCompleta.classList.remove('fa-expand');
    iconoPantallaCompleta.classList.add('fa-compress');

    setTimeout(() => {
      mapa.invalidateSize();
    }, 300);
  }
}

document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement) {
    esPantallaCompleta = false;
    const iconoPantallaCompleta = document.getElementById('iconoPantallaCompleta');
    if (iconoPantallaCompleta) {
      iconoPantallaCompleta.classList.remove('fa-compress');
      iconoPantallaCompleta.classList.add('fa-expand');
      setTimeout(() => mapa.invalidateSize(), 300);
    }
  }
});

// ==========================================
// SELECTOR PERSONALIZADO DE PROGRAMAS
// ==========================================

function seleccionarTopProgramas(valor, botonOpcion) {
  const wrapper = document.getElementById('selectorProgramasWrapper');
  document.getElementById('selectorProgramasTexto').textContent = botonOpcion.textContent;
  wrapper.querySelectorAll('.selector-programas-opcion').forEach(op => op.classList.remove('activa'));
  botonOpcion.classList.add('activa');
  wrapper.classList.remove('abierto');
  actualizarGraficoProgramas(valor);
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(e) {
  const wrapper = document.getElementById('selectorProgramasWrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    wrapper.classList.remove('abierto');
  }
});

// ==========================================
// VISUALIZACIÓN DE MÉTRICAS Y GRÁFICOS
// ==========================================

/**
 * Devuelve el snapshot de Matriculados del último año disponible.
 * Intenta primero IIPA (2.º semestre); si no hay datos (ej: año en curso
 * con solo IPA disponible), cae a IPA automáticamente.
 */
function _snapshotActual() {
  const snapIIPA = calcularSnapshotComunidad({ categoria: 'Matriculados', periodo: 'IIPA' });
  if (snapIIPA && snapIIPA.total > 0) return snapIIPA;
  return calcularSnapshotComunidad({ categoria: 'Matriculados', periodo: 'IPA' });
}

function animarContador(id, valorFinal) {
  const elemento = document.getElementById(id);
  const duracion = 1500;
  const tasaCuadros = 1000 / 60;
  const totalCuadros = Math.round(duracion / tasaCuadros);
  let cuadro = 0;

  const intervalo = setInterval(() => {
    cuadro++;
    const progreso = cuadro / totalCuadros;
    const conteoActual = Math.round(valorFinal * progreso);
    elemento.textContent = conteoActual.toLocaleString('es-CO');
    if (cuadro === totalCuadros) {
      clearInterval(intervalo);
      elemento.textContent = valorFinal.toLocaleString('es-CO');
    }
  }, tasaCuadros);
}

function inicializarMetricas() {
  const snap = _snapshotActual();
  if (!snap) return;
  animarContador('contadorEstudiantesTotal', snap.total);
  animarContador('contadorProgramasTotal',  snap.programasTop.length);
  animarContador('contadorSedesTotal',       Object.keys(snap.porSede).length);
  // Distribución por nivel académico
  animarContador('numPregradoProgramas',    snap.pregradoProgramas);
  animarContador('numPregradoEstudiantes',  snap.pregrado);
  animarContador('numPosgradoProgramas',    snap.posgradoProgramas);
  animarContador('numPosgradoEstudiantes',  snap.posgrado);
  // Actualizar badge de período dinámicamente
  const badge = document.getElementById('badgePeriodoEstudiantes');
  if (badge) {
    const periodoLabel = snap.periodos.includes('IIPA') ? snap.anio + '-2' : snap.anio + '-1';
    badge.innerHTML = '<i class="far fa-clock text-[10px]"></i> ' + periodoLabel;
  }
  actualizarGraficoProgramas(5);
}

function actualizarGraficoProgramas(cantidadTop) {
  const snap = _snapshotActual();
  if (!snap) return;
  const programasTop = snap.programasTop.slice(0, cantidadTop);
  renderizarGraficoProgramas(programasTop.map(([p]) => p), programasTop.map(([, v]) => v));
}

function renderizarGraficoProgramas(etiquetas, datos) {
  const contexto = document.getElementById('graficoProgramas').getContext('2d');
  if (instanciaGraficoProgramas) {
    instanciaGraficoProgramas.destroy();
  }

  // ── Dimensionamiento de dos capas ────────────────────────────────────────
  // contenedorCanvas (inner): Chart.js lee su clientHeight para renderizar.
  //   Crece libremente: max(280px, N × 40px) → barras siempre legibles.
  // contenedorScroll (outer, .grafico-scroll-externo): acota la altura visible.
  //   Top 5-10 → sin scroll (280–400px); Top 11+ → scroll suave hasta 400px.
  //   Esto preserva el layout sin estiramientos exagerados hacia abajo.
  const contenedorCanvas = contexto.canvas.parentElement;
  const contenedorScroll = contenedorCanvas.parentElement;

  const altoPorBarra = 40;  // px por barra — legible y proporcional
  const altoMinimo   = 280; // igual al valor original del HTML → Top 5 idéntico
  const altoMaximo   = 400; // techo visible antes de activar scroll
  const altoTotal    = Math.max(altoMinimo, etiquetas.length * altoPorBarra);

  // Inner: Chart.js renderiza al tamaño completo
  contenedorCanvas.style.height = altoTotal + 'px';

  // Outer: controla lo que el usuario ve
  if (altoTotal > altoMaximo) {
    contenedorScroll.style.maxHeight  = altoMaximo + 'px';
    contenedorScroll.style.overflowY  = 'auto';
  } else {
    contenedorScroll.style.maxHeight  = '';
    contenedorScroll.style.overflowY  = 'hidden';
  }
  // Resetear scroll al tope al cambiar la selección
  contenedorScroll.scrollTop = 0;

  // Gradiente horizontal: Verde Oscuro (#00482B) → Verde Principal (#007B3E)
  const anchoCanvas = contexto.canvas.offsetWidth || 400;
  const gradienteBarra = contexto.createLinearGradient(0, 0, anchoCanvas, 0);
  gradienteBarra.addColorStop(0, 'rgba(0, 72, 43, 0.92)');
  gradienteBarra.addColorStop(1, 'rgba(0, 123, 62, 0.85)');

  instanciaGraficoProgramas = new Chart(contexto, {
    type: 'bar',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Número de Estudiantes',
        data: datos,
        backgroundColor: gradienteBarra,
        borderColor: '#00482B',
        borderWidth: 1,
        borderRadius: 6,
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
// AJUSTE RESPONSIVO DE GRÁFICOS Y MAPAS
// ==========================================
function manejarRedimension() {
  if (vistaActual === 'inicio') {
    registrarDepuracion('🔄 Iniciando redimensionamiento...');
    
    const contenedorMapa = document.getElementById('mapa');
    const contenedorGrafico = document.getElementById('graficoProgramas');
    
    if (contenedorMapa) {
      contenedorMapa.getBoundingClientRect();
    }
    if (contenedorGrafico) {
      contenedorGrafico.getBoundingClientRect();
    }
    
    if (mapa && contenedorMapa) {
      setTimeout(() => {
        mapa.invalidateSize({
          pan: false,
          animate: false
        });
      }, 50);
      
      setTimeout(() => {
        mapa.invalidateSize({
          pan: false,
          animate: false
        });
      }, 200);
      
      setTimeout(() => {
        mapa.invalidateSize();
      }, 350);
    }
    
    if (instanciaGraficoProgramas && contenedorGrafico) {
      const lienzo = contenedorGrafico;
      const contenedorPadre = lienzo.parentElement;
      
      setTimeout(() => {
        if (contenedorPadre) {
          const anchoPadre = contenedorPadre.clientWidth;
          const altoPadre = contenedorPadre.clientHeight;
          
          if (anchoPadre > 0 && altoPadre > 0) {
            lienzo.style.width = anchoPadre + 'px';
            lienzo.style.height = altoPadre + 'px';
          }
        }
        
        instanciaGraficoProgramas.resize();
      }, 50);
      
      setTimeout(() => {
        instanciaGraficoProgramas.resize();
        instanciaGraficoProgramas.update('none');
      }, 200);
      
      setTimeout(() => {
        instanciaGraficoProgramas.resize();
        instanciaGraficoProgramas.update('resize');
      }, 350);
    }
  }
}
