// MIDDLEWARE PERSONALIZADO PARA LOGGING
// Un middleware es una función que se ejecuta entre la petición y la respuesta

/**
 * Middleware de logging para registrar todas las peticiones HTTP
 * @param {Object} req - Objeto de petición de Express (request)
 * @param {Object} res - Objeto de respuesta de Express (response)
 * @param {Function} next - Función para pasar al siguiente middleware
 */
export function logger(req, res, next) {
  // Obtener timestamp actual en formato ISO para mejor legibilidad
  const time = new Date().toISOString();

  // Registrar información de la petición en consola
  // Formato: [timestamp] MÉTODO URL
  console.log(`[${time}] ${req.method} ${req.url}`);

  // Llamar a next() para pasar el control al siguiente middleware
  // Sin esto, la petición se quedaría "colgada"
  next();
}

/*
NOTAS PARA ESTUDIANTES:
- Un middleware tiene acceso a req, res y next
- req.method contiene el método HTTP (GET, POST, PUT, DELETE)
- req.url contiene la URL completa de la petición
- next() es OBLIGATORIO para continuar con el flujo de la aplicación
- Este middleware se ejecuta ANTES de llegar a las rutas
- Útil para debugging y monitoreo de la aplicación
- Se puede extender para guardar logs en archivos o bases de datos
*/