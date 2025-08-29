/**
 * Cuenta las propiedades de un objeto
 * @param {Object} objeto - Objeto a analizar
 * @returns {Object} Resultado con el conteo de propiedades
 */
function contarPropiedades(objeto) {
  // Verificar que no sea null, que sea objeto y no array
  if (!objeto || typeof objeto !== "object" || Array.isArray(objeto)) {
    throw new Error("Debe enviar un objeto válido (no array, no null)");
  }

  // Contar las propiedades usando Object.keys()
  const propiedades = Object.keys(objeto);
  const cantidad = propiedades.length;

  return {
    cantidad,
    propiedades
  };
}

/**
 * Controlador para la ruta POST /contar
 */
const contar = (req, res) => {
  try {
    // Verificar que se haya enviado un body
    if (!req.body) {
      return res.status(400).json({
        error: "Debe enviar un objeto en el body de la petición"
      });
    }

    const objeto = req.body;
    const resultado = contarPropiedades(objeto);

    // Verificar si se solicita información detallada
    const detallado = req.query.detallado === 'true';

    let respuesta = {
      propiedades: resultado.cantidad
    };

    // Agregar detalles si se solicita
    if (detallado) {
      respuesta.detalles = resultado.propiedades;
    }

    res.status(200).json(respuesta);

  } catch (error) {
    res.status(400).json({
      error: error.message,
      ejemplo: {
        "nombre": "Ana",
        "edad": 25,
        "correo": "ana@example.com"
      }
    });
  }
};

module.exports = {
  contar,
  contarPropiedades
};