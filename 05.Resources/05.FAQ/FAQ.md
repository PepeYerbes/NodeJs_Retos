# ❓ FAQ - Curso NodeJS 2025

> **🔍 Búsqueda Rápida**: Usa `Ctrl+F` para encontrar tu pregunta específica

## 🚀 Configuración e Instalación

### ¿Tengo Node.js v22.16.0, es compatible con el curso?

✅ **Perfecto!** El curso está optimizado para Node.js v22.16.0. Esta es la versión LTS más reciente y todas las dependencias del curso están actualizadas para esta versión.

### ¿Por qué mi servidor no inicia en el puerto 3000?

**Error común:** `Error: listen EADDRINUSE :::3000`

```bash
# Solución 1: Encontrar y terminar proceso
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <numero_pid> /F

# Solución 2: Usar puerto diferente
const PORT = process.env.PORT || 3001;
```

### ¿Por qué `npm install` falla con Express v5.1.0?

**Posibles causas:**

```bash
# Limpiar cache y reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Si persiste, verificar compatibilidad Node.js
node --version  # Debe ser v18+ para Express v5
```

### ¿Cómo verifico que todo está instalado correctamente?

```bash
# Comando de diagnóstico completo
echo "=== DIAGNÓSTICO SISTEMA ===" && \
echo "Node.js: $(node --version)" && \
echo "npm: v$(npm --version)" && \
echo "Sistema: $(uname -s 2>/dev/null || echo $OS)" && \
echo "Directorio actual: $(pwd)" && \
echo "=========================="

# Crear proyecto de prueba
mkdir test-setup && cd test-setup
npm init -y
npm install express@^5.1.0
echo 'import express from "express"; const app = express(); app.listen(3000, () => console.log("✅ Todo funciona"));' > test.js
node test.js
```

### ¿Cómo configuro correctamente el package.json para ES6?

```json
{
  "name": "mi-proyecto-nodejs",
  "version": "1.0.0",
  "type": "module", // ✅ CRÍTICO para ES6 modules
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest"
  },
  "engines": {
    "node": ">=22.16.0",
    "npm": ">=10.0.0"
  }
}
```

---

## 🗄️ Base de Datos

### ¿Cómo debuggear errores de MongoDB con Mongoose v8?

```javascript
// Habilitar logs detallados
mongoose.set("debug", true);

// Conectar con opciones de debug
await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
});

// Escuchar eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose conectado");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error Mongoose:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose desconectado");
});
```

### ¿Por qué obtengo "MongooseError: Operation buffering timed out"?

```javascript
// ❌ Problema común: Conectar después de definir modelos
import User from "./models/User.js"; // Modelo definido antes de conectar
mongoose.connect(mongoUri); // Conexión tardía

// ✅ Solución: Conectar ANTES de usar modelos
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error conexión MongoDB:", error);
    process.exit(1);
  }
};

// Conectar primero
await connectDB();

// Luego importar modelos
import User from "./models/User.js";
```

### ¿Por qué mi consulta Sequelize es tan lenta?

```javascript
// ❌ Consulta sin optimizar
const users = await User.findAll({
  include: [Post],
});

// ✅ Consulta optimizada
const users = await User.findAll({
  attributes: ["id", "name", "email"], // Solo campos necesarios
  include: [
    {
      model: Post,
      attributes: ["title", "createdAt"],
      where: { status: "published" },
      limit: 5,
      order: [["createdAt", "DESC"]],
    },
  ],
  limit: 10,
  order: [["createdAt", "DESC"]],
});

// Ver query SQL generada para debugging
console.log(User.findAll({ logging: console.log }));
```

### ¿Cuándo usar MongoDB vs MySQL en mis proyectos?

| Criterio                 | MongoDB ✅                    | MySQL ✅                          |
| ------------------------ | ----------------------------- | --------------------------------- |
| **Estructura de datos**  | Flexible, documentos anidados | Estructurada, relaciones claras   |
| **Escalabilidad**        | Horizontal (sharding)         | Vertical principalmente           |
| **Consultas complejas**  | Agregaciones potentes         | SQL estándar                      |
| **Transacciones**        | Soporte limitado              | ACID completo                     |
| **Curva de aprendizaje** | Más fácil para principiantes  | Requiere conocimiento SQL         |
| **Mejor para**           | APIs REST, prototipos rápidos | Sistemas con relaciones complejas |

**Recomendación del curso:**

- **Principiantes**: Empezar con **MongoDB + Mongoose**
- **Con experiencia SQL**: **MySQL + Sequelize**

---

## 🌐 APIs y Express

### ¿Por qué `req.body` es `undefined`?

```javascript
// ❌ Falta middleware de parsing
app.post("/users", (req, res) => {
  console.log(req.body); // undefined
});

// ✅ Agregar middleware ANTES de las rutas
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.post("/users", (req, res) => {
  console.log(req.body); // { name: "Juan" }
  res.json({ success: true, data: req.body });
});
```

