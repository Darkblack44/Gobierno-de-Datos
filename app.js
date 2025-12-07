// ==========================================
// CONFIGURACIÓN DE ENTORNO Y EJECUCIÓN
// ==========================================
const DEBUG_MODE = false;
const DEMO_MODE = true; // Habilita el acceso simplificado omitiendo la validación estricta de credenciales

function debugLog(message, data = null) {
  if (DEBUG_MODE) {
    if (data) {
      console.log(`[DEBUG] ${message}`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}

// ==========================================
// UTILIDADES: NORMALIZACIÓN Y SANITIZACIÓN
// ==========================================
function generateSafeId(text, prefix = '') {
  if (!text) return prefix + 'unknown';
  
  const normalized = text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  
  const id = prefix ? `${prefix}-${normalized}` : normalized;
  debugLog(`ID generado: "${text}" → "${id}"`);
  return id || prefix + 'area-unknown';
}

// ==========================================
// CONTROL DE ACCESO: ROLES Y USUARIOS
// ==========================================
const USERS = {
  'estudiante': { password: 'udec2024', role: 'Estudiante', name: 'Estudiante' },
  'admin': { password: 'udec2024', role: 'Administrativo', name: 'Administrativo' },
  'docente': { password: 'udec2024', role: 'Gestor', name: 'Gestor del Conocimiento' }
};

let currentUser = null;

const MACROPROCESOS = {
  'Estratégico': {
    icon: 'fa-bullseye',
    color: 'estrategico',
    areas: ['Dirección de Planeación', 'Sistema de Gestión Ambiental', 'Sistema de Gestión de Seguridad de la Información - SGSI', 'Proyectos Especiales y Relaciones Interinstitucionales']
  },
  'Misional': {
    icon: 'fa-users',
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
    icon: 'fa-handshake',
    color: 'apoyo',
    areas: [
      'Vicerrectoría Administrativa y Financiera',
      'Oficina de Compras',
      'Sistemas y Tecnología',
      'Dirección de Talento Humano'
    ]
  },
  'Seguimiento': {
    icon: 'fa-search',
    color: 'seguimiento',
    areas: [
      'Control Interno'
    ]
  }
};

const AREA_ICONS = {
  'Oficina de Desarrollo Académico': 'fa-chalkboard-teacher',
  'Oficina de Educación Virtual y a Distancia': 'fa-laptop-code',
  'Instituto de Posgrados': 'fa-user-graduate',
  'Graduados': 'fa-graduation-cap',
  'Dirección de Investigación': 'fa-microscope',
  'Dirección de Planeación': 'fa-sitemap',
  'Sistema de Gestión Ambiental': 'fa-leaf',
  'Sistema de Gestión de Seguridad de la Información - SGSI': 'fa-shield-alt',
  'Vicerrectoría Administrativa y Financiera': 'fa-coins',
  'Oficina de Compras': 'fa-shopping-cart',
  'Control Interno': 'fa-clipboard-check',
  'Sistemas y Tecnología': 'fa-cogs',
  'Dirección de Talento Humano': 'fa-users-cog',
  'Proyectos Especiales y Relaciones Interinstitucionales': 'fa-project-diagram'
};

let currentDashboard = null;
let currentView = 'home';
let topProgramsChartInstance = null;
let map = null;
let mapCircles = [];
let isFullscreen = false;
let expandedMacroprocesos = {};
let expandedAreas = {};
let resizeTimeout;
let infoPanelExpanded = false;

const studentData = [
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Contaduría Pública", "Estudiantes": 39},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Gerencia Financiera Y Contable", "Estudiantes": 4},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Gerencia Para La Transformación Digital", "Estudiantes": 51},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 670},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Contaduría Pública", "Estudiantes": 670},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 608},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Ingeniería Agronómica", "Estudiantes": 318},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Psicología", "Estudiantes": 368},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Ingeniería de Software", "Estudiantes": 375},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Especialización En Gerencia Para El Desarrollo Organizacional", "Estudiantes": 14},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Educación Ambiental Y Desarrollo De La Comunidad", "Estudiantes": 8},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Licenciatura En Educación Física, Recreación Y Deportes ", "Estudiantes": 134},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería Industrial", "Estudiantes": 218},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Administración De Empresas", "Estudiantes": 634},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Ingeniería Electrónica", "Estudiantes": 334},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Ingeniería Industrial", "Estudiantes": 480},
  {"MUNICIPIO_PROGRAMA": "Zipaquirá", "Programa": "Música", "Estudiantes": 214},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 677},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería Mecatrónica", "Estudiantes": 180},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Administración De Empresas", "Estudiantes": 633},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Contaduría Pública", "Estudiantes": 561},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Doctorado En Ciencias De La Educación", "Estudiantes": 18},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Maestría En Ciencias Ambientales", "Estudiantes": 4},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Maestría En Educación", "Estudiantes": 5},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Ingeniería De Sistemas", "Estudiantes": 68},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Ingeniería De Sistemas", "Estudiantes": 8},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Ingeniería De Sistemas", "Estudiantes": 57},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Zootecnia", "Estudiantes": 324},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Profesional En Ciencias Del Deporte", "Estudiantes": 631},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Ingeniería De Sistemas Y Computación", "Estudiantes": 287},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Ingeniería Agronómica", "Estudiantes": 289},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Licenciatura En Ciencias Sociales", "Estudiantes": 171},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Administración De Empresas", "Estudiantes": 532},
  {"MUNICIPIO_PROGRAMA": "Chía", "Programa": "Contaduría Pública", "Estudiantes": 321},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Administración De Empresas", "Estudiantes": 137},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Contaduría Pública", "Estudiantes": 386},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Tecnología En Desarrollo De Software", "Estudiantes": 42},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Gestión Pública", "Estudiantes": 45},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Infraestructura Y Seguridad De Redes", "Estudiantes": 10},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Marketing Digital", "Estudiantes": 22},
  {"MUNICIPIO_PROGRAMA": "Soacha", "Programa": "Ingeniería Topográfica Y Geomática ", "Estudiantes": 22},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Licenciatura En Educación Básica Con Énfasis En Ciencias Sociales", "Estudiantes": 2},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Metodologías De Calidad Para El Desarrollo Del Software", "Estudiantes": 24},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Agroecología Y Desarrollo Agro ecoturístico", "Estudiantes": 10},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Agronegocios Sostenibles", "Estudiantes": 10},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Analítica Aplicada A Negocios", "Estudiantes": 32},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Especialización En Analítica Y Ciencia De Datos", "Estudiantes": 22},
  {"MUNICIPIO_PROGRAMA": "Fusagasuga", "Programa": "Tecnología En Cartografía", "Estudiantes": 2},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Administración De Empresas", "Estudiantes": 457},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Ingeniería De Software", "Estudiantes": 256},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Ingeniería Ambiental", "Estudiantes": 253},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Enfermería", "Estudiantes": 390},
  {"MUNICIPIO_PROGRAMA": "Facatativá", "Programa": "Ingeniería Ambiental", "Estudiantes": 322},
  {"MUNICIPIO_PROGRAMA": "Girardot", "Programa": "Tecnología En Gestión Turística Y Hotelera", "Estudiantes": 3},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Administración De Empresas", "Estudiantes": 281},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Medicina Veterinaria Y Zootecnia ", "Estudiantes": 41},
  {"MUNICIPIO_PROGRAMA": "Ubaté", "Programa": "Zootecnia", "Estudiantes": 275}
];

