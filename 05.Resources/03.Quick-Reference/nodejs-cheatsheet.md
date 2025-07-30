# 🟢 Node.js v22.16.0 - Referencia Rápida

> **🎯 Navegación**: [Módulos](#-módulos-es6) | [File System](#-file-system) | [Variables](#-variables-de-entorno) | [Debugging](#-debugging) | [Performance](#-performance)

## 🚀 Configuración Inicial (2025)

```javascript
// package.json - Configuración moderna
{
  "name": "mi-proyecto-nodejs",
  "version": "1.0.0",
  "type": "module", // ✅ OBLIGATORIO para ES6 modules
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

// server.js - Punto de entrada
import { createServer } from 'http';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
```

## 📦 Módulos ES6 (Import/Export)

```javascript
// ✅ Exportaciones modernas
// utils/helpers.js
export const formatDate = (date) => date.toISOString();
export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Exportación por defecto
export default class Logger {
  static info(message) {
    console.log(`ℹ️ ${message}`);
  }
}

// ✅ Importaciones modernas
// server.js
import express from "express"; // Default import
import { formatDate, validateEmail } from "./utils/helpers.js"; // Named imports
import Logger from "./utils/Logger.js"; // Default import
import * as helpers from "./utils/helpers.js"; // Namespace import

// ✅ Importaciones dinámicas
const loadModule = async () => {
  const { default: bcrypt } = await import("bcrypt");
  return bcrypt;
};

// ✅ Importaciones condicionales
if (process.env.NODE_ENV === "development") {
  const { default: morgan } = await import("morgan");
  app.use(morgan("dev"));
}
```

## 📁 File System (fs/promises)

```javascript
import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ✅ __dirname equivalent en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer archivos
const readFile = async (filename) => {
  try {
    const filePath = join(__dirname, "data", filename);
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo archivo:", error.message);
    return null;
  }
};

// Escribir archivos
const writeFile = async (filename, data) => {
  try {
    const filePath = join(__dirname, "data", filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log("✅ Archivo guardado");
  } catch (error) {
    console.error("❌ Error escribiendo archivo:", error.message);
  }
};

// Verificar si archivo existe
const fileExists = async (filename) => {
  try {
    await fs.access(join(__dirname, filename));
    return true;
  } catch {
    return false;
  }
};

// Listar archivos de directorio
const listFiles = async (directory) => {
  try {
    const files = await fs.readdir(join(__dirname, directory));
    return files.filter((file) => !file.startsWith("."));
  } catch (error) {
    console.error("Error listando archivos:", error.message);
    return [];
  }
};

// Crear directorio si no existe
const ensureDir = async (directory) => {
  try {
    await fs.mkdir(join(__dirname, directory), { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
};
```

## ⚙️ Variables de Entorno

```javascript
// .env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/miapp
JWT_SECRET=mi-super-secreto-seguro
API_KEY=sk-1234567890

// config/environment.js
import { config } from 'dotenv';

// Cargar variables de entorno
config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY: process.env.API_KEY,

  // Configuraciones derivadas
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test'
};

// Validar variables requeridas
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingVars);
  process.exit(1);
}

// Uso en otros archivos
import { ENV } from './config/environment.js';
console.log(`Servidor en modo: ${ENV.NODE_ENV}`);
```

## 🐛 Debugging y Logging

```javascript
// utils/logger.js
import { createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class Logger {
  constructor() {
    this.logStream = createWriteStream(join(__dirname, "../logs/app.log"), {
      flags: "a",
    });
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
      pid: process.pid,
    };

    // Console output con colores
    const colors = {
      INFO: "\x1b[32m", // Verde
      WARN: "\x1b[33m", // Amarillo
      ERROR: "\x1b[31m", // Rojo
      DEBUG: "\x1b[36m", // Cyan
    };

    console.log(
      `${colors[level]}[${timestamp}] ${level}: ${message}\x1b[0m`,
      data ? data : ""
    );

    // Escribir a archivo
    this.logStream.write(JSON.stringify(logEntry) + "\n");
  }

  info(message, data) {
    this.log("INFO", message, data);
  }
  warn(message, data) {
    this.log("WARN", message, data);
  }
  error(message, data) {
    this.log("ERROR", message, data);
  }
  debug(message, data) {
    this.log("DEBUG", message, data);
  }
}

export default new Logger();

// Uso
import logger from "./utils/logger.js";

logger.info("Servidor iniciado", { port: 3000 });
logger.error("Error en base de datos", { error: error.message });

// Debug con NODE_DEBUG
// Ejecutar: NODE_DEBUG=app node server.js
import { debuglog } from "util";
const debug = debuglog("app");

debug("Información de debug solo visible con NODE_DEBUG=app");
```

## 🔄 Procesos y Señales

```javascript
// Manejo graceful de shutdown
const gracefulShutdown = (server) => {
  const signals = ["SIGTERM", "SIGINT"];

  signals.forEach((signal) => {
    process.on(signal, async () => {
      console.log(`\n📱 Señal ${signal} recibida. Cerrando servidor...`);

      // Cerrar servidor HTTP
      server.close(async () => {
        console.log("🔌 Servidor HTTP cerrado");

        try {
          // Cerrar conexiones de base de datos
          await mongoose.connection.close();
          console.log("🗄️ Conexión a MongoDB cerrada");

          console.log("✅ Aplicación cerrada correctamente");
          process.exit(0);
        } catch (error) {
          console.error("❌ Error cerrando aplicación:", error);
          process.exit(1);
        }
      });
    });
  });
};

// Uso
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});

gracefulShutdown(server);

// Manejo de errores no capturados
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
```

## 🚀 Performance y Monitoreo

```javascript
// Middleware de timing
const performanceMiddleware = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1000000; // Convert to milliseconds

    console.log(`⏱️ ${req.method} ${req.url} - ${duration.toFixed(2)}ms`);
  });

  next();
};

// Memory usage monitoring
const memoryUsage = () => {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024) + " MB",
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + " MB",
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + " MB",
    external: Math.round(usage.external / 1024 / 1024) + " MB",
  };
};

// Endpoint de health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: memoryUsage(),
    pid: process.pid,
    version: process.version,
    env: process.env.NODE_ENV,
  });
});

// CPU profiling (desarrollo)
if (process.env.NODE_ENV === "development") {
  let cpuUsage = process.cpuUsage();

  setInterval(() => {
    const newCpuUsage = process.cpuUsage(cpuUsage);
    console.log("🖥️ CPU Usage:", {
      user: newCpuUsage.user / 1000000,
      system: newCpuUsage.system / 1000000,
    });
    cpuUsage = process.cpuUsage();
  }, 10000);
}
```

## 🛠️ Utilidades Comunes

```javascript
// utils/asyncHandler.js - Wrapper para async/await
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// utils/validation.js - Validaciones
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

export const sanitizeString = (str) => {
  return str.trim().replace(/[<>]/g, "");
};

// utils/crypto.js - Utilidades de encriptación
import crypto from "crypto";

export const generateHash = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

export const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

// utils/date.js - Utilidades de fechas
export const formatDate = (date, locale = "es-ES") => {
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isExpired = (date) => {
  return new Date(date) < new Date();
};
```

## 📊 Buffer y Streams

```javascript
// Trabajar con Buffers
const createBuffer = (text) => {
  return Buffer.from(text, "utf8");
};

const bufferToString = (buffer) => {
  return buffer.toString("utf8");
};

// Streams para archivos grandes
import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";

// Stream de transformación personalizado
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

// Procesar archivo grande línea por línea
const processLargeFile = async (inputFile, outputFile) => {
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);

  readStream.pipe(upperCaseTransform).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};
```

## 🔧 Configuración de Desarrollo vs Producción

```javascript
// config/index.js
import { ENV } from "./environment.js";

const baseConfig = {
  cors: {
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // requests por ventana
  },
};

const developmentConfig = {
  ...baseConfig,
  cors: {
    ...baseConfig.cors,
    origin: ["http://localhost:3000", "http://localhost:5173"],
  },
  logging: {
    level: "debug",
    console: true,
    file: false,
  },
};

const productionConfig = {
  ...baseConfig,
  cors: {
    ...baseConfig.cors,
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  },
  logging: {
    level: "info",
    console: false,
    file: true,
  },
  rateLimiting: {
    ...baseConfig.rateLimiting,
    max: 50, // Más restrictivo en producción
  },
};

export const config = ENV.IS_PRODUCTION ? productionConfig : developmentConfig;
```

## 🚫 Errores Comunes y Soluciones

```javascript
// ❌ Problema: require() no funciona
const express = require("express"); // Error en ES6 modules

// ✅ Solución: Usar import
import express from "express";

// ❌ Problema: __dirname no definido en ES6 modules
console.log(__dirname); // Error

// ✅ Solución: Crear __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ❌ Problema: Importar JSON directamente
import data from "./data.json"; // Puede causar problemas

// ✅ Solución: Leer JSON como archivo
import { readFileSync } from "fs";
import { join } from "path";
const data = JSON.parse(readFileSync(join(__dirname, "data.json"), "utf8"));

// ❌ Problema: No manejar errores async
app.get("/users", async (req, res) => {
  const users = await User.find(); // Si falla, crash
  res.json(users);
});

// ✅ Solución: Usar try/catch o asyncHandler
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  })
);
```

---

_🟢 Actualizado para Node.js v22.16.0 y ES6 Modules | Enero 2025_
