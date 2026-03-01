// ==========================================
// SISTEMA DE BÚSQUEDA INDEPENDIENTE POR ROL
// ==========================================
/* global macroprocesosExpandidos, areasExpandidas, renderizarTablerosPorRol */

// Variables globales para almacenar el estado de búsqueda por rol
const estadoBusqueda = {
  estudiantes: {
    terminoBusqueda: '',
    tablerosFiltrados: [],
    totalResultados: 0,
    macroprocesosExpandidosGuardados: {},  // Guarda estado de macroprocesos antes de buscar
    areasExpandidasGuardadas: {}            // Guarda estado de áreas antes de buscar
  },
  administrativos: {
    terminoBusqueda: '',
    tablerosFiltrados: [],
    totalResultados: 0,
    macroprocesosExpandidosGuardados: {},
    areasExpandidasGuardadas: {}
  },
  gestores: {
    terminoBusqueda: '',
    tablerosFiltrados: [],
    totalResultados: 0,
    macroprocesosExpandidosGuardados: {},
    areasExpandidasGuardadas: {}
  }
};

/**
 * Normaliza texto para búsqueda (elimina acentos y convierte a minúsculas)
 */
function normalizarTexto(text) {
  if (!text) return '';
  return text.toString()
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "");
}

/**
 * Resalta el término de búsqueda en el texto
 */
function resaltarTerminoBusqueda(text, terminoBusqueda) {
  if (!terminoBusqueda || !text) return text;
  
  const terminoNormalizado = normalizarTexto(terminoBusqueda);
  const textoNormalizado = normalizarTexto(text);
  
  // Si hay coincidencia, resaltar
  if (textoNormalizado.includes(terminoNormalizado)) {
    let result = text;
    const words = terminoBusqueda.split(' ').filter(w => w.length > 0);
    
    words.forEach(word => {
      const wordRegex = new RegExp(`(${word})`, 'gi');
      result = result.replace(wordRegex, '<span class="resaltado">$1</span>');
    });
    
    return result;
  }
  
  return text;
}

/**
 * Filtra tableros según el término de búsqueda
 */
function filtrarTableros(rol, terminoBusqueda) {
  const terminoNormalizado = normalizarTexto(terminoBusqueda);
  
  if (!terminoNormalizado) {
    return tableros.filter(tablero => tablero.rol === rol);
  }
  
  return tableros.filter(tablero => {
    if (tablero.rol !== rol) return false;
    
    // Buscar en múltiples campos
    const textoBuscable = [
      tablero.titulo,
      tablero.area,
      tablero.descripcion,
      tablero.macroproceso,
      tablero.subproceso,
      tablero.elaboradoPor,
      tablero.fuente
    ].join(' ');
    
    const textoNormalizado = normalizarTexto(textoBuscable);
    
    // Buscar cada palabra del término de búsqueda
    const palabrasBusqueda = terminoNormalizado.split(' ').filter(w => w.length > 0);
    return palabrasBusqueda.every(word => textoNormalizado.includes(word));
  });
}

/**
 * Renderiza los tableros filtrados por búsqueda
 */
