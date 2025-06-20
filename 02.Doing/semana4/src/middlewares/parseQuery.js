// Middleware para validar parámetros

export function parseQuery(req, res, next) {
  // Parsea la URL de la solicitud
  const url = new URL(req.url, `http://${req.headers.host}`);
  req.query = Object.fromEntries(url.searchParams.entries());
  req.pathname = url.pathname;
  next();
}
