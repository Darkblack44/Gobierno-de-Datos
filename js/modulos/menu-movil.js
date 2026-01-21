// Función para toggle del menú móvil
    function alternarMenuMovil() {
      const menuMovil = document.getElementById('menuMovil');
      const botonAlternar = document.querySelector('.nav-boton-movil');
      
      if (menuMovil && botonAlternar) {
        menuMovil.classList.toggle('hidden');
        botonAlternar.classList.toggle('menu-abierto');
        
        // Cambiar icono
        const icono = botonAlternar.querySelector('i');
        if (icono) {
          if (menuMovil.classList.contains('hidden')) {
            icono.className = 'fas fa-bars';
          } else {
            icono.className = 'fas fa-times';
          }
        }
      }
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.addEventListener('DOMContentLoaded', function() {
      const enlacesMoviles = document.querySelectorAll('.nav-enlace-movil');
      enlacesMoviles.forEach(enlace => {
        enlace.addEventListener('click', function() {
          const menuMovil = document.getElementById('menuMovil');
          const botonAlternar = document.querySelector('.nav-boton-movil');
          if (menuMovil && !menuMovil.classList.contains('hidden')) {
            alternarMenuMovil();
          }
        });
      });
    });

// ==========================================
// COMPORTAMIENTO DEL MENÚ EN DISPOSITIVOS MÓVILES
// ==========================================
function configurarMenuMovil() {
  const botonHamburguesa = document.getElementById('botonHamburguesa');
  const menuMovil = document.getElementById('menuMovil');

  if (botonHamburguesa && menuMovil) {
    botonHamburguesa.addEventListener('click', () => {
      const estaAbierto = menuMovil.classList.toggle('hidden');
      const icono = botonHamburguesa.querySelector('i');
      
      if (!estaAbierto) {
        // Menu is now visible
        icono.classList.remove('fa-bars');
        icono.classList.add('fa-times');
        botonHamburguesa.classList.add('menu-abierto');
      } else {
        // Menu is now hidden
        icono.classList.remove('fa-times');
        icono.classList.add('fa-bars');
        botonHamburguesa.classList.remove('menu-abierto');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (evento) => {
      if (!botonHamburguesa.contains(evento.target) && !menuMovil.contains(evento.target)) {
        menuMovil.classList.add('hidden');
        const icono = botonHamburguesa.querySelector('i');
        icono.classList.remove('fa-times');
        icono.classList.add('fa-bars');
        botonHamburguesa.classList.remove('menu-abierto');
      }
    });
  }
}
