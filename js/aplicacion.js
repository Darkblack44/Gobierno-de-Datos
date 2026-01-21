// ==========================================
// INICIALIZACIÓN DEL CICLO DE VIDA DE LA APLICACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  registrarDepuracion('=== INICIALIZANDO APLICACION ===');
  
  inicializarControlRedimension();
  configurarDelegacionEventos();
  inicializarMapa();
  inicializarMetricas();
  configurarMenuMovil();
  
  // Establecer boton activo inicial en Inicio
  const botonInicio = document.querySelector('.nav-enlace-item[onclick*="inicio"]');
  if (botonInicio) botonInicio.classList.add('activo');
  
  if (usuarioActual) {
    document.getElementById('botonSalir').classList.remove('hidden');
    document.getElementById('botonSalirMovil').classList.remove('hidden');
  }

  window.addEventListener('resize', () => {
    clearTimeout(temporizadorRedimension);
    temporizadorRedimension = setTimeout(manejarRedimension, 400);
  });
  
  // Inicializar animaciones al scroll
  inicializarAnimacionesScroll();
  
  registrarDepuracion('=== APLICACION INICIALIZADA ===');
});

// ==========================================
// INICIALIZACIÓN AUTOMÁTICA AL CAMBIAR DE VISTA
// ==========================================

// Modificar la función navegarA para inicializar búsquedas
const navegarAOriginal = navegarA;
navegarA = function(vista) {
  // Llamar a la función original
  navegarAOriginal(vista);
  
  // Inicializar búsqueda según la vista
  setTimeout(() => {
    if (vista === 'estudiantes') {
      inicializarBusqueda('Estudiante');
    } else if (vista === 'administrativos') {
      inicializarBusqueda('Administrativo');
    } else if (vista === 'gestores') {
      inicializarBusqueda('Gestor');
    }
  }, 200);
};

registrarDepuracion('✔ Sistema de búsqueda independiente cargado correctamente');
