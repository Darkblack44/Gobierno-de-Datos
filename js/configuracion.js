// ==========================================
// CONFIGURACIÓN DE ENTORNO Y EJECUCIÓN
// ==========================================
const MODO_DEPURACION = false;
const MODO_DEMO = true; // Habilita el acceso simplificado omitiendo la validación estricta de credenciales

function registrarDepuracion(mensaje, datos = null) {
  if (MODO_DEPURACION) {
    if (datos) {
      console.log(`[DEBUG] ${mensaje}`, datos);
    } else {
      console.log(`[DEBUG] ${mensaje}`);
    }
  }
}

// ==========================================
// UTILIDADES: NORMALIZACIÓN Y SANITIZACIÓN
// ==========================================
function generarIdSeguro(texto, prefijo = '') {
  if (!texto) return prefijo + 'unknown';
  
  const normalizado = texto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  
  const idSeguro = prefijo ? `${prefijo}-${normalizado}` : normalizado;
  registrarDepuracion(`ID generado: "${texto}" → "${idSeguro}"`);
  return idSeguro || prefijo + 'area-unknown';
}

// ==========================================
// CONTROL DE ACCESO: ROLES Y USUARIOS
// ==========================================
const USUARIOS = {
  'estudiante': { contrasena: 'udec2024', rol: 'Estudiante', nombre: 'Estudiante' },
  'admin': { contrasena: 'udec2024', rol: 'Administrativo', nombre: 'Administrativo' },
  'docente': { contrasena: 'udec2024', rol: 'Gestor', nombre: 'Gestor del Conocimiento' }
};

let usuarioActual = null;

const MACROPROCESOS = {
  'Estratégico': {
    icono: 'fa-bullseye',
    color: 'estrategico',
    areas: ['Dirección de Planeación', 'Sistema de Gestión Ambiental', 'Sistema de Gestión de Seguridad de la Información - SGSI', 'Proyectos Especiales y Relaciones Interinstitucionales']
  },
  'Misional': {
    icono: 'fa-users',
    color: 'misional',
    areas: [
      'Oficina de Desarrollo Académico',
      'Oficina de Educación Virtual y a Distancia',
      'Instituto de Posgrados',
      'Graduados',
      'Dirección de Investigación'
    ]
  },
  'Apoyo': {
    icono: 'fa-handshake',
    color: 'apoyo',
    areas: [
      'Vicerrectoría Administrativa y Financiera',
      'Oficina de Compras',
      'Sistemas y Tecnología',
      'Dirección de Talento Humano'
    ]
  },
  'Seguimiento': {
    icono: 'fa-search',
    color: 'seguimiento',
    areas: [
      'Control Interno'
    ]
  }
};

const ICONOS_AREA = {
  'Oficina de Desarrollo Académico': 'fa-chalkboard-teacher',
  'Oficina de Educación Virtual y a Distancia': 'fa-laptop-code',
  'Instituto de Posgrados': 'fa-user-graduate',
  'Graduados': 'fa-graduation-cap',
  'Dirección de Investigación': 'fa-microscope',
  'Dirección de Planeación': 'fa-sitemapa',
  'Sistema de Gestión Ambiental': 'fa-leaf',
  'Sistema de Gestión de Seguridad de la Información - SGSI': 'fa-shield-alt',
  'Vicerrectoría Administrativa y Financiera': 'fa-coins',
  'Oficina de Compras': 'fa-shopping-cart',
  'Control Interno': 'fa-clipboard-check',
  'Sistemas y Tecnología': 'fa-cogs',
  'Dirección de Talento Humano': 'fa-users-cog',
  'Proyectos Especiales y Relaciones Interinstitucionales': 'fa-project-diagram'
};

let tableroActual = null;
let vistaActual = 'inicio';
let instanciaGraficoProgramas = null;
let mapa = null;
let circulosMapa = [];
let esPantallaCompleta = false;
let macroprocesosExpandidos = {};
let areasExpandidas = {};
let temporizadorRedimension;
let panelInfoExpandido = false;


// ==========================================
// GESTIÓN DEL CICLO DE VIDA DE LA SESIÓN Y AUTENTICACIÓN
// ==========================================

function verificarSesion() {
  const sesion = sessionStorage.getItem('isAuthenticated');
  const rol = sessionStorage.getItem('userRole');
  return { autenticado: sesion === 'true', rol: rol };
}

function guardarSesion(rol) {
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('userRole', rol);
}

function limpiarSesion() {
  sessionStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('userRole');
  usuarioActual = null;
}

const datosSesion = verificarSesion();
if (datosSesion.autenticado && datosSesion.rol) {
  usuarioActual = { rol: datosSesion.rol };
}
