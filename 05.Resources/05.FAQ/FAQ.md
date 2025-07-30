# ❓ FAQ - Curso NodeJS 2025

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

---

## 🗄️ Base de Datos

### ¿Cómo debuggear errores de MongoDB con Mongoose v8?

**Error:** `MongoNetworkError: failed to connect`

```bash
# Verificar que MongoDB esté corriendo
# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Windows
services.msc → buscar "MongoDB"
```

**Configuración actualizada para Mongoose v8:**

```javascript
import mongoose from "mongoose";

// ✅ Configuración correcta para v8
await mongoose.connect("mongodb://localhost:27017/miapp");
// No necesitas opciones adicionales en v8

// ❌ Configuración obsoleta (v7 y anteriores)
await mongoose.connect(uri, {
  useNewUrlParser: true, // Ya no necesario
  useUnifiedTopology: true, // Ya no necesario
});
```

### ¿Cómo conectar a MySQL con Sequelize v6.37.7?

```javascript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Desactivar logs SQL

    // Pool optimizado para v6
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Verificar conexión
try {
  await sequelize.authenticate();
  console.log("✅ MySQL conectado");
} catch (error) {
  console.error("❌ Error:", error.message);
}
```

### ¿Por qué mis modelos de Mongoose no validan correctamente?

```javascript
// ❌ Validación que no funciona
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ¡Esto NO es validación!
  },
});

// ✅ Validación correcta
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email es requerido"],
    unique: true, // Índice único en BD
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Email inválido",
    },
  },
});

// Verificar uniqueness manualmente
userSchema.pre("save", async function () {
  if (this.isModified("email")) {
    const exists = await this.constructor.findOne({ email: this.email });
    if (exists && !exists._id.equals(this._id)) {
      throw new Error("Email ya existe");
    }
  }
});
```

---

## 🌐 APIs y Express v5

### ¿Cómo manejar CORS en Express v5.1.0?

```javascript
import cors from "cors";

// ✅ CORS moderno para desarrollo
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://miapp.com"]
        : ["http://localhost:3000", "http://localhost:5173"], // Vite dev server
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### ¿Por qué `req.body` es undefined en Express v5?

```javascript
// ✅ Configuración correcta para Express v5
import express from "express";

const app = express();

// Middlewares OBLIGATORIOS para recibir datos
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Ahora req.body funcionará
app.post("/users", (req, res) => {
  console.log(req.body); // ✅ Funciona
  res.json({ received: req.body });
});
```

### ¿Cómo implementar paginación moderna?

```javascript
// ✅ Paginación optimizada para el curso
const paginate = async (Model, query = {}, options = {}) => {
  const page = Math.max(parseInt(options.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(options.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  // Para Mongoose
  if (Model.find) {
    const [data, total] = await Promise.all([
      Model.find(query)
        .sort(options.sort || { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(options.populate || ""),
      Model.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  // Para Sequelize
  const { count, rows } = await Model.findAndCountAll({
    where: query,
    limit,
    offset: skip,
    order: options.order || [["createdAt", "DESC"]],
    include: options.include || [],
  });

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit),
      hasNext: page < Math.ceil(count / limit),
      hasPrev: page > 1,
    },
  };
};

// Uso en controlador
app.get("/users", async (req, res) => {
  const result = await paginate(User, {}, req.query);
  res.json({ success: true, ...result });
});
```

---

## 🔐 Autenticación JWT

### ¿Cómo implementar JWT moderno y seguro?

```javascript
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ✅ Configuración segura de JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
    issuer: "mi-app",
    audience: "mi-app-users",
  });
};

// ✅ Middleware de autenticación robusto
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Token requerido",
      });
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: "Usuario inválido",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
      });
    }

    return res.status(401).json({
      success: false,
      error: "Token inválido",
    });
  }
};

// ✅ Login seguro con bcrypt
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      });
    }

    const token = generateToken({ userId: user._id });

    // No devolver password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};
```

---

## 🐛 Debugging y Desarrollo

### ¿Cómo debuggear mi código Node.js?

**Método 1: VS Code Debugger (Recomendado)**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server.js",
      "env": {
        "NODE_ENV": "development"
      },
      "restart": true,
      "runtimeArgs": ["--experimental-modules"]
    }
  ]
}
```

**Método 2: Chrome DevTools**

```bash
node --inspect server.js
# Abrir Chrome → chrome://inspect
```

**Método 3: Console.log estratégico**

```javascript
// ✅ Logging informativo
const logger = {
  info: (msg, data) => console.log(`ℹ️  ${msg}`, data || ""),
  error: (msg, error) => console.error(`❌ ${msg}`, error?.message || error),
  debug: (msg, data) => console.log(`🐛 ${msg}`, JSON.stringify(data, null, 2)),
};

app.post("/users", async (req, res) => {
  logger.info("Creating user", { email: req.body.email });

  try {
    const user = await User.create(req.body);
    logger.info("User created successfully", { id: user._id });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    logger.error("Error creating user", error);
    res.status(400).json({ success: false, error: error.message });
  }
});
```

