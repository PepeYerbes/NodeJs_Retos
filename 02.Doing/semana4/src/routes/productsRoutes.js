/**
 * Router de Productos - Semana 4 (Node.js HTTP Nativo)
 *
 * Este módulo implementa un router personalizado para manejar rutas de productos
 * utilizando el módulo HTTP nativo de Node.js sin Express:
 * - GET /products - Obtener lista de todos los productos
 * - POST /products - Crear un nuevo producto
 *
 * Características:
 * - Sistema de routing manual con condicionales
 * - Delegación a controladores específicos
 * - Retorno de false para rutas no manejadas
 * - Compatible con el sistema de middleware personalizado
 */

// Importa los controladores que manejan la lógica de negocio para productos
import { getProducts, addProduct } from '../controllers/productsController.js';

/**
 * Router personalizado para manejar todas las rutas relacionadas con productos
 *
 * Esta función actúa como un mini-router que evalúa la ruta y método HTTP
 * para determinar si puede manejar la petición. Si encuentra una coincidencia,
 * delega al controlador apropiado; si no, retorna false.
 *
 * @function productsRouter
 * @param {IncomingMessage} req - Objeto de petición HTTP nativo de Node.js
 * @param {ServerResponse} res - Objeto de respuesta HTTP nativo de Node.js
 *
 * @returns {boolean|undefined} Retorna false si no maneja la ruta, undefined si la maneja
 *
 * Rutas manejadas:
 * - GET /products → Llama a getProducts()
 * - POST /products → Llama a addProduct()
 *
 * @example
 * // Uso en el servidor principal
 * if (productsRouter(req, res) !== false) return;
 */
export function productsRouter(req, res) {

  // ===== RUTA: GET /products =====

  /**
   * Maneja peticiones GET para obtener la lista de productos
   * Ruta: GET /products
   * Controlador: getProducts
   */
  if (req.pathname === '/products' && req.method === 'GET') {
    // Delega al controlador getProducts para manejar la lógica de obtención
    // return termina la ejecución de la función después de procesar la petición
    return getProducts(req, res);
  }

  // ===== RUTA: POST /products =====

  /**
   * Maneja peticiones POST para crear un nuevo producto
   * Ruta: POST /products
   * Controlador: addProduct
   */
  if (req.pathname === '/products' && req.method === 'POST') {
    // Delega al controlador addProduct para manejar la lógica de creación
    // return termina la ejecución de la función después de procesar la petición
    return addProduct(req, res);
  }

  // ===== RUTA NO MANEJADA =====

  // Retorna false para indicar que este router no puede manejar la petición
  // Esto permite al servidor principal intentar con otros routers
  // Es fundamental para el sistema de delegación de rutas
  return false;
}