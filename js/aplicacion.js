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

  // Inicializar arrastre interactivo de logos
  inicializarArrastreLogos();

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

// ==========================================
// ARRASTRE INTERACTIVO DE LOGOS
// ==========================================

function inicializarArrastreLogos() {
  const seccionLogos = document.querySelector('.seccion-logos-institucionales');
  const logosContenedor = document.querySelector('.logos-contenedor');

  if (!logosContenedor || !seccionLogos) return;

  // La animación de auto-scroll es puramente CSS (translateX -50% en 40s).
  // JavaScript solo maneja el arrastre manual (pausa/reanuda la animación CSS).
  const DURACION_CSS = 40; // segundos — debe coincidir con @keyframes logos-desplazar

  let estaArrastrando = false;
  let startX = 0;
  let translateXAlPausar = 0;

  // Leer el translateX actual que la animación CSS está aplicando
  const obtenerTranslateX = () => {
    const matriz = new DOMMatrix(getComputedStyle(logosContenedor).transform);
    return matriz.m41; // valor X en pixels
  };

  // Pausar animación CSS y recordar posición actual
  const pausar = () => {
    translateXAlPausar = obtenerTranslateX();       // leer posición antes de detener
    logosContenedor.style.animation = 'none';       // detener del todo (no solo pausar) para evitar conflicto con will-change compositor
    logosContenedor.style.transform = `translateX(${translateXAlPausar}px)`;
    logosContenedor.classList.add('arrastre-activo');
  };

  // Reanudar animación CSS desde la posición donde quedó el arrastre
  const reanudar = (translateXFinal) => {
    const anchoMitad = logosContenedor.offsetWidth / 2;
    if (anchoMitad <= 0) {
      logosContenedor.style.transform = '';
      logosContenedor.classList.remove('arrastre-activo');
      return;
    }

    // Normalizar el offset al rango [-anchoMitad, 0]
    let offset = translateXFinal % anchoMitad;
    if (offset > 0) offset -= anchoMitad;

    // Calcular delay negativo para reanudar desde ese punto
    const progreso = Math.abs(offset) / anchoMitad;
    const delay = -(progreso * DURACION_CSS);

    // Forzar reinicio completo de la animación CSS
    logosContenedor.style.animation = 'none';
    logosContenedor.style.transform = '';
    void logosContenedor.offsetHeight; // Forzar reflow del navegador
    logosContenedor.style.animation = '';
    logosContenedor.style.animationDelay = `${delay}s`;
    logosContenedor.classList.remove('arrastre-activo');
  };

  // ---- Arrastre con mouse ----
  seccionLogos.addEventListener('mousedown', (e) => {
    estaArrastrando = true;
    startX = e.pageX;
    pausar();
    seccionLogos.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!estaArrastrando) return;
    e.preventDefault();
    const delta = e.pageX - startX;
    logosContenedor.style.transform = `translateX(${translateXAlPausar + delta}px)`;
  });

  const finalizar = (e) => {
    if (!estaArrastrando) return;
    estaArrastrando = false;
    seccionLogos.style.userSelect = '';
    reanudar(obtenerTranslateX());
  };

  document.addEventListener('mouseup', finalizar);
  document.addEventListener('mouseleave', finalizar);

  // ---- Arrastre táctil ----
  seccionLogos.addEventListener('touchstart', (e) => {
    estaArrastrando = true;
    startX = e.touches[0].pageX;
    pausar();
  }, { passive: true });

  seccionLogos.addEventListener('touchmove', (e) => {
    if (!estaArrastrando) return;
    const delta = e.touches[0].pageX - startX;
    logosContenedor.style.transform = `translateX(${translateXAlPausar + delta}px)`;
  }, { passive: true });

  seccionLogos.addEventListener('touchend', finalizar);
  seccionLogos.addEventListener('touchcancel', finalizar);

  registrarDepuracion('✔ Logos: animación CSS pura (inmune a zoom/resize), arrastre manual activo');
}
