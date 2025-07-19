const estudiantes = require('../data/estudiantes');
const cursos = require('../data/cursos');
const calificaciones = require('../data/calificaciones');

const obtenerCalificaciones = (req, res) => {
try {
// Mapeamos cada calificación para combinarla con datos de estudiante y curso
const resultado = calificaciones.map(calificacion => {
// Buscamos el estudiante correspondiente
const estudiante = estudiantes.find(e => e.id === calificacion.estudianteId);
if (!estudiante) {
throw new Error(`Estudiante con ID ${calificacion.estudianteId} no encontrado`);
}

// Buscamos el curso correspondiente
const curso = cursos.find(c => c.id === calificacion.cursoId);
if (!curso) {
throw new Error(`Curso con ID ${calificacion.cursoId} no encontrado`);
}

// Retornamos el objeto con la estructura deseada
return {
nombre: estudiante.nombre,
curso: curso.nombre,
calificacion: calificacion.calificacion
};
});

res.json(resultado);
} catch (error) {
res.status(500).json({ 
error: 'Error al obtener calificaciones',
detalle: error.message 
});
}
};

module.exports = {
obtenerCalificaciones
};