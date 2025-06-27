/**
 * Sistema de Almacenamiento de Datos - Semana 5
 *
 * Este módulo maneja la persistencia de datos en archivos JSON proporcionando:
 * - Almacenamiento en memoria para acceso rápido
 * - Funciones para cargar datos desde archivos JSON
 * - Funciones para guardar datos en archivos JSON
 * - Validación de tipos de datos soportados
 * - Gestión automática de rutas de archivos
 */

// Importa el módulo fs/promises para operaciones asíncronas con el sistema de archivos
import fs from 'fs/promises';

// Importa el módulo path para manejar rutas de archivos de forma multiplataforma
import path from 'path';

// Define la ruta del directorio donde se almacenan los archivos JSON de datos
// path.resolve() convierte la ruta relativa en una ruta absoluta
const dataDir = path.resolve('src/data');

/**
 * Objeto de almacenamiento en memoria que actúa como cache
 * Contiene todos los datos cargados desde los archivos JSON para acceso rápido
 *
 * Estructura:
 * - users: Array de objetos usuario
 * - products: Array de objetos producto
 */
const storage = {
  users: [],      // Array que almacena todos los usuarios en memoria
  products: []    // Array que almacena todos los productos en memoria
};

/**
 * Carga los datos iniciales desde los archivos JSON al storage en memoria
 *
 * Esta función se ejecuta al iniciar el servidor para:
 * - Leer los archivos users.json y products.json
 * - Parsear el contenido JSON a objetos JavaScript
 * - Almacenar los datos en el objeto storage para acceso rápido
 *
 * @async
 * @function loadData
 * @throws {Error} Si los archivos no existen o tienen formato JSON inválido
 *
 * @example
 * // Cargar datos al iniciar el servidor
 * await loadData();
 */
export async function loadData() {
  // Lee el archivo users.json, lo parsea y almacena en storage.users
  // fs.readFile() lee el archivo como string, JSON.parse() lo convierte a objeto
  storage.users = JSON.parse(await fs.readFile(path.join(dataDir, 'users.json'), 'utf-8'));

  // Lee el archivo products.json, lo parsea y almacena en storage.products
  storage.products = JSON.parse(await fs.readFile(path.join(dataDir, 'products.json'), 'utf-8'));
}

/**
 * Guarda los datos del storage en memoria a un archivo JSON específico
 *
 * Esta función se ejecuta después de modificar datos para:
 * - Convertir los datos de memoria a formato JSON
 * - Escribir los datos al archivo correspondiente
 * - Mantener la persistencia de los cambios
 *
 * @async
 * @function saveData
 * @param {string} type - Tipo de datos a guardar ('users' o 'products')
 * @throws {Error} Si el tipo proporcionado no es válido
 *
 * @example
 * // Guardar usuarios después de agregar uno nuevo
 * await saveData('users');
 *
 * @example
 * // Guardar productos después de una actualización
 * await saveData('products');
 */
export async function saveData(type) {
  // Valida que el tipo sea uno de los soportados
  if (!['users', 'products'].includes(type)) {
    throw new Error('Invalid type');
  }

  // Escribe los datos al archivo JSON correspondiente
  // JSON.stringify() con parámetros (data, replacer, space):
  // - storage[type]: datos a convertir
  // - null: no usar función replacer
  // - 2: indentar con 2 espacios para legibilidad
  await fs.writeFile(
    path.join(dataDir, `${type}.json`),           // Ruta del archivo destino
    JSON.stringify(storage[type], null, 2)        // Datos convertidos a JSON formateado
  );
}

// Exporta el objeto storage como exportación por defecto
// Permite importarlo con: import storage from './storage.js'
export default storage;