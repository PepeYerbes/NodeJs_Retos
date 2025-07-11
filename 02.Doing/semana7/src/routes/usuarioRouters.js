const express = require('express');
const router = express.Router();
const { obternerUsuario,
    obternerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario } = require('./controllers/usuarioController.js');

// Rutas para el manejo de usuarios
router.get('/usuarios', obternerUsuarios); // Obtener todos los usuarios    
router.get('/usuarios/:id', obternerUsuario); // Obtener un usuario por ID
router.post('/usuarios', crearUsuario); // Crear un nuevo usuario
router.put('/usuarios/:id', actualizarUsuario); // Actualizar un usuario por ID
router.delete('/usuarios/:id', eliminarUsuario); // Eliminar un usuario por ID

module.exports = router;