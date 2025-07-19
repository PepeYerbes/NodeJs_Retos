function contarPropiedades(req, res) {
const objeto = req.body;
const detallado = req.query.detallado === 'true';

if (!objeto || typeof objeto !== 'object' || Array.isArray(objeto)) {
    return res.status(400).json({ error: 'El cuerpo debe ser un objeto JSON válido.' });
}

const claves = Object.keys(objeto);
const respuesta = {
    propiedades: claves.length
};

if (detallado) {
    respuesta.detalles = claves;
}

res.json(respuesta);
}

module.exports = {
contarPropiedades
};
