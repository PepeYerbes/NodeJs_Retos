/**
 * Rutas de Operaciones Matemáticas - Suma - Semana 5
 *
 * Este módulo define rutas para realizar operaciones matemáticas básicas:
 * - GET /suma/:a/:b - Realiza la suma de dos números proporcionados como parámetros de ruta
 *
 * Características:
 * - Validación automática de parámetros numéricos
 * - Manejo de errores para valores no numéricos
 * - Logging de todas las operaciones realizadas
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
 * Ruta: GET /suma/:a/:b
 * Propósito: Realizar la suma de dos números proporcionados como parámetros de URL
 * Middleware: logger - Registra la petición en consola
 *
 * Parámetros de ruta:
 * @param {string} a - Primer número a sumar (se convierte automáticamente)
 * @param {string} b - Segundo número a sumar (se convierte automáticamente)
 *
 * Ejemplo de uso:
 * GET /suma/5/3 → Resultado: 8
 * GET /suma/10.5/2.5 → Resultado: 13
 *
 * Respuesta exitosa (200):
 * {
 *   "resultado": 8
 * }
 *
 * Respuesta de error (400):
 * {
 *   "error": "Parámetros inválidos"
 * }
 */
router.get('/suma/:a/:b', logger, (req, res) => {
  // Extrae los parámetros 'a' y 'b' de la URL usando destructuring
  // req.params contiene todos los parámetros de ruta definidos con ':'
  const { a, b } = req.params;

  // Convierte los parámetros string a números y realiza la suma
  // Number() convierte strings a números, incluyendo decimales
  const suma = Number(a) + Number(b);

  // Valida que el resultado sea un número válido
  // isNaN() retorna true si el valor no es un número válido
  // Esto ocurre cuando los parámetros no pueden convertirse a números
  if (isNaN(suma)) {
    // Retorna error 400 (Bad Request) si los parámetros no son válidos
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  // Retorna el resultado de la suma en formato JSON
  // Status 200 (OK) se envía automáticamente si no se especifica otro
  res.json({ resultado: suma });
});

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use(sumaRoutes)
export default router;