### ¿Cómo estructuro mis rutas en proyectos grandes?

```javascript
// routes/index.js
import express from "express";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";

const router = express.Router();

// Aplicar rutas específicas
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

// Ruta de salud
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

export default router;

// server.js
import routes from "./routes/index.js";
app.use("/api/v1", routes);
```

### ¿Cómo manejo errores de forma consistente?

```javascript
// utils/AppError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

// middleware/errorHandler.js
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Errores operacionales: enviar mensaje al cliente
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Errores de programación: no revelar detalles
    console.error('ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Algo salió mal!'
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;

// En controllers - usar async wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("Usuario no encontrado", 404));
  }

  res.json({
    status: 'success',
    data: { user }
  });
});
```

### ¿Por qué obtengo errores CORS?

```javascript
// ❌ Error típico: CORS no configurado
// "Access to fetch... has been blocked by CORS policy"

// ✅ Configuración básica CORS
import cors from "cors";

// Para desarrollo (permitir todos los orígenes)
app.use(cors());

// ✅ Configuración específica para producción
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173", // Vite dev server
    "https://miapp.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Manejar preflight requests
app.options("*", cors(corsOptions));
```

---

## 🔐 Autenticación y Seguridad

### ¿Cómo genero JWT tokens seguros?

```javascript
import jwt from "jsonwebtoken";
import crypto from "crypto";

// 1. Generar secret seguro (ejecutar una vez)
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};
console.log("Agregar a .env → JWT_SECRET=", generateJWTSecret());

// 2. Configurar .env
// JWT_SECRET=tu_secret_super_largo_Y_seguro_aqui
// JWT_EXPIRES_IN=7d

// 3. Generar token con claims apropiados
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role || "user",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      issuer: "mi-app",
      audience: "mi-app-users",
      subject: user._id.toString(),
    }
  );
};

// 4. Middleware de verificación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token de acceso requerido",
      hint: "Header: Authorization: Bearer <token>",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "Token inválido o expirado",
      });
    }

    req.user = decoded;
    next();
  });
};

// 5. Uso en rutas
app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    message: "Acceso autorizado",
  });
});
```

### ¿Cómo implemento rate limiting efectivo?

```javascript
import rateLimit from "express-rate-limit";

// Rate limiter general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: {
    error: "Demasiadas peticiones desde esta IP",
    retryAfter: "15 minutos",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter estricto para autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Solo 5 intentos de login
  skipSuccessfulRequests: true,
  message: {
    error: "Demasiados intentos de login",
    retryAfter: "15 minutos",
  },
});

// Rate limiter para APIs críticas
const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // 10 requests por minuto
  message: {
    error: "Límite de API excedido",
    retryAfter: "1 minuto",
  },
});

// Aplicar limiters
app.use("/api/", generalLimiter);
app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);
app.use("/api/critical", strictLimiter);
```

### ¿Cómo hasheo passwords de forma segura?

```javascript
import bcrypt from "bcrypt";

// Configuración segura
const SALT_ROUNDS = 12; // Aumentar para más seguridad (más lento)

// Validar password strength
const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Mínimo 8 caracteres");
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Debe contener al menos una minúscula");
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Debe contener al menos una mayúscula");
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push("Debe contener al menos un número");
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push("Debe contener al menos un símbolo (@$!%*?&)");
  }

  return errors;
};

// Al registrar usuario
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Validar datos básicos
  if (!email || !password || !name) {
    return res.status(400).json({
      error: "Email, password y nombre son requeridos",
    });
  }

  // Validar fortaleza del password
  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    return res.status(400).json({
      error: "Password no cumple los requisitos",
      details: passwordErrors,
    });
  }

  try {
    // Verificar si usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "El email ya está registrado",
      });
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generar token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Al hacer login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email y password son requeridos",
    });
  }

  try {
    // Buscar usuario (incluir password)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    // Verificar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    // Generar token
    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🧪 Testing

### ¿Cómo teseo mis APIs con Jest y Supertest?

```javascript
// jest.config.js
export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/server.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};

// tests/setup.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 60000);

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// tests/auth.test.js
import request from 'supertest';
import app from '../server.js';
import User from '../models/User.js';