function renderizarTablerosFiltrados(rol, tablerosFiltrados, terminoBusqueda) {
  let idContenedor;
  let sufijo;
  if (rol === 'Estudiante') {
    idContenedor = 'tablerosEstudiantes';
    sufijo = 'Estudiantes';
  } else if (rol === 'Administrativo') {
    idContenedor = 'tablerosAdministrativos';
    sufijo = 'Administrativos';
  } else {
    idContenedor = 'tablerosGestores';
    sufijo = 'Gestores';
  }

  const contenedor = document.getElementById(idContenedor);
  const idInfoResultados = `resultadosBusqueda${sufijo}`;
  const infoResultados = document.getElementById(idInfoResultados);

  // Actualizar información de resultados
  if (terminoBusqueda && tablerosFiltrados.length > 0) {
    infoResultados.innerHTML = `Se encontraron <strong>${tablerosFiltrados.length}</strong> dashboard${tablerosFiltrados.length === 1 ? '' : 's'} que coinciden con "${terminoBusqueda}"`;
    infoResultados.style.display = 'block';
  } else {
    infoResultados.innerHTML = '';
    infoResultados.style.display = 'none';
  }
  
  // Si no hay resultados, mostrar mensaje
  if (terminoBusqueda && tablerosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-resultados">
        <div class="icono-sin-resultados">
          <i class="fas fa-search"></i>
        </div>
        <h3>No se encontraron resultados</h3>
        <p>No hay dashboards que coincidan con "${terminoBusqueda}"</p>
        <p style="margin-top: 1rem; font-size: 0.875rem;">Intenta con otros términos de búsqueda o borra el texto para ver todos los dashboards.</p>
      </div>
    `;
    return;
  }
  
  // Agrupar tableros por macroproceso y área
  const agrupados = {};
  tablerosFiltrados.forEach(d => {
    if (!agrupados[d.macroproceso]) agrupados[d.macroproceso] = {};
    if (!agrupados[d.macroproceso][d.area]) agrupados[d.macroproceso][d.area] = [];
    agrupados[d.macroproceso][d.area].push(d);
  });
  
  // Renderizar tableros con resaltado de búsqueda
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
            <span>${resaltarTerminoBusqueda(`Macroproceso ${macroproceso}`, terminoBusqueda)}</span>
          </div>
          <i class="fas fa-chevron-down icono-colapsar expandido" id="icono-${idMacroproceso}"></i>
        </div>
        <div class="contenido-macroproceso expandido" id="contenido-${idMacroproceso}">
          ${Object.entries(areas).map(([area, items], indice) => 
            crearTarjetaAreaResaltadaBusqueda(area, items, configuracion.color, indice, `${rol}-${macroproceso}-`, terminoBusqueda)
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  // Actualizar estado de expansión
  Object.keys(agrupados).forEach((macroproceso) => {
    const idMacroproceso = generarIdSeguro(`${rol}-${macroproceso}`, 'macro');
    macroprocesosExpandidos[idMacroproceso] = true;
  });
}

/**
 * Crea una tarjeta de área con resaltado de búsqueda
 */
function crearTarjetaAreaResaltadaBusqueda(area, tablerosEnArea, colorMacroproceso, indice, contexto = '', terminoBusqueda = '') {
  const idArea = generarIdSeguro(area, contexto + 'area');
  const claseIcono = ICONOS_AREA[area] || 'fa-folder-open';
  const cantidadTableros = tablerosEnArea.length;
  
  return `
    <div class="tarjeta-area expandido" id="tarjeta-area-${idArea}" style="animation-delay: ${indice * 0.1}s;">
      <div class="encabezado-tarjeta-area" data-id-area="${idArea}">
        <div class="icono-tarjeta-area ${colorMacroproceso}">
          <i class="fas ${claseIcono}"></i>
        </div>
        <div class="info-tarjeta-area">
          <div class="titulo-tarjeta-area">${resaltarTerminoBusqueda(area, terminoBusqueda)}</div>
          <div class="subtitulo-tarjeta-area">
            <span class="insignia-tarjeta-area">
              <i class="fas fa-chart-bar"></i>
              ${cantidadTableros} tablero${cantidadTableros === 1 ? '' : 's'}
            </span>
          </div>
        </div>
        <i class="fas fa-chevron-down expandir-tarjeta-area"></i>
      </div>
      <div class="contenedor-tableros-area expandido" id="tableros-${idArea}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${tablerosEnArea.map(tablero => {
            const esEnlaceExterno = !tablero.url.includes('powerbi.com');
            const iconoBoton = esEnlaceExterno ? 'fa-external-link-alt' : 'fa-chart-line';
            const textoBoton = esEnlaceExterno ? 'Visitar Sitio' : 'Ver Dashboard';
            
            return `
              <div class="tarjeta-tablero">
                <div class="tarjeta-tablero-cabecera">
                  <div class="tarjeta-tablero-icono-hex">
                    <i class="fas fa-chart-line"></i>
                  </div>
                </div>
                <div class="tarjeta-tablero-cuerpo">
                  <h4 class="tarjeta-tablero-titulo">${resaltarTerminoBusqueda(tablero.titulo, terminoBusqueda)}</h4>
                  <div class="metadatos-tablero">
                    <div class="item-metadatos-tablero">
                      <i class="fas fa-calendar-alt"></i>
                      <span><strong>Actualización:</strong> ${tablero.fechaActualizacion}</span>
                    </div>
                    <div class="item-metadatos-tablero">
                      <i class="fas fa-database"></i>
                      <span><strong>Fuente:</strong> ${resaltarTerminoBusqueda(tablero.fuente, terminoBusqueda)}</span>
                    </div>
                    <div class="item-metadatos-tablero">
                      <i class="fas fa-user-edit"></i>
                      <span><strong>Elaborado por:</strong> ${tablero.elaboradoPor}</span>
                    </div>
                  </div>
                  <button onclick="abrirTablero(${tablero.id}); event.stopPropagation();" class="boton-tablero-nuevo">
                    <i class="fas ${iconoBoton}"></i><span>${textoBoton}</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Inicializa el sistema de búsqueda para un rol específico
 */
function inicializarBusqueda(rol) {
  let sufijo;
  if (rol === 'Estudiante') {
    sufijo = 'Estudiantes';
  } else if (rol === 'Administrativo') {
    sufijo = 'Administrativos';
  } else {
    sufijo = 'Gestores';
  }

  const idEntradaBusqueda = `busqueda${sufijo}`;
  const idBotonLimpiar = `limpiarBusqueda${sufijo}`;
  
  const entradaBusqueda = document.getElementById(idEntradaBusqueda);
  const botonLimpiar = document.getElementById(idBotonLimpiar);
  
  if (!entradaBusqueda || !botonLimpiar) {
    registrarDepuracion(`⚠️ No se encontraron elementos de búsqueda para rol: ${rol}`);
    return;
  }
  
  // Evento de escritura en el campo de búsqueda
  let temporizadorBusqueda;
  entradaBusqueda.addEventListener('input', (evento) => {
    const terminoBusqueda = evento.target.value.trim();
    
    // Mostrar/ocultar botón de limpiar
    if (terminoBusqueda) {
      botonLimpiar.classList.add('visible');
    } else {
      botonLimpiar.classList.remove('visible');
    }
    
    // Debounce: esperar 300ms después de que el usuario deje de escribir
    clearTimeout(temporizadorBusqueda);
    temporizadorBusqueda = setTimeout(() => {
      ejecutarBusqueda(rol, terminoBusqueda);
    }, 300);
  });
  
  // Evento del botón de limpiar búsqueda
  botonLimpiar.addEventListener('click', () => {
    entradaBusqueda.value = '';
    botonLimpiar.classList.remove('visible');
    ejecutarBusqueda(rol, '');
    entradaBusqueda.focus();
  });
  
  // Permitir búsqueda con Enter
  entradaBusqueda.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
      clearTimeout(temporizadorBusqueda);
      const terminoBusqueda = evento.target.value.trim();
      ejecutarBusqueda(rol, terminoBusqueda);
    }
  });
  
  registrarDepuracion(`✔ Sistema de búsqueda inicializado para rol: ${rol}`);
}

/**
 * Ejecuta la búsqueda para un rol específico
 */
function ejecutarBusqueda(rol, terminoBusqueda) {
  let claveRol;
  if (rol === 'Estudiante') {
    claveRol = 'estudiantes';
  } else if (rol === 'Administrativo') {
    claveRol = 'administrativos';
  } else {
    claveRol = 'gestores';
  }
  
  registrarDepuracion(`🔍 Búsqueda en ${rol}: "${terminoBusqueda}"`);
  
  // Detectar transición: ¿El usuario está comenzando una búsqueda?
  const wasSearching = !!estadoBusqueda[claveRol].terminoBusqueda;
  const isSearching = !!(terminoBusqueda && terminoBusqueda.trim() !== '');
  
  // Si es la primera búsqueda, guardar el estado actual de expansión
  if (!wasSearching && isSearching) {
    registrarDepuracion('💾 Guardando estado de expansión antes de búsqueda');
    estadoBusqueda[claveRol].macroprocesosExpandidosGuardados = {...macroprocesosExpandidos};
    estadoBusqueda[claveRol].areasExpandidasGuardadas = {...areasExpandidas};
  }
  
  // Actualizar estado de búsqueda
  estadoBusqueda[claveRol].terminoBusqueda = terminoBusqueda;
  
  // Si no hay término de búsqueda, restaurar vista con estado previo
  if (!terminoBusqueda || terminoBusqueda.trim() === '') {
    registrarDepuracion('📋 Restaurando vista con estado previo de expansión');
    estadoBusqueda[claveRol].tablerosFiltrados = [];
    estadoBusqueda[claveRol].totalResultados = 0;
    
    // Limpiar información de resultados
    let sufijoInfo;
    if (rol === 'Estudiante') {
      sufijoInfo = 'Estudiantes';
    } else if (rol === 'Administrativo') {
      sufijoInfo = 'Administrativos';
    } else {
      sufijoInfo = 'Gestores';
    }
    const idInfoResultados = `resultadosBusqueda${sufijoInfo}`;
    const infoResultados = document.getElementById(idInfoResultados);
    if (infoResultados) {
      infoResultados.innerHTML = '';
      infoResultados.style.display = 'none';
    }
    
    // Restaurar el estado de expansión guardado
    if (Object.keys(estadoBusqueda[claveRol].macroprocesosExpandidosGuardados).length > 0) {
      macroprocesosExpandidos = {...estadoBusqueda[claveRol].macroprocesosExpandidosGuardados};
      areasExpandidas = {...estadoBusqueda[claveRol].areasExpandidasGuardadas};
      registrarDepuracion('✅ Estado de expansión restaurado', {
        macroprocesos: Object.keys(macroprocesosExpandidos).length,
        areas: Object.keys(areasExpandidas).length
      });
    }
    
    // Llamar al renderizado original (que respetará el estado restaurado)
    renderizarTablerosPorRolOriginal(rol);
    return;
  }
  
  // Filtrar tableros
  const tablerosFiltrados = filtrarTableros(rol, terminoBusqueda);
  estadoBusqueda[claveRol].tablerosFiltrados = tablerosFiltrados;
  estadoBusqueda[claveRol].totalResultados = tablerosFiltrados.length;
  
  registrarDepuracion(`📊 Resultados encontrados: ${tablerosFiltrados.length}`);
  
  // Renderizar resultados
  renderizarTablerosFiltrados(rol, tablerosFiltrados, terminoBusqueda);
}


// ==========================================
// MODIFICACIÓN DE LA FUNCIÓN ORIGINAL DE RENDERIZADO
// ==========================================

// Guardar la función original de renderizado
const renderizarTablerosPorRolOriginal = renderizarTablerosPorRol;

// Sobrescribir la función para incluir inicialización de búsqueda
renderizarTablerosPorRol = function(rol) {
  let claveRol;
  if (rol === 'Estudiante') {
    claveRol = 'estudiantes';
  } else if (rol === 'Administrativo') {
    claveRol = 'administrativos';
  } else {
    claveRol = 'gestores';
  }
  
  // Si hay una búsqueda activa, aplicarla
  if (estadoBusqueda[claveRol].terminoBusqueda) {
    ejecutarBusqueda(rol, estadoBusqueda[claveRol].terminoBusqueda);
  } else {
    // Renderizado normal
    renderizarTablerosPorRolOriginal(rol);
  }
  
  // Inicializar búsqueda después del renderizado
  setTimeout(() => {
    inicializarBusqueda(rol);
  }, 100);
};
