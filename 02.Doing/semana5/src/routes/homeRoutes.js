/**
 * Rutas Principales (Home) - Semana 5
 *
 * Este módulo define rutas principales con funcionalidad de detección de administrador:
 * - GET /:name?isAdmin=true/false - Saluda al usuario y detecta si es administrador
 *
 * Características:
 * - Parámetro dinámico para el nombre del usuario
 * - Query parameter para detectar privilegios de administrador
 * - Respuestas diferenciadas según el tipo de usuario
 * - Logging automático de todas las peticiones
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
 * Ruta: GET /:name?isAdmin=true/false
 * Propósito: Saluda al usuario y proporciona acceso diferenciado según sus privilegios
 * Middleware: logger - Registra la petición en consola
 *
 * Parámetros de ruta:
 * @param {string} name - Nombre del usuario que accede a la aplicación
 *
 * Query parameters:
 * @param {string} isAdmin - Indica si el usuario tiene privilegios de administrador ('true' o cualquier otro valor)
 *
 * Ejemplo de uso:
 * GET /rodrigo → 'HOLA rodrigo' (usuario normal)
 * GET /rodrigo?isAdmin=true → 'Hola rodrigo eres admin' (administrador)
 * GET /maria?isAdmin=false → 'HOLA maria' (usuario normal)
 *
 * Respuesta de administrador (200):
 * 'Hola rodrigo eres admin'
 *
 * Respuesta de usuario normal (200):
 * 'HOLArodrigo'
 */
router.get('/:name', logger, (req, res) => {
  // Verifica si el query parameter 'isAdmin' tiene el valor exacto 'true'
  // La comparación es estricta, cualquier otro valor se considera como usuario normal
  if (req.query.isAdmin === 'true') {
    // Respuesta para usuarios administradores
    // Usa template literals para interpolación y formato más amigable
    res.send(`Hola ${req.params.name} eres admin`);
  } else {
    // Respuesta para usuarios normales
    // Usa concatenación directa con formato en mayúsculas para diferenciación
    res.send('HOLA ' + req.params.name);
  }
});

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use(homeRoutes)
export default router;