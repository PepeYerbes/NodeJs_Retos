const express = require('express');
const router = express.Router();
const { obtenerCalificaciones } = require('../controllers/calificacionesController');

router.get('/', obtenerCalificaciones);

module.exports = router;