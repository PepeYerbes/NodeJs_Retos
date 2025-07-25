/**
 * Servidor HTTP para Invertir Cadenas - Reto 03
 *
 * Este servidor implementa endpoints para:
 * - Invertir cadenas de texto
 * - Verificar palíndromos (extra opcional)
 *
 * Rutas disponibles:
 * - GET /invertir?texto=cadena - Invierte una cadena
 * - GET /palindromo?texto=cadena - Verifica si es palíndromo
 */

// Importa el módulo HTTP nativo de Node.js
import http from 'http';

// Importa el módulo URL para parsear query parameters
import { URL } from 'url';

// Importa las funciones utilitarias
import { invertirCadena } from './utils/invertir.js';

// Define el puerto del servidor
const PORT = 3000;

/**
 * Función para parsear query parameters de la URL
 * @param {string} url - URL completa de la petición
 * @returns {Object} Objeto con los query parameters
 */
function parseQuery(url) {
  const urlObj = new URL(url, `http://localhost:${PORT}`);
  return Object.fromEntries(urlObj.searchParams.entries());
}

/**
 * Función para enviar respuestas JSON
 * @param {ServerResponse} res - Objeto de respuesta
 * @param {number} statusCode - Código de estado HTTP
 * @param {Object} data - Datos a enviar como JSON
 */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Función para verificar si una cadena es palíndromo
 * @param {string} texto - Texto a verificar
 * @returns {boolean} True si es palíndromo
 */
function esPalindromo(texto) {
  // Normaliza el texto: minúsculas y sin espacios/caracteres especiales
  const textoLimpio = texto.toLowerCase().replace(/[^a-z0-9]/g, '');
  const textoInvertido = invertirCadena(textoLimpio);
  return textoLimpio === textoInvertido;
}

/**
 * Maneja la ruta /invertir
 * @param {IncomingMessage} req - Objeto de petición
 * @param {ServerResponse} res - Objeto de respuesta
 * @param {Object} query - Query parameters parseados
 */
function handleInvertir(req, res, query) {
  const { texto } = query;

  // Validar que el parámetro texto existe
  if (!texto) {
    return sendJSON(res, 400, {
      error: 'El parámetro 'texto' es requerido',
      ejemplo: '?texto=hola'
    });
  }

  // Validar que no esté vacío
  if (texto.trim() === '') {
    return sendJSON(res, 400, {
      error: 'El texto no puede estar vacío'
    });
  }

  try {
    // Invertir la cadena usando nuestra función utilitaria
    const invertido = invertirCadena(texto);

    // Responder con el formato requerido
    sendJSON(res, 200, {
      original: texto,
      invertido: invertido
    });
  } catch (error) {
    // Manejar errores de la función invertirCadena
    sendJSON(res, 400, {
      error: error.message
    });
  }
}

/**
 * Maneja la ruta /palindromo (extra opcional)
 * @param {IncomingMessage} req - Objeto de petición
 * @param {ServerResponse} res - Objeto de respuesta
 * @param {Object} query - Query parameters parseados
 */
function handlePalindromo(req, res, query) {
  const { texto } = query;

  if (!texto) {
    return sendJSON(res, 400, {
      error: 'El parámetro 'texto' es requerido',
      ejemplo: '?texto=oso'
    });
  }

  if (texto.trim() === '') {
    return sendJSON(res, 400, {
      error: 'El texto no puede estar vacío'
    });
  }

  try {
    const palindromo = esPalindromo(texto);

    sendJSON(res, 200, {
      original: texto,
      palindromo: palindromo,
      mensaje: palindromo ? '¡Es un palíndromo!' : 'No es un palíndromo'
    });
  } catch (error) {
    sendJSON(res, 400, {
      error: error.message
    });
  }
}

/**
 * Crea y configura el servidor HTTP
 */
const server = http.createServer((req, res) => {
  // Parsear la URL para obtener pathname y query parameters
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = urlObj.pathname;
  const query = parseQuery(req.url);

  // Log de la petición para debugging
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);

  // Manejar solo peticiones GET
  if (req.method !== 'GET') {
    return sendJSON(res, 405, {
      error: 'Método no permitido. Solo se acepta GET'
    });
  }

  // ===== ROUTING =====

  // Ruta: GET /invertir?texto=cadena
  if (pathname === '/invertir') {
    return handleInvertir(req, res, query);
  }

  // Ruta: GET /palindromo?texto=cadena (extra opcional)
  if (pathname === '/palindromo') {
    return handlePalindromo(req, res, query);
  }

  // Ruta: GET / (página de inicio con información)
  if (pathname === '/') {
    return sendJSON(res, 200, {
      mensaje: '🚀 Servidor de Inversión de Cadenas',
      rutas: {
        invertir: 'GET /invertir?texto=hola',
        palindromo: 'GET /palindromo?texto=oso'
      },
      ejemplos: [
        'http://localhost:3000/invertir?texto=JavaScript',
        'http://localhost:3000/palindromo?texto=reconocer'
      ]
    });
  }

  // Ruta no encontrada
  sendJSON(res, 404, {
    error: 'Ruta no encontrada',
    rutasDisponibles: ['/', '/invertir', '/palindromo']
  });
});

/**
 * Inicia el servidor
 */
server.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('📝 Rutas disponibles:');
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/invertir?texto=hola`);
  console.log(`   - http://localhost:${PORT}/palindromo?texto=oso`);
  console.log('🛑 Presiona Ctrl+C para detener el servidor');
});