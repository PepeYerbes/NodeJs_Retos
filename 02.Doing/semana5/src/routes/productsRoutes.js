/**
 * Rutas de Productos - Semana 5
 *
 * Este módulo define todas las rutas relacionadas con la gestión de productos:
 * - GET /api/products - Obtener lista de todos los productos
 * - POST /api/products - Crear un nuevo producto
 *
 * Características:
 * - CRUD básico para productos
 * - Validación de datos de entrada
 * - Logging automático de todas las peticiones
 * - Persistencia en archivos JSON
 */

// Importa Express para crear el enrutador
import express from 'express';

// Importa el middleware de logging personalizado para registrar peticiones
import { logger } from '../middlewares/logger.js';

// Importa las funciones controladoras que manejan la lógica de negocio
import { addProduct, getProducts } from '../controllers/productsController.js';

// Crea una instancia del enrutador de Express
// El router permite definir rutas modulares que luego se montan en la aplicación principal
const router = express.Router();

// ===== DEFINICIÓN DE RUTAS =====

/**
 * Ruta: GET /api/products
 * Propósito: Obtener la lista completa de productos disponibles
 * Middleware: logger - Registra la petición en consola
 * Controlador: getProducts - Retorna todos los productos desde storage
 *
 * Respuesta exitosa (200):
 * {
 *   [
 *     {
 *       "id": 1,
 *       "name": "Laptop Gaming",
 *       "price": 1299.99,
 *     }
 *   ],
 * }
 */
router.get('/products', logger, getProducts);

/**
 * Ruta: POST /api/products
 * Propósito: Crear un nuevo producto en el sistema
 * Middleware: logger - Registra la petición en consola
 * Controlador: addProduct - Procesa la creación del producto
 *
 * Body esperado:
 * {
 *   "name": "Mouse Gamer",
 *   "price": 79.99,
 * }
 *
 * Respuesta exitosa (201):
 * {
 *   {
 *     "name": "Mouse Gamer",
 *     "price": 79.99,
 *   },
 * }
 *
 * Errores posibles:
 * - 400: Datos de entrada inválidos (nombre requerido, precio inválido, etc.)
 * - 500: Error interno del servidor
 */
router.post('/products', logger, addProduct);

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use('/api', productsRoutes)
export default router;