/**
 * Rutas de Usuarios - Semana 5
 *
 * Este módulo define todas las rutas relacionadas con la gestión de usuarios:
 * - GET /api/users - Obtener lista de todos los usuarios
 * - POST /api/users - Crear un nuevo usuario
 *
 * Todas las rutas incluyen middleware de logging para monitoreo
 */

// Importa Express para crear el enrutador
import express from 'express';

// Importa el middleware de logging personalizado para registrar peticiones
import { logger } from '../middlewares/logger.js';

// Importa las funciones controladoras que manejan la lógica de negocio
import { addUser, getUsers } from '../controllers/usersController.js';

// Crea una instancia del enrutador de Express
// El router permite definir rutas modulares que luego se montan en la aplicación principal
const router = express.Router();

// ===== DEFINICIÓN DE RUTAS =====

/**
 * Ruta: GET /api/users
 * Propósito: Obtener la lista completa de usuarios
 * Middleware: logger - Registra la petición en consola
 * Controlador: getUsers - Retorna todos los usuarios desde storage
 *
 * Respuesta exitosa (200):
 * {
 *   [
 *     "id": 1,
 *     "name": "Juan Pérez",
 *   ],
 * }
 */
router.get('/users', logger, getUsers);

/**
 * Ruta: POST /api/users
 * Propósito: Crear un nuevo usuario en el sistema
 * Middleware: logger - Registra la petición en consola
 * Controlador: addUser - Procesa la creación del usuario
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
 * },
 *
 * Errores posibles:
 * - 400: Datos de entrada inválidos
 * - 500: Error interno del servidor
 */
router.post('/users', logger, addUser);

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use('/api', usersRoutes)
export default router;