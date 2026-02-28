// ==========================================
// ATAJOS DE TECLADO
// ==========================================

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && document.getElementById('modalTablero').classList.contains('activo')) {
    cerrarModalTablero();
  }
  if (evento.key === 'Enter' && vistaActual === 'acceso') {
    manejarAcceso();
  }
});

// ==========================================
// ANIMACIONES AL SCROLL CON INTERSECTION OBSERVER
// ==========================================
function inicializarAnimacionesScroll() {
  const elementosAnimados = document.querySelectorAll(
    '.tarjeta-estadistica-moderna, .tarjeta-proposito, .tarjeta-principio, .tarjeta-metrica, ' +
    '.tarjeta-area-trabajo, .tarjeta-gobernanza, .tarjeta-lineamiento, .tarjeta-tablero, ' +
    '.tarjeta-certificacion, .tarjeta-objetivo-ia'
  );
  
  // Resetear estado inicial
  elementosAnimados.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });
  
  const opcionesObservador = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const hermanos = entrada.target.parentElement.children;
        let indiceHermano = Array.from(hermanos).indexOf(entrada.target);
        
        setTimeout(() => {
          entrada.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entrada.target.style.opacity = '1';
          entrada.target.style.transform = 'translateY(0)';
        }, indiceHermano * 100);
        
        observador.unobserve(entrada.target);
      }
    });
  }, opcionesObservador);
  
  elementosAnimados.forEach(el => observador.observe(el));
}

// ==========================================
// FUNCIÓN: SCROLL TO TOP
// ==========================================
function volverAlInicio() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', function() {
  const botonVolverInicio = document.getElementById('botonVolverInicio');
  if (botonVolverInicio) {
    if (window.pageYOffset > 300) {
      botonVolverInicio.classList.add('visible');
    } else {
      botonVolverInicio.classList.remove('visible');
    }
  }
});
