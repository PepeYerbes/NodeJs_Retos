/**
 * Servidor HTTP con Node.js Nativo - Semana 4
 *
 * Este servidor implementa una API REST utilizando el módulo HTTP nativo de Node.js sin Express:
 * - Sistema de routing manual para múltiples endpoints
 * - Middleware personalizado para logging y parsing de query parameters
 * - Sistema de almacenamiento en archivos JSON
 * - Endpoints para usuarios y productos
 * - Ruta principal con detección de administrador
 *
 * Diferencias con Express:
 * - Manejo manual de rutas y métodos HTTP
 * - Parsing manual de URL y query parameters
 * - Configuración manual de headers y códigos de estado
 */

// Importa el módulo HTTP nativo de Node.js para crear el servidor
import http from 'http';

// Importa el middleware personalizado para registrar peticiones en consola
import { logger } from './src/middlewares/logger.js';

// Importa el middleware para parsear automáticamente query parameters de la URL
import { parseQuery } from './src/middlewares/parseQuery.js';

// Importa los routers personalizados que manejan rutas específicas
import { usersRouter } from './src/routes/usersRoutes.js';      // Maneja /users/*
import { productsRouter } from './src/routes/productsRoutes.js'; // Maneja /products/*

// Importa la función para cargar datos iniciales desde archivos JSON
import { loadData } from './src/storage.js';

// Define el puerto donde el servidor escuchará las peticiones
const PORT = 3000;

// Carga los datos iniciales desde archivos JSON antes de iniciar el servidor
// Utiliza await porque loadData() es una función asíncrona que lee archivos
await loadData();

/**
 * Crea el servidor HTTP usando el módulo nativo de Node.js
 * El callback se ejecuta para cada petición HTTP recibida
 *
 * @param {IncomingMessage} req - Objeto de petición HTTP nativo de Node.js
 * @param {ServerResponse} res - Objeto de respuesta HTTP nativo de Node.js
 */
const server = http.createServer((req, res) => {
  // Aplica el middleware de logging como primera capa
  // Registra información de cada petición en la consola
  logger(req, res, () => {

    // Aplica el middleware de parsing de query parameters
    // Extrae y procesa los query parameters (?key=value) de la URL
    parseQuery(req, res, () => {

      // Extrae propiedades importantes del objeto request usando destructuring
      // pathname: ruta de la URL sin query parameters (/users, /products, etc.)
      // method: método HTTP (GET, POST, PUT, DELETE)
      // query: objeto con query parameters parseados por el middleware
      const { pathname, method, query } = req;

      // ===== RUTA PRINCIPAL (HOME) =====

      /**
       * Maneja la ruta raíz con detección de administrador
       * Rutas: GET /?name=usuario&admin=true/false
       */
      if (pathname === '/' && method === 'GET') {

        // Verifica si es un administrador (tiene name y admin=true)
        if (query.name && query.admin === 'true') {
          // Respuesta especial para administradores
          return res.end(`Welcome Admin ${query.name} to your API`);
        }

        // Verifica si solo tiene nombre (usuario normal)
        if (query.name) {
          // Saludo personalizado para usuarios normales
          return res.end(`Welcome ${query.name}`);
        }

        // Respuesta por defecto cuando no hay query parameters
        return res.end('Welcome! Agrega ?name=tu_nombre');
      }

      // ===== DELEGACIÓN A ROUTERS ESPECÍFICOS =====

      // Intenta manejar la petición con el router de usuarios
      // Si usersRouter maneja la petición, retorna un valor diferente a false
      // El return termina la ejecución y evita continuar con otros routers
      if (usersRouter(req, res) !== false) return;

      // Intenta manejar la petición con el router de productos
      // Solo se ejecuta si usersRouter no manejó la petición
      if (productsRouter(req, res) !== false) return;

      // ===== MANEJO DE RUTAS NO ENCONTRADAS =====

      // Si ningún router manejó la petición, retorna error 404
      // writeHead() establece el código de estado y headers manualmente
      res.writeHead(404, { 'Content-Type': 'text/plain' });

      // Termina la respuesta con mensaje de error
      res.end('Ruta no encontrada');
    });
  });
});

// ===== INICIO DEL SERVIDOR =====

/**
 * Inicia el servidor en el puerto especificado
 * El callback se ejecuta cuando el servidor está listo para recibir peticiones
 */
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});