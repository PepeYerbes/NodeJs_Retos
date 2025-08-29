# 🌐 Desarrollo de APIs - FAQ Express v5.1.0

> **🎯 Navegación**: [Express Setup](#-configuración-de-express) | [Middleware](#-middleware-básico) | [CORS](#-configuración-de-cors) | [JWT](#-autenticación-jwt) | [Testing](#-testing-de-apis)

## 🚀 Configuración de Express

### **❌ Problema: "req.body es undefined"**

#### **Síntomas:**
```javascript
app.post('/usuarios', (req, res) => {
  console.log(req.body); // undefined
});
```

#### **✅ Solución:**
```javascript
import express from 'express';
const app = express();

// ✅ OBLIGATORIO: Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Ahora funciona
app.post('/usuarios', (req, res) => {
  console.log(req.body); // { name: "Juan", email: "juan@email.com" }
  res.json({ mensaje: 'Usuario recibido', data: req.body });
});
```

### **❌ Problema: "Cannot set headers after they are sent"**

#### **Síntomas:**
```bash
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

#### **✅ Solución:**
```javascript
// ❌ Problema: Múltiples respuestas
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
    res.json({ extra: 'data' }); // ❌ Segunda respuesta
  } catch (error) {
    res.status(500).json({ error }); // ❌ Tercera respuesta
  }
});

// ✅ Solución: Una sola respuesta por ruta
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find();
    return res.json(usuarios); // ✅ return evita continuar
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ✅ O usar early return
app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'ID requerido' });
  }
  
  try {
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **❌ Problema: "Server crashes sin error claro"**

#### **✅ Solución: Manejo global de errores:**
```javascript
// Middleware de manejo de errores (DEBE ir al final)
app.use((error, req, res, next) => {
  console.error('Error capturado:', error);
  
  // Error de validación de MongoDB
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: Object.values(error.errors).map(err => err.message)
    });
  }
  
  // Error de cast (ID inválido)
  if (error.name === 'CastError') {
    return res.status(400).json({
      error: 'ID inválido'
    });
  }
  
  // Error genérico
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    method: req.method,
    url: req.originalUrl
  });
});
```

---

## 🔧 Middleware Básico

### **❌ Problema: "Middleware no se ejecuta"**

#### **✅ Orden correcto de middleware:**
```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// 1. Middleware de seguridad (PRIMERO)
app.use(helmet());
app.use(cors());

// 2. Logging
app.use(morgan('combined'));

// 3. Parseo de body (ANTES de las rutas)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 4. Middleware personalizado
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  next(); // ✅ OBLIGATORIO: llamar next()
});

// 5. Rutas (DESPUÉS de middleware)
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Middleware funcionando',
    timestamp: req.timestamp 
  });
});

// 6. Manejo de errores (AL FINAL)
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});
```

### **❌ Problema: "Middleware de autenticación no funciona"**

#### **✅ Middleware de autenticación JWT:**
```javascript
import jwt from 'jsonwebtoken';

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acceso requerido',
      hint: 'Incluye: Authorization: Bearer <token>'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Token inválido o expirado' 
      });
    }
    
    req.user = user; // Disponible en las siguientes funciones
    next();
  });
};

// Uso del middleware
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Perfil del usuario',
    user: req.user 
  });
});

// Aplicar a múltiples rutas
app.use('/api/protected', authenticateToken);
app.get('/api/protected/data', (req, res) => {
  res.json({ data: 'Datos protegidos' });
});
```

---

## 🌍 Configuración de CORS

### **❌ Problema: "CORS error desde frontend"**

#### **Síntomas:**
```bash
Access to fetch at 'http://localhost:3000/api/users' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

#### **✅ Solución básica:**
```javascript
import cors from 'cors';

// Permitir todos los orígenes (SOLO desarrollo)
app.use(cors());

// O configuración específica
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

#### **✅ Configuración avanzada:**
```javascript
const corsOptions = {
  origin: (origin, callback) => {
    // Permitir requests sin origin (mobile apps, Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://miapp.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
```

### **❌ Problema: "Preflight OPTIONS request fails"**

#### **✅ Solución:**
```javascript
// Manejar preflight requests explícitamente
app.options('*', cors()); // Habilitar preflight para todas las rutas

// O manualmente
app.options('/api/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.status(200).send();
});
```

---

## 🔐 Autenticación JWT

### **❌ Problema: "JWT no se genera correctamente"**

#### **✅ Implementación completa:**
```javascript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Registro de usuario
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y password son requeridos' 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password debe tener al menos 6 caracteres' 
      });
    }
    
    // Verificar si usuario existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        error: 'El usuario ya existe' 
      });
    }
    
    // Hash del password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Crear usuario
    const user = await User.create({
      email,
      password: hashedPassword
    });
    
    // Generar JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '7d',
        issuer: 'mi-app',
        audience: 'mi-app-users'
      }
    );
    
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login de usuario
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }
    
    // Verificar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }
    
    // Generar token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **❌ Problema: "Token expires too quickly"**

#### **✅ Refresh token pattern:**
```javascript
// Generar access token y refresh token
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // Token corto
  );
  
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // Token largo
  );
  
  return { accessToken, refreshToken };
};

