// ==========================================
// NAVEGACIÓN DE PESTAÑAS PARA LINEAMIENTOS
// ==========================================
function mostrarLineamiento(tipo) {
  registrarDepuracion(`Cambiando a lineamiento: ${tipo}`);
  
  // Obtener referencias a los contenedores de contenido
  const contenidoGobierno = document.getElementById('contenidoGobiernoDatos');
  const contenidoIA = document.getElementById('contenidoInteligenciaArtificial');
  
  // Obtener el encabezado de lineamientos para actualizarlo
  const tituloEncabezado = document.querySelector('#vistaLineamientos h1');
  const iconoEncabezado = document.querySelector('#vistaLineamientos .bg-white\\/20 i');
  
  // Validar que existan los contenedores
  if (!contenidoGobierno || !contenidoIA) {
    console.error("Error: No se encontraron los contenedores de lineamientos en el DOM.");
    return;
  }

  if (tipo === 'gobierno-datos') {
    // Activar Gobierno de Datos
    contenidoGobierno.classList.add('activo');
    contenidoIA.classList.remove('activo');
    
    // Actualizar encabezado
    if (tituloEncabezado) {
      tituloEncabezado.textContent = 'Gobierno de Datos';
    }
    if (iconoEncabezado) {
      iconoEncabezado.className = 'fas fa-database text-4xl';
    }
    
    registrarDepuracion('✔ Vista de Gobierno de Datos activada');
    
  } else if (tipo === 'inteligencia-artificial') {
    // Activar Inteligencia Artificial
    contenidoGobierno.classList.remove('activo');
    contenidoIA.classList.add('activo');
    
    // Actualizar encabezado
    if (tituloEncabezado) {
      tituloEncabezado.textContent = 'Inteligencia Artificial';
    }
    if (iconoEncabezado) {
      iconoEncabezado.className = 'fas fa-brain text-4xl';
    }
    
    registrarDepuracion('✔ Vista de Inteligencia Artificial activada');
  }
}

// ==========================================
// FUNCIONES PARA DROPDOWN DE LINEAMIENTOS
// ==========================================
/**
 * Variable global para rastrear el lineamiento actual
 */
let lineamientoActual = null;

/**
 * Alternar desplegable en navegación desktop (para dispositivos táctiles)
 * El hover CSS maneja el comportamiento en desktop con mouse
 */
function alternarDesplegable(idDesplegable) {
  const desplegable = document.getElementById(idDesplegable);
  if (!desplegable) return;
  
  // Verificar si es dispositivo táctil
  const esDispositivoTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (esDispositivoTactil) {
    // Cerrar otros dropdowns
    document.querySelectorAll('.nav-desplegable').forEach(desplegable => {
      if (desplegable.id !== idDesplegable) {
        desplegable.classList.remove('activo');
      }
    });
    
    // Toggle el desplegable actual
    desplegable.classList.toggle('activo');
  }
}

/**
 * Alternar desplegable en navegación móvil (siempre con clic)
 */
function alternarDesplegableMovil(idDesplegable) {
  const desplegable = document.getElementById(idDesplegable);
  const boton = desplegable ? desplegable.previousElementSibling : null;
  
  if (!desplegable || !boton) return;
  
  // Toggle el desplegable
  desplegable.classList.toggle('activo');
  boton.classList.toggle('activo');
}

/**
 * Navegar directamente a un lineamiento específico
 */
function navegarALineamiento(tipo) {
  // Guardar el lineamiento actual
  lineamientoActual = tipo;
  
  // Primero navegar a la vista de lineamientos
  navegarA('lineamientos');
  
  // Esperar a que se renderice y luego activar la pestaña
  setTimeout(() => {
    mostrarLineamiento(tipo);
    actualizarEstadosActivos();
  }, 100);
  
  // Cerrar el menú móvil si está abierto
  const menuMovil = document.getElementById('menuMovil');
  if (menuMovil && !menuMovil.classList.contains('hidden')) {
    menuMovil.classList.add('hidden');
  }
  
  // Cerrar todos los dropdowns móviles
  cerrarDesplegablesMoviles();
}

