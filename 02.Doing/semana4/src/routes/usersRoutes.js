/**
 * Router de Usuarios - Semana 4 (Node.js HTTP Nativo)
 *
 * Este módulo implementa un router personalizado para manejar rutas de usuarios
 * utilizando el módulo HTTP nativo de Node.js sin Express:
 * - GET /users - Obtener lista de todos los usuarios
 * - POST /users - Crear un nuevo usuario
 *
 * Características:
 * - Sistema de routing manual con condicionales
 * - Delegación a controladores específicos
 * - Retorno de false para rutas no manejadas
 * - Compatible con el sistema de middleware personalizado
 */

// Importa los controladores que manejan la lógica de negocio para usuarios
import { getUsers, addUser } from '../controllers/usersController.js';

/**
 * Router personalizado para manejar todas las rutas relacionadas con usuarios
 *
 * Esta función actúa como un mini-router que evalúa la ruta y método HTTP
 * para determinar si puede manejar la petición. Si encuentra una coincidencia,
 * delega al controlador apropiado; si no, retorna false.
 *
 * @function usersRouter
 * @param {IncomingMessage} req - Objeto de petición HTTP nativo de Node.js
 * @param {ServerResponse} res - Objeto de respuesta HTTP nativo de Node.js
 *
 * @returns {boolean|undefined} Retorna false si no maneja la ruta, undefined si la maneja
 *
 * Rutas manejadas:
 * - GET /users → Llama a getUsers()
 * - POST /users → Llama a addUser()
 *
 * @example
 * // Uso en el servidor principal
 * if (usersRouter(req, res) !== false) return;
 */
export function usersRouter(req, res) {

  // ===== RUTA: GET /users =====

  /**
   * Maneja peticiones GET para obtener la lista de usuarios
   * Ruta: GET /users
   * Controlador: getUsers
   */
  if (req.pathname === '/users' && req.method === 'GET') {
    // Delega al controlador getUsers para manejar la lógica de obtención
    // return termina la ejecución de la función después de procesar la petición
    return getUsers(req, res);
  }

  // ===== RUTA: POST /users =====

  /**
   * Maneja peticiones POST para crear un nuevo usuario
   * Ruta: POST /users
   * Controlador: addUser
   */
  if (req.pathname === '/users' && req.method === 'POST') {
    // Delega al controlador addUser para manejar la lógica de creación
    // return termina la ejecución de la función después de procesar la petición
    return addUser(req, res);
  }

  // ===== RUTA NO MANEJADA =====

  // Retorna false para indicar que este router no puede manejar la petición
  // Esto permite al servidor principal intentar con otros routers
  // Es fundamental para el sistema de delegación de rutas
  return false;
}