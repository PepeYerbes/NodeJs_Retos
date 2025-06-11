const { responderHTML,
  responderJSON,
  responderTXT } = require('./utils/responses');

function manejarRutas(req, res) {
  const { url, method } = req;

  if (url === "/" && method === 'GET') {
    responderHTML(res, "<h1>Bienvenido</h1>", 200);
  } else if (url === "/contacto" && method === 'GET') {
    responderHTML(res, "<h1>Contacto</h1>", 200);
  } else if (url === "/conocenos" && method === 'GET') {
    responderHTML(res, "<h1>Conocenos</h1>", 200);
  } else {
    responderTXT(res, "Pagina no encontrada", 404);
  }
}

module.exports = { manejarRutas };