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
  const botonMovil = document.querySelector('.nav-boton-movil');
  const menuMovil = document.getElementById('menuMovil');

  if (botonMovil && menuMovil) {
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (evento) => {
      if (menuMovil.classList.contains('hidden')) return;
      if (botonMovil.contains(evento.target) || menuMovil.contains(evento.target)) return;

      menuMovil.classList.add('hidden');
      botonMovil.classList.remove('menu-abierto');
      const icono = botonMovil.querySelector('i');
      if (icono) {
        icono.className = 'fas fa-bars';
      }
    });
  }
}