// ==========================================
// GESTIÓN DEL CICLO DE VIDA DE LA SESIÓN Y AUTENTICACIÓN
// ==========================================

function checkSession() {
  const session = sessionStorage.getItem('isAuthenticated');
  const role = sessionStorage.getItem('userRole');
  return { authenticated: session === 'true', role: role };
}

function saveSession(role) {
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('userRole', role);
}

function clearSession() {
  sessionStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('userRole');
  currentUser = null;
}

const sessionData = checkSession();
if (sessionData.authenticated && sessionData.role) {
  currentUser = { role: sessionData.role };
}

// ==========================================
// SISTEMA DE NAVEGACIÓN Y CONTROL DE ACCESO BASADO EN ROLES
// ==========================================

function navigateTo(view) {
  debugLog(`Navegando a: ${view}`);

  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn'); // Referencia al botón

  // Gestión del estado del menú responsivo
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');

    // Restauración visual del botón de menú
    if (hamburgerBtn) {
        hamburgerBtn.classList.remove('menu-open'); // Quita el estilo activo
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times'); // Quita la X
            icon.classList.add('fa-bars');     // Vuelve a poner las barras
        }
    }
  }

  // Sincronización visual de elementos de navegación activos
  // Actualizar estado activo de los botones del menú escritorio
  document.querySelectorAll('.nav-link-item').forEach(btn => {
    btn.classList.remove('active');
  });
  // Actualizar estado activo de los botones del menú móvil
  document.querySelectorAll('.nav-mobile-link').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Activar el botón correspondiente a la vista actual
  const navButtons = document.querySelectorAll('.nav-link-item');
  const mobileButtons = document.querySelectorAll('.nav-mobile-link');
  
  navButtons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes(`'${view}'`)) {
      btn.classList.add('active');
    }
  });
  
  mobileButtons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes(`'${view}'`)) {
      btn.classList.add('active');
    }
  });

  // Verificación de permisos y redireccionamiento de vistas
  const protectedViews = {
    'administrativos': 'Administrativo',
    'gestores': 'Gestor'
  };

  if (view === 'estudiantes') {
    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
    document.getElementById('estudiantesView').classList.add('active');
    currentView = view;
    renderDashboardsByRole('Estudiante');
    return;
  }

  if (protectedViews[view]) {
    if (!currentUser) {
      showLoginForRole(view);
      return;
    } else if (currentUser.role !== protectedViews[view]) {
      alert(`Acceso denegado. Esta sección es solo para ${protectedViews[view]}s.`);
      return;
    }
  }

  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById(`${view}View`).classList.add('active');
  currentView = view;
  
  if (view === 'estudiantes' && currentUser && currentUser.role === 'Estudiante') {
    renderDashboardsByRole('Estudiante');
  } else if (view === 'administrativos' && currentUser && currentUser.role === 'Administrativo') {
    renderDashboardsByRole('Administrativo');
  } else if (view === 'gestores' && currentUser && currentUser.role === 'Gestor') {
    renderDashboardsByRole('Gestor');
  }
  
  if (view === 'home') {
    setTimeout(() => {
      handleResize();
    }, 500);
  }
}

// ==========================================
// LÓGICA DE AUTENTICACIÓN Y VALIDACIÓN DE CREDENCIALES
// ==========================================

function showLoginForRole(targetView) {
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById('loginView').classList.add('active');
  currentView = 'login';
  
  const loginTitle = document.getElementById('loginTitle');
  const loginSubtitle = document.getElementById('loginSubtitle');
  const loginIcon = document.getElementById('loginIcon');
  
  if (targetView === 'estudiantes') {
    loginTitle.textContent = 'Acceso Estudiantes';
    loginSubtitle.textContent = 'Ingrese sus credenciales para ver tableros académicos';
    loginIcon.className = 'fas fa-user-graduate text-white text-2xl';
    document.getElementById('loginForm').dataset.targetRole = 'Estudiante';
    document.getElementById('loginForm').dataset.targetView = 'estudiantes';
  } else if (targetView === 'administrativos') {
    loginTitle.textContent = 'Acceso Administrativos';
    loginSubtitle.textContent = 'Ingrese sus credenciales para ver tableros institucionales';
    loginIcon.className = 'fas fa-briefcase text-white text-2xl';
    document.getElementById('loginForm').dataset.targetRole = 'Administrativo';
    document.getElementById('loginForm').dataset.targetView = 'administrativos';
  } else if (targetView === 'gestores') {
    loginTitle.textContent = 'Acceso Gestores del Conocimiento';
    loginSubtitle.textContent = 'Ingrese sus credenciales para ver información docente';
    loginIcon.className = 'fas fa-chalkboard-teacher text-white text-2xl';
    document.getElementById('loginForm').dataset.targetRole = 'Gestor';
    document.getElementById('loginForm').dataset.targetView = 'gestores';
  }
}

function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');
  const form = document.getElementById('loginForm');
  const targetRole = form.dataset.targetRole;
  const targetView = form.dataset.targetView;
  
  // Acceso simplificado para demostración
  if (DEMO_MODE) {
    // Asignar usuario demo según el rol objetivo
    if (targetRole === 'Administrativo') {
      currentUser = { password: 'demo', role: 'Administrativo', name: 'Usuario Demo - Administrativo' };
    } else if (targetRole === 'Gestor') {
      currentUser = { password: 'demo', role: 'Gestor', name: 'Usuario Demo - Gestor' };
    } else {
      currentUser = { password: 'demo', role: 'Estudiante', name: 'Usuario Demo - Estudiante' };
    }
    
    saveSession(currentUser.role);
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('logoutBtnMobile').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    errorDiv.classList.add('hidden');
    navigateTo(targetView);
    return;
  }
  
  // Autenticación estándar
  if (USERS[username] && USERS[username].password === password && USERS[username].role === targetRole) {
    currentUser = USERS[username];
    saveSession(currentUser.role);
    
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('logoutBtnMobile').classList.remove('hidden');
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    errorDiv.classList.add('hidden');
    
    navigateTo(targetView);
  } else {
    errorDiv.textContent = 'Usuario o contraseña incorrectos para este rol';
    errorDiv.classList.remove('hidden');
  }
}

function logout() {
  clearSession();
  document.getElementById('logoutBtn').classList.add('hidden');
  document.getElementById('logoutBtnMobile').classList.add('hidden');
  navigateTo('home');
}

// ==========================================
// MOTOR DE RENDERIZADO DINÁMICO DE INTERFAZ
// ==========================================


// ==========================================
// CONTADORES GLOBALES DE TABLEROS POR ROL
// ==========================================
function updateRoleStats(role) {
  const roleDashboards = dashboards.filter(d => d.rol === role);
  const total = roleDashboards.length;
  
  let statElementId;
  if (role === 'Estudiante') {
    statElementId = 'totalEstudiantes';
  } else if (role === 'Administrativo') {
    statElementId = 'totalAdministrativos';
  } else {
    statElementId = 'totalGestores';
  }
  
  const statElement = document.getElementById(statElementId);
  if (statElement) {
    statElement.textContent = total;
  }
}

