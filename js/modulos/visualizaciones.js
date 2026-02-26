// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN DEL MAPA
// ==========================================

// ── Genera el contenido HTML del popup ──────────────────────────────────
// Si municipio._apiColombia existe (enriquecido por API Colombia),
// añade sección extra con datos oficiales. Si no, popup original intacto.
// Los campos originales (nombre, coordenadas, estudiantes) nunca se alteran.
function generarContenidoPopup(municipio) {
  const api = municipio._apiColombia || null;

  let seccionApi = '';
  if (api) {
    const filaPoblacion = api._poblacion
      ? `<div style="display:flex;justify-content:space-between;padding:3px 0;">
           <span style="color:#6b7280;">Población</span>
           <strong>${api._poblacion.toLocaleString('es-CO')} hab.</strong>
         </div>`
      : '';
    const filaSuperficie = api._superficie
      ? `<div style="display:flex;justify-content:space-between;padding:3px 0;">
           <span style="color:#6b7280;">Área</span>
           <strong>${api._superficie.toLocaleString('es-CO')} km²</strong>
         </div>`
      : '';
    const filaCP = api._codigoPostal
      ? `<div style="display:flex;justify-content:space-between;padding:3px 0;">
           <span style="color:#6b7280;">Cód. postal</span>
           <strong>${api._codigoPostal}</strong>
         </div>`
      : '';
    const descripcion = api._descripcion
      ? `<div style="font-size:10px;color:#9ca3af;font-style:italic;
                     margin-top:6px;line-height:1.4;max-width:210px;">
           ${api._descripcion.length > 110
             ? api._descripcion.substring(0, 110) + '…'
             : api._descripcion}
         </div>`
      : '';

    if (filaPoblacion || filaSuperficie || filaCP) {
      seccionApi = `
        <div style="border-top:1px solid #e5e7eb;margin-top:10px;padding-top:10px;
                    font-size:12px;text-align:left;">
          ${filaPoblacion}${filaSuperficie}${filaCP}
          ${descripcion}
          <div style="margin-top:6px;font-size:9px;color:#d1d5db;text-align:right;">
            Fuente datos oficiales: api-colombia.com
          </div>
        </div>`;
    }
  }

  return `
    <div style="text-align:center;padding:8px;min-width:180px;">
      <h3 style="margin:0 0 8px 0;color:#16a34a;font-size:16px;font-weight:bold;">
        ${municipio.nombre}
      </h3>
      <div style="font-size:24px;font-weight:bold;color:#1f2937;margin-bottom:4px;">
        ${municipio.estudiantes.toLocaleString('es-CO')}
      </div>
      <div style="font-size:12px;color:#6b7280;">
        Estudiantes UCundinamarca
      </div>
      ${seccionApi}
    </div>`;
}

function inicializarMapa() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded.');
    return;
  }

  // ── Datos originales — NO SE MODIFICAN ──────────────────────────────
  // _apiColombia se inicializa en null; se rellena async por api-colombia.js
  const datosMapa = [
    { nombre: "Fusagasuga",  coordenadas: [4.3391, -74.3636], estudiantes: 3422, _apiColombia: null },
    { nombre: "Soacha",      coordenadas: [4.579,  -74.214],  estudiantes: 1726, _apiColombia: null },
    { nombre: "Facatativá",  coordenadas: [4.814,  -74.356],  estudiantes: 2905, _apiColombia: null },
    { nombre: "Chía",        coordenadas: [4.858,  -74.053],  estudiantes: 1996, _apiColombia: null },
    { nombre: "Ubaté",       coordenadas: [5.313,  -73.816],  estudiantes: 1327, _apiColombia: null },
    { nombre: "Girardot",    coordenadas: [4.304,  -74.804],  estudiantes: 1359, _apiColombia: null },
    { nombre: "Zipaquirá",   coordenadas: [5.025,  -74.004],  estudiantes:  214, _apiColombia: null }
  ];

  mapa = L.map('mapa', {
    center: [4.5, -74.0],
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

  // ── Enriquecimiento async con API Colombia ───────────────────────────
  // Se ejecuta DESPUÉS de que el mapa ya renderizó (no bloquea).
  // Cuando llegan datos para cada municipio, se actualiza solo el popup.
  if (typeof ApiColombia !== 'undefined') {
    ApiColombia.enriquecerDatosMapa(datosMapa, function(municipioEnriquecido) {
      const entrada = circulosMapa.find(e => e.municipio === municipioEnriquecido);
      if (!entrada) return;
      const nuevoPopup = generarContenidoPopup(municipioEnriquecido);
      entrada.circulo.setPopupContent(nuevoPopup);
      entrada.marcador.setPopupContent(nuevoPopup);
    });
  }
}

function alternarMapaPantallaCompleta() {
  const contenedorMapa = document.getElementById('mapa').parentElement;
  const iconoPantallaCompleta = document.getElementById('iconoPantallaCompleta');
  
  if (!esPantallaCompleta) {
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
  } else {
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
  animarContador('contadorEstudiantesTotal', 12949);
  animarContador('contadorProgramasTotal', 49);
  animarContador('contadorSedesTotal', 7);

  actualizarGraficoProgramas(5);
}

function actualizarGraficoProgramas(cantidadTop) {
  const totalesProgramas = datosEstudiantes.reduce((acumulador, registro) => {
    acumulador[registro.Programa] = (acumulador[registro.Programa] || 0) + registro.Estudiantes;
    return acumulador;
  }, {});
  
  const programasTop = Object.entries(totalesProgramas)
    .sort(([, valorA], [, valorB]) => valorB - valorA)
    .slice(0, cantidadTop);
  renderizarGraficoProgramas(programasTop.map(par => par[0]), programasTop.map(par => par[1]));
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
      void contenedorMapa.offsetHeight;
    }
    if (contenedorGrafico) {
      void contenedorGrafico.offsetHeight;
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
