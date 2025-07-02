import express from 'express';
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  deleteTarea,
  obtenerTareaById
} from '../controllers/taskController.js';

const router = express.Router();

// http://localhost:3000/task?completada=true&titulo=Nueva Tarea

// Obtener todas las tareas
router.get('/task', obtenerTareas);
// Obtener una tarea por ID
router.get('/task/:id', obtenerTareaById);
// Crear una nueva tarea
router.post('/task', crearTarea);
// Actualizar una tarea existente
router.put('/task/:id', actualizarTarea);
// Eliminar una tarea existente
router.delete('/task/:id', deleteTarea);

export default router;
