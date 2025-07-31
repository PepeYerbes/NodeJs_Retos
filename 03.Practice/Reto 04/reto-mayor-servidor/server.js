const http = require('http');
const url = require('url');
const encontrarMayor = require('./utils/encontrarMayor');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Configurar headers para JSON
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Parsear la URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Verificar que sea GET y la ruta correcta
  if (req.method === 'GET' && pathname === '/mayor') {
    try {
      // Validar que existe el query param 'numeros'
      if (!query.numeros) {
        res.statusCode = 400;
        res.end(JSON.stringify({
          error: 'Parámetro "numeros" es requerido',
          ejemplo: 'GET /mayor?numeros=5,3,9,1'
        }));
        return;
      }

      // Separar los números y convertirlos
      const numerosString = query.numeros.split(',');
      const numeros = numerosString.map(num => {
        const numero = Number(num.trim());
        if (isNaN(numero)) {
          throw new Error(`"${num.trim()}" no es un número válido`);
        }
        return numero;
      });

      // Encontrar el mayor
      const mayor = encontrarMayor(numeros);

      // Respuesta exitosa
      res.statusCode = 200;
      res.end(JSON.stringify({
        numeros: numeros,
        mayor: mayor
      }));

    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({
        error: error.message,
        ejemplo: 'GET /mayor?numeros=5,3,9,1'
      }));
    }
  } else {
    // Ruta no encontrada
    res.statusCode = 404;
    res.end(JSON.stringify({
      error: 'Ruta no encontrada',
      rutas_disponibles: ['GET /mayor?numeros=5,3,9,1']
    }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Prueba con: http://localhost:${PORT}/mayor?numeros=5,3,9,1`);
});