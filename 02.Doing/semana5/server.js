/**
 * Servidor Express principal - Semana 5
 *
 * Este servidor implementa una API REST completa utilizando Express.js con:
 * - Múltiples rutas organizadas en módulos separados
 * - Middleware personalizado para logging
 * - Manejo de JSON automático
 * - Sistema de almacenamiento en archivos JSON
 * - Endpoints para usuarios, productos, búsquedas y utilidades
 */

// Importa la librería Express para crear el servidor web
import express from 'express';
// Importa la función para cargar datos desde archivos JSON al iniciar el servidor
import { loadData } from './src/storage.js';
// Importa todos los módulos de rutas organizados por funcionalidad
import buscarRoutes from './src/routes/buscarRoutes.js';
import edadRoutes from './src/routes/edadRoutes.js';
import homeRoutes from './src/routes/homeRoutes.js';
import perfilRoutes from './src/routes/perfilRoutes.js';
import productsRoutes from './src/routes/productsRoutes.js';
import saludoRoutes from './src/routes/saludoRoutes.js';
import sumaRoutes from './src/routes/sumaRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';

// Define el puerto donde el servidor escuchará las peticiones
const PORT = 3000;

// Carga los datos iniciales desde los archivos JSON antes de iniciar el servidor
// Utiliza await porque loadData() es una función asíncrona
await loadData();

// Crea una instancia de la aplicación Express
const app = express();

// ===== CONFIGURACIÓN DE MIDDLEWARES =====

// Middleware global para parsear automáticamente el cuerpo de las peticiones JSON
// Esto permite acceder a req.body en las rutas POST/PUT

app.use(express.json());

// ===== CONFIGURACIÓN DE RUTAS =====

// Ruta: http://localhost:3000/api/buscar?producto=teclado&categoria=hardware
// Maneja búsquedas con query parameters para filtrar productos por categoría
app.use('/api', buscarRoutes);

// Ruta: http://localhost:3000/api/edad?anioNacimiento=2000
// Calcula la edad basada en el año de nacimiento proporcionado
app.use('/api', edadRoutes);

// Ruta: http://localhost:3000/Rodrigo?isAdmin=true
// Rutas dinámicas principales que detectan si el usuario es administrador
app.use(homeRoutes);

// Ruta: http://localhost:3000/perfil/rodrigo?lang=es
// Maneja perfiles de usuario con soporte para múltiples idiomas (es, fr, en)
app.use(perfilRoutes);

// Ruta: http://localhost:3000/api/products
// CRUD completo para productos (GET para listar, POST para crear)
app.use('/api', productsRoutes);

// Ruta: http://localhost:3000/saludo/Rodrigo
// Genera saludos personalizados usando el nombre como parámetro de ruta
app.use(saludoRoutes);

// Ruta: http://localhost:3000/suma/4/8
// Realiza operaciones matemáticas (suma) con dos números como parámetros
app.use(sumaRoutes);

// Ruta: http://localhost:3000/api/users
// CRUD completo para usuarios (GET para listar, POST para crear)
app.use('/api', usersRoutes);

// ===== INICIO DEL SERVIDOR =====

/**
 * Inicia el servidor Express en el puerto especificado
 * Cuando el servidor esté listo, imprime un mensaje de confirmación en la consola
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});