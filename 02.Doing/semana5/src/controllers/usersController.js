/**
 * Controlador de Usuarios - Semana 5
 *
 * Este módulo contiene todas las funciones controladoras para el manejo de usuarios:
 * - Obtención de lista de usuarios
 * - Creación de nuevos usuarios
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
 * Controlador para obtener todos los usuarios
 *
 * Maneja peticiones GET para recuperar la lista completa de usuarios desde el almacenamiento
 * en memoria. No requiere parámetros y retorna todos los usuarios disponibles.
 *
 * @function getUsers
 * @param {Object} req - Objeto Request de Express (no se utilizan parámetros en esta función)
 * @param {Object} res - Objeto Response de Express para enviar la respuesta al cliente
 *
 * @returns {Object} JSON con array de usuarios
 *
 * Respuesta exitosa (200):
 * [
 *   {
 *     "id": 1,
 *     "name": "Juan Pérez",
 *   }
 * ]
 *
 * @example
 * // Uso en rutas
 * router.get('/users', getUsers);
 */
export function getUsers(req, res) {
  // Retorna directamente el array de usuarios desde storage en formato JSON
  // storage.users contiene todos los usuarios cargados en memoria
  // res.json() automáticamente establece Content-Type: application/json y status 200
  res.json(storage.users);
}

/**
 * Controlador para crear un nuevo usuario
 *
 * Maneja peticiones POST para agregar un nuevo usuario al sistema. Genera automáticamente
 * un ID único, agrega el usuario al storage en memoria y persiste los cambios en el archivo JSON.
 *
 * @async
 * @function addUser
 * @param {Object} req - Objeto Request de Express que contiene el usuario en req.body
 * @param {Object} res - Objeto Response de Express para enviar la respuesta al cliente
 *
 * Estructura esperada en req.body:
 * {
 *   "name": "María García",
 * }
 *
 * @returns {Object} JSON con mensaje de confirmación y datos del usuario creado
 *
 * Respuesta exitosa (200):
 * {
 *   {
 *     "name": "María García",
 *   }
 * }
 *
 * @throws {Error} Error de servidor si falla la persistencia en archivo
 *
 * @example
 * // Uso en rutas
 * router.post('/users', addUser);
 */
export async function addUser(req, res) {
  // Extrae los datos del usuario desde el cuerpo de la petición
  // req.body contiene los datos JSON enviados por el cliente
  const user = req.body;

  // Genera un ID único para el nuevo usuario
  // Si hay usuarios existentes: calcula el ID máximo y suma 1
  // Si no hay usuarios: asigna ID 1 como primer usuario
  // Math.max() encuentra el valor más alto, ...spread operator expande el array
  // .map(u => u.id) extrae solo los IDs de todos los usuarios
  user.id = storage.users.length ? Math.max(...storage.users.map(u => u.id)) + 1 : 1;

  // Agrega el nuevo usuario al array de usuarios en memoria
  // storage.users es el array que mantiene todos los usuarios cargados
  storage.users.push(user);

  // Persiste los cambios escribiendo el array actualizado al archivo users.json
  // saveData() es una función asíncrona que guarda los datos en el sistema de archivos
  // Usar await asegura que la respuesta se envíe después de guardar exitosamente
  await saveData('users');

  // Retorna respuesta de confirmación con los datos del usuario creado
  // Incluye mensaje descriptivo y el objeto usuario completo con su nuevo ID
  res.json({ message: 'Usuario creado', usuario: user });
}