/* ==========================================================================
   MÓDULO DE OPTIMIZACIÓN Y COMPATIBILIDAD MÓVIL
   Universidad de Cundinamarca - Ajustes de UX/UI para dispositivos táctiles
   ========================================================================== */

(function() {
  'use strict';
  
  // ==========================================
  // DETECCIÓN DEL ENTORNO DE EJECUCIÓN
  // ==========================================
  // Identifica si el usuario navega desde un dispositivo móvil y distingue
  // el sistema operativo (iOS/Android) para aplicar parches específicos.
  const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const esIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const esAndroid = /Android/i.test(navigator.userAgent);
  
  // ==========================================
  // CORRECCIÓN DE ALTURA DEL VIEWPORT (VH)
  // ==========================================
  // Calcula dinámicamente la altura real visible para corregir inconsistencias 
  // en navegadores móviles donde la barra de navegación afecta el 100vh.
  function establecerPropiedadVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  establecerPropiedadVH();
  window.addEventListener('resize', establecerPropiedadVH);
  window.addEventListener('orientationchange', () => {
    setTimeout(establecerPropiedadVH, 100);
  });
  
  // ==========================================
  // GESTIÓN OPTIMIZADA DE CARGA DE IFRAMES
  // ==========================================
  // Intercepta la función de apertura del modal para inyectar estados de carga,
  // mejorar atributos de rendimiento y forzar el renderizado en iOS.
  const abrirTableroOriginal = window.abrirTablero;
  
  if (typeof abrirTableroOriginal === 'function') {
    window.abrirTablero = function(idTablero) {
      const contenedorIframe = document.getElementById('contenedorIframe');
      
      // Indicador visual de carga
      if (contenedorIframe) {
        contenedorIframe.classList.add('cargando');
      }
      
      abrirTableroOriginal(idTablero);
      
      // Configuración asíncrona de atributos del iframe para priorizar rendimiento
      setTimeout(() => {
        const marco = contenedorIframe?.querySelector('iframe');
        if (marco) {
          marco.setAttribute('loading', 'eager');
          marco.setAttribute('importance', 'high');
          
          // Hack para forzar el repintado en WebKit (iOS) y evitar iframes blancos
          if (esIOS) {
            marco.style.transform = 'translateZ(0)';
            marco.style.webkitTransform = 'translateZ(0)';
          }
          
          marco.addEventListener('load', function() {
            contenedorIframe.classList.remove('cargando');
          });
          
          // Mecanismo de seguridad: elimina el loader si la carga tarda demasiado
          setTimeout(() => {
            contenedorIframe.classList.remove('cargando');
          }, 8000);
        }
      }, 100);
    };
  }
  
  // ==========================================
  // MEJORA DE ACCESIBILIDAD Y UX EN FORMULARIOS
  // ==========================================
  // Asegura un tamaño de fuente mínimo de 16px en inputs para evitar que 
  // los navegadores móviles (especialmente Safari) hagan zoom automático al enfocar.
  if (esMovil) {
    document.addEventListener('DOMContentLoaded', function() {
      const entradas = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select');
      entradas.forEach(entrada => {
        if (parseFloat(window.getComputedStyle(entrada).fontSize) < 16) {
          entrada.style.fontSize = '16px';
        }
      });
    });
  }
  
  // ==========================================
  // CONTROL DE DESPLAZAMIENTO EN MODALES (iOS)
  // ==========================================
  // Bloquea el scroll del cuerpo de la página cuando el modal está activo
  // para prevenir el efecto de desplazamiento de fondo no deseado.
  if (esIOS) {
    const modalTablero = document.getElementById('modalTablero');
    
    if (modalTablero) {
      const observadorIOS = new MutationObserver((mutaciones) => {
        mutaciones.forEach((mutacion) => {
          if (mutacion.attributeName === 'class') {
            if (modalTablero.classList.contains('activo')) {
              document.body.style.position = 'fixed';
              document.body.style.width = '100%';
              document.body.style.top = `-${window.scrollY}px`;
            } else {
              const desplazamientoY = document.body.style.top;
              document.body.style.position = '';
              document.body.style.width = '';
              document.body.style.top = '';
              window.scrollTo(0, parseInt(desplazamientoY || '0') * -1);
            }
          }
        });
      });
      
      observadorIOS.observe(modalTablero, { attributes: true });
    }
  }
  
  // ==========================================
  // OPTIMIZACIÓN DE EVENTOS TÁCTILES
  // ==========================================
  // Mejora la interacción en paneles deslizables y previene el rebote elástico
  // del scroll nativo cuando se alcanzan los límites del contenedor.
  document.addEventListener('DOMContentLoaded', function() {
    const panelInfo = document.getElementById('panelInfoTablero');
    const contenidoPanelInfo = panelInfo?.querySelector('.contenido-panel-info');
    
    if (contenidoPanelInfo && esMovil) {
      let inicioY = 0;
      let actualY = 0;
      
      contenidoPanelInfo.addEventListener('touchstart', function(evento) {
        inicioY = evento.touches[0].clientY;
      }, { passive: true });
      
      contenidoPanelInfo.addEventListener('touchmove', function(evento) {
        actualY = evento.touches[0].clientY;
        
        const estaEnTope = contenidoPanelInfo.scrollTop === 0;
        const estaEnFondo = contenidoPanelInfo.scrollHeight - contenidoPanelInfo.scrollTop === contenidoPanelInfo.clientHeight;
        
        if ((estaEnTope && actualY > inicioY) || (estaEnFondo && actualY < inicioY)) {
          evento.preventDefault();
        }
      }, { passive: false });
    }
  });
  
  // ==========================================
  // ADAPTABILIDAD DE LA VENTANA MODAL
  // ==========================================
  // Recalcula la altura del contenedor modal ante cambios de orientación o 
  // redimensionamiento para garantizar que ocupe todo el viewport visible.
  function ajustarAlturaModal() {
    const contenidoModal = document.querySelector('.modal-contenido-mejorado');
    const modalTablero = document.getElementById('modalTablero');
    
    if (contenidoModal && modalTablero && modalTablero.classList.contains('activo')) {
      const altoViewport = window.innerHeight;
      
      if (esMovil) {
        contenidoModal.style.height = `${altoViewport}px`;
        contenidoModal.style.maxHeight = `${altoViewport}px`;
      }
    }
  }
  
  const observadorModal = new MutationObserver((mutaciones) => {
    mutaciones.forEach((mutacion) => {
      if (mutacion.target.id === 'modalTablero' && mutacion.attributeName === 'class') {
        if (mutacion.target.classList.contains('activo')) {
          setTimeout(ajustarAlturaModal, 50);
        }
      }
    });
  });
  
  const modalTablero = document.getElementById('modalTablero');
  if (modalTablero) {
    observadorModal.observe(modalTablero, { attributes: true });
  }
  
  window.addEventListener('orientationchange', () => {
    setTimeout(ajustarAlturaModal, 150);
  });
  
  window.addEventListener('resize', ajustarAlturaModal);
  
  // ==========================================
  // INTEGRACIÓN CON NAVEGACIÓN NATIVA
  // ==========================================
  // Manipula el historial del navegador para permitir cerrar el modal
  // utilizando el botón "Atrás" físico o de software del dispositivo.
  if (esMovil) {
    window.addEventListener('popstate', function(evento) {
      const modalTablero = document.getElementById('modalTablero');
      if (modalTablero && modalTablero.classList.contains('activo')) {
        evento.preventDefault();
        if (typeof cerrarModalTablero === 'function') {
          cerrarModalTablero();
        }
      }
    });
    
    const abrirTableroOriginalHistorial = window.abrirTablero;
    if (typeof abrirTableroOriginalHistorial === 'function') {
      const abrirTableroMejorado = window.abrirTablero;
      window.abrirTablero = function(idTablero) {
        history.pushState({ modalOpen: true }, '');
        abrirTableroMejorado(idTablero);
      };
    }
  }
  
  // ==========================================
  // OPTIMIZACIÓN DE RENDIMIENTO DE SCROLL
  // ==========================================
  // Gestiona clases CSS durante el desplazamiento para reducir operaciones
  // de repintado y mejorar la fluidez (FPS) en dispositivos móviles.
  if (esMovil) {
    document.addEventListener('scroll', function() {
      document.body.classList.add('en-desplazamiento');
    }, { passive: true });
    
    let temporizadorScroll;
    document.addEventListener('scroll', function() {
      clearTimeout(temporizadorScroll);
      temporizadorScroll = setTimeout(function() {
        document.body.classList.remove('en-desplazamiento');
      }, 150);
    }, { passive: true });
  }
  
  // ==========================================
  // DIAGNÓSTICO EN ENTORNO LOCAL
  // ==========================================
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📱 Mobile fixes loaded');
    console.log('Device:', { esMovil, esIOS, esAndroid });
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
  }
  
})();
