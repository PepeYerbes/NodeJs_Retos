/**
 * Controlador de Productos - Semana 5
 *
 * Este módulo contiene todas las funciones controladoras para el manejo de productos:
 * - Obtención de lista de productos
 * - Creación de nuevos productos
 * - Manejo de almacenamiento y persistencia
 *
 * Características:
 * - Integración con sistema de storage en memoria
 * - Persistencia automática en archivos JSON
 * - Generación automática de IDs únicos
 * - Respuestas estructuradas en formato JSON
 */

// Importa el objeto storage para acceso a datos en memoria y la función saveData para persistencia
import storage, { saveData } from '../storage.js';

/**
 * Controlador para obtener todos los productos
 *
 * Maneja peticiones GET para recuperar la lista completa de productos desde el almacenamiento
 * en memoria. No requiere parámetros y retorna todos los productos disponibles.
 *
 * @function getProducts
 * @param {Object} req - Objeto Request de Express (no se utilizan parámetros en esta función)
 * @param {Object} res - Objeto Response de Express para enviar la respuesta al cliente
 *
 * @returns {Object} JSON con array de productos
 *
 * Respuesta exitosa (200):
 * [
 *   {
 *     'id': 1,
 *     'name': 'Laptop Gaming',
 *     'price': 1299.99,
 *   }
 * ]
 *
 * @example
 * // Uso en rutas
 * router.get('/products', getProducts);
 */
export function getProducts(req, res) {
  // Retorna directamente el array de productos desde storage en formato JSON
  // storage.products contiene todos los productos cargados en memoria
  // res.json() automáticamente establece Content-Type: application/json y status 200
  res.json(storage.products);
}

/**
 * Controlador para crear un nuevo producto
 *
 * Maneja peticiones POST para agregar un nuevo producto al sistema. Genera automáticamente
 * un ID único, agrega el producto al storage en memoria y persiste los cambios en el archivo JSON.
 *
 * @async
 * @function addProduct
 * @param {Object} req - Objeto Request de Express que contiene el producto en req.body
 * @param {Object} res - Objeto Response de Express para enviar la respuesta al cliente
 *
 * Estructura esperada en req.body:
 * {
 *   'name': 'Mouse Gamer',
 *   'price': 79.99,
 * }
 *
 * @returns {Object} JSON con mensaje de confirmación y datos del producto creado
 *
 * Respuesta exitosa (200):
 * {
 *   'id': 2,
 *   'name': 'Mouse Gamer',
 * }
 *
 * @throws {Error} Error de servidor si falla la persistencia en archivo
 *
 * @example
 * // Uso en rutas
 * router.post('/products', addProduct);
 */
export async function addProduct(req, res) {
  // Extrae los datos del producto desde el cuerpo de la petición
  // req.body contiene los datos JSON enviados por el cliente
  const product = req.body;

  // Genera un ID único para el nuevo producto
  // Si hay productos existentes: calcula el ID máximo y suma 1
  // Si no hay productos: asigna ID 1 como primer producto
  // Math.max() encuentra el valor más alto, ...spread operator expande el array
  product.id = storage.products.length ? Math.max(...storage.products.map(u => u.id)) + 1 : 1;

  // Agrega el nuevo producto al array de productos en memoria
  // storage.products es el array que mantiene todos los productos cargados
  storage.products.push(product);

  // Persiste los cambios escribiendo el array actualizado al archivo products.json
  // saveData() es una función asíncrona que guarda los datos en el sistema de archivos
  // Usar await asegura que la respuesta se envíe después de guardar exitosamente
  await saveData('products');

  // Retorna respuesta de confirmación con los datos del producto creado
  // Nota: Hay un error en el nombre de la propiedad, debería ser 'producto' no 'usuario'
  res.json({ message: 'Producto creado', usuario: product });
}