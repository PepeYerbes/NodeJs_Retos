# 📖 Glosario de Términos - Curso NodeJS

> **🔍 Navegación Rápida**: [A-D](#a) | [E-H](#e) | [I-M](#i) | [N-Q](#n) | [R-S](#r) | [T-Z](#v) | [📋 Índice Temático](#-índice-temático)

## 📋 Índice Temático

### 🌐 **APIs y Web**

[API](#api-application-programming-interface) | [CORS](#cors-cross-origin-resource-sharing) | [Endpoint](#endpoint) | [HTTP Methods](#http-methods) | [REST](#rest-representational-state-transfer)

### 🗄️ **Bases de Datos**

[MongoDB](#mongodb) | [MySQL](#mysql) | [ORM](#orm-object-relational-mapping) | [ODM](#odm-object-document-mapper) | [Sequelize](#sequelize) | [Mongoose](#mongoose)

### ⚙️ **Node.js y Express**

[Node.js](#nodejs) | [Express.js](#expressjs) | [Middleware](#middleware) | [Router](#router) | [npm](#npm-node-package-manager)

### 🔧 **Desarrollo**

[Async/Await](#asyncawait) | [Controller](#controller) | [Model](#model) | [Promise](#promise) | [JWT](#jwt-json-web-token)

---

## A

### **API (Application Programming Interface)**

- **Definición**: Conjunto de reglas y protocolos que permite la comunicación entre diferentes aplicaciones o servicios.
- **Ejemplo en el curso**:

```javascript
// API REST básica
app.get("/api/usuarios", (req, res) => {
  res.json({ usuarios: [] });
});
```

- **Ver también**: [REST](#rest-representational-state-transfer), [Endpoint](#endpoint)

### **Async/Await**

- **Definición**: Sintaxis para manejar operaciones asíncronas de manera más legible que las promesas tradicionales.
- **Ejemplo en el curso**:

```javascript
// Patrón usado en todo el curso
const obtenerUsuario = async (id) => {
  try {
    const usuario = await Usuario.findById(id);
    return usuario;
  } catch (error) {
    throw new Error("Usuario no encontrado");
  }
};
```

- **Ver también**: [Promise](#promise)

### **Associations (Sequelize)**

- **Definición**: Relaciones entre modelos en Sequelize: `hasMany`, `belongsTo`, `hasOne`, `belongsToMany`.
- **Ejemplo en el curso**:

```javascript
// Relación uno a muchos
Usuario.hasMany(Publicacion);
Publicacion.belongsTo(Usuario);
```

---

## B

### **Body Parser**

- **Definición**: Middleware que analiza el cuerpo de las peticiones HTTP para extraer datos JSON, formularios, etc.
- **Ejemplo en el curso**:

```javascript
// Express 5.x incluye body parser
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios
```

---

## C

### **Controller**

- **Definición**: Capa que contiene la lógica de negocio y maneja las peticiones HTTP, conectando rutas con modelos.
- **Ejemplo en el curso**:

```javascript
// controllers/usuarioController.js
export const crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

- **Ver también**: [Model](#model), [Router](#router)

### **CORS (Cross-Origin Resource Sharing)**

- **Definición**: Mecanismo que permite que recursos restringidos en una página web sean solicitados desde otro dominio.
- **Ejemplo en el curso**:

```javascript
import cors from "cors";
app.use(cors()); // Permite todos los orígenes
```

### **CRUD**

- **Definición**: Create, Read, Update, Delete - Operaciones básicas de manipulación de datos.
- **Ejemplo en el curso**:

```javascript
// Patrón CRUD completo
POST   /usuarios     // Create
GET    /usuarios     // Read (todos)
GET    /usuarios/:id // Read (uno)
PUT    /usuarios/:id // Update
DELETE /usuarios/:id // Delete
```

---

## D

### **DataTypes (Sequelize)**

- **Definición**: Tipos de datos definidos en Sequelize: `STRING`, `INTEGER`, `DATE`, `BOOLEAN`, etc.
- **Ejemplo en el curso**:

```javascript
const Usuario = sequelize.define("Usuario", {
  nombre: DataTypes.STRING,
  edad: DataTypes.INTEGER,
  activo: DataTypes.BOOLEAN,
  fechaCreacion: DataTypes.DATE,
});
```

---

## E

### **Endpoint**

- **Definición**: URL específica donde una API puede ser accedida por un cliente.
- **Ejemplo en el curso**:

```javascript
// Diferentes endpoints
app.get("/api/usuarios", obtenerUsuarios); // Endpoint GET
app.post("/api/usuarios", crearUsuario); // Endpoint POST
app.put("/api/usuarios/:id", actualizarUsuario); // Endpoint PUT
```

### **Express.js**

- **Definición**: Framework web para Node.js que simplifica la creación de servidores y APIs.
- **Ejemplo en el curso**:

```javascript
import express from "express";
const app = express();

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
```

---

## F

### **Foreign Key**

- **Definición**: Campo en una tabla que hace referencia a la clave primaria de otra tabla, estableciendo relaciones.
- **Ejemplo en el curso**:

```javascript
// Clave foránea en Sequelize
const Publicacion = sequelize.define("Publicacion", {
  titulo: DataTypes.STRING,
  contenido: DataTypes.TEXT,
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Usuarios", // nombre de la tabla
      key: "id",
    },
  },
});
```

---

## H

### **HTTP Methods**

- **Definición**: Verbos que indican la acción a realizar: GET, POST, PUT, DELETE, PATCH.
- **Ejemplo en el curso**:

```javascript
// Uso de métodos HTTP
app.get("/api/usuarios", obtenerUsuarios); // GET para obtener
app.post("/api/usuarios", crearUsuario); // POST para crear
app.put("/api/usuarios/:id", actualizarUsuario); // PUT para actualizar
app.delete("/api/usuarios/:id", eliminarUsuario); // DELETE para eliminar
```

---

## I

### **Include (Sequelize)**

- **Definición**: Función para cargar datos relacionados (equivalente a JOIN en SQL).
- **Ejemplo en el curso**:

```javascript
// Incluir datos relacionados
const usuarioConPublicaciones = await Usuario.findByPk(1, {
  include: Publicacion,
});
```

---

## J

### **JSON (JavaScript Object Notation)**

- **Definición**: Formato de intercambio de datos ligero y fácil de leer.
- **Ejemplo en el curso**:

```javascript
// Respuesta en formato JSON
res.json({ mensaje: "Hola Mundo" });
```

- **Ver también**: [API](#api-application-programming-interface)

### **JWT (JSON Web Token)**

- **Definición**: Estándar para crear tokens de acceso que pueden ser verificados y confiables.
- **Ejemplo en el curso**:

```javascript
import jwt from "jsonwebtoken";

// Crear un token
const token = jwt.sign({ id: usuario.id }, "secreto", { expiresIn: "1h" });

// Verificar un token
jwt.verify(token, "secreto", (err, decoded) => {
  if (err) return res.status(401).send("Token inválido");
  req.usuarioId = decoded.id;
});
```

- **Ver también**: [Middleware](#middleware)

---

## M

### **Middleware**

- **Definición**: Función que se ejecuta entre la petición y la respuesta, puede modificar req, res o terminar el ciclo.
- **Ejemplo en el curso**:

```javascript
// Middleware de ejemplo
app.use((req, res, next) => {
  console.log(`Nueva petición: ${req.method} ${req.url}`);
  next(); // Llama al siguiente middleware o ruta
});
```

- **Ver también**: [Router](#router)

### **Model**

- **Definición**: Representación de una tabla de base de datos con sus campos, validaciones y relaciones.
- **Ejemplo en el curso**:

```javascript
// Definición de un modelo en Sequelize
const Usuario = sequelize.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
```

- **Ver también**: [Controller](#controller)

### **MongoDB**

- **Definición**: Base de datos NoSQL orientada a documentos.
- **Ejemplo en el curso**:

```javascript
// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/miapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

- **Ver también**: [Mongoose](#mongoose)

### **Mongoose**

- **Definición**: ODM (Object Document Mapper) para MongoDB y Node.js.
- **Ejemplo en el curso**:

```javascript
// Definición de un esquema y modelo en Mongoose
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
```

- **Ver también**: [MongoDB](#mongodb)

### **MySQL**

- **Definición**: Sistema de gestión de bases de datos relacionales.
- **Ejemplo en el curso**:

```javascript
// Conexión a MySQL con Sequelize
const sequelize = new Sequelize(
  "mysql://usuario:contraseña@localhost:3306/miapp"
);
```

- **Ver también**: [Sequelize](#sequelize)

---

## N

### **Node.js**

- **Definición**: Entorno de ejecución para JavaScript del lado del servidor.
- **Ejemplo en el curso**:

```javascript
// Archivo principal de una app Node.js
import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose.connect("mongodb://localhost:27017/miapp");

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
```

- **Ver también**: [npm](#npm-node-package-manager)

### **npm (Node Package Manager)**

- **Definición**: Gestor de paquetes para Node.js.
- **Ejemplo en el curso**:

```bash
# Instalar un paquete
npm install express

# Iniciar la aplicación
npm start
```

---

## O

### **ODM (Object Document Mapper)**

- **Definición**: Herramienta que mapea documentos de base de datos a objetos en el código (ej: Mongoose).
- **Ejemplo en el curso**:

```javascript
// Uso de ODM en Mongoose
const nuevoUsuario = new Usuario({
  nombre: "Juan",
  email: "juan@example.com",
  password: "123456",
});

await nuevoUsuario.save();
```

- **Ver también**: [MongoDB](#mongodb), [Mongoose](#mongoose)

### **ORM (Object-Relational Mapping)**

- **Definición**: Herramienta que mapea tablas de base de datos relacionales a objetos (ej: Sequelize).
- **Ejemplo en el curso**:

```javascript
// Uso de ORM en Sequelize
const nuevoUsuario = await Usuario.create({
  nombre: "Juan",
  email: "juan@example.com",
  password: "123456",
});
```

- **Ver también**: [MySQL](#mysql), [Sequelize](#sequelize)

---

## P

### **Populate (Mongoose)**

- **Definición**: Método para cargar documentos relacionados automáticamente.
- **Ejemplo en el curso**:

```javascript
// Usando populate en una consulta
const usuario = await Usuario.findById(usuarioId).populate("publicaciones");
```

- **Ver también**: [Associations](#associations-sequelize)

### **Promise**

- **Definición**: Objeto que representa la eventual finalización o falla de una operación asíncrona.
- **Ejemplo en el curso**:

```javascript
// Uso de promesas
const obtenerUsuario = (id) => {
  return new Promise((resolve, reject) => {
    Usuario.findById(id, (err, usuario) => {
      if (err) reject(err);
      else resolve(usuario);
    });
  });
};
```

- **Ver también**: [Async/Await](#asyncawait)

---

## Q

### **Query Parameters**

- **Definición**: Parámetros enviados en la URL después del símbolo `?` (ej: `?nombre=Juan&edad=25`).
- **Ejemplo en el curso**:

```javascript
// Acceder a query parameters
app.get("/api/usuarios", (req, res) => {
  const { nombre, edad } = req.query;
});
```

---

## R

### **REST (Representational State Transfer)**

- **Definición**: Estilo arquitectónico para diseñar servicios web.
- **Ejemplo en el curso**:

```javascript
// Ejemplo de servicio REST
app.get("/api/usuarios", obtenerUsuarios); // GET para obtener
app.post("/api/usuarios", crearUsuario); // POST para crear
app.put("/api/usuarios/:id", actualizarUsuario); // PUT para actualizar
app.delete("/api/usuarios/:id", eliminarUsuario); // DELETE para eliminar
```

- **Ver también**: [API](#api-application-programming-interface)

### **Route Parameters**

- **Definición**: Parámetros dinámicos en la URL (ej: `/users/:id`).
- **Ejemplo en el curso**:

```javascript
// Definir una ruta con parámetros
app.get("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
});
```

### **Router**

- **Definición**: Módulo de Express que permite crear rutas modulares y montables.
- **Ejemplo en el curso**:

```javascript
// Definición de rutas con Router
const usuarioRouter = Router();

usuarioRouter.get("/", obtenerUsuarios);
usuarioRouter.post("/", crearUsuario);

app.use("/api/usuarios", usuarioRouter);
```

- **Ver también**: [Middleware](#middleware)

---

## S

### **Schema (Mongoose)**

- **Definición**: Estructura que define la forma de los documentos en una colección.
- **Ejemplo en el curso**:

```javascript
// Definición de un esquema en Mongoose
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

- **Ver también**: [Model](#model)

### **Sequelize**

- **Definición**: ORM para Node.js que soporta PostgreSQL, MySQL, MariaDB, SQLite y Microsoft SQL Server.
- **Ejemplo en el curso**:

```javascript
import { Sequelize, DataTypes } from "sequelize";

// Conexión a la base de datos
const sequelize = new Sequelize(
  "mysql://usuario:contraseña@localhost:3306/miapp"
);

// Definición de un modelo
const Usuario = sequelize.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
```

- **Ver también**: [MySQL](#mysql), [ORM](#orm-object-relational-mapping)

---

## V

### **Validations**

- **Definición**: Reglas que aseguran que los datos cumplan ciertos criterios antes de ser guardados.
- **Ejemplo en el curso**:

```javascript
// Validaciones en el modelo de Sequelize
const Usuario = sequelize.define(
  "Usuario",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    validate: {
      esEmailValido() {
        if (!this.email.includes("@")) {
          throw new Error("El email debe ser válido");
        }
      },
    },
  }
);
```

---

## W

### **Webhook**

- **Definición**: Método para que una aplicación proporcione información a otras aplicaciones en tiempo real.
- **Ejemplo en el curso**:

```javascript
// Configuración de un webhook
app.post("/webhook/pagos", (req, res) => {
  const { id, estado } = req.body;
  // Procesar el pago...
  res.sendStatus(200);
});
```
