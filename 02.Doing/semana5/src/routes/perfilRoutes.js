/**
 * Rutas de Perfil de Usuario - Semana 5
 *
 * Este módulo define rutas para mostrar perfiles de usuario con soporte multiidioma:
 * - GET /perfil/:usuario?lang=idioma - Muestra el perfil del usuario con mensaje en el idioma especificado
 *
 * Características:
 * - Soporte para múltiples idiomas (español, francés, inglés por defecto)
 * - Parámetros de ruta dinámicos para el nombre de usuario
 * - Query parameters para selección de idioma
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
 * Ruta: GET /perfil/:usuario?lang=idioma
 * Propósito: Mostrar el perfil de usuario con mensaje de bienvenida en el idioma especificado
 * Middleware: logger - Registra la petición en consola
 *
 * Parámetros de ruta:
 * @param {string} usuario - Nombre del usuario cuyo perfil se va a mostrar
 *
 * Query parameters:
 * @param {string} lang - Idioma del mensaje ('es' para español, 'fr' para francés, default para inglés)
 *
 * Ejemplo de uso:
 * GET /perfil/rodrigo → 'Welcome rodrigo' (inglés por defecto)
 * GET /perfil/rodrigo?lang=es → 'Bienvenido rodrigo' (español)
 * GET /perfil/maria?lang=fr → 'Bienvenue maria' (francés)
 *
 * Respuesta exitosa (200):
 * {
 *   'mensaje': 'Bienvenido rodrigo',
 *   'language': 'es'
 * }
 */
router.get('/perfil/:usuario', logger, (req, res) => {
  // Extrae el parámetro 'usuario' de la URL usando destructuring
  // req.params contiene todos los parámetros de ruta definidos con ':'
  const { usuario } = req.params;

  // Extrae el query parameter 'lang' de la URL
  // req.query contiene todos los query parameters (?key=value)
  const lang = req.query.lang;

  // Establece el mensaje por defecto en inglés
  // Se usa como fallback cuando no se especifica idioma o el idioma no es soportado
  let mensaje = `Welcome ${usuario}`;

  // Verifica si el idioma solicitado es español
  // Cambia el mensaje a español usando template literals
  if (lang === 'es') {
    mensaje = `Bienvenido ${usuario}`;
  }

  // Verifica si el idioma solicitado es francés
  // Cambia el mensaje a francés usando template literals
  if (lang === 'fr') {
    mensaje = `Bienvenue ${usuario}`;
  }

  // Retorna la respuesta en formato JSON con:
  // - mensaje: El saludo personalizado en el idioma correspondiente
  // - language: El idioma usado (o 'default' si no se especificó)
  // El operador || proporciona 'default' como fallback si lang es undefined
  res.json({ mensaje, language: lang || 'default' });
});

// Exporta el router para que pueda ser importado y usado en server.js
// Se monta en la aplicación principal con app.use(perfilRoutes)
export default router;