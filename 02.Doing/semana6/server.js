// Importación de módulos necesarios
import express from 'express'; // Framework web para Node.js
import routes from './src/routes/index.js'; // Archivo principal de rutas de la aplicación
import { logger } from './src/middleware/logger.js'; // Middleware personalizado para logging

// Configuración del puerto del servidor
const PORT = 3000;

// Creación de la aplicación Express
const app = express();

// CONFIGURACIÓN DE MIDDLEWARES
// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Middleware personalizado para logging de peticiones
app.use(logger);

// Configuración de rutas principales
app.use(routes);

// INICIO DEL SERVIDOR
// El servidor escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

/*
NOTAS PARA ESTUDIANTES:
- Los middlewares se ejecutan en el orden que se declaran
- express.json() permite leer datos JSON del body de las peticiones
- El middleware logger se ejecuta antes que las rutas
- Las rutas se manejan en un archivo separado para mejor organización
*/