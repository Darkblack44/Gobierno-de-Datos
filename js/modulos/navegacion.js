// ==========================================
// SISTEMA DE NAVEGACIÓN Y CONTROL DE ACCESO BASADO EN ROLES
// ==========================================

function navegarA(vista) {
  registrarDepuracion(`Navegando a: ${vista}`);

  const menuMovil = document.getElementById('menuMovil');
  const botonMovil = document.querySelector('.nav-boton-movil');

  // Gestión del estado del menú responsivo
  if (menuMovil && !menuMovil.classList.contains('hidden')) {
    menuMovil.classList.add('hidden');

    // Restauración visual del botón de menú
    if (botonMovil) {
        botonMovil.classList.remove('menu-abierto');
        const icono = botonMovil.querySelector('i');
        if (icono) {
            icono.classList.remove('fa-times');
            icono.classList.add('fa-bars');
        }
    }
  }

  // Sincronización visual de elementos de navegación activos
  // Actualizar estado activo de los botones del menú escritorio
  document.querySelectorAll('.nav-enlace-item').forEach(boton => {
    boton.classList.remove('activo');
  });
  // Actualizar estado activo de los botones del menú móvil
  document.querySelectorAll('.nav-enlace-movil').forEach(boton => {
    boton.classList.remove('activo');
  });
  
  // Activar el botón correspondiente a la vista actual
  const botonesNav = document.querySelectorAll('.nav-enlace-item');
  const botonesMovil = document.querySelectorAll('.nav-enlace-movil');
  
  botonesNav.forEach(boton => {
    const atributoOnclick = boton.getAttribute('onclick');
    if (atributoOnclick && atributoOnclick.includes(`'${vista}'`)) {
      boton.classList.add('activo');
    }
  });
  
  botonesMovil.forEach(boton => {
    const atributoOnclick = boton.getAttribute('onclick');
    if (atributoOnclick && atributoOnclick.includes(`'${vista}'`)) {
      boton.classList.add('activo');
    }
  });

  // Verificación de permisos y redireccionamiento de vistas
  const vistasProtegidas = {
    'administrativos': 'Administrativo',
    'gestores': 'Gestor'
  };

  if (vista === 'estudiantes') {
    document.querySelectorAll('.contenedor-vista').forEach(vistaElemento => vistaElemento.classList.remove('activo'));
    document.getElementById('vistaEstudiantes').classList.add('activo');
    vistaActual = vista;
    renderizarTablerosPorRol('Estudiante');
    return;
  }

  if (vistasProtegidas[vista]) {
    if (!usuarioActual) {
      mostrarAccesoParaRol(vista);
      return;
    } else if (usuarioActual.rol !== vistasProtegidas[vista]) {
      alert(`Acceso denegado. Esta sección es solo para ${vistasProtegidas[vista]}s.`);
      return;
    }
  }

  const mapaVistas = {
    inicio: 'vistaInicio',
    estudiantes: 'vistaEstudiantes',
    administrativos: 'vistaAdministrativos',
    gestores: 'vistaGestores',
    lineamientos: 'vistaLineamientos',
    acceso: 'vistaAcceso'
  };

  document.querySelectorAll('.contenedor-vista').forEach(vistaElemento => vistaElemento.classList.remove('activo'));
  const idVista = mapaVistas[vista] || `${vista}View`;
  document.getElementById(idVista).classList.add('activo');
  vistaActual = vista;
  
  if (vista === 'estudiantes' && usuarioActual && usuarioActual.rol === 'Estudiante') {
    renderizarTablerosPorRol('Estudiante');
  } else if (vista === 'administrativos' && usuarioActual && usuarioActual.rol === 'Administrativo') {
    renderizarTablerosPorRol('Administrativo');
  } else if (vista === 'gestores' && usuarioActual && usuarioActual.rol === 'Gestor') {
    renderizarTablerosPorRol('Gestor');
  }
  
  if (vista === 'inicio') {
    setTimeout(() => {
      manejarRedimension();
    }, 500);
  }
}

// ==========================================
// LÓGICA DE AUTENTICACIÓN Y VALIDACIÓN DE CREDENCIALES
// ==========================================

