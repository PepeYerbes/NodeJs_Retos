/**
 * Middleware de Parsing de Query Parameters - Semana 4 (Node.js HTTP Nativo)
 *
 * Este middleware personalizado parsea automáticamente la URL de la petición
 * para extraer y procesar los query parameters y el pathname, proporcionando
 * funcionalidad similar a Express pero usando Node.js HTTP nativo.
 *
 * Características:
 * - Extrae query parameters de la URL (?key=value&key2=value2)
 * - Convierte query parameters a objeto JavaScript
 * - Extrae el pathname limpio sin query parameters
 * - Compatible con el patrón de middleware de Node.js
 *
 * Funcionalidad equivalente a Express:
 * - req.query (objeto con query parameters)
 * - req.pathname (ruta sin query parameters)
 */

/**
 * Middleware para parsear query parameters y pathname de la URL
 *
 * Toma la URL cruda de la petición HTTP y la procesa para extraer:
 * - Los query parameters como un objeto JavaScript accesible en req.query
 * - El pathname limpio sin query parameters en req.pathname
 *
 * @function parseQuery
 * @param {IncomingMessage} req - Objeto de petición HTTP nativo de Node.js
 * @param {ServerResponse} res - Objeto de respuesta HTTP nativo de Node.js
 * @param {Function} next - Función callback para continuar al siguiente middleware
 *
 * Propiedades agregadas al objeto req:
 * @property {Object} req.query - Objeto con los query parameters parseados
 * @property {string} req.pathname - Ruta de la URL sin query parameters
 *
 * @example
 * // URL: http://localhost:3000/users?name=juan&admin=true
 * // Después del middleware:
 * // req.query = { name: 'juan', admin: 'true' }
 * // req.pathname = '/users'
 *
 * @example
 * // Uso en el servidor
 * parseQuery(req, res, () => {
 *   console.log(req.query);    // { name: 'juan' }
 *   console.log(req.pathname); // '/users'
 * });
 */
export function parseQuery(req, res, next) {

  // Crea un objeto URL completo usando la URL de la petición y el host
  // req.url contiene solo la ruta (/users?name=juan)
  // req.headers.host contiene el host (localhost:3000)
  // Se combinan para crear una URL absoluta válida para el constructor URL
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Extrae y convierte los query parameters a un objeto JavaScript
  // url.searchParams es un URLSearchParams que contiene los parámetros
  // .entries() retorna un iterador de pares [key, value]
  // Object.fromEntries() convierte el iterador en un objeto plano
  // Resultado: { name: 'juan', admin: 'true' }
  req.query = Object.fromEntries(url.searchParams.entries());

  // Extrae el pathname limpio sin query parameters
  // url.pathname contiene solo la ruta (/users) sin los query parameters
  // Se asigna directamente al objeto req para acceso posterior
  req.pathname = url.pathname;

  // Llama a next() para continuar al siguiente middleware o controlador
  // Sin esta llamada, la petición se quedaría "colgada"
  // Es fundamental en el patrón de middleware
  next();
}