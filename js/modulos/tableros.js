// ==========================================
// MOTOR DE RENDERIZADO DINÁMICO DE INTERFAZ
// ==========================================


// ==========================================
// CONTADORES GLOBALES DE TABLEROS POR ROL
// ==========================================
function actualizarEstadisticasRol(rol) {
  const tablerosRol = tableros.filter(tablero => tablero.rol === rol);
  const total = tablerosRol.length;
  
  let idElementoEstadistica;
  if (rol === 'Estudiante') {
    idElementoEstadistica = 'totalEstudiantes';
  } else if (rol === 'Administrativo') {
    idElementoEstadistica = 'totalAdministrativos';
  } else {
    idElementoEstadistica = 'totalGestores';
  }
  
  const elementoEstadistica = document.getElementById(idElementoEstadistica);
  if (elementoEstadistica) {
    elementoEstadistica.textContent = total;
  }
}

function renderizarTablerosPorRol(rol) {
  registrarDepuracion(`Renderizando tableros para rol: ${rol}`);
  
  const tablerosRol = tableros.filter(tablero => tablero.rol === rol);
  const idContenedor = rol === 'Estudiante' ? 'tablerosEstudiantes' :
                      rol === 'Administrativo' ? 'tablerosAdministrativos' :
                      'tablerosGestores';
  
  const contenedor = document.getElementById(idContenedor);
  
  const agrupados = {};
  tablerosRol.forEach(tablero => {
    if (!agrupados[tablero.macroproceso]) agrupados[tablero.macroproceso] = {};
    if (!agrupados[tablero.macroproceso][tablero.area]) agrupados[tablero.macroproceso][tablero.area] = [];
    agrupados[tablero.macroproceso][tablero.area].push(tablero);
  });
  
  contenedor.innerHTML = Object.entries(agrupados).map(([macroproceso, areas]) => {
    const configuracion = MACROPROCESOS[macroproceso] || {
      icono: 'fa-layer-group',
      color: 'misional',
      areas: []
    };
    const idMacroproceso = generarIdSeguro(`${rol}-${macroproceso}`, 'macro');
    
    return `
      <div class="seccion-macroproceso ${configuracion.color}">
        <div class="encabezado-macroproceso" data-id-macroproceso="${idMacroproceso}">
          <div class="titulo-macroproceso">
            <div class="icono-macroproceso">
              <i class="fas ${configuracion.icono}"></i>
            </div>
            <div class="texto-titulo-macroproceso">
              <span>Macroproceso ${macroproceso}</span>
              <div class="conteo-macroproceso">${Object.values(areas).reduce((sum, arr) => sum + arr.length, 0)} tableros</div>
            </div>
          </div>
          <i class="fas fa-chevron-down icono-colapsar expandido" id="icono-${idMacroproceso}"></i>
        </div>
        <div class="contenido-macroproceso expandido" id="contenido-${idMacroproceso}">
          ${Object.entries(areas).map(([area, items], indice) => 
            crearTarjetaArea(area, items, configuracion.color, indice, `${rol}-${macroproceso}-`)
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  Object.keys(agrupados).forEach((macroproceso) => {
    const idMacroproceso = generarIdSeguro(`${rol}-${macroproceso}`, 'macro');
    macroprocesosExpandidos[idMacroproceso] = true;
  });
  
  actualizarEstadisticasRol(rol);
  registrarDepuracion(`Tableros renderizados para ${rol}`);
}

// ==========================================
// CONTROL DE INTERACCIÓN: SECCIONES COLAPSABLES
// ==========================================

function alternarMacroproceso(idMacroproceso) {
  registrarDepuracion(`Toggle macroproceso: ${idMacroproceso}`);
  
  const contenido = document.getElementById(`contenido-${idMacroproceso}`);
  const icono = document.getElementById(`icono-${idMacroproceso}`);
  
  if (!contenido || !icono) {
    console.error(`❌ No se encontraron elementos para macroproceso: ${idMacroproceso}`);
    return;
  }
  
  const estaExpandido = macroprocesosExpandidos[idMacroproceso];
  
  if (estaExpandido) {
    contenido.classList.remove('expandido');
    icono.classList.remove('expandido');
    macroprocesosExpandidos[idMacroproceso] = false;
  } else {
    contenido.classList.add('expandido');
    icono.classList.add('expandido');
    macroprocesosExpandidos[idMacroproceso] = true;
  }
}

function alternarArea(idArea) {
  registrarDepuracion(`Toggle área: ${idArea}`);
  
  const contenedor = document.getElementById(`tableros-${idArea}`);
  const tarjeta = document.getElementById(`tarjeta-area-${idArea}`);
  
  if (!contenedor || !tarjeta) {
    console.error(`❌ No se encontraron elementos para área: ${idArea}`);
    return;
  }
  
  const estaExpandido = areasExpandidas[idArea];
  
  if (estaExpandido) {
    contenedor.classList.remove('expandido');
    tarjeta.classList.remove('expandido');
    areasExpandidas[idArea] = false;
  } else {
    contenedor.classList.add('expandido');
    tarjeta.classList.add('expandido');
    areasExpandidas[idArea] = true;
  }
}

// ==========================================
// OPTIMIZACIÓN DE EVENTOS MEDIANTE DELEGACIÓN
// ==========================================

function configurarDelegacionEventos() {
  registrarDepuracion('Configurando event delegation para acordeones');
  
  document.addEventListener('click', function(evento) {
    const encabezado = evento.target.closest('.encabezado-macroproceso');
    if (encabezado) {
      evento.stopPropagation();
      const idMacroproceso = encabezado.dataset.idMacroproceso;
      if (idMacroproceso) {
        alternarMacroproceso(idMacroproceso);
      }
    }
  });
  
  document.addEventListener('click', function(evento) {
    const encabezado = evento.target.closest('.encabezado-tarjeta-area');
    if (encabezado) {
      evento.stopPropagation();
      const idArea = encabezado.dataset.idArea;
      if (idArea) {
        alternarArea(idArea);
      }
    }
  });
  
  registrarDepuracion('Event delegation configurado ✔');
}

// ==========================================
// COMPONENTES DE INTERFAZ: TARJETAS DE ÁREA
// ==========================================

function crearTarjetaArea(area, tablerosEnArea, colorMacroproceso, indice, contexto = '') {
  const idArea = generarIdSeguro(area, contexto + 'area');
  const claseIcono = ICONOS_AREA[area] || 'fa-folder-open';
  const cantidadTableros = tablerosEnArea.length;
  
  registrarDepuracion(`Creando tarjeta para área: "${area}" con ID único: "${idArea}"`);
  
  return `
    <div class="tarjeta-area" id="tarjeta-area-${idArea}" style="animation-delay: ${indice * 0.1}s;">
      <div class="encabezado-tarjeta-area" data-id-area="${idArea}">
        <div class="icono-tarjeta-area ${colorMacroproceso}">
          <i class="fas ${claseIcono}"></i>
        </div>
        <div class="info-tarjeta-area">
          <div class="titulo-tarjeta-area">${area}</div>
          <div class="subtitulo-tarjeta-area">
            <span class="insignia-tarjeta-area">
              <i class="fas fa-chart-bar"></i>
              ${cantidadTableros} tablero${cantidadTableros !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <i class="fas fa-chevron-down expandir-tarjeta-area"></i>
      </div>
      <div class="contenedor-tableros-area" id="tableros-${idArea}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${tablerosEnArea.map(tablero => crearTarjetaTablero(tablero)).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// COMPONENTES DE INTERFAZ: TARJETAS DE TABLERO
// ==========================================

function crearTarjetaTablero(tablero) {
  const esEnlaceExterno = !tablero.url.includes('powerbi.com');
  
  const iconoBoton = esEnlaceExterno ? 'fa-external-link-alt' : 'fa-chart-line';
  const textoBoton = esEnlaceExterno ? 'Visitar Sitio' : 'Ver Dashboard';

  return `
    <div class="tarjeta-tablero">
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <h4 class="font-bold text-gray-800 flex-1 pr-2 text-base leading-tight">${tablero.titulo}</h4>
          <i class="fas fa-chart-line text-green-600 flex-shrink-0"></i>
        </div>
        <div class="metadatos-tablero">
          <div class="item-metadatos-tablero">
            <i class="fas fa-calendar-alt"></i>
            <span><strong>Actualización:</strong> ${tablero.fechaActualizacion}</span>
          </div>
          <div class="item-metadatos-tablero">
            <i class="fas fa-database"></i>
            <span><strong>Fuente:</strong> ${tablero.fuente}</span>
          </div>
          <div class="item-metadatos-tablero">
            <i class="fas fa-user-edit"></i>
            <span><strong>Elaborado por:</strong> ${tablero.elaboradoPor}</span>
          </div>
        </div>
        <button onclick="abrirTablero(${tablero.id}); event.stopPropagation();" class="boton-primario w-full justify-center mt-4">
          <i class="fas ${iconoBoton}"></i><span>${textoBoton}</span>
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// GESTIÓN DEL MODAL DE VISUALIZACIÓN
// ==========================================

function obtenerClaseTipo(tipo) {
  if (tipo === 'text') return 'tipo-texto';
  if (tipo === 'number') return 'tipo-numero';
  if (tipo === 'date') return 'tipo-fecha';
  return 'tipo-texto';
}

function renderizarInfoDataset(tablero) {
  if (!tablero.nombreDataset) return '';
  
  const htmlColumnas = tablero.columnas ? `
    <table class="tabla-columnas">
      <thead>
        <tr>
          <th>Campo</th>
          <th>Tipo</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        ${tablero.columnas.map(col => `
          <tr>
            <td><strong>${col.nombre}</strong></td>
            <td><span class="tipo-columna ${obtenerClaseTipo(col.tipo)}">${col.tipo}</span></td>
            <td>${col.descripcion}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : '';
  
  return htmlColumnas;
}

// ==========================================
// LÓGICA DEL MODAL Y BLOQUEO DE SCROLL
// ==========================================

// Variable global para guardar la posición del scroll
let posicionScroll = 0;

function abrirTablero(id) {
  const tablero = tableros.find(tablero => tablero.id === id);
  if (!tablero) return;

  const esEnlaceExterno = !tablero.url.includes('powerbi.com');

  if (esEnlaceExterno) {
    window.open(tablero.url, '_blank');
    return;
  }

  tableroActual = tablero;
  panelInfoExpandido = false;
  
  const divTemporal = document.createElement('div');
  divTemporal.innerHTML = tablero.titulo;
  const tituloLimpio = divTemporal.textContent || divTemporal.innerText || "";
  
  document.getElementById('tituloModal').textContent = tituloLimpio;
  document.getElementById('areaModal').textContent = tablero.area;
  document.getElementById('contenedorIframe').innerHTML = 
    `<iframe src="${tablero.url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
  
  document.getElementById('infoDescripcion').textContent = tablero.descripcion || 'Sin descripción disponible';
  
  const insigniaEstado = document.getElementById('infoEstado');
  insigniaEstado.textContent = tablero.estado || 'Sin información';
  insigniaEstado.className = 'insignia-estado estado-' + (tablero.estado === 'Activo' ? 'activo' : 'inactivo');
  
  const seccionHistorico = document.getElementById('seccionInfoHistorico');
  if (tablero.esHistorico) {
    seccionHistorico.style.display = 'block';
    document.getElementById('infoHistorico').textContent = 'Este tablero contiene datos históricos sin actualización periódica.';
  } else {
    seccionHistorico.style.display = 'none';
  }
  
  document.getElementById('infoObservaciones').textContent = tablero.observaciones || 'Sin observaciones adicionales';
  
  // Lógica para el diccionario de datos
  if (tablero.nombreDataset) {
    document.getElementById('nombreDataset').textContent = tablero.nombreDataset;
    document.getElementById('resumenDataset').textContent = tablero.resumenDataset || 'Dataset del tablero de indicadores institucionales.';
    document.getElementById('contenedorColumnasDataset').innerHTML = renderizarInfoDataset(tablero);
    document.getElementById('fuenteDataset').textContent = tablero.fuenteDataset || tablero.fuente;
    document.getElementById('notasDataset').textContent = tablero.notasDataset || 'Consultar documentación técnica para más detalles.';
  } else {
    document.getElementById('nombreDataset').textContent = tablero.titulo;
    document.getElementById('resumenDataset').textContent = 'Dataset de indicadores institucionales sin especificación detallada.';
    document.getElementById('contenedorColumnasDataset').innerHTML = '<p class="text-gray-600 text-sm">Información de campos no disponible.</p>';
    document.getElementById('fuenteDataset').textContent = tablero.fuente;
    document.getElementById('notasDataset').textContent = 'Consultar con el área responsable para información técnica detallada.';
  }
  
  const panelInfo = document.getElementById('panelInfoTablero');
  panelInfo.classList.remove('expandido');
  
  // Guardar posición del scroll antes de abrir el modal
  posicionScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Agregar clase para prevenir scroll
  document.body.classList.add('modal-abierto');
  document.body.style.top = `-${posicionScroll}px`;

  document.getElementById('modalTablero').classList.add('activo');
}

function cerrarModalTablero() {
  // Remover clase que previene scroll
  document.body.classList.remove('modal-abierto');
  document.body.style.top = '';
  
  // Restaurar posición del scroll
  window.scrollTo(0, posicionScroll);

  document.getElementById('modalTablero').classList.remove('activo');
  document.getElementById('contenedorIframe').innerHTML = '';
  
  // Resetear el panel de información y el botón de toggle
  const panel = document.getElementById('panelInfoTablero');
  const botonAlternar = document.getElementById('botonAlternarPanelInfo');
  
  panel.classList.remove('expandido');
  panel.style.width = '';
  botonAlternar.style.display = 'flex';
  botonAlternar.innerHTML = '<i class="fas fa-info-circle"></i>';
  botonAlternar.title = 'Mostrar información del tablero';
  
  tableroActual = null;
  panelInfoExpandido = false;
}

function alternarPanelInfo() {
  const panel = document.getElementById('panelInfoTablero');
  const botonAlternar = document.getElementById('botonAlternarPanelInfo');
  const esMovil = window.innerWidth <= 768;
  
  panelInfoExpandido = !panelInfoExpandido;
  
  if (panelInfoExpandido) {
    panel.classList.add('expandido');
    
    // En móviles, ocultar el botón de toggle cuando el panel está abierto
    if (esMovil) {
      botonAlternar.style.display = 'none';
    } else {
      botonAlternar.innerHTML = '<i class="fas fa-times"></i>';
      botonAlternar.title = 'Ocultar información';
    }
  } else {
    panel.classList.remove('expandido');
    panel.style.width = ''; 
    
    // Mostrar el botón de toggle
    botonAlternar.style.display = 'flex';
    botonAlternar.innerHTML = '<i class="fas fa-info-circle"></i>';
    botonAlternar.title = 'Mostrar información del tablero';
  }
}

function abrirEnNuevaPestana() {
  if (tableroActual) {
    window.open(tableroActual.url, '_blank');
  }
}

function descargarCSV() {
  if (!tableroActual) return;
  
  const csvContent = `Tablero,Area,Fecha Actualización,Fuente,Elaborado Por,Descripción,Estado,Observaciones
"${tableroActual.titulo}","${tableroActual.area}","${tableroActual.fechaActualizacion}","${tableroActual.fuente}","${tableroActual.elaboradoPor}","${tableroActual.descripcion}","${tableroActual.estado}","${tableroActual.observaciones}"`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const enlace = document.createElement('a');
  const urlDescarga = URL.createObjectURL(blob);
  
  enlace.setAttribute('href', urlDescarga);
  enlace.setAttribute('download', `${tableroActual.titulo.replace(/[^a-z0-9]/gi, '_')}.csv`);
  enlace.style.visibility = 'hidden';
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}

// ==========================================
// CONTROLADOR DE REDIMENSIONAMIENTO DEL PANEL LATERAL
// ==========================================
function inicializarControlRedimension() {
  const control = document.getElementById('controlRedimension');
  const panel = document.getElementById('panelInfoTablero');
  const contenedor = document.querySelector('.cuerpo-modal-tablero'); 
  const contenedorIframe = document.getElementById('contenedorIframe'); // Referencia al contenedor del iframe

  if (!control || !panel || !contenedor) return;

  let redimensionando = false;

  control.addEventListener('mousedown', (evento) => {
    evento.preventDefault();
    redimensionando = true;
    
    // Cambiar cursor globalmente
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    if (contenedorIframe) contenedorIframe.style.pointerEvents = 'none';
  });

  document.addEventListener('mousemove', (evento) => {
    if (!redimensionando) return;

    const rectContenedor = contenedor.getBoundingClientRect();
    const nuevoAncho = rectContenedor.right - evento.clientX;

    // Limitar ancho (Mínimo 300px, Máximo 80% del contenedor)
    if (nuevoAncho > 300 && nuevoAncho < (rectContenedor.width * 0.8)) {
      panel.style.width = `${nuevoAncho}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (redimensionando) {
      redimensionando = false;
      
      // Restaurar estilos
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Reactivar interacción con el iframe
      if (contenedorIframe) contenedorIframe.style.pointerEvents = 'auto';
    }
  });
}
