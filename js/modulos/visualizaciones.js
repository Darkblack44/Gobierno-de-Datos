// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN DEL MAPA
// ==========================================

function inicializarMapa() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded.');
    return;
  }

  const datosMapa = [
    { nombre: "Fusagasuga", coordenadas: [4.3391, -74.3636], estudiantes: 3422 },
    { nombre: "Soacha", coordenadas: [4.579, -74.214], estudiantes: 1726 },
    { nombre: "Facatativá", coordenadas: [4.814, -74.356], estudiantes: 2905 },
    { nombre: "Chía", coordenadas: [4.858, -74.053], estudiantes: 1996 },
    { nombre: "Ubaté", coordenadas: [5.313, -73.816], estudiantes: 1327 },
    { nombre: "Girardot", coordenadas: [4.304, -74.804], estudiantes: 1359 },
    { nombre: "Zipaquirá", coordenadas: [5.025, -74.004], estudiantes: 214 }
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

    circulosMapa.push({ circulo, radioBase, municipio });

    const contenidoPopup = `
      <div style="text-align: center; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 16px; font-weight: bold;">
          ${municipio.nombre}
        </h3>
        <div style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
          ${municipio.estudiantes.toLocaleString('es-CO')}
        </div>
        <div style="font-size: 12px; color: #6b7280;">
          Estudiantes
        </div>
      </div>
    `;

    circulo.bindPopup(contenidoPopup);

    const contenidoTooltip = `
      <strong>${municipio.nombre}</strong><br>
      ${municipio.estudiantes.toLocaleString('es-CO')} estudiantes
    `;

    circulo.bindTooltip(contenidoTooltip, {
      permanent: false,
      direction: 'top',
      className: 'tooltip-personalizado'
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

    L.marker(municipio.coordenadas, { icon: iconoPersonalizado })
      .addTo(mapa)
      .bindPopup(contenidoPopup);
  });

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
  instanciaGraficoProgramas = new Chart(contexto, {
    type: 'bar',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Número de Estudiantes',
        data: datos,
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
