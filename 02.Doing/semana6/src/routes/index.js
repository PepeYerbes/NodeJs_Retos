// Importación del framework Express
import express from 'express';

// Importación de los routers modulares
// Cada router maneja las rutas específicas de una entidad
import taskRoutes from './taskRoutes.js';    // Router para rutas de tareas
import userRoutes from './userRoutes.js';    // Router para rutas de usuarios

// Creación del router principal
// Este router actuará como punto central para todas las rutas de la aplicación
const router = express.Router();

// CONFIGURACIÓN DE RUTAS MODULARES
// Cada router se monta en el router principal
// Esto permite mantener organizadas las rutas por funcionalidad

// Montaje del router de tareas
// Todas las rutas definidas en taskRoutes.js quedarán disponibles
router.use(taskRoutes);

// Montaje del router de usuarios
// Todas las rutas definidas en userRoutes.js quedarán disponibles
router.use(userRoutes);

// Exportación del router principal
// Este router será importado en server.js para conectar todas las rutas
export default router;

/*
NOTAS PARA ESTUDIANTES:
- Este archivo es el punto central de organización de rutas
- Usa el patrón de "Router Principal" para mantener el código modular
- Cada entidad (tasks, users) tiene su propio archivo de rutas
- El router principal se importa en server.js con app.use(routes)
- Esta estructura facilita el mantenimiento y escalabilidad del código
- Si agregas nuevas entidades, solo necesitas importar y usar su router aquí
*/