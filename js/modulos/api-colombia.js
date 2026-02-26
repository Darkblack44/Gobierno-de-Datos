// ==========================================
// MÓDULO API COLOMBIA — Capa de integración
// ==========================================
//
// PRINCIPIOS ESTRICTOS:
//   • Los campos originales (nombre, coordenadas, estudiantes) nunca se modifican.
//   • Todo dato de la API se guarda en municipio._apiColombia (campo adicional).
//   • Si la API falla, el mapa funciona exactamente igual que antes.
//   • Caché en localStorage (TTL 24 h) para reducir llamadas y soportar offline.
//   • Reintentos con backoff exponencial (max 3 intentos).
//
// FUENTE: https://api-colombia.com/api/v1
// DOC:    https://docs.api-colombia.com/
// ==========================================

const ApiColombia = (() => {

  // ── Constantes ──────────────────────────────────────────────────────────
  const URL_BASE       = 'https://api-colombia.com/api/v1';
  const CACHE_CLAVE    = 'uc_apicolombia_municipios_v1';
  const CACHE_TTL_MS   = 24 * 60 * 60 * 1000;   // 24 horas
  const MAX_REINTENTOS = 3;
  const TIMEOUT_MS     = 8000;                   // 8 s por request
  const DELAY_BASE_MS  = 600;                    // backoff: 600, 1200, 2400 ms

  // ── Normalización de texto (para comparar nombres sin tildes/mayúsculas) ──
  const normalizar = texto =>
    String(texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')  // quitar diacríticos
      .trim();

  // ── Log trazable usando el sistema de depuración existente ──────────────
  const log = (msg) => {
    if (typeof registrarDepuracion === 'function') registrarDepuracion(msg);
  };

  // ══════════════════════════════════════════════════════════════════════
  // CACHÉ — localStorage con TTL por clave individual
  // ══════════════════════════════════════════════════════════════════════
  const cache = {
    _leer() {
      try { return JSON.parse(localStorage.getItem(CACHE_CLAVE) || '{}'); }
      catch { return {}; }
    },
    _escribir(almacen) {
      try { localStorage.setItem(CACHE_CLAVE, JSON.stringify(almacen)); }
      catch { /* localStorage saturado — sin caché */ }
    },
    obtener(clave) {
      const almacen = this._leer();
      const item    = almacen[clave];
      if (!item) return null;
      if (Date.now() - item.ts > CACHE_TTL_MS) {
        this.eliminar(clave);
        return null;
      }
      return item.data;
    },
    guardar(clave, data) {
      const almacen = this._leer();
      almacen[clave] = { data, ts: Date.now() };
      this._escribir(almacen);
    },
    eliminar(clave) {
      const almacen = this._leer();
      delete almacen[clave];
      this._escribir(almacen);
    }
  };

  // ══════════════════════════════════════════════════════════════════════
  // FETCH CON REINTENTOS Y BACKOFF EXPONENCIAL
  // ══════════════════════════════════════════════════════════════════════
  async function fetchConReintentos(url) {
    for (let intento = 1; intento <= MAX_REINTENTOS; intento++) {
      try {
        const controller = new AbortController();
        const temporizador = setTimeout(() => controller.abort(), TIMEOUT_MS);
        const respuesta = await fetch(url, { signal: controller.signal });
        clearTimeout(temporizador);

        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status} — ${url}`);
        return await respuesta.json();

      } catch (error) {
        log(`⚠️ API Colombia [intento ${intento}/${MAX_REINTENTOS}] "${url}": ${error.message}`);
        if (intento < MAX_REINTENTOS) {
          await new Promise(r => setTimeout(r, DELAY_BASE_MS * intento));
        }
      }
    }
    return null;   // Todos los reintentos fallaron
  }

  // ══════════════════════════════════════════════════════════════════════
  // BÚSQUEDA DE CIUDAD POR NOMBRE (con caché)
  //
  //   GET /api/v1/City/search/{keyword}
  //   Retorna array de ciudades. Se selecciona la de nombre normalizado
  //   más cercano al término buscado.
  // ══════════════════════════════════════════════════════════════════════
  async function buscarCiudad(nombre) {
    const claveCache  = `ciudad_${normalizar(nombre)}`;
    const enCache     = cache.obtener(claveCache);
    if (enCache) {
      log(`📦 API Colombia: caché hit → "${nombre}"`);
      return enCache;
    }

    const url       = `${URL_BASE}/City/search/${encodeURIComponent(nombre)}`;
    const resultados = await fetchConReintentos(url);

    if (!resultados || !Array.isArray(resultados) || resultados.length === 0) {
      log(`⚠️ API Colombia: sin resultados para "${nombre}"`);
      return null;
    }

    // Buscar coincidencia exacta normalizada primero; si no, tomar el primero
    const nombreNorm  = normalizar(nombre);
    const coincidencia =
      resultados.find(c => normalizar(c.name) === nombreNorm) ||
      resultados[0];

    cache.guardar(claveCache, coincidencia);
    return coincidencia;
  }

  // ══════════════════════════════════════════════════════════════════════
  // MAPPER — Adapta la respuesta de la API al modelo _apiColombia
  //
  //   Nunca altera ni renombra los campos originales del municipio.
  //   Solo define campos nuevos dentro del objeto _apiColombia.
  //
  //   MiModeloActual:          { nombre, coordenadas, estudiantes }
  //   API Colombia City:       { id, name, description, surface, population,
  //                              postalCode, departmentId, department, ... }
  //   MiModeloActual (extendido):
  //     municipio._apiColombia = {
  //       _apiId, _nombreOficial, _descripcion, _superficie,
  //       _poblacion, _codigoPostal, _departamentoId
  //     }
  // ══════════════════════════════════════════════════════════════════════
  function adaptarCiudad(ciudadApi) {
    if (!ciudadApi) return null;
    return {
      _apiId          : ciudadApi.id            ?? null,
      _nombreOficial  : ciudadApi.name          ?? null,
      _descripcion    : ciudadApi.description   ?? null,
      _superficie     : ciudadApi.surface       ?? null,   // km²
      _poblacion      : ciudadApi.population    ?? null,
      _codigoPostal   : ciudadApi.postalCode    ?? null,
      _departamentoId : ciudadApi.departmentId  ?? null
    };
  }

  // ══════════════════════════════════════════════════════════════════════
  // ENRIQUECER DATOS DEL MAPA
  //
  //   Itera los municipios, busca cada uno en la API y agrega _apiColombia.
  //   Llama a onActualizar(municipio) tras enriquecer cada uno para que el
  //   mapa pueda actualizar su popup en tiempo real sin re-renderizar.
  //
  //   Si la API falla para un municipio, ese municipio queda sin _apiColombia
  //   y el mapa continúa funcionando con los datos originales.
  // ══════════════════════════════════════════════════════════════════════
  async function enriquecerDatosMapa(datosMapa, onActualizar) {
    if (!Array.isArray(datosMapa) || datosMapa.length === 0) return;

    log('🌐 API Colombia: iniciando enriquecimiento de municipios...');

    for (const municipio of datosMapa) {
      try {
        const ciudadApi   = await buscarCiudad(municipio.nombre);
        const enriquecido = adaptarCiudad(ciudadApi);

        if (enriquecido) {
          // ← Solo se AGREGA _apiColombia; nombre/coordenadas/estudiantes intactos
          municipio._apiColombia = enriquecido;
          log(`✔ API Colombia: "${municipio.nombre}" enriquecido (id=${enriquecido._apiId}, pob=${enriquecido._poblacion})`);
          if (typeof onActualizar === 'function') onActualizar(municipio);
        } else {
          log(`ℹ API Colombia: sin datos para "${municipio.nombre}" — se mantiene original`);
        }
      } catch (error) {
        // Error inesperado: no afecta el mapa, solo se registra
        log(`❌ API Colombia: error inesperado en "${municipio.nombre}" — ${error.message}`);
      }
    }

    log('✔ API Colombia: enriquecimiento completado.');
  }

  // ── Interfaz pública del módulo ──────────────────────────────────────
  return {
    enriquecerDatosMapa
  };

})();