describe('Authentication Endpoints', () => {
  const validUserData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'SecurePass123@'
  };

  describe('POST /auth/register', () => {
    it('should register user with valid data', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(validUserData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(validUserData.email);

      // Verificar que se guardó en BD
      const user = await User.findOne({ email: validUserData.email });
      expect(user).toBeTruthy();
    });

    it('should reject duplicate email', async () => {
      // Crear usuario primero
      await User.create({
        ...validUserData,
        password: 'hashedpassword'
      });

      const response = await request(app)
        .post('/auth/register')
        .send(validUserData)
        .expect(409);

      expect(response.body.error).toContain('ya está registrado');
    });

    it('should reject weak password', async () => {
      const weakPasswordUser = {
        ...validUserData,
        password: '123'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(weakPasswordUser)
        .expect(400);

      expect(response.body.error).toContain('no cumple los requisitos');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Registrar usuario de prueba
      await request(app)
        .post('/auth/register')
        .send(validUserData);
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: validUserData.email,
          password: validUserData.password
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: validUserData.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.error).toBe('Credenciales inválidas');
    });
  });

  describe('Protected Routes', () => {
    let authToken;

    beforeEach(async () => {
      // Registrar y hacer login
      await request(app)
        .post('/auth/register')
        .send(validUserData);

      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: validUserData.email,
          password: validUserData.password
        });

      authToken = loginResponse.body.token;
    });

    it('should access protected route with valid token', async () => {
      const response = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.user).toBeTruthy();
    });

    it('should reject access without token', async () => {
      await request(app)
        .get('/profile')
        .expect(401);
    });

    it('should reject access with invalid token', async () => {
      await request(app)
        .get('/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(403);
    });
  });
});

// package.json scripts
{
  "scripts": {
    "test": "NODE_ENV=test jest --runInBand",
    "test:watch": "NODE_ENV=test jest --watch --runInBand",
    "test:coverage": "NODE_ENV=test jest --coverage --runInBand",
    "test:verbose": "NODE_ENV=test jest --verbose --runInBand"
  }
}
```

---

## 🚀 Deployment

### ¿Cuál plataforma de deploy recomiendan?

| Plataforma       | Mejor Para          | Precio          | Facilidad  | Base de Datos | Recomendación  |
| ---------------- | ------------------- | --------------- | ---------- | ------------- | -------------- |
| **Railway**      | Proyectos del curso | $5-20/mes       | ⭐⭐⭐⭐⭐ | Incluida      | ✅ **Top 1**   |
| **Heroku**       | Principiantes       | Gratis limitado | ⭐⭐⭐⭐   | Add-ons pagos | ✅ **Top 2**   |
| **Vercel**       | APIs serverless     | Gratis generoso | ⭐⭐⭐⭐   | Externa       | ✅ **Top 3**   |
| **DigitalOcean** | Control total       | Desde $5/mes    | ⭐⭐⭐     | Manual        | Para avanzados |

### ¿Cómo preparo mi app para producción?

```javascript
// 1. Variables de entorno para producción
// .env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/prod
JWT_SECRET=super_secret_production_key_64_chars_minimum
FRONTEND_URL=https://miapp.vercel.app

// 2. Configuración específica para producción
// config/environment.js
export const config = {
  development: {
    database: {
      uri: process.env.DATABASE_URL_DEV,
      options: { debug: true }
    },
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173']
    },
    logging: 'dev'
  },
  production: {
    database: {
      uri: process.env.DATABASE_URL,
      options: { debug: false }
    },
    cors: {
      origin: process.env.FRONTEND_URL?.split(',') || []
    },
    logging: 'combined'
  }
};

// 3. Middleware de seguridad para producción
import helmet from 'helmet';
import compression from 'compression';

if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
      },
    },
  }));

  app.use(compression());
}

// 4. Graceful shutdown
const gracefulShutdown = (server) => {
  process.on('SIGTERM', () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    server.close(() => {
      mongoose.connection.close(false, () => {
        console.log('Conexión MongoDB cerrada.');
        process.exit(0);
      });
    });
  });
};
```

### ¿Cómo hago deploy en Railway?

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Inicializar proyecto
railway init

# 4. Configurar variables de entorno
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=tu_jwt_secret_aqui
railway variables set DATABASE_URL=tu_mongo_uri_aqui

# 5. Deploy
railway up

# 6. Ver logs
railway logs

# 7. Abrir en navegador
railway open
```

### ¿Cómo monitoreo mi aplicación en producción?

```javascript
// 1. Health check endpoint
app.get("/health", (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
  };

  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).json(healthCheck);
  }
});

// 2. Error logging avanzado
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "mi-app" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// 3. Métricas básicas
let requestCount = 0;
let errorCount = 0;

app.use((req, res, next) => {
  requestCount++;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (res.statusCode >= 400) errorCount++;

    logger.info("Request processed", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      requestCount,
      errorCount,
    });
  });

  next();
});

// 4. Monitoreo de rendimiento
import promBundle from "express-prom-bundle";

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: "/metrics",
  collectDefaultMetrics: {},
});

app.use(metricsMiddleware);

// 5. Integración con servicios externos
import axios from "axios";

const checkExternalService = async () => {
  try {
    const response = await axios.get("https://api.servicio-externo.com/health");
    return response.data;
  } catch (error) {
    return null;
  }
};

// Endpoint de salud con verificación de servicio externo
app.get("/health", async (req, res) => {
  const externalServiceStatus = await checkExternalService();

  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    externalService: externalServiceStatus ? "UP" : "DOWN",
  };

  res.status(200).json(healthCheck);
});
```
