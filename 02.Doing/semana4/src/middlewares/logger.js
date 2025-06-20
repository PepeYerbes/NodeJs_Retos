// Middleware para registrar la solicitud y guardar la fecha/hora en req
export function logger(req, res, next) {
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