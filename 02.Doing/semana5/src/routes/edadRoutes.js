/**
 * Rutas de Cálculo de Edad - Semana 5
 *
 * Este módulo define rutas para calcular la edad basada en el año de nacimiento:
 * - GET /api/edad?anioNacimiento=YYYY - Calcula la edad actual del usuario
 *
 * Características:
 * - Cálculo automático basado en el año actual
 * - Validación de años válidos
 * - Manejo de errores para datos inválidos
 * - Logging automático de todas las peticiones
 */

// Importa Express para crear el enrutador
import express from 'express';

// Importa el middleware de logging personalizado para registrar peticiones
import { logger } from '../middlewares/logger.js';

// Crea una instancia del enrutador de Express
// El router permite definir rutas modulares que luego se montan en la aplicación principal
const router = express.Router();

// ===== DEFINICIÓN DE RUTAS =====

/**
 * Ruta: GET /api/edad?anioNacimiento=YYYY
 * Propósito: Calcular la edad actual basada en el año de nacimiento proporcionado
 * Middleware: logger - Registra la petición en consola
 *
 * Query parameters:
 * @param {string} anioNacimiento - Año de nacimiento en formato YYYY (se convierte a número)
 *
 * Ejemplo de uso:
 * GET /api/edad?anioNacimiento=2000 → { 'anioNacimiento': 2000, 'edad': 25 }
 * GET /api/edad?anioNacimiento=1995 → { 'anioNacimiento': 1995, 'edad': 30 }
 *
 * Respuesta exitosa (200):
 * {
 *   'anioNacimiento': 2000,
 *   'edad': 25
 * }
 *
 * Respuesta de error (400):
 * {
 *   'error': 'Año inválido'
 * }
 */
router.get('/edad', logger, (req, res) => {
  // Convierte el query parameter 'anioNacimiento' de string a número entero
  // parseInt() convierte strings a números enteros, retorna NaN si no es válido
  const anio = parseInt(req.query.anioNacimiento);

  // Obtiene el año actual usando el objeto Date
  // getFullYear() retorna el año actual como número entero
  const actual = new Date().getFullYear();

  // Valida que el año sea un número válido y no sea mayor o igual al año actual
  // !anio es true cuando anio es NaN, 0, null, undefined
  // anio >= actual verifica que el año de nacimiento no sea futuro o actual
  if (!anio || anio >= actual) {
    // Retorna error 400 (Bad Request) con mensaje descriptivo
    return res.status(400).json({ error: 'Año inválido' });
  }

  // Calcula la edad restando el año de nacimiento del año actual
  // Esta es una aproximación básica que no considera mes y día exactos
  const edad = actual - anio;

  // Retorna la respuesta exitosa con el año de nacimiento y la edad calculada
  // Usa shorthand property notation para propiedades con el mismo nombre que las variables
  res.json({ anioNacimiento: anio, edad });
});

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use('/api', edadRoutes)
export default router;