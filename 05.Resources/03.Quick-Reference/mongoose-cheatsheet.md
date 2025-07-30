# ⚡ Mongoose v8.16.3 - Referencia Rápida

## 🔌 Conexión (Mongoose v8 Actualizada)

```javascript
import mongoose from "mongoose";

// Configuración simple y moderna
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/miapp"
    );
    console.log("✅ MongoDB conectado con Mongoose v8");
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    process.exit(1);
  }
};

// Eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("🚨 Error de conexión:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose desconectado");
});

connectDB();
```

## 📋 Schemas Modernos (v8)

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Tipos básicos
    name: {
      type: String,
      required: [true, "Nombre es requerido"],
      trim: true,
      minlength: [2, "Nombre mínimo 2 caracteres"],
      maxlength: [50, "Nombre máximo 50 caracteres"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Email inválido",
      },
    },

    // Números con validación
    age: {
      type: Number,
      min: [0, "Edad no puede ser negativa"],
      max: [120, "Edad máxima 120 años"],
      validate: {
        validator: Number.isInteger,
        message: "Edad debe ser un número entero",
      },
    },

    // Enums
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "moderator"],
        message: "Rol debe ser: user, admin o moderator",
      },
      default: "user",
    },

    // Arrays
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Objetos embebidos
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      zipCode: { type: String, match: /^\d{5}$/ },
    },

    // Fechas
    birthDate: {
      type: Date,
      validate: {
        validator: function (date) {
          return date < new Date();
        },
        message: "Fecha de nacimiento debe ser en el pasado",
      },
    },

    // Booleanos
    isActive: {
      type: Boolean,
      default: true,
    },

    // Campos automáticos
    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Opciones del schema
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false, // Desactiva __v
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Virtual properties
userSchema.virtual("fullInfo").get(function () {
  return `${this.name} (${this.email})`;
});

// Índices para optimización
userSchema.index({ email: 1 });
userSchema.index({ name: 1, role: 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model("User", userSchema);
export default User;
```

## 🔗 Relaciones y Referencias

```javascript
// Schema con referencias
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Referencia a User
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Array de referencias
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    // Referencia con validación personalizada
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      validate: {
        validator: async function (value) {
          const category = await mongoose.model("Category").findById(value);
          return category && category.isActive;
        },
        message: "Categoría inválida o inactiva",
      },
    },
  },
  { timestamps: true }
);

// Populate con opciones avanzadas
const posts = await Post.find()
  .populate("author", "name email") // Solo campos específicos
  .populate({
    path: "tags",
    select: "name color",
    match: { isActive: true }, // Solo tags activos
  })
  .populate({
    path: "category",
    populate: { path: "parent", select: "name" }, // Populate anidado
  });
```

## 📊 Operaciones CRUD Avanzadas

```javascript
// CREATE - Múltiples opciones
const user1 = new User({ name: "Juan", email: "juan@test.com" });
await user1.save();

const user2 = await User.create({ name: "Ana", email: "ana@test.com" });

const users = await User.insertMany([
  { name: "Carlos", email: "carlos@test.com" },
  { name: "María", email: "maria@test.com" },
]);

// READ - Consultas avanzadas
const users = await User.find({
  role: "admin",
  isActive: true,
  age: { $gte: 18, $lte: 65 },
})
  .select("name email role -_id") // Campos específicos
  .sort({ createdAt: -1 }) // Ordenamiento
  .limit(10) // Límite
  .skip(20) // Saltar registros
  .lean(); // Objetos planos (más rápido)

// READ - Agregaciones
const stats = await User.aggregate([
  { $match: { isActive: true } },
  {
    $group: {
      _id: "$role",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
    },
  },
  { $sort: { count: -1 } },
]);

// UPDATE - Opciones avanzadas
const user = await User.findByIdAndUpdate(
  id,
  {
    $set: { name: "Nuevo Nombre" },
    $inc: { loginCount: 1 },
    $push: { skills: "JavaScript" },
  },
  {
    new: true, // Retorna documento actualizado
    runValidators: true, // Ejecuta validaciones
    upsert: false, // No crear si no existe
  }
);

// UPDATE - Bulk operations
await User.updateMany({ role: "user" }, { $set: { updatedAt: new Date() } });

// DELETE - Soft delete
userSchema.add({ deletedAt: { type: Date, default: null } });

const softDelete = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
};

// Query solo documentos no eliminados
userSchema.pre(/^find/, function () {
  this.where({ deletedAt: { $ne: null } });
});
```

## 🔍 Consultas Avanzadas y Filtros

```javascript
// Búsqueda de texto con índices
userSchema.index({
  name: "text",
  email: "text",
});

const searchUsers = await User.find({
  $text: { $search: "juan developer" },
}).select({ score: { $meta: "textScore" } });

// Consultas complejas
const complexQuery = await User.find({
  $and: [
    { age: { $gte: 18 } },
    {
      $or: [{ role: "admin" }, { role: "moderator" }],
    },
    {
      $expr: {
        $gt: [
          { $dayOfYear: "$createdAt" },
          { $dayOfYear: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        ],
      },
    },
  ],
});

// Consultas con regex
const usersByPattern = await User.find({
  email: { $regex: /gmail\.com$/i },
  name: { $regex: /^a/i }, // Nombres que empiecen con 'a'
});

// Consultas geoespaciales
const locationSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

locationSchema.index({ location: "2dsphere" });

// Buscar cerca de una ubicación
const nearbyLocations = await Location.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
      $maxDistance: 1000, // metros
    },
  },
});
```

## ✅ Validaciones Avanzadas

```javascript
// Validaciones asíncronas
userSchema.path("email").validate(async function (email) {
  const user = await this.constructor.findOne({ email });
  return !user || user._id.equals(this._id);
}, "Email ya existe");

