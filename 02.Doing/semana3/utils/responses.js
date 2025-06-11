function responderHTML(res, contenido, code) {
  res.writeHead(code, { 'Content-Type': 'text/html' });
  res.end(contenido);
}

function responderJSON(res, contenido, code) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(contenido);
}

function responderTXT(res, contenido, code) {
  res.writeHead(code, { 'Content-Type': 'text/plain' });
  res.end(contenido);
}

module.exports = { responderHTML, responderJSON, responderTXT };