// Endpoint para renovar token
app.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token requerido' });
  }
  
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Refresh token inválido' });
    }
    
    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      const tokens = generateTokens(user);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
```

---

## 📊 Validación de Datos

### **❌ Problema: "No validation on API endpoints"**

#### **✅ Middleware de validación:**
```javascript
// Usando express-validator
import { body, validationResult } from 'express-validator';

// Reglas de validación
const userValidationRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password debe tener al menos 6 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password debe contener al menos una minúscula, una mayúscula y un número'),
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Nombre debe tener entre 2 y 50 caracteres')
  ];
};

// Middleware para verificar validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: errors.array()
    });
  }
  next();
};

// Uso
app.post('/users', userValidationRules(), validate, async (req, res) => {
  // Los datos aquí ya están validados
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### **✅ Validación manual:**
```javascript
const validateUserData = (data) => {
  const errors = [];
  
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Email inválido');
  }
  
  if (!data.password || data.password.length < 6) {
    errors.push('Password debe tener al menos 6 caracteres');
  }
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Nombre es requerido (mínimo 2 caracteres)');
  }
  
  return errors;
};

app.post('/users', (req, res) => {
  const errors = validateUserData(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: errors
    });
  }
  
  // Continuar con la creación del usuario
});
```

---

## 🧪 Testing de APIs

### **❌ Problema: "No sé cómo testear mis APIs"**

#### **✅ Setup con Jest y Supertest:**
```bash
npm install -D jest supertest
```

```javascript
// tests/api.test.js
import request from 'supertest';
import app from '../server.js';

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
        
      expect(response.body).toHaveProperty('message');
    });
  });
  
  describe('POST /users', () => {
    it('should create user with valid data', async () => {
      const userData = {
        name: 'Juan Pérez',
        email: 'juan@test.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);
        
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
    });
    
    it('should return 400 with invalid email', async () => {
      const userData = {
        name: 'Juan Pérez',
        email: 'invalid-email',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(400);
        
      expect(response.body).toHaveProperty('error');
    });
  });
  
  describe('Authentication', () => {
    let authToken;
    
    beforeEach(async () => {
      // Crear usuario de prueba y obtener token
      const userData = {
        email: 'test@test.com',
        password: 'password123'
      };
      
      await request(app).post('/register').send(userData);
      
      const loginResponse = await request(app)
        .post('/login')
        .send(userData);
        
      authToken = loginResponse.body.token;
    });
    
    it('should access protected route with valid token', async () => {
      const response = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
        
      expect(response.body).toHaveProperty('user');
    });
    
    it('should return 401 without token', async () => {
      await request(app)
        .get('/profile')
        .expect(401);
    });
  });
});
```

#### **✅ Testing con diferentes entornos:**
```javascript
// package.json
{
  "scripts": {
    "test": "NODE_ENV=test jest",
    "test:watch": "NODE_ENV=test jest --watch",
    "test:coverage": "NODE_ENV=test jest --coverage"
  }
}

// jest.config.js
export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
```

---

## 🔍 Debugging APIs

### **❌ Problema: "No puedo debuggear mi API"**

#### **✅ Logging efectivo:**
```javascript
import morgan from 'morgan';

// Logging detallado en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Logger personalizado
const logger = {
  info: (message, data = {}) => {
    console.log(`ℹ️ [${new Date().toISOString()}] ${message}`, data);
  },
  error: (message, error = {}) => {
    console.error(`❌ [${new Date().toISOString()}] ${message}`, error);
  },
  debug: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 [${new Date().toISOString()}] ${message}`, data);
    }
  }
};

// Usar en endpoints
app.post('/users', async (req, res) => {
  logger.debug('Creando usuario', { body: req.body });
  
  try {
    const user = await User.create(req.body);
    logger.info('Usuario creado exitosamente', { userId: user._id });
    res.status(201).json(user);
  } catch (error) {
    logger.error('Error creando usuario', error);
    res.status(500).json({ error: error.message });
  }
});
```

#### **✅ Herramientas de debugging:**
```bash
# Usar VS Code debugger
# Crear .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API",
      "program": "${workspaceFolder}/server.js",
      "env": {
        "NODE_ENV": "development"
      },
      "runtimeArgs": ["--experimental-modules"]
    }
  ]
}
```

---

## 📈 Performance de APIs

### **❌ Problema: "API muy lenta"**

#### **✅ Optimizaciones básicas:**
```javascript
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Compresión gzip
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de requests por IP
  message: 'Demasiadas peticiones, intenta de nuevo más tarde'
});
app.use(limiter);

// Cache simple para datos que no cambian frecuentemente
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

app.get('/public-data', async (req, res) => {
  const cacheKey = 'public-data';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return res.json(cached.data);
  }
  
  try {
    const data = await expensiveOperation();
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

*🌐 FAQ actualizado para Express v5.1.0 | Enero 2025*