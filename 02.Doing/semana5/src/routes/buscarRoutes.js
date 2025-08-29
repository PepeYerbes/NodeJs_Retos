/**
 * Rutas de Búsqueda - Semana 5
 *
 * Este módulo define rutas para realizar búsquedas de productos con filtros:
 * - GET /api/buscar?producto=nombre&categoria=tipo - Busca productos por nombre y categoría
 *
 * Características:
 * - Búsqueda con múltiples query parameters
 * - Validación de parámetros requeridos
 * - Logging automático de búsquedas
 * - Respuestas estructuradas con información de búsqueda
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
 * Ruta: GET /api/buscar?producto=nombre&categoria=tipo
 * Propósito: Realizar búsqueda de productos filtrada por nombre y categoría
 * Middleware: logger - Registra la petición en consola
 *
 * Query parameters (ambos requeridos):
 * @param {string} producto - Nombre o término de búsqueda del producto
 * @param {string} categoria - Categoría donde buscar el producto
 *
 * Ejemplo de uso:
 * GET /api/buscar?producto=teclado&categoria=hardware
 * GET /api/buscar?producto=mouse&categoria=electronics
 * GET /api/buscar?producto=silla&categoria=furniture
 *
 * Respuesta exitosa (200):
 * {
 *   'busqueda': 'teclado',
 *   'categoria': 'hardware',
 *   'mensaje': 'Buscando teclado en la categoría hardware...'
 * }
 *
 * Respuesta de error (400):
 * {
 *   'error': 'Faltan parámetros en la ruta'
 * }
 */
router.get('/buscar', logger, (req, res) => {
  // Extrae los query parameters 'producto' y 'categoria' usando destructuring
  // req.query contiene todos los query parameters de la URL (?key=value&key2=value2)
  const { producto, categoria } = req.query;

  // Debug: Imprime todos los query parameters recibidos en la consola
  // Útil para desarrollo y depuración de la aplicación
  console.log(req.query);

  // Valida que ambos parámetros requeridos estén presentes
  // !producto es true cuando producto es undefined, null, o string vacío
  // !categoria es true cuando categoria es undefined, null, o string vacío
  if (!producto || !categoria) {
    // Retorna error 400 (Bad Request) cuando faltan parámetros obligatorios
    return res.status(400).json({ error: 'Faltan parámetros en la ruta' });
  }

  // Retorna la respuesta exitosa con información estructurada de la búsqueda
  // Incluye los términos de búsqueda y un mensaje descriptivo
  res.json({
    busqueda: producto,                                           // Término de búsqueda del producto
    categoria,                                                    // Categoría especificada (shorthand property)
    mensaje: `Buscando ${producto} en la categoría ${categoria}...`  // Mensaje descriptivo usando template literals
  });
});

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use('/api', buscarRoutes)
export default router;