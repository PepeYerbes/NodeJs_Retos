// Importa el módulo http de Node.js
const http = require('http');
// Define el puerto en el que escuchará el servidor
const PORT = 3000;

// Middleware para registrar la solicitud y guardar la fecha/hora en req
function logEvent(req, res, next) {
  // Obtiene la fecha y hora actual
  const dateTime = new Date();
  // Formatea la fecha
  const fecha = dateTime.toLocaleDateString();
  // Formatea la hora
  const hora = dateTime.toLocaleTimeString();
  // Imprime en consola la fecha, hora y URL solicitada
  console.log(`${fecha}-${hora} | Solicitud a ${req.url}`);
  // Guarda la fecha/hora en el objeto req
  req.dateTime = dateTime;
  // Llama al siguiente middleware
  next();
}

// Middleware para validar que venga el parámetro name
function validarNombre(req, res, next) {
  // Parsea la URL de la solicitud
  const url = new URL(req.url, `http://${req.headers.host}`);
  // Obtiene el parámetro 'name' de la query
  const nombre = url.searchParams.get('name');
  // Si existe, lo guarda en req
  if (nombre) { req.nombre = nombre; }
  // Llama al siguiente middleware
  next();
}

// Middleware para validar el parámetro admin
function isAdmin(req, res, next) {
  // Parsea la URL de la solicitud
  const url = new URL(req.url, `http://${req.headers.host}`);
  // Obtiene el parámetro 'admin' de la query
  const admin = url.searchParams.get('admin');
  // Si existe, lo guarda en req como booleano
  if (admin) { req.admin = (admin === 'true'); }
  // Llama al siguiente middleware
  next();
}

// Función para medir el tiempo de respuesta
function medirTiempo(beginDate, endDate) {
  // Retorna la diferencia en milisegundos
  return endDate - beginDate;
}

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
  // Ignora la ruta /favicon.ico
  if (req.url === '/favicon.ico') {
    res.writeHead(204); // Sin contenido
    return res.end();
  }

  // Encadena los "middlewares" de forma manual
  logEvent(req, res, () => {
    validarNombre(req, res, () => {
      isAdmin(req, res, () => {
        // Solo responde a la raíz con parámetros
        if (req.url.startsWith('/?')) {
          // Si es admin y tiene nombre
          if (req.admin && req.nombre) {
            res.end('Welcome Admin ' + req.nombre + ' to your API');
            // Si no es admin pero tiene nombre
          } else if (!req.admin && req.nombre) {
            res.end('Welcome ' + req.nombre);
          }
        } else {
          // Si la ruta no es válida, responde 404
          res.statusCode = 404;
          res.end('404');
        }
        // Muestra el tiempo de respuesta en consola
        console.log(`⏱️ Tiempo de respuesta: ${medirTiempo(req.dateTime, new Date())} ms`);
      });
    });
  });
});

// Inicia el servidor y muestra un mensaje en consola
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});