import http from 'http';
import { logger } from './src/middlewares/logger.js';
import { parseQuery } from './src/middlewares/parseQuery.js';
import { usersRouter } from './src/routes/usersRoutes.js';
import { productsRouter } from './src/routes/productsRoutes.js';
import { loadData } from './src/storage.js';
import { productRouter } from './src/routes/productRoutes.js';

const PORT = 3000;

await loadData();

const server = http.createServer((req, res) => {
  logger(req, res, () => {
    parseQuery(req, res, () => {
      const { pathname, method, query } = req;

      if (pathname === '/' && method === 'GET') {
        if (query.name && query.admin === 'true') {
          return res.end(`Welcome Admin ${query.name} to your API`);
        }
        if (query.name) {
          return res.end(`Welcome ${query.name}`);
        }
        return res.end('Welcome! Agrega ?name=tu_nombre');
      }

      if (usersRouter(req, res) !== false) return;
      if (productRouter(req, res) !== false) return;

      // Si la ruta no es válida, responde 404
      res.statusCode = 404;
      res.end('404');

    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});