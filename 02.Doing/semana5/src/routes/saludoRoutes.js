/**
 * Rutas de Saludo Personalizado - Semana 5
 *
 * Este módulo define rutas para generar saludos personalizados:
 * - GET /saludo/:nombre - Genera un saludo personalizado usando el nombre proporcionado
 *
 * Características:
 * - Saludo dinámico basado en parámetros de ruta
 * - Respuesta en formato JSON
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
 * Ruta: GET /saludo/:nombre
 * Propósito: Generar un saludo personalizado usando el nombre proporcionado como parámetro
 * Middleware: logger - Registra la petición en consola
 *
 * Parámetros de ruta:
 * @param {string} nombre - Nombre de la persona a saludar
 *
 * Ejemplo de uso:
 * GET /saludo/Rodrigo → "Hola Rodrigo!"
 * GET /saludo/María → "Hola María!"
 * GET /saludo/Juan%20Carlos → "Hola Juan Carlos!" (URL encoded)
 *
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Hola Rodrigo!"
 * }
 */
router.get('/saludo/:nombre', logger, (req, res) => {
  // Extrae el parámetro 'nombre' de la URL usando destructuring
  // req.params contiene todos los parámetros de ruta definidos con ':'
  const { nombre } = req.params;

  // Genera el mensaje de saludo personalizado usando template literals
  // Template literals permiten interpolación de variables con ${variable}
  // Retorna el saludo en formato JSON con status 200 (OK) automático
  res.json({ mensaje: `Hola ${nombre}!` });
});

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use(saludoRoutes)
export default router;