// Validaciones condicionales
userSchema.path("phoneNumber").validate(function (phone) {
  if (this.role === "admin") {
    return phone && phone.length >= 10;
  }
  return true;
}, "Administradores deben tener teléfono");

// Validaciones personalizadas complejas
userSchema.pre("save", function (next) {
  if (this.age < 18 && this.role === "admin") {
    return next(new Error("Administradores deben ser mayores de edad"));
  }
  next();
});
```

## 🔧 Middleware y Hooks

```javascript
// Pre-save middleware
userSchema.pre("save", async function (next) {
  // Solo ejecutar si password fue modificado
  if (!this.isModified("password")) return next();

  // Hash password
  const bcrypt = await import("bcrypt");
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Post-save middleware
userSchema.post("save", function (doc, next) {
  console.log(`Usuario ${doc.name} guardado con ID: ${doc._id}`);
  next();
});

// Pre-remove middleware
userSchema.pre("deleteOne", { document: true }, async function (next) {
  // Eliminar posts relacionados
  await mongoose.model("Post").deleteMany({ author: this._id });
  next();
});

// Error handling middleware
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email ya existe"));
  } else {
    next(error);
  }
});
```

## 📊 Agregaciones Potentes

```javascript
// Pipeline de agregación complejo
const userStats = await User.aggregate([
  // Filtro inicial
  { $match: { isActive: true } },

  // Agregar campo calculado
  {
    $addFields: {
      ageGroup: {
        $switch: {
          branches: [
            { case: { $lt: ["$age", 18] }, then: "menor" },
            { case: { $lt: ["$age", 30] }, then: "joven" },
            { case: { $lt: ["$age", 50] }, then: "adulto" },
          ],
          default: "senior",
        },
      },
    },
  },

  // Agrupar por rol y grupo de edad
  {
    $group: {
      _id: { role: "$role", ageGroup: "$ageGroup" },
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
      users: { $push: { name: "$name", email: "$email" } },
    },
  },

  // Ordenar resultados
  { $sort: { "_id.role": 1, count: -1 } },

  // Reformatear salida
  {
    $project: {
      _id: 0,
      role: "$_id.role",
      ageGroup: "$_id.ageGroup",
      statistics: {
        count: "$count",
        averageAge: { $round: ["$avgAge", 1] },
      },
      users: 1,
    },
  },
]);

// Lookup (JOIN) con otras colecciones
const usersWithPosts = await User.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "author",
      as: "posts",
    },
  },
  {
    $addFields: {
      postCount: { $size: "$posts" },
      hasActivePosts: {
        $gt: [
          {
            $size: {
              $filter: {
                input: "$posts",
                cond: { $eq: ["$$this.isActive", true] },
              },
            },
          },
          0,
        ],
      },
    },
  },
]);
```

## 🚫 Errores Comunes y Soluciones

```javascript
// ❌ Problema: No usar await
User.find(); // Retorna Promise, no datos

// ✅ Solución
const users = await User.find();

// ❌ Problema: Modificar documento sin save()
const user = await User.findById(id);
user.name = "Nuevo nombre"; // No se guarda

// ✅ Solución
const user = await User.findById(id);
user.name = "Nuevo nombre";
await user.save();

// ❌ Problema: No manejar resultados null
const user = await User.findById(id);
console.log(user.name); // Error si user es null

// ✅ Solución
const user = await User.findById(id);
if (!user) {
  throw new Error("Usuario no encontrado");
}

// ❌ Problema: Populate infinito
await User.find().populate("posts").populate("posts.author"); // Circular

// ✅ Solución: Limitar profundidad
await User.find().populate({
  path: "posts",
  select: "title createdAt",
  options: { limit: 5 },
});
```

## 🔧 Optimización y Performance

```javascript
// Usar lean() para consultas de solo lectura
const users = await User.find().lean(); // 10x más rápido

// Seleccionar solo campos necesarios
const users = await User.find().select("name email"); // Menos transferencia

// Usar índices apropiados
userSchema.index({ email: 1, isActive: 1 }); // Índice compuesto

// Limit + Skip para paginación
const page = 2;
const limit = 10;
const users = await User.find()
  .limit(limit)
  .skip((page - 1) * limit);

// Batch operations para múltiples inserts
const users = await User.insertMany(arrayOfUsers, { ordered: false });

// Usar explain() para analizar queries
const explain = await User.find({ role: "admin" }).explain("executionStats");
console.log(explain.executionStats);
```

## 📈 Monitoreo y Debugging

```javascript
// Activar debug de Mongoose
mongoose.set("debug", true);

// Custom logging
mongoose.set("debug", function (collectionName, method, query, doc) {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

// Middleware para timing
userSchema.pre(/^find/, function () {
  this.start = Date.now();
});

userSchema.post(/^find/, function () {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
});
```

---

_Actualizado para Mongoose v8.16.3 y MongoDB v7.0 - Enero 2025_