function renderDashboardsByRole(role) {
  debugLog(`Renderizando dashboards para rol: ${role}`);
  
  const roleDashboards = dashboards.filter(d => d.rol === role);
  const containerId = role === 'Estudiante' ? 'estudiantesDashboards' :
                      role === 'Administrativo' ? 'administrativosDashboards' :
                      'gestoresDashboards';
  
  const container = document.getElementById(containerId);
  
  const grouped = {};
  roleDashboards.forEach(d => {
    if (!grouped[d.macroproceso]) grouped[d.macroproceso] = {};
    if (!grouped[d.macroproceso][d.area]) grouped[d.macroproceso][d.area] = [];
    grouped[d.macroproceso][d.area].push(d);
  });
  
  container.innerHTML = Object.entries(grouped).map(([macroproceso, areas]) => {
    const config = MACROPROCESOS[macroproceso] || {
      icon: 'fa-layer-group',
      color: 'misional',
      areas: []
    };
    const macroprocesoId = generateSafeId(`${role}-${macroproceso}`, 'macro');
    
    return `
      <div class="macroproceso-section ${config.color}">
        <div class="macroproceso-header" data-macroproceso-id="${macroprocesoId}">
          <div class="macroproceso-title">
            <div class="macroproceso-icon">
              <i class="fas ${config.icon}"></i>
            </div>
            <div class="macroproceso-title-text">
              <span>Macroproceso ${macroproceso}</span>
              <div class="macroproceso-count">${Object.values(areas).reduce((sum, arr) => sum + arr.length, 0)} tableros</div>
            </div>
          </div>
          <i class="fas fa-chevron-down collapse-icon expanded" id="icon-${macroprocesoId}"></i>
        </div>
        <div class="macroproceso-content expanded" id="content-${macroprocesoId}">
          ${Object.entries(areas).map(([area, items], index) => 
            createAreaCard(area, items, config.color, index, `${role}-${macroproceso}-`)
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  Object.keys(grouped).forEach((macroproceso) => {
    const macroprocesoId = generateSafeId(`${role}-${macroproceso}`, 'macro');
    expandedMacroprocesos[macroprocesoId] = true;
  });
  
  updateRoleStats(role);
  debugLog(`Dashboards renderizados para ${role}`);
}

// ==========================================
// CONTROL DE INTERACCIÓN: SECCIONES COLAPSABLES
// ==========================================

function toggleMacroproceso(macroprocesoId) {
  debugLog(`Toggle macroproceso: ${macroprocesoId}`);
  
  const content = document.getElementById(`content-${macroprocesoId}`);
  const icon = document.getElementById(`icon-${macroprocesoId}`);
  
  if (!content || !icon) {
    console.error(`❌ No se encontraron elementos para macroproceso: ${macroprocesoId}`);
    return;
  }
  
  const isExpanded = expandedMacroprocesos[macroprocesoId];
  
  if (isExpanded) {
    content.classList.remove('expanded');
    icon.classList.remove('expanded');
    expandedMacroprocesos[macroprocesoId] = false;
  } else {
    content.classList.add('expanded');
    icon.classList.add('expanded');
    expandedMacroprocesos[macroprocesoId] = true;
  }
}

function toggleArea(areaId) {
  debugLog(`Toggle área: ${areaId}`);
  
  const container = document.getElementById(`dashboards-${areaId}`);
  const card = document.getElementById(`area-card-${areaId}`);
  
  if (!container || !card) {
    console.error(`❌ No se encontraron elementos para área: ${areaId}`);
    return;
  }
  
  const isExpanded = expandedAreas[areaId];
  
  if (isExpanded) {
    container.classList.remove('expanded');
    card.classList.remove('expanded');
    expandedAreas[areaId] = false;
  } else {
    container.classList.add('expanded');
    card.classList.add('expanded');
    expandedAreas[areaId] = true;
  }
}

// ==========================================
// OPTIMIZACIÓN DE EVENTOS MEDIANTE DELEGACIÓN
// ==========================================

function setupEventDelegation() {
  debugLog('Configurando event delegation para acordeones');
  
  document.addEventListener('click', function(e) {
    const header = e.target.closest('.macroproceso-header');
    if (header) {
      e.stopPropagation();
      const macroprocesoId = header.dataset.macroprocesoId;
      if (macroprocesoId) {
        toggleMacroproceso(macroprocesoId);
      }
    }
  });
  
  document.addEventListener('click', function(e) {
    const header = e.target.closest('.area-card-header');
    if (header) {
      e.stopPropagation();
      const areaId = header.dataset.areaId;
      if (areaId) {
        toggleArea(areaId);
      }
    }
  });
  
  debugLog('Event delegation configurado ✔');
}

// ==========================================
// COMPONENTES DE INTERFAZ: TARJETAS DE ÁREA
// ==========================================

function createAreaCard(area, dashboardsInArea, macroprocesoColor, index, context = '') {
  const areaId = generateSafeId(area, context + 'area');
  const iconClass = AREA_ICONS[area] || 'fa-folder-open';
  const dashboardCount = dashboardsInArea.length;
  
  debugLog(`Creando tarjeta para área: "${area}" con ID único: "${areaId}"`);
  
  return `
    <div class="area-card" id="area-card-${areaId}" style="animation-delay: ${index * 0.1}s;">
      <div class="area-card-header" data-area-id="${areaId}">
        <div class="area-card-icon ${macroprocesoColor}">
          <i class="fas ${iconClass}"></i>
        </div>
        <div class="area-card-info">
          <div class="area-card-title">${area}</div>
          <div class="area-card-subtitle">
            <span class="area-card-badge">
              <i class="fas fa-chart-bar"></i>
              ${dashboardCount} tablero${dashboardCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <i class="fas fa-chevron-down area-card-expand"></i>
      </div>
      <div class="area-dashboards-container" id="dashboards-${areaId}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${dashboardsInArea.map(d => createDashboardCard(d)).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// COMPONENTES DE INTERFAZ: TARJETAS DE DASHBOARD
// ==========================================

function createDashboardCard(dashboard) {
  const isExternalLink = !dashboard.url.includes('powerbi.com');
  
  const buttonIcon = isExternalLink ? 'fa-external-link-alt' : 'fa-chart-line';
  const buttonText = isExternalLink ? 'Visitar Sitio' : 'Ver Dashboard';

  return `
    <div class="dashboard-card">
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <h4 class="font-bold text-gray-800 flex-1 pr-2 text-base leading-tight">${dashboard.titulo}</h4>
          <i class="fas fa-chart-line text-green-600 flex-shrink-0"></i>
        </div>
        <div class="dashboard-metadata">
          <div class="dashboard-metadata-item">
            <i class="fas fa-calendar-alt"></i>
            <span><strong>Actualización:</strong> ${dashboard.fechaActualizacion}</span>
          </div>
          <div class="dashboard-metadata-item">
            <i class="fas fa-database"></i>
            <span><strong>Fuente:</strong> ${dashboard.fuente}</span>
          </div>
          <div class="dashboard-metadata-item">
            <i class="fas fa-user-edit"></i>
            <span><strong>Elaborado por:</strong> ${dashboard.elaboradoPor}</span>
          </div>
        </div>
        <button onclick="openDashboard(${dashboard.id}); event.stopPropagation();" class="btn-primary w-full justify-center mt-4">
          <i class="fas ${buttonIcon}"></i><span>${buttonText}</span>
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// GESTIÓN DEL MODAL DE VISUALIZACIÓN
// ==========================================

function getTypeClass(type) {
  if (type === 'text') return 'type-text';
  if (type === 'number') return 'type-number';
  if (type === 'date') return 'type-date';
  return 'type-text';
}

function renderDatasetInfo(dashboard) {
  if (!dashboard.datasetName) return '';
  
  const columnsHTML = dashboard.columns ? `
    <table class="columns-table">
      <thead>
        <tr>
          <th>Campo</th>
          <th>Tipo</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        ${dashboard.columns.map(col => `
          <tr>
            <td><strong>${col.name}</strong></td>
            <td><span class="column-type ${getTypeClass(col.type)}">${col.type}</span></td>
            <td>${col.description}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : '';
  
  return columnsHTML;
}

// ==========================================
// LÓGICA DEL MODAL Y BLOQUEO DE SCROLL
// ==========================================

// Variable global para guardar la posición del scroll
let scrollPosition = 0;

function openDashboard(id) {
  const dashboard = dashboards.find(d => d.id === id);
  if (!dashboard) return;

  const isExternalLink = !dashboard.url.includes('powerbi.com');

  if (isExternalLink) {
    window.open(dashboard.url, '_blank');
    return;
  }

  currentDashboard = dashboard;
  infoPanelExpanded = false;
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = dashboard.titulo;
  const cleanTitle = tempDiv.textContent || tempDiv.innerText || "";
  
  document.getElementById('modalTitle').textContent = cleanTitle;
  document.getElementById('modalArea').textContent = dashboard.area;
  document.getElementById('iframeContainer').innerHTML = 
    `<iframe src="${dashboard.url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
  
  document.getElementById('infoDescripcion').textContent = dashboard.descripcion || 'Sin descripción disponible';
  
  const estadoBadge = document.getElementById('infoEstado');
  estadoBadge.textContent = dashboard.estado || 'Sin información';
  estadoBadge.className = 'status-badge status-' + (dashboard.estado === 'Activo' ? 'active' : 'inactive');
  
  const historicoSection = document.getElementById('infoHistoricoSection');
  if (dashboard.esHistorico) {
    historicoSection.style.display = 'block';
    document.getElementById('infoHistorico').textContent = 'Este tablero contiene datos históricos sin actualización periódica.';
  } else {
    historicoSection.style.display = 'none';
  }
  
  document.getElementById('infoObservaciones').textContent = dashboard.observaciones || 'Sin observaciones adicionales';
  
  // Lógica para el diccionario de datos
  if (dashboard.datasetName) {
    document.getElementById('datasetName').textContent = dashboard.datasetName;
    document.getElementById('datasetAbstract').textContent = dashboard.datasetAbstract || 'Dataset del tablero de indicadores institucionales.';
    document.getElementById('datasetColumnsContainer').innerHTML = renderDatasetInfo(dashboard);
    document.getElementById('datasetSource').textContent = dashboard.datasetSource || dashboard.fuente;
    document.getElementById('datasetNotes').textContent = dashboard.datasetNotes || 'Consultar documentación técnica para más detalles.';
  } else {
    document.getElementById('datasetName').textContent = dashboard.titulo;
    document.getElementById('datasetAbstract').textContent = 'Dataset de indicadores institucionales sin especificación detallada.';
    document.getElementById('datasetColumnsContainer').innerHTML = '<p class="text-gray-600 text-sm">Información de campos no disponible.</p>';
    document.getElementById('datasetSource').textContent = dashboard.fuente;
    document.getElementById('datasetNotes').textContent = 'Consultar con el área responsable para información técnica detallada.';
  }
  
  const infoPanel = document.getElementById('dashboardInfoPanel');
  infoPanel.classList.remove('expanded');
  
  // Guardar posición del scroll antes de abrir el modal
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  // Agregar clase para prevenir scroll
  document.body.classList.add('modal-open');
  document.body.style.top = `-${scrollPosition}px`;

  document.getElementById('dashboardModal').classList.add('active');
}

function closeDashboardModal() {
  // Remover clase que previene scroll
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  
  // Restaurar posición del scroll
  window.scrollTo(0, scrollPosition);

  document.getElementById('dashboardModal').classList.remove('active');
  document.getElementById('iframeContainer').innerHTML = '';
  
  // Resetear el panel de información y el botón de toggle
  const panel = document.getElementById('dashboardInfoPanel');
  const toggleBtn = document.getElementById('toggleInfoPanelBtn');
  
  panel.classList.remove('expanded');
  panel.style.width = '';
  toggleBtn.style.display = 'flex';
  toggleBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
  toggleBtn.title = 'Mostrar información del tablero';
  
  currentDashboard = null;
  infoPanelExpanded = false;
}

function toggleInfoPanel() {
  const panel = document.getElementById('dashboardInfoPanel');
  const toggleBtn = document.getElementById('toggleInfoPanelBtn');
  const isMobile = window.innerWidth <= 768;
  
  infoPanelExpanded = !infoPanelExpanded;
  
  if (infoPanelExpanded) {
    panel.classList.add('expanded');
    
    // En móviles, ocultar el botón de toggle cuando el panel está abierto
    if (isMobile) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
      toggleBtn.title = 'Ocultar información';
    }
  } else {
    panel.classList.remove('expanded');
    panel.style.width = ''; 
    
    // Mostrar el botón de toggle
    toggleBtn.style.display = 'flex';
    toggleBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    toggleBtn.title = 'Mostrar información del tablero';
  }
}

function openInNewTab() {
  if (currentDashboard) {
    window.open(currentDashboard.url, '_blank');
  }
}

function downloadCSV() {
  if (!currentDashboard) return;
  
  const csvContent = `Tablero,Area,Fecha Actualización,Fuente,Elaborado Por,Descripción,Estado,Observaciones
"${currentDashboard.titulo}","${currentDashboard.area}","${currentDashboard.fechaActualizacion}","${currentDashboard.fuente}","${currentDashboard.elaboradoPor}","${currentDashboard.descripcion}","${currentDashboard.estado}","${currentDashboard.observaciones}"`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${currentDashboard.titulo.replace(/[^a-z0-9]/gi, '_')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN DEL MAPA
// ==========================================

function initializeMap() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded.');
    return;
  }

  const mapData = [
    { name: "Fusagasuga", coords: [4.3391, -74.3636], students: 3422 },
    { name: "Soacha", coords: [4.579, -74.214], students: 1726 },
    { name: "Facatativá", coords: [4.814, -74.356], students: 2905 },
    { name: "Chía", coords: [4.858, -74.053], students: 1996 },
    { name: "Ubaté", coords: [5.313, -73.816], students: 1327 },
    { name: "Girardot", coords: [4.304, -74.804], students: 1359 },
    { name: "Zipaquirá", coords: [5.025, -74.004], students: 214 }
  ];

  map = L.map('map', {
    center: [4.5, -74.0],
    zoom: 8,
    scrollWheelZoom: true,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  const maxStudents = Math.max(...mapData.map(item => item.students));

  mapData.forEach((municipality) => {
    const baseRadius = (municipality.students / maxStudents) * 15000;
    
    const circle = L.circle(municipality.coords, {
      color: '#16a34a',
      fillColor: '#22c55e',
      fillOpacity: 0.6,
      radius: baseRadius,
      weight: 2
    }).addTo(map);

    mapCircles.push({ circle, baseRadius, municipality });

    const popupContent = `
      <div style="text-align: center; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 16px; font-weight: bold;">
          ${municipality.name}
        </h3>
        <div style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
          ${municipality.students.toLocaleString('es-CO')}
        </div>
        <div style="font-size: 12px; color: #6b7280;">
          Estudiantes
        </div>
      </div>
    `;

    circle.bindPopup(popupContent);

    const tooltipContent = `
      <strong>${municipality.name}</strong><br>
      ${municipality.students.toLocaleString('es-CO')} estudiantes
    `;

    circle.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      className: 'custom-tooltip'
    });

    const markerHtml = `
      <div style="
        background: white;
        border: 2px solid #16a34a;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 10px;
        color: #16a34a;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <i class="fas fa-map-marker-alt"></i>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: markerHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker(municipality.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  map.on('zoomend', function() {
    const currentZoom = map.getZoom();
    const zoomFactor = Math.pow(1.15, currentZoom - 8);
    
    mapCircles.forEach(({ circle, baseRadius }) => {
      const maxScale = 3;
      const minScale = 0.5;
      const finalScale = Math.min(Math.max(zoomFactor, minScale), maxScale);
      circle.setRadius(baseRadius * finalScale);
    });
  });
}

function toggleFullscreenMap() {
  const mapContainer = document.getElementById('map').parentElement;
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  
  if (!isFullscreen) {
    if (mapContainer.requestFullscreen) {
      mapContainer.requestFullscreen();
    } else if (mapContainer.webkitRequestFullscreen) {
      mapContainer.webkitRequestFullscreen();
    } else if (mapContainer.msRequestFullscreen) {
      mapContainer.msRequestFullscreen();
    }
    
    isFullscreen = true;
    fullscreenIcon.classList.remove('fa-expand');
    fullscreenIcon.classList.add('fa-compress');
    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    isFullscreen = false;
    fullscreenIcon.classList.remove('fa-compress');
    fullscreenIcon.classList.add('fa-expand');
    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }
}

document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement) {
    isFullscreen = false;
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    if (fullscreenIcon) {
      fullscreenIcon.classList.remove('fa-compress');
      fullscreenIcon.classList.add('fa-expand');
      setTimeout(() => map.invalidateSize(), 300);
    }
  }
});

// ==========================================
// VISUALIZACIÓN DE MÉTRICAS Y GRÁFICOS
// ==========================================

function animateCounter(id, end) {
  const element = document.getElementById(id);
  const duration = 1500;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentCount = Math.round(end * progress);
    element.textContent = currentCount.toLocaleString('es-CO');
    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = end.toLocaleString('es-CO');
    }
  }, frameRate);
}

function initializeMetrics() {
  animateCounter('totalStudentsCounter', 12949);
  animateCounter('totalProgramsCounter', 49);
  animateCounter('totalCampusesCounter', 7);

  updateTopProgramsChart(5);
}

function updateTopProgramsChart(topN) {
  const programTotals = studentData.reduce((acc, item) => {
    acc[item.Programa] = (acc[item.Programa] || 0) + item.Estudiantes;
    return acc;
  }, {});
  
  const topPrograms = Object.entries(programTotals).sort(([, a], [, b]) => b - a).slice(0, topN);
  renderTopProgramsChart(topPrograms.map(p => p[0]), topPrograms.map(p => p[1]));
}

function renderTopProgramsChart(labels, data) {
  const ctx = document.getElementById('topProgramsChart').getContext('2d');
  if (topProgramsChartInstance) {
    topProgramsChartInstance.destroy();
  }
  topProgramsChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Número de Estudiantes',
        data: data,
        backgroundColor: 'rgba(22, 163, 74, 0.7)',
        borderColor: 'rgba(21, 128, 61, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#E5E7EB' } },
        y: { grid: { display: false } }
      }
    }
  });
}

// ==========================================
// ATAJOS DE TECLADO
// ==========================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('dashboardModal').classList.contains('active')) {
    closeDashboardModal();
  }
  if (e.key === 'Enter' && currentView === 'login') {
    handleLogin();
  }
});

// ==========================================
// COMPORTAMIENTO DEL MENÚ EN DISPOSITIVOS MÓVILES
// ==========================================
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden');
      const icon = hamburgerBtn.querySelector('i');
      
      if (!isOpen) {
        // Menu is now visible
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        hamburgerBtn.classList.add('menu-open');
      } else {
        // Menu is now hidden
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        hamburgerBtn.classList.remove('menu-open');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        hamburgerBtn.classList.remove('menu-open');
      }
    });
  }
}

// ==========================================
// AJUSTE RESPONSIVO DE GRÁFICOS Y MAPAS
// ==========================================
function handleResize() {
  if (currentView === 'home') {
    debugLog('🔄 Iniciando redimensionamiento...');
    
    const mapContainer = document.getElementById('map');
    const chartContainer = document.getElementById('topProgramsChart');
    
    if (mapContainer) {
      void mapContainer.offsetHeight;
    }
    if (chartContainer) {
      void chartContainer.offsetHeight;
    }
    
    if (map && mapContainer) {
      setTimeout(() => {
        map.invalidateSize({
          pan: false,
          animate: false
        });
      }, 50);
      
      setTimeout(() => {
        map.invalidateSize({
          pan: false,
          animate: false
        });
      }, 200);
      
      setTimeout(() => {
        map.invalidateSize();
      }, 350);
    }
    
    if (topProgramsChartInstance && chartContainer) {
      const canvas = chartContainer;
      const parent = canvas.parentElement;
      
      setTimeout(() => {
        if (parent) {
          const parentWidth = parent.clientWidth;
          const parentHeight = parent.clientHeight;
          
          if (parentWidth > 0 && parentHeight > 0) {
            canvas.style.width = parentWidth + 'px';
            canvas.style.height = parentHeight + 'px';
          }
        }
        
        topProgramsChartInstance.resize();
      }, 50);
      
      setTimeout(() => {
        topProgramsChartInstance.resize();
        topProgramsChartInstance.update('none');
      }, 200);
      
      setTimeout(() => {
        topProgramsChartInstance.resize();
        topProgramsChartInstance.update('resize');
      }, 350);
    }
  }
}

// ==========================================
// NAVEGACIÓN DE PESTAÑAS PARA LINEAMIENTOS
// ==========================================
function mostrarLineamiento(tipo) {
  debugLog(`Cambiando a lineamiento: ${tipo}`);
  
  // Obtener referencias a los contenedores de contenido
  const contenidoGobierno = document.getElementById('contenidoGobiernoDatos');
  const contenidoIA = document.getElementById('contenidoInteligenciaArtificial');
  
  // Obtener el encabezado de lineamientos para actualizarlo
  const headerTitle = document.querySelector('#lineamientosView h1');
  const headerIcon = document.querySelector('#lineamientosView .bg-white\\/20 i');
  
  // Validar que existan los contenedores
  if (!contenidoGobierno || !contenidoIA) {
    console.error("Error: No se encontraron los contenedores de lineamientos en el DOM.");
    return;
  }

  if (tipo === 'gobierno-datos') {
    // Activar Gobierno de Datos
    contenidoGobierno.classList.add('active');
    contenidoIA.classList.remove('active');
    
    // Actualizar encabezado
    if (headerTitle) {
      headerTitle.textContent = 'Gobierno de Datos';
    }
    if (headerIcon) {
      headerIcon.className = 'fas fa-database text-4xl';
    }
    
    debugLog('✔ Vista de Gobierno de Datos activada');
    
  } else if (tipo === 'inteligencia-artificial') {
    // Activar Inteligencia Artificial
    contenidoGobierno.classList.remove('active');
    contenidoIA.classList.add('active');
    
    // Actualizar encabezado
    if (headerTitle) {
      headerTitle.textContent = 'Inteligencia Artificial';
    }
    if (headerIcon) {
      headerIcon.className = 'fas fa-brain text-4xl';
    }
    
    debugLog('✔ Vista de Inteligencia Artificial activada');
  }
}

// ==========================================
// CONTROLADOR DE REDIMENSIONAMIENTO DEL PANEL LATERAL
// ==========================================
function initResizeHandle() {
  const handle = document.getElementById('resizeHandle');
  const panel = document.getElementById('dashboardInfoPanel');
  const container = document.querySelector('.dashboard-modal-body'); 
  const iframeContainer = document.getElementById('iframeContainer'); // Referencia al contenedor del iframe

  if (!handle || !panel || !container) return;

  let isResizing = false;

  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isResizing = true;
    
    // Cambiar cursor globalmente
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    if (iframeContainer) iframeContainer.style.pointerEvents = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const containerRect = container.getBoundingClientRect();
    const newWidth = containerRect.right - e.clientX;

    // Limitar ancho (Mínimo 300px, Máximo 80% del contenedor)
    if (newWidth > 300 && newWidth < (containerRect.width * 0.8)) {
      panel.style.width = `${newWidth}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      
      // Restaurar estilos
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Reactivar interacción con el iframe
      if (iframeContainer) iframeContainer.style.pointerEvents = 'auto';
    }
  });
}

// ==========================================
// INICIALIZACIÓN DEL CICLO DE VIDA DE LA APLICACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  debugLog('=== INICIALIZANDO APLICACION ===');
  
  initResizeHandle();
  setupEventDelegation();
  initializeMap();
  initializeMetrics();
  setupMobileMenu();
  
  // Establecer boton activo inicial en Home
  const homeBtn = document.querySelector('.nav-link-item[onclick*="home"]');
  if (homeBtn) homeBtn.classList.add('active');
  
  if (currentUser) {
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('logoutBtnMobile').classList.remove('hidden');
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 400);
  });
  
  // Inicializar animaciones al scroll
  initScrollAnimations();
  
  debugLog('=== APLICACION INICIALIZADA ===');
});

