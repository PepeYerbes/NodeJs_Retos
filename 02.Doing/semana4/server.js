// Importa el módulo http de Node.js
import http from 'http';
import { parseQuery } from './src/middlewares/parseQuery.js';
import { logger } from './src/middlewares/logger.js';
import { usersRouter } from './src/routes/userRoutes.js';
import { loadData } from './src/storage.js';
import { productRouter } from './src/routes/productRoutes.js';

// Define el puerto en el que escuchará el servidor
const PORT = 3000;
await loadData();

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
  // Ignora la ruta /favicon.ico
  if (req.url === '/favicon.ico') {
    res.writeHead(204); // Sin contenido
    return res.end();
  }

  // Encadena los "middlewares" de forma manual
  logger(req, res, () => {
    parseQuery(req, res, () => {
      const { pathname, method, query } = req;
      // Solo responde a la raíz con parámetros

      if (pathname === '/' && method === 'GET') {
        // Si es admin y tiene nombre
        if (query.admin === 'true' && query.name) {
          return res.end('Welcome Admin ' + query.name + ' to your API');
          // Si no es admin pero tiene nombre
        } else if (query.name) {
          return res.end('Welcome ' + query.name);
        } else {
          return res.end(`Welcome! Agrega ?name=tu_nombre`);
        }
      }

      if (usersRouter(req, res) !== false) return;
      if (productRouter(req, res) !== false) return;

      // Si la ruta no es válida, responde 404
      res.statusCode = 404;
      res.end('404');

    });
  });
});

// Inicia el servidor y muestra un mensaje en consola
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});