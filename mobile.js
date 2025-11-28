/* ============================================
   UNIVERSIDAD DE CUNDINAMARCA
   CORRECCIONES JAVASCRIPT PARA MÓVILES v1.0
   ============================================ */

(function() {
  'use strict';
  
  // ===============================
  // DETECCIÓN DE DISPOSITIVO MÓVIL
  // ===============================
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/i.test(navigator.userAgent);
  
  // ===============================
  // FIX VIEWPORT HEIGHT EN iOS
  // ===============================
  function setVHProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Ejecutar al cargar y al redimensionar
  setVHProperty();
  window.addEventListener('resize', setVHProperty);
  window.addEventListener('orientationchange', () => {
    setTimeout(setVHProperty, 100);
  });
  
  // ===============================
  // MEJORA DE CARGA DEL IFRAME
  // ===============================
  const originalOpenDashboardModal = window.openDashboardModal;
  
  if (typeof originalOpenDashboardModal === 'function') {
    window.openDashboardModal = function(dashboardId) {
      const iframeContainer = document.getElementById('iframeContainer');
      
      // Agregar estado de carga
      if (iframeContainer) {
        iframeContainer.classList.add('loading');
      }
      
      // Llamar a la función original
      originalOpenDashboardModal(dashboardId);
      
      // Esperar a que se cree el iframe y configurarlo
      setTimeout(() => {
        const iframe = iframeContainer?.querySelector('iframe');
        if (iframe) {
          // Configurar atributos para mejor rendimiento móvil
          iframe.setAttribute('loading', 'eager');
          iframe.setAttribute('importance', 'high');
          
          // En iOS, forzar repaint para evitar iframe en blanco
          if (isIOS) {
            iframe.style.transform = 'translateZ(0)';
            iframe.style.webkitTransform = 'translateZ(0)';
          }
          
          // Evento de carga
          iframe.addEventListener('load', function() {
            iframeContainer.classList.remove('loading');
          });
          
          // Timeout de seguridad para quitar loading
          setTimeout(() => {
            iframeContainer.classList.remove('loading');
          }, 8000);
        }
      }, 100);
    };
  }
  
  // ===============================
  // PREVENIR ZOOM ACCIDENTAL EN INPUTS
  // ===============================
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
  
  // ===============================
  // FIX SCROLL MODAL EN iOS
  // ===============================
  if (isIOS) {
    const modal = document.getElementById('dashboardModal');
    
    if (modal) {
      // Prevenir scroll del body cuando el modal está abierto
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
  
  // ===============================
  // MEJORAR TOUCH EN PANEL DE INFO
  // ===============================
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
        
        // Prevenir bounce en iOS cuando está en el tope o fondo
        const isAtTop = infoPanelContent.scrollTop === 0;
        const isAtBottom = infoPanelContent.scrollHeight - infoPanelContent.scrollTop === infoPanelContent.clientHeight;
        
        if ((isAtTop && currentY > startY) || (isAtBottom && currentY < startY)) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  });
  
  // ===============================
  // AJUSTE AUTOMÁTICO DE ALTURA DEL MODAL
  // ===============================
  function adjustModalHeight() {
    const modalContent = document.querySelector('.modal-content-enhanced');
    const modal = document.getElementById('dashboardModal');
    
    if (modalContent && modal && modal.classList.contains('active')) {
      // Usar la altura real del viewport
      const viewportHeight = window.innerHeight;
      
      if (isMobile) {
        modalContent.style.height = `${viewportHeight}px`;
        modalContent.style.maxHeight = `${viewportHeight}px`;
      }
    }
  }
  
  // Ajustar al abrir modal y al cambiar orientación
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
  
  // ===============================
  // CERRAR MODAL CON BOTÓN ATRÁS
  // ===============================
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
    
    // Agregar estado al historial cuando se abre el modal
    const originalOpen = window.openDashboardModal;
    if (typeof originalOpen === 'function') {
      const enhancedOpen = window.openDashboardModal;
      window.openDashboardModal = function(dashboardId) {
        history.pushState({ modalOpen: true }, '');
        enhancedOpen(dashboardId);
      };
    }
  }
  
  // ===============================
  // MEJORA DE RENDIMIENTO SCROLL
  // ===============================
  if (isMobile) {
    // Agregar will-change solo cuando sea necesario
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
  
  // ===============================
  // DEBUG EN DESARROLLO
  // ===============================
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📱 Mobile fixes loaded');
    console.log('Device:', { isMobile, isIOS, isAndroid });
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
  }
  
})();