// ==========================================
// ANIMACIONES AL SCROLL CON INTERSECTION OBSERVER
// ==========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.stat-card-modern, .purpose-card, .principle-card, .metric-card, ' +
    '.work-area-card, .governance-card, .lineamiento-card, .dashboard-card, ' +
    '.cert-card, .ai-objective-card'
  );
  
  // Resetear estado inicial
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.children;
        let siblingIndex = Array.from(siblings).indexOf(entry.target);
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, siblingIndex * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// SISTEMA DE BÚSQUEDA INDEPENDIENTE POR ROL
// ==========================================

// Variables globales para almacenar el estado de búsqueda por rol
const searchState = {
  estudiantes: {
    searchTerm: '',
    filteredDashboards: [],
    totalResults: 0,
    savedExpandedMacroprocesos: {},  // Guarda estado de macroprocesos antes de buscar
    savedExpandedAreas: {}            // Guarda estado de áreas antes de buscar
  },
  administrativos: {
    searchTerm: '',
    filteredDashboards: [],
    totalResults: 0,
    savedExpandedMacroprocesos: {},
    savedExpandedAreas: {}
  },
  gestores: {
    searchTerm: '',
    filteredDashboards: [],
    totalResults: 0,
    savedExpandedMacroprocesos: {},
    savedExpandedAreas: {}
  }
};

