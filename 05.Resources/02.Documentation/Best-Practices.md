# ⭐ Mejores Prácticas - Curso NodeJS 2025

> **🎯 Navegación**: [Estructura](#-estructura-de-proyecto) | [Código](#-código-limpio) | [APIs](#-apis-rest) | [Seguridad](#-seguridad) | [Performance](#-rendimiento) | [Testing](#-testing)

## 📖 Índice de Contenidos

- [🏗️ Estructura de Proyecto](#️-estructura-de-proyecto)
- [✨ Código Limpio](#-código-limpio)
- [🌐 APIs REST](#-apis-rest)
- [🔐 Seguridad](#-seguridad)
- [⚡ Rendimiento](#-rendimiento)
- [🧪 Testing](#-testing)
- [📝 Documentación](#-documentación)
- [🚀 Deployment](#-deployment)

---

## 🏗️ Estructura de Proyecto

### **Estructura Recomendada del Curso**

```
mi-proyecto/
├── 📄 package.json
├── 🖥️ server.js              # Punto de entrada
├── ⚙️ .env                   # Variables de entorno
├── 📁 src/
│   ├── 📁 controllers/       # Lógica de negocio
│   │   ├── authController.js
│   │   └── userController.js
│   ├── 📁 models/           # Modelos de datos
│   │   ├── User.js
│   │   └── index.js
│   ├── 📁 routes/           # Definición de rutas
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── 📁 middleware/       # Middleware personalizado
│   │   ├── auth.js
│   │   └── validation.js
│   ├── 📁 config/          # Configuraciones
│   │   └── database.js
│   └── 📁 utils/           # Utilidades
│       └── helpers.js
├── 📁 tests/               # Pruebas
└── 📁 docs/                # Documentación
```

### **Reglas de Organización**

✅ **Hacer**:

```javascript
// ✅ Un archivo por controlador
// controllers/userController.js
export const getUsers = async (req, res) => {
  /* ... */
};
export const createUser = async (req, res) => {
  /* ... */
};

// ✅ Agrupa rutas relacionadas
// routes/userRoutes.js
import { getUsers, createUser } from "../controllers/userController.js";
```

❌ **No hacer**:

```javascript
// ❌ Todo en un archivo
// server.js - 500 líneas de código mezclado
```

---

## ✨ Código Limpio

### **Naming Conventions**

```javascript
// ✅ Variables y funciones: camelCase
const userName = "Juan";
const getUserById = async (id) => {
  /* ... */
};

// ✅ Constantes: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const DATABASE_URL = process.env.DATABASE_URL;

// ✅ Clases y Modelos: PascalCase
class UserService {
  /* ... */
}
const User = sequelize.define("User", {
  /* ... */
});

// ✅ Archivos: kebab-case o camelCase consistente
user - controller.js; // o userController.js (elige uno)
```

### **Async/Await Patterns**

✅ **Patrón Recomendado**:

```javascript
// ✅ Manejo consistente de errores
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
```

❌ **Evitar**:

```javascript
// ❌ Mixing promises and async/await
const createUser = async (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((error) => res.status(400).json({ error }));
};
```

### **Destructuring y ES6+**

```javascript
// ✅ Destructuring en parámetros
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  /* ... */
};

// ✅ Template literals
const message = `Usuario ${name} creado exitosamente`;

// ✅ Arrow functions para callbacks simples
const activeUsers = users.filter((user) => user.active);
```

---

## 🌐 APIs REST

### **Diseño de URLs**

✅ **Buenas URLs**:

```
GET    /api/users              # Obtener todos los usuarios
POST   /api/users              # Crear usuario
GET    /api/users/:id          # Obtener usuario específico
PUT    /api/users/:id          # Actualizar usuario completo
PATCH  /api/users/:id          # Actualizar parcialmente
DELETE /api/users/:id          # Eliminar usuario

# Recursos anidados
GET    /api/users/:id/posts    # Posts de un usuario
POST   /api/users/:id/posts    # Crear post para usuario
```

❌ **URLs problemáticas**:

```
GET /getUsers              # No RESTful
POST /createUser           # Redundante
GET /user/:id/delete       # DELETE con GET
```

### **Responses Consistentes**

✅ **Formato estándar del curso**:

```javascript
// Éxito con datos
res.status(200).json({
  success: true,
  data: users,
  pagination: {
    page: 1,
    limit: 10,
    total: 25,
  },
});

// Error
res.status(400).json({
  success: false,
  error: "Validation failed",
  details: {
    email: "Email is required",
  },
});
```

### **Códigos de Estado HTTP**

```javascript
// ✅ Usa códigos apropiados
res.status(200); // GET exitoso
res.status(201); // POST exitoso (creado)
res.status(204); // DELETE exitoso (sin contenido)
res.status(400); // Bad request (validación)
res.status(401); // No autenticado
res.status(403); // No autorizado
res.status(404); // No encontrado
res.status(500); // Error del servidor
```

---

## 🔐 Seguridad

### **Variables de Entorno**

✅ **Configuración segura**:

```javascript
// .env
DATABASE_URL=mongodb://localhost:27017/miapp
JWT_SECRET=mi-super-secreto-seguro-y-largo-123456
PORT=3000

// config/database.js
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/default';
```

❌ **Nunca hacer**:

```javascript
// ❌ Secretos en el código
const JWT_SECRET = "123456"; // Muy inseguro
const dbUrl = "mongodb://user:password@host/db"; // Expuesto
```

### **Validación de Entrada**

```javascript
// ✅ Validar siempre los datos de entrada
const createUserSchema = {
  name: {
    type: "string",
    minLength: 2,
    maxLength: 50,
    required: true,
  },
  email: {
    type: "string",
    format: "email",
    required: true,
  },
};

const createUser = async (req, res) => {
  const { error, value } = validateSchema(req.body, createUserSchema);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  /* ... */
};
```

### **Middleware de Autenticación**

```javascript
// ✅ Middleware reutilizable
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
};
```

---

## ⚡ Rendimiento

### **Consultas de Base de Datos**

✅ **Optimización con Sequelize**:

```javascript
// ✅ Incluir solo campos necesarios
const users = await User.findAll({
  attributes: ["id", "name", "email"], // Solo campos necesarios
  include: [
    {
      model: Profile,
      attributes: ["avatar", "bio"],
    },
  ],
  limit: 10,
  offset: page * 10,
});
```

✅ **Optimización con Mongoose**:

```javascript
// ✅ Proyección y población selectiva
const users = await User.find({}, "name email") // Solo name y email
  .populate("profile", "avatar bio") // Solo avatar y bio del profile
  .limit(10)
  .skip(page * 10);
```

### **Caching**

```javascript
// ✅ Cache simple en memoria (desarrollo)
const cache = new Map();

const getUserWithCache = async (id) => {
  const cacheKey = `user:${id}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const user = await User.findById(id);
  cache.set(cacheKey, user);

  return user;
};
```

---

## 🧪 Testing

### **Estructura de Tests**

```javascript
// ✅ Tests organizados
// tests/controllers/userController.test.js
import { describe, test, expect } from "jest";
import request from "supertest";
import app from "../../src/app.js";

describe("User Controller", () => {
  describe("POST /api/users", () => {
    test("should create user with valid data", async () => {
      const userData = {
        name: "Juan",
        email: "juan@example.com",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Juan");
    });

    test("should return 400 with invalid data", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({}) // Sin datos requeridos
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
```

---

## 📝 Documentación

### **README.md del Proyecto**

````markdown
# Mi Proyecto NodeJS

## 🚀 Instalación

```bash
npm install
cp .env.example .env
npm run dev
```
````

## 📋 Scripts Disponibles

- `npm run dev` - Desarrollo con nodemon
- `npm test` - Ejecutar tests
- `npm run build` - Build para producción

## 📡 API Endpoints

- `GET /api/users` - Obtener usuarios
- `POST /api/users` - Crear usuario

````

### **Comentarios en Código**

```javascript
/**
 * Crea un nuevo usuario en el sistema
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Usuario creado o error
 */
const createUser = async (req, res) => {
  // Validar datos de entrada
  const { error, value } = validateUserData(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const user = await User.create(value);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
````

---

## 🚀 Deployment

### **Scripts de Package.json**

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "echo 'No build step needed'",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

### **Variables de Entorno para Producción**

```bash
# .env.production
NODE_ENV=production
PORT=8080
DATABASE_URL=mongodb+srv://...
JWT_SECRET=super-secret-production-key
```

---

## 📊 Checklist de Calidad

### Antes de Hacer Commit

- [ ] ✅ Código formateado y sin errores de lint
- [ ] ✅ Tests pasan
- [ ] ✅ Variables sensibles en .env
- [ ] ✅ Console.log removidos (usar logger en producción)
- [ ] ✅ Comentarios actualizados

### Antes de Deploy

- [ ] ✅ Tests de integración pasan
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Base de datos migrada
- [ ] ✅ Documentación actualizada

---

_🎯 Sigue estas prácticas para código mantenible y profesional | 📅 Actualizado Julio 2025_
