const express = require('express');
const router = express.Router();
const calificacionesRoutes = require('./calificacionesRoutes');

// Ruta principal
router.get('/', (req, res) => {
res.send('Bienvenido a la API de Calificaciones');
});

// Rutas de calificaciones
router.use('/calificaciones', calificacionesRoutes);

module.exports = router;