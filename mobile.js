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
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/i.test(navigator.userAgent);
  
  // ==========================================
  // CORRECCIÓN DE ALTURA DEL VIEWPORT (VH)
  // ==========================================
  // Calcula dinámicamente la altura real visible para corregir inconsistencias 
  // en navegadores móviles donde la barra de navegación afecta el 100vh.
  function setVHProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVHProperty();
  window.addEventListener('resize', setVHProperty);
  window.addEventListener('orientationchange', () => {
    setTimeout(setVHProperty, 100);
  });
  
  // ==========================================
  // GESTIÓN OPTIMIZADA DE CARGA DE IFRAMES
  // ==========================================
  // Intercepta la función de apertura del modal para inyectar estados de carga,
  // mejorar atributos de rendimiento y forzar el renderizado en iOS.
  const originalOpenDashboardModal = window.openDashboardModal;
  
  if (typeof originalOpenDashboardModal === 'function') {
    window.openDashboardModal = function(dashboardId) {
      const iframeContainer = document.getElementById('iframeContainer');
      
      // Indicador visual de carga
      if (iframeContainer) {
        iframeContainer.classList.add('loading');
      }
      
      originalOpenDashboardModal(dashboardId);
      
      // Configuración asíncrona de atributos del iframe para priorizar rendimiento
      setTimeout(() => {
        const iframe = iframeContainer?.querySelector('iframe');
        if (iframe) {
          iframe.setAttribute('loading', 'eager');
          iframe.setAttribute('importance', 'high');
          
          // Hack para forzar el repintado en WebKit (iOS) y evitar iframes blancos
          if (isIOS) {
            iframe.style.transform = 'translateZ(0)';
            iframe.style.webkitTransform = 'translateZ(0)';
          }
          
          iframe.addEventListener('load', function() {
            iframeContainer.classList.remove('loading');
          });
          
          // Mecanismo de seguridad: elimina el loader si la carga tarda demasiado
          setTimeout(() => {
            iframeContainer.classList.remove('loading');
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
  if (isMobile) {
    document.addEventListener('DOMContentLoaded', function() {
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select');
      inputs.forEach(input => {
        if (parseFloat(window.getComputedStyle(input).fontSize) < 16) {
          input.style.fontSize = '16px';
        }
      });
    });
  }
  
  // ==========================================
  // CONTROL DE DESPLAZAMIENTO EN MODALES (iOS)
  // ==========================================
  // Bloquea el scroll del cuerpo de la página cuando el modal está activo
  // para prevenir el efecto de desplazamiento de fondo no deseado.
  if (isIOS) {
    const modal = document.getElementById('dashboardModal');
    
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            if (modal.classList.contains('active')) {
              document.body.style.position = 'fixed';
              document.body.style.width = '100%';
              document.body.style.top = `-${window.scrollY}px`;
            } else {
              const scrollY = document.body.style.top;
              document.body.style.position = '';
              document.body.style.width = '';
              document.body.style.top = '';
              window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
          }
        });
      });
      
      observer.observe(modal, { attributes: true });
    }
  }
  
  // ==========================================
  // OPTIMIZACIÓN DE EVENTOS TÁCTILES
  // ==========================================
  // Mejora la interacción en paneles deslizables y previene el rebote elástico
  // del scroll nativo cuando se alcanzan los límites del contenedor.
  document.addEventListener('DOMContentLoaded', function() {
    const infoPanel = document.getElementById('dashboardInfoPanel');
    const infoPanelContent = infoPanel?.querySelector('.info-panel-content');
    
    if (infoPanelContent && isMobile) {
      let startY = 0;
      let currentY = 0;
      
      infoPanelContent.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
      }, { passive: true });
      
      infoPanelContent.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        
        const isAtTop = infoPanelContent.scrollTop === 0;
        const isAtBottom = infoPanelContent.scrollHeight - infoPanelContent.scrollTop === infoPanelContent.clientHeight;
        
        if ((isAtTop && currentY > startY) || (isAtBottom && currentY < startY)) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  });
  
  // ==========================================
  // ADAPTABILIDAD DE LA VENTANA MODAL
  // ==========================================
  // Recalcula la altura del contenedor modal ante cambios de orientación o 
  // redimensionamiento para garantizar que ocupe todo el viewport visible.
  function adjustModalHeight() {
    const modalContent = document.querySelector('.modal-content-enhanced');
    const modal = document.getElementById('dashboardModal');
    
    if (modalContent && modal && modal.classList.contains('active')) {
      const viewportHeight = window.innerHeight;
      
      if (isMobile) {
        modalContent.style.height = `${viewportHeight}px`;
        modalContent.style.maxHeight = `${viewportHeight}px`;
      }
    }
  }
  
  const modalObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.id === 'dashboardModal' && mutation.attributeName === 'class') {
        if (mutation.target.classList.contains('active')) {
          setTimeout(adjustModalHeight, 50);
        }
      }
    });
  });
  
  const dashboardModal = document.getElementById('dashboardModal');
  if (dashboardModal) {
    modalObserver.observe(dashboardModal, { attributes: true });
  }
  
  window.addEventListener('orientationchange', () => {
    setTimeout(adjustModalHeight, 150);
  });
  
  window.addEventListener('resize', adjustModalHeight);
  
  // ==========================================
  // INTEGRACIÓN CON NAVEGACIÓN NATIVA
  // ==========================================
  // Manipula el historial del navegador para permitir cerrar el modal
  // utilizando el botón "Atrás" físico o de software del dispositivo.
  if (isMobile) {
    window.addEventListener('popstate', function(e) {
      const modal = document.getElementById('dashboardModal');
      if (modal && modal.classList.contains('active')) {
        e.preventDefault();
        if (typeof closeDashboardModal === 'function') {
          closeDashboardModal();
        }
      }
    });
    
    const originalOpen = window.openDashboardModal;
    if (typeof originalOpen === 'function') {
      const enhancedOpen = window.openDashboardModal;
      window.openDashboardModal = function(dashboardId) {
        history.pushState({ modalOpen: true }, '');
        enhancedOpen(dashboardId);
      };
    }
  }
  
  // ==========================================
  // OPTIMIZACIÓN DE RENDIMIENTO DE SCROLL
  // ==========================================
  // Gestiona clases CSS durante el desplazamiento para reducir operaciones
  // de repintado y mejorar la fluidez (FPS) en dispositivos móviles.
  if (isMobile) {
    document.addEventListener('scroll', function() {
      document.body.classList.add('is-scrolling');
    }, { passive: true });
    
    let scrollTimeout;
    document.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        document.body.classList.remove('is-scrolling');
      }, 150);
    }, { passive: true });
  }
  
  // ==========================================
  // DIAGNÓSTICO EN ENTORNO LOCAL
  // ==========================================
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📱 Mobile fixes loaded');
    console.log('Device:', { isMobile, isIOS, isAndroid });
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
  }
  
})();
