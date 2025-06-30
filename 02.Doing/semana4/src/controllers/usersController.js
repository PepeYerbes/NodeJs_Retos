/**
 * Controlador de Usuarios - Semana 4 (Node.js HTTP Nativo)
 *
 * Este módulo contiene todas las funciones controladoras para el manejo de usuarios
 * utilizando el módulo HTTP nativo de Node.js sin Express:
 * - Obtención de lista de usuarios
 * - Creación de nuevos usuarios
 * - Manejo manual de headers y códigos de estado
 * - Parsing manual del body de peticiones POST
 *
 * Características:
 * - Configuración manual de headers HTTP
 * - Manejo de streams para leer el body de peticiones
 * - Respuestas en formato JSON manual
 * - Integración con sistema de storage en memoria
 * - Persistencia automática en archivos JSON
 */

// Importa el objeto storage para acceso a datos en memoria y la función saveData para persistencia
import storage, { saveData } from '../storage.js';

/**
 * Controlador para obtener todos los usuarios
 *
 * Maneja peticiones GET para recuperar la lista completa de usuarios desde el almacenamiento
 * en memoria usando Node.js HTTP nativo. Configura manualmente los headers y códigos de estado.
 *
 * @function getUsers
 * @param {IncomingMessage} req - Objeto de petición HTTP nativo de Node.js
 * @param {ServerResponse} res - Objeto de respuesta HTTP nativo de Node.js
 *
 * @returns {void} Envía respuesta JSON directamente al cliente
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
 * // Uso en router
 * if (req.pathname === '/users' && req.method === 'GET') {
 *   return getUsers(req, res);
 * }
 */
export function getUsers(req, res) {
  // Establece manualmente el código de estado 200 (OK) y el header Content-Type
  // writeHead() es el método nativo para configurar la respuesta HTTP
  // Content-Type: application/json indica que el contenido es JSON
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Convierte el array de usuarios a JSON y termina la respuesta
  // JSON.stringify() convierte el objeto JavaScript a string JSON
  // res.end() envía la respuesta y cierra la conexión HTTP
  res.end(JSON.stringify(storage.users));
}

/**
 * Controlador para crear un nuevo usuario
 *
 * Maneja peticiones POST para agregar un nuevo usuario al sistema usando Node.js HTTP nativo.
 * Lee manualmente el body de la petición usando streams, genera un ID único y persiste los datos.
 *
 * @async
 * @function addUser
 * @param {IncomingMessage} req - Objeto de petición HTTP nativo de Node.js
 * @param {ServerResponse} res - Objeto de respuesta HTTP nativo de Node.js
 *
 * @returns {void} Envía respuesta JSON directamente al cliente
 *
 * Body esperado:
 * {
 *   "name": "María García",
 * }
 *
 * Respuesta exitosa (201):
 * {
 *   "id": 2,
 *   "name": "María García",
 * }
 *
 * @example
 * // Uso en router
 * if (req.pathname === '/users' && req.method === 'POST') {
 *   return addUser(req, res);
 * }
 */
export async function addUser(req, res) {
  // Inicializa variable para acumular los datos del body
  // En Node.js HTTP nativo, el body llega como stream de chunks
  let body = '';

  // Event listener para el evento 'data' que se dispara con cada chunk recibido
  // chunk contiene una porción de los datos enviados en el body
  // Se concatenan todos los chunks para formar el body completo
  req.on('data', chunk => (body += chunk));

  // Event listener para el evento 'end' que se dispara cuando se recibe todo el body
  // Este es el momento donde se puede procesar la información completa
  req.on('end', async () => {

    // Parsea el JSON del body completo a objeto JavaScript
    // body contiene el string JSON enviado por el cliente
    const user = JSON.parse(body);

    // Genera un ID único para el nuevo usuario
    // Si hay usuarios existentes: calcula el ID máximo y suma 1
    // Si no hay usuarios: asigna ID 1 como primer usuario
    // Math.max() encuentra el valor más alto, ...spread operator expande el array
    user.id = storage.users.length ? Math.max(...storage.users.map(u => u.id)) + 1 : 1;

    // Agrega el nuevo usuario al array de usuarios en memoria
    // storage.users es el array que mantiene todos los usuarios cargados
    storage.users.push(user);

    // Persiste los cambios escribiendo el array actualizado al archivo users.json
    // saveData() es una función asíncrona que guarda los datos en el sistema de archivos
    // await asegura que la respuesta se envíe después de guardar exitosamente
    await saveData('users');

    // Establece código 201 (Created) y Content-Type para respuesta de creación exitosa
    // 201 es el código HTTP estándar para recursos creados exitosamente
    res.writeHead(201, { 'Content-Type': 'application/json' });

    // Envía la respuesta de confirmación con el usuario creado
    // Incluye mensaje descriptivo y el objeto usuario completo con su nuevo ID
    res.end(JSON.stringify({ message: 'Usuario creado', usuario: user }));
  });
}