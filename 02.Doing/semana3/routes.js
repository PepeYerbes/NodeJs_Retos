// Importa las funciones para responder en diferentes formatos (HTML, JSON, TXT).
const { responderHTML, responderJSON, responderTXT } = require('./utils/responses');
// Importa el módulo 'fs' para operaciones de archivos.
const fs = require('fs');
// Importa el módulo 'path' para manejar rutas de archivos.
const path = require('path');

/**
 * Función principal para manejar las rutas del servidor.
 * @param {IncomingMessage} req - Objeto de solicitud HTTP.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function manejarRutas(req, res) {
  // Extrae la URL y el método de la solicitud.
  const { url, method } = req;

  // Ruta principal: muestra menú de navegación.
  if (url === '/' && method === 'GET') {
    const content = `<h1>Bienvenido al servidor</h1>
      <p>Usa</p>
      <ul>
      <li><a href='/contacto'>Contacto</a></li>
      <li><a href='/conocenos'>Conócenos</a></li>
      <li><a href='/api'>API</a></li>
      </ul>
      `;
    responderHTML(res, content, 200);
  }
  // Ruta /contacto: muestra información de contacto.
  else if (url === '/contacto' && method === 'GET') {
    const content = `<h2>Contacto</h2><p>Escríbenos a contacto@industriaspatito.com</p>`;
    responderHTML(res, content, 200);
  }
  // Ruta /conocenos: muestra información sobre la empresa.
  else if (url === '/conocenos' && method === 'GET') {
    const content = `<h2>Conócenos</h2><p>Somos cool</p>`;
    responderHTML(res, content, 200);
  }
  // Ruta /api: responde con información en formato JSON.
  else if (url === '/api' && method === 'GET') {
    const datos = {
      nombre: 'Servidor de mi app cool',
      version: '1.0.0',
      autor: 'Dev Team',
      mensaje: 'Hola desde la API',
    };
    responderJSON(res, datos, 200);
  }
  // Ruta /equipo: responde con el contenido del archivo equipo.json en formato JSON.
  else if (url === '/equipo' && method === 'GET') {
    // Construye la ruta absoluta al archivo equipo.json.
    const archivo = path.join(__dirname, 'data', 'equipo.json');
    // Lee el archivo equipo.json de forma asíncrona.
    fs.readFile(archivo, 'utf8', (err, data) => {
      if (err) {
        // Si hay error al leer el archivo, responde con error 500 y mensaje en JSON.
        responderJSON(res, { error: 'Error al leer el archivo' }, 500);
      } else {
        // Si la lectura es exitosa, responde con el contenido del archivo en JSON.
        responderJSON(res, JSON.parse(data), 200);
      }
    });
  }
  // Ruta /equipo con método POST (a implementar).
  else if (url === '/equipo' && method === 'POST') {
    // Aquí se podría implementar la lógica para agregar un nuevo miembro al equipo.
  }
  // Cualquier otra ruta: responde con texto plano y error 404.
  else {
    responderTXT(res, 'Página no encontrada', 404);
  }
}

// Exporta la función manejarRutas para usarla en otros archivos.
module.exports = { manejarRutas };