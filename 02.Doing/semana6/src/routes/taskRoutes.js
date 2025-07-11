// Importación del framework Express
import express from 'express';

// Importación de todas las funciones del controlador de tareas
// Cada función maneja una operación específica del CRUD para tareas
import {
  obtenerTareas,        // Función para obtener todas las tareas (READ)
  crearTarea,           // Función para crear una nueva tarea (CREATE)
  actualizarTarea,      // Función para actualizar una tarea existente (UPDATE)
  deleteTarea,          // Función para eliminar una tarea (DELETE)
  obtenerTareaById,     // Función para obtener una tarea específica por ID (READ)
  obtenerTareasUsuario  // Función para obtener tareas de un usuario específico (READ)
} from '../controllers/taskController.js';

// Creación del router de Express
// El router nos permite definir rutas modulares y reutilizables
const router = express.Router();

// EJEMPLOS DE URLS PARA PRUEBAS:
// GET con query params: http://localhost:3000/task?completada=true&titulo=Tarea&userId=1
// GET tareas de usuario: http://localhost:3000/task/user/1

// DEFINICIÓN DE RUTAS PARA TAREAS (CRUD COMPLETO)

// GET /task - Obtener todas las tareas
// Permite filtros mediante query parameters (?completada=true&titulo=...)
router.get('/task', obtenerTareas);

// GET /task/user/:userId - Obtener todas las tareas de un usuario específico
// Ruta especializada para obtener tareas filtradas por usuario
router.get('/task/user/:userId', obtenerTareasUsuario);

// GET /task/:id - Obtener una tarea específica por ID
// El parámetro :id será accesible en req.params.id
router.get('/task/:id', obtenerTareaById);

// POST /task - Crear una nueva tarea
// Los datos de la nueva tarea vendrán en el body de la petición
router.post('/task', crearTarea);

// PUT /task/:id - Actualizar una tarea existente
// Combina el ID del parámetro con los datos del body para la actualización
router.put('/task/:id', actualizarTarea);

// DELETE /task/:id - Eliminar una tarea específica
// Solo necesita el ID de la tarea a eliminar
router.delete('/task/:id', deleteTarea);

// Exportación del router para que pueda ser usado en otros archivos
export default router;

/*
NOTAS PARA ESTUDIANTES:
- Este archivo implementa un CRUD completo para tareas
- Incluye una ruta especializada para obtener tareas por usuario
- Los query parameters (?key=value) se acceden con req.query
- Los parámetros de ruta (:id, :userId) se acceden con req.params
- El orden de las rutas es importante: rutas más específicas van antes
- La ruta '/task/user/:userId' debe ir antes que '/task/:id' para evitar conflictos
*/