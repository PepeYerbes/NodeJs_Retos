/**
 * Middleware de Logging - Semana 5
 *
 * Este módulo define un middleware personalizado para registrar todas las peticiones HTTP:
 * - Registra timestamp, método HTTP y URL de cada petición
 * - Se ejecuta antes de los controladores principales
 * - Proporciona trazabilidad y monitoreo del servidor
 *
 * Características:
 * - Formato de log estándar con timestamp ISO
 * - Registro automático sin configuración adicional
 * - Compatible con todas las rutas de Express
 * - No interfiere con el flujo normal de respuestas
 */

/**
 * Middleware para logging automático de peticiones HTTP
 *
 * Este middleware intercepta todas las peticiones que pasan por las rutas donde se aplica
 * y registra información básica en la consola del servidor para monitoreo y debugging.
 *
 * @function logger
 * @param {Object} req - Objeto Request de Express que contiene información de la petición
 * @param {Object} res - Objeto Response de Express para enviar respuestas al cliente
 * @param {Function} next - Función callback para continuar al siguiente middleware o controlador
 *
 * Formato de log generado:
 * "2025-06-26T15:30:45.123Z | GET /api/users"
 * "2025-06-26T15:31:02.456Z | POST /api/products"
 *
 * @example
 * // Uso en rutas individuales
 * router.get('/users', logger, getUsersController);
 *
 * @example
 * // Uso global en toda la aplicación
 * app.use(logger);
 */
export function logger(req, res, next) {
  // Crea un nuevo objeto Date para capturar el timestamp exacto de la petición
  // Se ejecuta en tiempo real cuando llega cada petición
  const dateTime = new Date();

  // Registra en consola la información de la petición usando template literals
  // toISOString() convierte la fecha a formato ISO estándar (YYYY-MM-DDTHH:mm:ss.sssZ)
  // req.method contiene el verbo HTTP (GET, POST, PUT, DELETE, etc.)
  // req.url contiene la ruta completa incluyendo query parameters
  console.log(`${dateTime.toISOString()} | ${req.method} ${req.url}`);

  // Llama a next() para continuar al siguiente middleware o controlador
  // Sin esta llamada, la petición se quedaría "colgada" y nunca llegaría respuesta
  // Es FUNDAMENTAL en cualquier middleware de Express
  next();
}