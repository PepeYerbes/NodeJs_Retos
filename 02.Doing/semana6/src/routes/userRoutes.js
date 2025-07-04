// Importación del framework Express
import express from 'express';

// Importación de todas las funciones del controlador de usuarios
// Cada función maneja una operación específica del CRUD
import {
  obtenerUsuarios,      // Función para obtener todos los usuarios (READ)
  obtenerUsuarioPorId,  // Función para obtener un usuario específico (READ)
  crearUsuario,         // Función para crear un nuevo usuario (CREATE)
  actualizarUsuario,    // Función para actualizar un usuario existente (UPDATE)
  eliminarUsuario       // Función para eliminar un usuario (DELETE)
} from '../controllers/userController.js';

// Creación del router de Express
// El router nos permite definir rutas modulares y reutilizables
const router = express.Router();

// DEFINICIÓN DE RUTAS PARA USUARIOS (CRUD COMPLETO)

// GET /user - Obtener todos los usuarios
// Ruta para listar todos los usuarios registrados
router.get('/user', obtenerUsuarios);

// GET /user/:id - Obtener un usuario específico por ID
// El parámetro :id será accesible en req.params.id
router.get('/user/:id', obtenerUsuarioPorId);

// POST /user/ - Crear un nuevo usuario
// Los datos del nuevo usuario vendrán en el body de la petición
router.post('/user/', crearUsuario);

// PUT /user/:id - Actualizar un usuario existente
// Combina el ID del parámetro con los datos del body para la actualización
router.put('/user/:id', actualizarUsuario);

// DELETE /user/:id - Eliminar un usuario específico
// Solo necesita el ID del usuario a eliminar
router.delete('/user/:id', eliminarUsuario);

// Exportación del router para que pueda ser usado en otros archivos
export default router;

/*
NOTAS PARA ESTUDIANTES:
- Este archivo implementa un CRUD completo para usuarios
- Cada ruta HTTP (GET, POST, PUT, DELETE) tiene un propósito específico
- Los parámetros de ruta (:id) se acceden con req.params
- Los datos del body se acceden con req.body
- La separación de rutas y controladores mejora la organización del código
- Este router debe ser importado y usado en el archivo principal de rutas
*/