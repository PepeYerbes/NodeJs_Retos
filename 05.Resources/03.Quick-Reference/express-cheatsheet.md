# ⚡ Express.js v5.1.0 - Referencia Rápida

## 🚀 Configuración Básica (Actualizada 2025)

```javascript
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares esenciales
app.use(express.json({ limit: "10mb" })); // JSON parser
app.use(express.urlencoded({ extended: true })); // Form parser
app.use(express.static("public")); // Archivos estáticos

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

## 🛣️ Rutas CRUD Completas

```javascript
// GET - Listar recursos
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Recurso específico
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Crear recurso
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT - Actualizar recurso completo
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PATCH - Actualizar recurso parcial
app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE - Eliminar recurso
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## 📦 Parámetros y Queries

```javascript
// Parámetros de ruta múltiples
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Query parameters con validación
app.get("/search", (req, res) => {
  const {
    q,
    limit = 10,
    page = 1,
    sort = "createdAt",
    order = "desc",
  } = req.query;

  // Validaciones
  const limitNum = Math.min(Math.max(parseInt(limit), 1), 100);
  const pageNum = Math.max(parseInt(page), 1);

  res.json({
    query: q,
    pagination: { limit: limitNum, page: pageNum },
    sorting: { sort, order },
  });
});

// Parámetros opcionales con regex
app.get("/files/:filename([\\w\\-\\.]+)", (req, res) => {
  const { filename } = req.params;
  res.json({ filename });
});
```

## 🔧 Middlewares Avanzados

```javascript
// Middleware de logging personalizado
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, ip } = req;
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
};

// Middleware de autenticación
const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware de validación
const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Nombre debe tener al menos 2 caracteres" });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  next();
};

// Uso de middlewares
app.use(logger); // Global
app.post("/users", validateUser, authenticate, createUser); // Específico
```

## 📁 Router Modular Avanzado

```javascript
// routes/users.js
import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate, validateUser } from "../middlewares/auth.js";

const router = express.Router();

// Middleware específico del router
router.use(authenticate); // Todas las rutas requieren autenticación

// Rutas con middlewares específicos
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;

// server.js
import userRoutes from "./routes/users.js";
app.use("/api/v1/users", userRoutes);
```

## 🔗 Códigos de Respuesta con Estructura Consistente

```javascript
// Estructura de respuesta estándar
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  res.status(statusCode).json({
    success,
    data,
    error,
    timestamp: new Date().toISOString(),
  });
};

// Uso en controladores
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendResponse(res, 200, true, users);
  } catch (error) {
    sendResponse(res, 500, false, null, "Error interno del servidor");
  }
};
```

## 📋 Headers y CORS (Express v5)

```javascript
import cors from "cors";

// CORS básico
app.use(cors());

// CORS personalizado
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://miapp.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Headers de seguridad
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
```

## ⚠️ Manejo de Errores (Express v5)

```javascript
// Middleware global de errores (debe ir al final)
app.use((error, req, res, next) => {
  console.error("🚨 Error:", error);

  // Error de validación de Mongoose
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      success: false,
      error: "Errores de validación",
      details: errors,
    });
  }

  // Error de Mongoose CastError
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "ID inválido",
    });
  }

  // Error de clave duplicada
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: `${field} ya existe`,
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

// Middleware para rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Ruta ${req.originalUrl} no encontrada`,
  });
});
```

## 🚀 Nuevas Features de Express v5

```javascript
// Async error handling automático (Express v5)
app.get("/users", async (req, res) => {
  // No necesitas try/catch, Express v5 maneja automáticamente
  const users = await User.find();
  res.json(users);
});

// Router con async/await mejorado
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("Usuario no encontrado");
    res.json(user);
  })
);
```

## 📊 Paginación Avanzada

```javascript
const paginate = async (Model, query = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = Math.min(parseInt(options.limit) || 10, 100);
  const skip = (page - 1) * limit;

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
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

// Uso
app.get("/users", async (req, res) => {
  const result = await paginate(User, {}, req.query);
  res.json({ success: true, ...result });
});
```

## 🔍 Búsqueda y Filtros

```javascript
app.get("/users/search", async (req, res) => {
  const { q, role, isActive, dateFrom, dateTo } = req.query;

  let filter = {};

  // Búsqueda de texto
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ];
  }

  // Filtros específicos
  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === "true";

  // Filtro de fechas
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  const users = await User.find(filter);
  res.json({ success: true, data: users });
});
```

---

_Actualizado para Express v5.1.0 y Node.js v22.16.0 - Enero 2025_
