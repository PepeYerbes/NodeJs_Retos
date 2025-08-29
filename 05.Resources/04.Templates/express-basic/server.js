import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configuración de variables de entorno
dotenv.config();

// Configuración básica
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares esenciales
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://tudominio.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// RUTAS PRINCIPALES

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 API funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      users: 'GET /api/users',
      docs: 'GET /docs'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

// RUTAS DE EJEMPLO

// Obtener usuarios (simulado)
app.get('/api/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'user',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Ana García',
      email: 'ana@example.com',
      role: 'admin',
      createdAt: '2024-01-16T15:45:00Z'
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      role: 'user',
      createdAt: '2024-01-17T09:20:00Z'
    }
  ];

  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// Crear usuario (simulado)
app.post('/api/users', (req, res) => {
  const { name, email, role = 'user' } = req.body;

  // Validación básica
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Nombre y email son obligatorios',
      fields: {
        name: !name ? 'Requerido' : null,
        email: !email ? 'Requerido' : null
      }
    });
  }

  // Validar email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Email inválido'
    });
  }

  // Simular creación
  const newUser = {
    id: Date.now(), // ID temporal
    name: name.trim(),
    email: email.toLowerCase().trim(),
    role,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Usuario creado exitosamente',
    data: newUser
  });
});

// Obtener usuario por ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  // Validar ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID de usuario inválido'
    });
  }

  // Simular búsqueda (en un proyecto real, buscarías en BD)
  const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'user' },
    { id: 2, name: 'Ana García', email: 'ana@example.com', role: 'admin' }
  ];

  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// Documentación básica
app.get('/docs', (req, res) => {
  res.json({
    success: true,
    title: 'API Documentation',
    version: '1.0.0',
    baseUrl: `http://localhost:${PORT}`,
    endpoints: [
      {
        method: 'GET',
        path: '/',
        description: 'Información general de la API'
      },
      {
        method: 'GET',
        path: '/health',
        description: 'Estado de salud del servidor'
      },
      {
        method: 'GET',
        path: '/api/users',
        description: 'Obtener lista de usuarios'
      },
      {
        method: 'POST',
        path: '/api/users',
        description: 'Crear nuevo usuario',
        body: {
          name: 'string (requerido)',
          email: 'string (requerido)',
          role: 'string (opcional: user|admin)'
        }
      },
      {
        method: 'GET',
        path: '/api/users/:id',
        description: 'Obtener usuario por ID'
      }
    ]
  });
});

// MIDDLEWARE DE MANEJO DE ERRORES

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
    suggestion: 'Verifica la URL y el método HTTP'
  });
});

// Middleware global de manejo de errores
app.use((error, req, res, next) => {
  console.error('🚨 Error:', error);

  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      details: error.message,
      stack: error.stack
    })
  });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log(`🌟 Servidor Express corriendo en:`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`📚 Docs: http://localhost:${PORT}/docs`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚡ Express: v5.1.0`);
  console.log(`📦 Node.js: ${process.version}`);
  console.log('🚀 ========================================');
});