/**
 * Actualizar estados activos de los botones del navbar
 */
function actualizarEstadosActivos() {
  // Remover estados activos previos
  document.querySelectorAll('.nav-enlace-item, .nav-enlace-movil, .nav-item-desplegable, .nav-item-desplegable-movil').forEach(el => {
    el.classList.remove('vista-activa');
  });
  
  // Si estamos en la vista de lineamientos
  if (vistaActual === 'lineamientos') {
    // Marcar el botón principal de Lineamientos como activo
    const botonLineamientos = document.querySelector('.nav-enlace-item.tiene-desplegable');
    if (botonLineamientos) {
      botonLineamientos.classList.add('vista-activa');
    }
    
    const botonLineamientosMovil = document.querySelector('.nav-enlace-movil.tiene-desplegable');
    if (botonLineamientosMovil) {
      botonLineamientosMovil.classList.add('vista-activa');
    }
    
    // Marcar el submenú correspondiente como activo
    if (lineamientoActual) {
      const itemDesplegableActivo = document.querySelector(`.nav-item-desplegable[onclick*="${lineamientoActual}"]`);
      if (itemDesplegableActivo) {
        itemDesplegableActivo.classList.add('vista-activa');
      }
      
      const itemDesplegableActivoMovil = document.querySelector(`.nav-item-desplegable-movil[onclick*="${lineamientoActual}"]`);
      if (itemDesplegableActivoMovil) {
        itemDesplegableActivoMovil.classList.add('vista-activa');
      }
    }
  } else {
    // Limpiar el lineamiento actual si no estamos en esa vista
    lineamientoActual = null;
  }
}

/**
 * Cerrar dropdowns móviles al cambiar de vista
 */
function cerrarDesplegablesMoviles() {
  document.querySelectorAll('.nav-desplegable-movil').forEach(desplegable => {
    desplegable.classList.remove('activo');
  });
  document.querySelectorAll('.nav-enlace-movil.tiene-desplegable').forEach(boton => {
    boton.classList.remove('activo');
  });
  
  // Cerrar dropdowns desktop táctiles
  document.querySelectorAll('.nav-desplegable').forEach(desplegable => {
    desplegable.classList.remove('activo');
  });
}

/**
 * Cerrar dropdowns al hacer clic fuera (solo en dispositivos táctiles)
 */
document.addEventListener('click', function(evento) {
  const esDispositivoTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (esDispositivoTactil) {
    const esDesplegable = evento.target.closest('.nav-desplegable');
    const esBotonDesplegable = evento.target.closest('.tiene-desplegable');
    
    if (!esDesplegable && !esBotonDesplegable) {
      document.querySelectorAll('.nav-desplegable').forEach(desplegable => {
        desplegable.classList.remove('activo');
      });
    }
  }
});

/**
 * Interceptar la función navegarA original para actualizar estados
 */
(function() {
  const navegarAOriginal = window.navegarA;
  
  window.navegarA = function(vista) {
    // Llamar la función original
    const result = navegarAOriginal.apply(this, arguments);
    
    // Actualizar estados activos después de navegar
    setTimeout(() => {
      actualizarEstadosActivos();
    }, 50);
    
    return result;
  };
})();

/**
 * Inicializar estados al cargar la página
 */
document.addEventListener('DOMContentLoaded', function() {
  actualizarEstadosActivos();
  
  // Prevenir que el clic en el botón desplegable navegue en dispositivos táctiles
  const botonesDesplegable = document.querySelectorAll('.nav-enlace-item.tiene-desplegable');
  
  botonesDesplegable.forEach(boton => {
    boton.addEventListener('click', function(evento) {
      const esDispositivoTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (esDispositivoTactil) {
        evento.preventDefault();
        evento.stopPropagation();
      }
    });
  });
});