/**
 * Normaliza texto para búsqueda (elimina acentos y convierte a minúsculas)
 */
function normalizeText(text) {
  if (!text) return '';
  return text.toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Resalta el término de búsqueda en el texto
 */
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm || !text) return text;
  
  const normalizedSearchTerm = normalizeText(searchTerm);
  const normalizedText = normalizeText(text);
  
  // Encontrar todas las coincidencias
  const regex = new RegExp(`(${normalizedSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  
  // Si hay coincidencia, resaltar
  if (normalizedText.includes(normalizedSearchTerm)) {
    let result = text;
    const words = searchTerm.split(' ').filter(w => w.length > 0);
    
    words.forEach(word => {
      const wordRegex = new RegExp(`(${word})`, 'gi');
      result = result.replace(wordRegex, '<span class="highlight">$1</span>');
    });
    
    return result;
  }
  
  return text;
}

/**
 * Filtra dashboards según el término de búsqueda
 */
function filterDashboards(role, searchTerm) {
  const normalizedSearchTerm = normalizeText(searchTerm);
  
  if (!normalizedSearchTerm) {
    return dashboards.filter(d => d.rol === role);
  }
  
  return dashboards.filter(dashboard => {
    if (dashboard.rol !== role) return false;
    
    // Buscar en múltiples campos
    const searchableText = [
      dashboard.titulo,
      dashboard.area,
      dashboard.descripcion,
      dashboard.macroproceso,
      dashboard.subproceso,
      dashboard.elaboradoPor,
      dashboard.fuente
    ].join(' ');
    
    const normalizedText = normalizeText(searchableText);
    
    // Buscar cada palabra del término de búsqueda
    const searchWords = normalizedSearchTerm.split(' ').filter(w => w.length > 0);
    return searchWords.every(word => normalizedText.includes(word));
  });
}

/**
 * Renderiza los dashboards filtrados por búsqueda
 */
function renderFilteredDashboards(role, filteredDashboards, searchTerm) {
  const roleKey = role === 'Estudiante' ? 'estudiantes' :
                  role === 'Administrativo' ? 'administrativos' : 'gestores';
  
  const containerId = role === 'Estudiante' ? 'estudiantesDashboards' :
                      role === 'Administrativo' ? 'administrativosDashboards' :
                      'gestoresDashboards';
  
  const container = document.getElementById(containerId);
  const resultsInfoId = `searchResults${role === 'Estudiante' ? 'Estudiantes' : 
                                        role === 'Administrativo' ? 'Administrativos' : 'Gestores'}`;
  const resultsInfo = document.getElementById(resultsInfoId);
  
  // Actualizar información de resultados
  if (searchTerm && filteredDashboards.length > 0) {
    resultsInfo.innerHTML = `Se encontraron <strong>${filteredDashboards.length}</strong> dashboard${filteredDashboards.length !== 1 ? 's' : ''} que coinciden con "${searchTerm}"`;
    resultsInfo.style.display = 'block';
  } else if (searchTerm && filteredDashboards.length === 0) {
    resultsInfo.innerHTML = '';
    resultsInfo.style.display = 'none';
  } else {
    resultsInfo.innerHTML = '';
    resultsInfo.style.display = 'none';
  }
  
  // Si no hay resultados, mostrar mensaje
  if (searchTerm && filteredDashboards.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">
          <i class="fas fa-search"></i>
        </div>
        <h3>No se encontraron resultados</h3>
        <p>No hay dashboards que coincidan con "${searchTerm}"</p>
        <p style="margin-top: 1rem; font-size: 0.875rem;">Intenta con otros términos de búsqueda o borra el texto para ver todos los dashboards.</p>
      </div>
    `;
    return;
  }
  
  // Agrupar dashboards por macroproceso y área
  const grouped = {};
  filteredDashboards.forEach(d => {
    if (!grouped[d.macroproceso]) grouped[d.macroproceso] = {};
    if (!grouped[d.macroproceso][d.area]) grouped[d.macroproceso][d.area] = [];
    grouped[d.macroproceso][d.area].push(d);
  });
  
  // Renderizar dashboards con resaltado de búsqueda
  container.innerHTML = Object.entries(grouped).map(([macroproceso, areas]) => {
    const config = MACROPROCESOS[macroproceso] || {
      icon: 'fa-layer-group',
      color: 'misional',
      areas: []
    };
    const macroprocesoId = generateSafeId(`${role}-${macroproceso}`, 'macro');
    
    return `
      <div class="macroproceso-section ${config.color}">
        <div class="macroproceso-header" data-macroproceso-id="${macroprocesoId}">
          <div class="macroproceso-title">
            <div class="macroproceso-icon">
              <i class="fas ${config.icon}"></i>
            </div>
            <span>${highlightSearchTerm(`Macroproceso ${macroproceso}`, searchTerm)}</span>
          </div>
          <i class="fas fa-chevron-down collapse-icon expanded" id="icon-${macroprocesoId}"></i>
        </div>
        <div class="macroproceso-content expanded" id="content-${macroprocesoId}">
          ${Object.entries(areas).map(([area, items], index) => 
            createSearchHighlightedAreaCard(area, items, config.color, index, `${role}-${macroproceso}-`, searchTerm)
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  // Actualizar estado de expansión
  Object.keys(grouped).forEach((macroproceso) => {
    const macroprocesoId = generateSafeId(`${role}-${macroproceso}`, 'macro');
    expandedMacroprocesos[macroprocesoId] = true;
  });
}

/**
 * Crea una tarjeta de área con resaltado de búsqueda
 */
function createSearchHighlightedAreaCard(area, dashboardsInArea, macroprocesoColor, index, context = '', searchTerm = '') {
  const areaId = generateSafeId(area, context + 'area');
  const iconClass = AREA_ICONS[area] || 'fa-folder-open';
  const dashboardCount = dashboardsInArea.length;
  
  return `
    <div class="area-card expanded" id="area-card-${areaId}" style="animation-delay: ${index * 0.1}s;">
      <div class="area-card-header" data-area-id="${areaId}">
        <div class="area-card-icon ${macroprocesoColor}">
          <i class="fas ${iconClass}"></i>
        </div>
        <div class="area-card-info">
          <div class="area-card-title">${highlightSearchTerm(area, searchTerm)}</div>
          <div class="area-card-subtitle">
            <span class="area-card-badge">
              <i class="fas fa-chart-bar"></i>
              ${dashboardCount} tablero${dashboardCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <i class="fas fa-chevron-down area-card-expand"></i>
      </div>
      <div class="area-dashboards-container expanded" id="dashboards-${areaId}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${dashboardsInArea.map(dashboard => {
            const isExternalLink = !dashboard.url.includes('powerbi.com');
            const buttonIcon = isExternalLink ? 'fa-external-link-alt' : 'fa-chart-line';
            const buttonText = isExternalLink ? 'Visitar Sitio' : 'Ver Dashboard';
            
            return `
              <div class="dashboard-card">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <h4 class="font-bold text-gray-800 flex-1 pr-2 text-base leading-tight">${highlightSearchTerm(dashboard.titulo, searchTerm)}</h4>
                    <i class="fas fa-chart-line text-green-600 flex-shrink-0"></i>
                  </div>
                  <div class="dashboard-metadata">
                    <div class="dashboard-metadata-item">
                      <i class="fas fa-calendar-alt"></i>
                      <span><strong>Actualización:</strong> ${dashboard.fechaActualizacion}</span>
                    </div>
                    <div class="dashboard-metadata-item">
                      <i class="fas fa-database"></i>
                      <span><strong>Fuente:</strong> ${highlightSearchTerm(dashboard.fuente, searchTerm)}</span>
                    </div>
                    <div class="dashboard-metadata-item">
                      <i class="fas fa-user-edit"></i>
                      <span><strong>Elaborado por:</strong> ${dashboard.elaboradoPor}</span>
                    </div>
                  </div>
                  <button onclick="openDashboard(${dashboard.id}); event.stopPropagation();" class="btn-primary w-full justify-center mt-4">
                    <i class="fas ${buttonIcon}"></i><span>${buttonText}</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Inicializa el sistema de búsqueda para un rol específico
 */
function initializeSearch(role) {
  const roleKey = role === 'Estudiante' ? 'estudiantes' :
                  role === 'Administrativo' ? 'administrativos' : 'gestores';
  
  const searchInputId = `search${role === 'Estudiante' ? 'Estudiantes' : 
                                  role === 'Administrativo' ? 'Administrativos' : 'Gestores'}`;
  const clearButtonId = `clearSearch${role === 'Estudiante' ? 'Estudiantes' : 
                                       role === 'Administrativo' ? 'Administrativos' : 'Gestores'}`;
  
  const searchInput = document.getElementById(searchInputId);
  const clearButton = document.getElementById(clearButtonId);
  
  if (!searchInput || !clearButton) {
    debugLog(`⚠️ No se encontraron elementos de búsqueda para rol: ${role}`);
    return;
  }
  
  // Evento de escritura en el campo de búsqueda
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    // Mostrar/ocultar botón de limpiar
    if (searchTerm) {
      clearButton.classList.add('visible');
    } else {
      clearButton.classList.remove('visible');
    }
    
    // Debounce: esperar 300ms después de que el usuario deje de escribir
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(role, searchTerm);
    }, 300);
  });
  
  // Evento del botón de limpiar búsqueda
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.classList.remove('visible');
    performSearch(role, '');
    searchInput.focus();
  });
  
  // Permitir búsqueda con Enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(searchTimeout);
      const searchTerm = e.target.value.trim();
      performSearch(role, searchTerm);
    }
  });
  
  debugLog(`✔ Sistema de búsqueda inicializado para rol: ${role}`);
}

/**
 * Ejecuta la búsqueda para un rol específico
 */
function performSearch(role, searchTerm) {
  const roleKey = role === 'Estudiante' ? 'estudiantes' :
                  role === 'Administrativo' ? 'administrativos' : 'gestores';
  
  debugLog(`🔍 Búsqueda en ${role}: "${searchTerm}"`);
  
  // Detectar transición: ¿El usuario está comenzando una búsqueda?
  const wasSearching = !!searchState[roleKey].searchTerm;
  const isSearching = !!(searchTerm && searchTerm.trim() !== '');
  
  // Si es la primera búsqueda, guardar el estado actual de expansión
  if (!wasSearching && isSearching) {
    debugLog('💾 Guardando estado de expansión antes de búsqueda');
    searchState[roleKey].savedExpandedMacroprocesos = {...expandedMacroprocesos};
    searchState[roleKey].savedExpandedAreas = {...expandedAreas};
  }
  
  // Actualizar estado de búsqueda
  searchState[roleKey].searchTerm = searchTerm;
  
  // Si no hay término de búsqueda, restaurar vista con estado previo
  if (!searchTerm || searchTerm.trim() === '') {
    debugLog('📋 Restaurando vista con estado previo de expansión');
    searchState[roleKey].filteredDashboards = [];
    searchState[roleKey].totalResults = 0;
    
    // Limpiar información de resultados
    const resultsInfoId = `searchResults${role === 'Estudiante' ? 'Estudiantes' : 
                                          role === 'Administrativo' ? 'Administrativos' : 'Gestores'}`;
    const resultsInfo = document.getElementById(resultsInfoId);
    if (resultsInfo) {
      resultsInfo.innerHTML = '';
      resultsInfo.style.display = 'none';
    }
    
    // Restaurar el estado de expansión guardado
    if (Object.keys(searchState[roleKey].savedExpandedMacroprocesos).length > 0) {
      expandedMacroprocesos = {...searchState[roleKey].savedExpandedMacroprocesos};
      expandedAreas = {...searchState[roleKey].savedExpandedAreas};
      debugLog('✅ Estado de expansión restaurado', {
        macroprocesos: Object.keys(expandedMacroprocesos).length,
        areas: Object.keys(expandedAreas).length
      });
    }
    
    // Llamar al renderizado original (que respetará el estado restaurado)
    originalRenderDashboardsByRole(role);
    return;
  }
  
  // Filtrar dashboards
  const filteredDashboards = filterDashboards(role, searchTerm);
  searchState[roleKey].filteredDashboards = filteredDashboards;
  searchState[roleKey].totalResults = filteredDashboards.length;
  
  debugLog(`📊 Resultados encontrados: ${filteredDashboards.length}`);
  
  // Renderizar resultados
  renderFilteredDashboards(role, filteredDashboards, searchTerm);
}


// ==========================================
// MODIFICACIÓN DE LA FUNCIÓN ORIGINAL DE RENDERIZADO
// ==========================================

// Guardar la función original de renderizado
const originalRenderDashboardsByRole = renderDashboardsByRole;

// Sobrescribir la función para incluir inicialización de búsqueda
renderDashboardsByRole = function(role) {
  // Llamar a la función original
  const roleKey = role === 'Estudiante' ? 'estudiantes' :
                  role === 'Administrativo' ? 'administrativos' : 'gestores';
  
  // Si hay una búsqueda activa, aplicarla
  if (searchState[roleKey].searchTerm) {
    performSearch(role, searchState[roleKey].searchTerm);
  } else {
    // Renderizado normal
    originalRenderDashboardsByRole(role);
  }
  
  // Inicializar búsqueda después del renderizado
  setTimeout(() => {
    initializeSearch(role);
  }, 100);
};

// ==========================================
// FUNCIONES PARA DROPDOWN DE LINEAMIENTOS
// ==========================================
/**
 * Variable global para rastrear el lineamiento actual
 */
let currentLineamiento = null;

/**
 * Alternar dropdown en navegación desktop (para dispositivos táctiles)
 * El hover CSS maneja el comportamiento en desktop con mouse
 */
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  
  // Verificar si es dispositivo táctil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    // Cerrar otros dropdowns
    document.querySelectorAll('.nav-dropdown').forEach(d => {
      if (d.id !== dropdownId) {
        d.classList.remove('active');
      }
    });
    
    // Toggle el dropdown actual
    dropdown.classList.toggle('active');
  }
}

/**
 * Alternar dropdown en navegación móvil (siempre con clic)
 */
function toggleMobileDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const button = dropdown ? dropdown.previousElementSibling : null;
  
  if (!dropdown || !button) return;
  
  // Toggle el dropdown
  dropdown.classList.toggle('active');
  button.classList.toggle('active');
}

/**
 * Navegar directamente a un lineamiento específico
 */
function navigateToLineamiento(tipo) {
  // Guardar el lineamiento actual
  currentLineamiento = tipo;
  
  // Primero navegar a la vista de lineamientos
  navigateTo('lineamientos');
  
  // Esperar a que se renderice y luego activar la pestaña
  setTimeout(() => {
    mostrarLineamiento(tipo);
    updateActiveStates();
  }, 100);
  
  // Cerrar el menú móvil si está abierto
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
  
  // Cerrar todos los dropdowns móviles
  closeMobileDropdowns();
}

/**
 * Actualizar estados activos de los botones del navbar
 */
function updateActiveStates() {
  // Remover estados activos previos
  document.querySelectorAll('.nav-link-item, .nav-mobile-link, .nav-dropdown-item, .nav-mobile-dropdown-item').forEach(el => {
    el.classList.remove('active-view');
  });
  
  // Si estamos en la vista de lineamientos
  if (currentView === 'lineamientos') {
    // Marcar el botón principal de Lineamientos como activo
    const lineamientosBtn = document.querySelector('.nav-link-item.has-dropdown');
    if (lineamientosBtn) {
      lineamientosBtn.classList.add('active-view');
    }
    
    const lineamientosBtnMobile = document.querySelector('.nav-mobile-link.has-dropdown');
    if (lineamientosBtnMobile) {
      lineamientosBtnMobile.classList.add('active-view');
    }
    
    // Marcar el submenú correspondiente como activo
    if (currentLineamiento) {
      const activeDropdownItem = document.querySelector(`.nav-dropdown-item[onclick*="${currentLineamiento}"]`);
      if (activeDropdownItem) {
        activeDropdownItem.classList.add('active-view');
      }
      
      const activeDropdownItemMobile = document.querySelector(`.nav-mobile-dropdown-item[onclick*="${currentLineamiento}"]`);
      if (activeDropdownItemMobile) {
        activeDropdownItemMobile.classList.add('active-view');
      }
    }
  } else {
    // Limpiar el lineamiento actual si no estamos en esa vista
    currentLineamiento = null;
  }
}

/**
 * Cerrar dropdowns móviles al cambiar de vista
 */
function closeMobileDropdowns() {
  document.querySelectorAll('.nav-mobile-dropdown').forEach(d => {
    d.classList.remove('active');
  });
  document.querySelectorAll('.nav-mobile-link.has-dropdown').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Cerrar dropdowns desktop táctiles
  document.querySelectorAll('.nav-dropdown').forEach(d => {
    d.classList.remove('active');
  });
}

/**
 * Cerrar dropdowns al hacer clic fuera (solo en dispositivos táctiles)
 */
document.addEventListener('click', function(event) {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    const isDropdown = event.target.closest('.nav-dropdown');
    const isDropdownButton = event.target.closest('.has-dropdown');
    
    if (!isDropdown && !isDropdownButton) {
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        d.classList.remove('active');
      });
    }
  }
});

/**
 * Interceptar la función navigateTo original para actualizar estados
 */
(function() {
  const originalNavigateTo = window.navigateTo;
  
  window.navigateTo = function(view) {
    // Llamar la función original
    const result = originalNavigateTo.apply(this, arguments);
    
    // Actualizar estados activos después de navegar
    setTimeout(() => {
      updateActiveStates();
    }, 50);
    
    return result;
  };
})();

/**
 * Inicializar estados al cargar la página
 */
document.addEventListener('DOMContentLoaded', function() {
  updateActiveStates();
  
  // Prevenir que el clic en el botón dropdown navegue en dispositivos táctiles
  const dropdownButtons = document.querySelectorAll('.nav-link-item.has-dropdown');
  
  dropdownButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
});

// ==========================================
// FUNCIÓN: SCROLL TO TOP
// ==========================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', function() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
});

// ==========================================
// INICIALIZACIÓN AUTOMÁTICA AL CAMBIAR DE VISTA
// ==========================================

// Modificar la función navigateTo para inicializar búsquedas
const originalNavigateTo = navigateTo;
navigateTo = function(view) {
  // Llamar a la función original
  originalNavigateTo(view);
  
  // Inicializar búsqueda según la vista
  setTimeout(() => {
    if (view === 'estudiantes') {
      initializeSearch('Estudiante');
    } else if (view === 'administrativos') {
      initializeSearch('Administrativo');
    } else if (view === 'gestores') {
      initializeSearch('Gestor');
    }
  }, 200);
};

debugLog('✔ Sistema de búsqueda independiente cargado correctamente');
