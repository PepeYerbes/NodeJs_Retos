# 🚀 Deployment y Producción - FAQ

> **🎯 Navegación**: [Heroku](#-heroku) | [Vercel](#-vercel) | [Railway](#-railway) | [Variables de Entorno](#-variables-de-entorno) | [Errores Comunes](#-errores-comunes-de-deployment)

## 🔧 Preparación para Deploy

### **✅ Checklist Pre-Deploy**

```bash
# 1. Verificar package.json
{
  "name": "mi-app-nodejs",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'"
  },
  "engines": {
    "node": "22.16.0",
    "npm": "10.0.0"
  }
}

# 2. Variables de entorno en código
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

# 3. Configuración de base de datos
const dbUrl = process.env.DATABASE_URL || process.env.MONGODB_URI;

# 4. Manejo de CORS para producción
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
```

---

## 🟣 Heroku

### **✅ Deploy paso a paso:**

```bash
# 1. Instalar Heroku CLI
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Descargar desde https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Crear app
heroku create mi-app-nodejs-2025

# 4. Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=mi-super-secreto-de-produccion
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# 5. Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# 6. Abrir app
heroku open
```

### **❌ Problema: "Application error" en Heroku**

#### **✅ Solución:**

```javascript
// server.js - Configuración correcta para Heroku
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000; // ✅ OBLIGATORIO usar process.env.PORT

// Middleware básico
app.use(express.json());

// Ruta de prueba para verificar que funciona
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API funcionando en producción",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// Conectar a base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error BD:", error);
    process.exit(1);
  }
};

// Iniciar servidor
const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    // ✅ Escuchar en todas las interfaces
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();
```

### **✅ Debugging en Heroku:**

```bash
# Ver logs en tiempo real
heroku logs --tail

# Ver logs específicos
heroku logs --tail --source app

# Ejecutar comandos en el dyno
heroku run node --version
heroku run npm --version

# Ver variables de entorno
heroku config

# Reiniciar app
heroku restart
```

---

## ▲ Vercel

### **✅ Deploy paso a paso:**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy desde el directorio del proyecto
vercel

# Seguir las instrucciones interactivas:
# - Set up and deploy? Yes
# - Which scope? Your personal account
# - Link to existing project? No
# - What's your project's name? mi-app-nodejs
# - In which directory is your code located? ./
```

### **✅ Configuración vercel.json:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **❌ Problema: "Serverless Function Timeout"**

#### **✅ Solución:**

```javascript
// Para Vercel, optimizar funciones serverless
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Lógica de tu API aquí
    const result = await quickOperation(); // Operaciones rápidas solamente
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Para operaciones largas, usar servicios externos o cron jobs
```

---

## 🚂 Railway

### **✅ Deploy paso a paso:**

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Inicializar proyecto
railway init

# 4. Deploy
railway up

# 5. Configurar variables de entorno
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set MONGODB_URI=your_mongo_uri
```

### **✅ railway.json (opcional):**

```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

---

## ⚙️ Variables de Entorno

### **✅ Variables esenciales para producción:**

```bash
# Aplicación
NODE_ENV=production
PORT=3000

# Base de datos
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/production_db
# O para MySQL:
DATABASE_URL=mysql://user:password@host:port/production_db

# Autenticación
JWT_SECRET=un-secreto-muy-largo-y-seguro-para-produccion-2025
JWT_REFRESH_SECRET=otro-secreto-diferente-para-refresh-tokens

# APIs externas
SENDGRID_API_KEY=SG.xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
CLOUDINARY_URL=cloudinary://xxxxx

# Frontend
FRONTEND_URL=https://mi-frontend.vercel.app
CORS_ORIGIN=https://mi-frontend.vercel.app,https://mi-dominio.com

# Configuración de servidor
MAX_FILE_SIZE=10mb
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### **✅ Cargar variables según entorno:**

```javascript
// config/environment.js
import { config } from "dotenv";

// Cargar archivo de entorno específico
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env";

config({ path: envFile });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT) || 3000,

  // Base de datos
  DATABASE_URL: process.env.DATABASE_URL || process.env.MONGODB_URI,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],

  // Flags de características
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TEST: process.env.NODE_ENV === "test",

  // Configuración de servidor
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || "10mb",
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,
};

// Validar variables críticas
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

if (ENV.IS_PRODUCTION) {
  requiredEnvVars.push("JWT_REFRESH_SECRET", "CORS_ORIGIN");
}

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
  console.error("❌ Variables de entorno faltantes:", missingVars);
  process.exit(1);
}
```

---

## 🚨 Errores Comunes de Deployment

### **❌ Problema: "Module not found" en producción**

#### **✅ Solución:**

```javascript
// ❌ Problema: Imports relativos incorrectos
import User from './models/User'; // Falta extensión

// ✅ Solución: Usar extensiones completas
import User from './models/User.js';
import { connectDB } from './config/database.js';

// package.json debe tener:
{
  "type": "module"
}
```

### **❌ Problema: "Cannot connect to database"**

#### **✅ Solución:**

```javascript
// Configuración robusta de conexión
const connectDB = async (retries = 5) => {
  try {
    const options = {
      // MongoDB
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      retryReads: true,
    };

    await mongoose.connect(process.env.DATABASE_URL, options);
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.error(
      `❌ Error de conexión BD (intento ${6 - retries}/5):`,
      error.message
    );

    if (retries > 0) {
      console.log(`🔄 Reintentando en 5 segundos...`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error("💥 No se pudo conectar a la base de datos");
      process.exit(1);
    }
  }
};
```

### **❌ Problema: "CORS errors in production"**

#### **✅ Solución:**

```javascript
import cors from "cors";

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (mobile apps, Postman)
    if (!origin && process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
      "http://localhost:3000",
      "https://mi-frontend.vercel.app",
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Origin bloqueado por CORS:", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
  ],
};

app.use(cors(corsOptions));

// Manejar preflight
app.options("*", cors(corsOptions));
```

### **❌ Problema: "Memory limit exceeded"**

#### **✅ Solución:**

```javascript
// Optimizar memoria en producción
import compression from "compression";

// Compresión gzip
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// Limitar tamaño de payloads
app.use(
  express.json({
    limit: process.env.MAX_FILE_SIZE || "10mb",
  })
);

// Rate limiting
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.RATE_LIMIT_MAX || 100,
  message: {
    error: "Demasiadas peticiones",
    retryAfter: "15 minutos",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// Garbage collection manual si es necesario
if (process.env.NODE_ENV === "production") {
  setInterval(() => {
    if (global.gc) {
      global.gc();
    }
  }, 30000);
}
```

---

## 📊 Monitoreo y Logs

### **✅ Sistema de logging para producción:**

```javascript
// utils/logger.js
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "mi-api-nodejs" },
  transports: [
    // Errores a archivo
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    // Todo a archivo general
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

// En desarrollo, también mostrar en consola
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;

// En server.js
import logger from "./utils/logger.js";

// Middleware de logging
app.use((req, res, next) => {
  logger.info("Request received", {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  next();
});

// Manejo de errores con logging
app.use((error, req, res, next) => {
  logger.error("Application error", {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  res.status(500).json({
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});
```

### **✅ Health check endpoint:**

```javascript
// Endpoint de salud para monitoreo
app.get("/health", async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: "OK",
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
  };

  try {
    // Verificar conexión a base de datos
    if (mongoose.connection.readyState === 1) {
      healthCheck.database = "Connected";
    } else {
      healthCheck.database = "Disconnected";
      healthCheck.status = "WARNING";
    }

    // Verificar memoria
    const memUsage = process.memoryUsage();
    healthCheck.memory = {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
    };

    res.status(healthCheck.status === "OK" ? 200 : 503).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      ...healthCheck,
      status: "ERROR",
      error: error.message,
    });
  }
});
```

---

## 🔒 Seguridad en Producción

```javascript
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Helmet para headers de seguridad
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https:", "data:", "blob:"],
        "connect-src": ["'self'", "https://api.stripe.com"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Rate limiting más estricto en producción
const productionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.NODE_ENV === "production" ? 50 : 100,
  message: "Demasiadas peticiones desde esta IP",
});

app.use("/api/", productionLimiter);

// Protección especial para endpoints sensibles
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Solo 5 intentos de login por IP cada 15 min
  skipSuccessfulRequests: true,
});

app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);
```

---

_🚀 Actualizado para plataformas de deploy 2025 | Enero 2025_