### ¿Cómo probar mis APIs sin Postman?

**Opción 1: Thunder Client (VS Code)**

- Instalar extensión "Thunder Client"
- Crear colecciones de requests
- Integrado en VS Code

**Opción 2: REST Client (VS Code)**

```http
### Crear usuario
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@test.com"
}

### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "juan@test.com",
  "password": "123456"
}

### Obtener usuarios (con token)
GET http://localhost:3000/api/users
Authorization: Bearer {{token}}
```

**Opción 3: cURL**

```bash
# GET
curl http://localhost:3000/api/users

# POST con JSON
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com"}'

# Con autenticación
curl -H "Authorization: Bearer tu_token" \
  http://localhost:3000/api/protected
```

---

## 📁 Estructura de Proyecto

### ¿Cuál es la mejor estructura para mi proyecto del curso?

```
mi-proyecto-node/
├── .env                          # Variables de entorno
├── .gitignore                    # Archivos a ignorar
├── package.json                  # Dependencias y scripts
├── server.js                     # Servidor principal
└── src/
    ├── config/
    │   ├── database.js           # Configuración DB
    ├── controllers/
    │   ├── authController.js     # Lógica de autenticación
    │   ├── userController.js     # Lógica de usuarios
    │   └── productController.js  # Lógica de productos
    ├── middlewares/
    │   ├── auth.js               # Middleware de autenticación
    │   ├── validation.js         # Middleware de validación
    │   └── errorHandler.js       # Manejo global de errores
    ├── models/                   # Modelos de datos
    │   ├── User.js               # Modelo Usuario
    │   ├── Product.js            # Modelo Producto
    │   └── index.js              # Exportar todos los modelos
    ├── routes/
    │   ├── index.js              # Router principal
    │   ├── authRoutes.js         # Rutas de autenticación
    │   ├── userRoutes.js         # Rutas de usuarios
    │   └── productRoutes.js      # Rutas de productos
    └── utils/
        ├── helpers.js            # Funciones auxiliares
        └── constants.js          # Constantes de la app
```

---

## 💡 Mejores Prácticas del Curso

### ¿Dónde guardar información sensible?

**❌ Nunca en el código:**

```javascript
// ¡NO HAGAS ESTO!
const dbPassword = "mi_password_secreto";
const jwtSecret = "mi_jwt_secreto";
```

**✅ Usar variables de entorno:**

```bash
# .env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/miapp
JWT_SECRET=tu_jwt_secreto_muy_largo_y_seguro
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
```

```javascript
// server.js
import dotenv from "dotenv";
dotenv.config();

const dbPassword = process.env.DB_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
```

### ¿Cómo manejar errores de forma consistente?

```javascript
// ✅ Middleware global de errores
const errorHandler = (error, req, res, next) => {
  console.error("🚨 Error:", error);

  let statusCode = 500;
  let message = "Error interno del servidor";

  // Errores específicos de Mongoose
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "ID inválido";
  } else if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue)[0];
    message = `${field} ya existe`;
  }

  // Errores específicos de Sequelize
  else if (error.name === "SequelizeValidationError") {
    statusCode = 400;
    message = error.errors.map((err) => err.message).join(", ");
  } else if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "Recurso ya existe";
  }

  // JWT errors
  else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Token inválido";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expirado";
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

// Usar en server.js (al final)
app.use(errorHandler);
```

---

## 🆘 ¿Aún necesitas ayuda?

### Información útil para reportar problemas:

```bash
# Información del sistema
node --version          # v22.16.0
npm --version          # v10.x.x
cat package.json       # Dependencias del proyecto
```

### Canales de soporte actualizados:

- 💬 **Discord**: [Inadaptados Community](https://discord.com/channels/1326233159670698064/1326236998133874808)
- 📖 **GitHub Issues**: Para bugs del material del curso
- 🤝 **Peer Support**: Canal #nodejs-2025 en Discord
- 📧 **Email**: Para consultas académicas

### Formato para pedir ayuda:

```
🐛 PROBLEMA: [Descripción clara del problema]
📄 ARCHIVO: [Nombre del archivo donde ocurre]
💻 SISTEMA: [macOS/Windows/Linux + versión Node.js]
📦 DEPENDENCIAS: [Versiones de Express, Mongoose, etc.]
🚨 ERROR: [Error completo copiado]
🔍 INTENTÉ: [Qué soluciones ya probaste]
```

---

_FAQ actualizada para Node.js v22.16.0, Express v5.1.0, Mongoose v8.16.3 - Enero 2025_