function mostrarAccesoParaRol(vistaObjetivo) {
  document.querySelectorAll('.contenedor-vista').forEach(vistaElemento => vistaElemento.classList.remove('activo'));
  document.getElementById('vistaAcceso').classList.add('activo');
  vistaActual = 'acceso';
  
  const tituloAcceso = document.getElementById('tituloAcceso');
  const subtituloAcceso = document.getElementById('subtituloAcceso');
  const iconoAcceso = document.getElementById('iconoAcceso');
  
  if (vistaObjetivo === 'estudiantes') {
    tituloAcceso.textContent = 'Acceso Estudiantes';
    subtituloAcceso.textContent = 'Ingrese sus credenciales para ver tableros académicos';
    iconoAcceso.className = 'fas fa-user-graduate text-white text-2xl';
    document.getElementById('formularioAcceso').dataset.rolObjetivo = 'Estudiante';
    document.getElementById('formularioAcceso').dataset.vistaObjetivo = 'estudiantes';
  } else if (vistaObjetivo === 'administrativos') {
    tituloAcceso.textContent = 'Acceso Administrativos';
    subtituloAcceso.textContent = 'Ingrese sus credenciales para ver tableros institucionales';
    iconoAcceso.className = 'fas fa-briefcase text-white text-2xl';
    document.getElementById('formularioAcceso').dataset.rolObjetivo = 'Administrativo';
    document.getElementById('formularioAcceso').dataset.vistaObjetivo = 'administrativos';
  } else if (vistaObjetivo === 'gestores') {
    tituloAcceso.textContent = 'Acceso Gestores del Conocimiento';
    subtituloAcceso.textContent = 'Ingrese sus credenciales para ver información docente';
    iconoAcceso.className = 'fas fa-chalkboard-teacher text-white text-2xl';
    document.getElementById('formularioAcceso').dataset.rolObjetivo = 'Gestor';
    document.getElementById('formularioAcceso').dataset.vistaObjetivo = 'gestores';
  }
}

function manejarAcceso() {
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const contenedorError = document.getElementById('errorAcceso');
  const formulario = document.getElementById('formularioAcceso');
  const rolObjetivo = formulario.dataset.rolObjetivo;
  const vistaObjetivo = formulario.dataset.vistaObjetivo;
  
  // Acceso simplificado para demostración
  if (MODO_DEMO) {
    // Asignar usuario demo según el rol objetivo
    if (rolObjetivo === 'Administrativo') {
      usuarioActual = { contrasena: 'demo', rol: 'Administrativo', nombre: 'Usuario Demo - Administrativo' };
    } else if (rolObjetivo === 'Gestor') {
      usuarioActual = { contrasena: 'demo', rol: 'Gestor', nombre: 'Usuario Demo - Gestor' };
    } else {
      usuarioActual = { contrasena: 'demo', rol: 'Estudiante', nombre: 'Usuario Demo - Estudiante' };
    }
    
    guardarSesion(usuarioActual.rol);
    document.getElementById('botonSalir').classList.remove('hidden');
    document.getElementById('botonSalirMovil').classList.remove('hidden');
    document.getElementById('usuario').value = '';
    document.getElementById('contrasena').value = '';
    contenedorError.classList.add('hidden');
    navegarA(vistaObjetivo);
    return;
  }
  
  // Autenticación estándar
  if (USUARIOS[usuario] && USUARIOS[usuario].contrasena === contrasena && USUARIOS[usuario].rol === rolObjetivo) {
    usuarioActual = USUARIOS[usuario];
    guardarSesion(usuarioActual.rol);
    
    document.getElementById('botonSalir').classList.remove('hidden');
    document.getElementById('botonSalirMovil').classList.remove('hidden');
    
    document.getElementById('usuario').value = '';
    document.getElementById('contrasena').value = '';
    contenedorError.classList.add('hidden');
    
    navegarA(vistaObjetivo);
  } else {
    contenedorError.textContent = 'Usuario o contraseña incorrectos para este rol';
    contenedorError.classList.remove('hidden');
  }
}

function cerrarSesion() {
  limpiarSesion();
  document.getElementById('botonSalir').classList.add('hidden');
  document.getElementById('botonSalirMovil').classList.add('hidden');
  navegarA('inicio');
}
