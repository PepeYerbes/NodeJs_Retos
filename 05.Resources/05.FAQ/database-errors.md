# 🗄️ Errores de Base de Datos - FAQ

> **🎯 Navegación**: [MongoDB](#-problemas-mongodb-mongoose) | [MySQL](#-problemas-mysql-sequelize) | [Conexión](#-problemas-de-conexión) | [Modelos](#-problemas-con-modelos) | [Consultas](#-errores-en-consultas)

## 🍃 Problemas MongoDB/Mongoose

### **❌ Problema: "MongooseError: Operation buffering timed out"**

#### **Síntomas:**

```bash
MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms
```

#### **✅ Solución:**

```javascript
import mongoose from "mongoose";

// ✅ Configuración correcta de conexión
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Opciones de conexión para v8
      serverSelectionTimeoutMS: 5000, // Timeout para seleccionar servidor
      socketTimeoutMS: 45000, // Timeout para operaciones de socket
      maxPoolSize: 10, // Máximo de conexiones en el pool
      minPoolSize: 1, // Mínimo de conexiones en el pool
      maxIdleTimeMS: 30000, // Tiempo máximo de inactividad
      bufferMaxEntries: 0, // Deshabilitar buffering
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("🚨 Error de conexión Mongoose:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose desconectado");
});

// Reconexión automática en caso de error
mongoose.connection.on("reconnected", () => {
  console.log("🔄 Mongoose reconectado");
});

export default connectDB;
```

### **❌ Problema: "ValidationError: Path `email` is required"**

#### **✅ Solución: Schema con validaciones apropiadas:**

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minLength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxLength: [50, "El nombre no puede tener más de 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: "Email inválido",
      },
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false, // No incluir password en queries por defecto
    },
    age: {
      type: Number,
      min: [13, "Edad mínima es 13 años"],
      max: [120, "Edad máxima es 120 años"],
      validate: {
        validator: Number.isInteger,
        message: "La edad debe ser un número entero",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "suspended"],
        message: "Status debe ser: active, inactive o suspended",
      },
      default: "active",
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
    versionKey: false, // Remueve __v
  }
);

// Middleware pre-save para validaciones adicionales
userSchema.pre("save", function (next) {
  // Validar que el email no esté duplicado (para updates)
  if (this.isModified("email")) {
    this.constructor
      .findOne({ email: this.email, _id: { $ne: this._id } })
      .then((user) => {
        if (user) {
          const error = new Error("Email ya está en uso");
          error.name = "ValidationError";
          return next(error);
        }
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

export default mongoose.model("User", userSchema);
```

### **❌ Problema: "CastError: Cast to ObjectId failed"**

#### **Síntomas:**

```bash
CastError: Cast to ObjectId failed for value "123" at path "_id"
```

#### **✅ Solución: Validar ObjectId antes de consultas:**

```javascript
import mongoose from "mongoose";

// Función helper para validar ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// En tus controladores
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  // ✅ Validar ObjectId antes de la consulta
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      error: "ID inválido",
      message: "El ID debe ser un ObjectId válido de MongoDB",
    });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Para múltiples IDs
app.post("/users/bulk", async (req, res) => {
  const { userIds } = req.body;

  // Validar array de IDs
  if (!Array.isArray(userIds) || userIds.some((id) => !isValidObjectId(id))) {
    return res.status(400).json({
      error: "IDs inválidos",
      message: "Todos los IDs deben ser ObjectIds válidos",
    });
  }

  try {
    const users = await User.find({ _id: { $in: userIds } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **❌ Problema: "OverwriteModelError: Cannot overwrite model"**

#### **✅ Solución: Verificar si el modelo ya existe:**

```javascript
// ❌ Problema: Redefinir modelo
const User = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema); // Error

// ✅ Solución: Verificar si existe
const User = mongoose.models.User || mongoose.model("User", userSchema);

// O usar try/catch
let User;
try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", userSchema);
}

export default User;
```

---

## 🐬 Problemas MySQL/Sequelize

### **❌ Problema: "ECONNREFUSED 127.0.0.1:3306"**

#### **Síntomas:**

```bash
SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306
```

#### **✅ Solución paso a paso:**

**1. Verificar que MySQL esté corriendo:**

```bash
# macOS
brew services list | grep mysql
brew services start mysql

# Linux
sudo systemctl status mysql
sudo systemctl start mysql

# Windows
net start mysql80  # O la versión que tengas
```

**2. Configuración correcta de Sequelize:**

```javascript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "mi_base_datos",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    define: {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);

// Función de conexión con reintentos
const connectDB = async (retries = 5) => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida correctamente");

    // Sincronizar modelos en desarrollo
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("📊 Modelos sincronizados");
    }
  } catch (error) {
    console.error("❌ Error conectando a MySQL:", error.message);

    if (retries > 0) {
      console.log(
        `🔄 Reintentando conexión... (${retries} intentos restantes)`
      );
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error(
        "💥 No se pudo conectar a MySQL después de varios intentos"
      );
      process.exit(1);
    }
  }
};

export { sequelize, connectDB };
```

**3. Variables de entorno (.env):**

```bash
# Base de datos
DB_NAME=mi_base_datos
DB_USER=root
DB_PASSWORD=mi_password_secreto
DB_HOST=localhost
DB_PORT=3306

# Para producción
DATABASE_URL=mysql://usuario:password@host:puerto/base_datos
```

### **❌ Problema: "Table doesn't exist" después de definir modelo**

#### **✅ Solución: Migraciones y sincronización:**

```javascript
// 1. Crear migración
// migrations/20250130000001-create-user.js
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  // Agregar índices
  await queryInterface.addIndex("Users", ["email"], {
    unique: true,
    name: "users_email_unique",
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("Users");
};

// 2. Ejecutar migración
// npm run migrate o sequelize-cli db:migrate
```

**Scripts de package.json:**

```json
{
  "scripts": {
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "seed": "sequelize-cli db:seed:all",
    "seed:undo": "sequelize-cli db:seed:undo:all"
  }
}
```

### **❌ Problema: "ValidationError: notNull Violation"**

#### **✅ Modelo con validaciones correctas:**

```javascript
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class User extends Model {
  // Métodos de instancia
  toJSON() {
    const values = { ...this.get() };
    delete values.password; // No exponer password
    return values;
  }

  static associate(models) {
    // Definir asociaciones aquí
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre no puede estar vacío",
        },
        len: {
          args: [2, 100],
          msg: "El nombre debe tener entre 2 y 100 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: "Este email ya está registrado",
      },
      validate: {
        isEmail: {
          msg: "Debe ser un email válido",
        },
        notEmpty: {
          msg: "El email es requerido",
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La contraseña es requerida",
        },
        len: {
          args: [6, 255],
          msg: "La contraseña debe tener al menos 6 caracteres",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: "La edad debe ser un número entero",
        },
        min: {
          args: [13],
          msg: "Edad mínima es 13 años",
        },
        max: {
          args: [120],
          msg: "Edad máxima es 120 años",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "suspended"),
      defaultValue: "active",
      validate: {
        isIn: {
          args: [["active", "inactive", "suspended"]],
          msg: "Estado debe ser: active, inactive o suspended",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true, // Soft deletes
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

export default User;
```

---

## 🔗 Problemas de Conexión

### **❌ Problema: "Connection pool exhausted"**

#### **✅ Solución: Configurar pool correctamente:**

```javascript
// MongoDB/Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10, // Máximo 10 conexiones
      minPoolSize: 1, // Mínimo 1 conexión
      maxIdleTimeMS: 30000, // 30 segundos máximo idle
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

// MySQL/Sequelize
const sequelize = new Sequelize(DATABASE_URL, {
  pool: {
    max: 10, // Máximo conexiones
    min: 2, // Mínimo conexiones
    acquire: 30000, // Tiempo máximo para obtener conexión
    idle: 10000, // Tiempo máximo idle
  },
});
```

### **❌ Problema: "Too many connections"**

#### **✅ Solución: Cerrar conexiones correctamente:**

```javascript
// Cerrar conexiones al terminar la app
process.on("SIGINT", async () => {
  console.log("📱 Cerrando servidor...");

  try {
    // MongoDB
    await mongoose.connection.close();
    console.log("🗄️ Conexión MongoDB cerrada");

    // MySQL
    await sequelize.close();
    console.log("🐬 Conexión MySQL cerrada");

    process.exit(0);
  } catch (error) {
    console.error("Error cerrando conexiones:", error);
    process.exit(1);
  }
});

// En cada endpoint, asegurar que las conexiones se liberen
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Mongoose
    // o
    const users = await User.findAll(); // Sequelize

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // Las conexiones se liberan automáticamente aquí
});
```

---

## 📊 Errores en Consultas

### **❌ Problema: "Cannot read property of undefined" en poblado**

#### **✅ Mongoose populate correctamente:**

```javascript
// ❌ Problema: populate mal configurado
const user = await User.findById(id).populate("posts"); // Error si no existe la referencia

// ✅ Solución: populate con validaciones
const getUserWithPosts = async (id) => {
  try {
    const user = await User.findById(id)
      .populate({
        path: "posts",
        select: "title content createdAt", // Solo campos necesarios
        options: {
          sort: { createdAt: -1 },
          limit: 10,
        },
        match: { status: "published" }, // Solo posts publicados
      })
      .lean(); // Para mejor performance si solo lees datos

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    throw new Error(`Error obteniendo usuario: ${error.message}`);
  }
};

// Populate múltiples referencias
const user = await User.findById(id)
  .populate("posts", "title content")
  .populate("profile", "avatar bio")
  .populate({
    path: "friends",
    populate: {
      path: "profile",
      select: "avatar",
    },
  });
```

### **❌ Problema: "Sequelize include with wrong association"**

#### **✅ Sequelize include/join correctamente:**

```javascript
// ✅ Include con asociaciones definidas
const getUsersWithPosts = async () => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Post,
          as: "posts", // Debe coincidir con el alias en la asociación
          attributes: ["id", "title", "content"],
          where: { status: "published" },
          required: false, // LEFT JOIN (incluir usuarios sin posts)
          limit: 5,
          order: [["createdAt", "DESC"]],
        },
        {
          model: Profile,
          as: "profile",
          attributes: ["avatar", "bio"],
        },
      ],
      attributes: { exclude: ["password"] }, // Excluir password
      order: [["createdAt", "DESC"]],
    });

    return users;
  } catch (error) {
    throw new Error(`Error obteniendo usuarios: ${error.message}`);
  }
};

// Include anidado
const users = await User.findAll({
  include: [
    {
      model: Post,
      as: "posts",
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
      ],
    },
  ],
});
```

### **❌ Problema: "Query too slow"**

#### **✅ Optimización de consultas:**

```javascript
// MongoDB: Índices y agregaciones
// En el schema
userSchema.index({ email: 1 });
userSchema.index({ name: 1, status: 1 });
userSchema.index({ createdAt: -1 });

// Consultas optimizadas
const getActiveUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  // Usar agregación para consultas complejas
  const users = await User.aggregate([
    { $match: { status: "active" } },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "userId",
        as: "posts",
        pipeline: [
          { $match: { status: "published" } },
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
        ],
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        postCount: { $size: "$posts" },
        latestPosts: "$posts",
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  return users;
};

// MySQL: Índices y joins optimizados
// En migración
await queryInterface.addIndex("users", ["email"], { unique: true });
await queryInterface.addIndex("users", ["status", "created_at"]);
await queryInterface.addIndex("posts", ["user_id", "status"]);

// Consulta optimizada
const getActiveUsersSQL = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const users = await sequelize.query(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      COUNT(p.id) as post_count,
      MAX(p.created_at) as latest_post_date
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id AND p.status = 'published'
    WHERE u.status = 'active'
    GROUP BY u.id, u.name, u.email
    ORDER BY u.created_at DESC
    LIMIT :limit OFFSET :offset
  `,
    {
      replacements: { limit, offset },
      type: QueryTypes.SELECT,
    }
  );

  return users;
};
```

---

## 🔄 Transacciones

### **❌ Problema: "Data inconsistency without transactions"**

#### **✅ Transacciones en MongoDB:**

```javascript
import mongoose from "mongoose";

const transferFunds = async (fromUserId, toUserId, amount) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // Restar del usuario origen
      const fromUser = await User.findByIdAndUpdate(
        fromUserId,
        { $inc: { balance: -amount } },
        { session, new: true }
      );

      if (fromUser.balance < 0) {
        throw new Error("Saldo insuficiente");
      }

      // Sumar al usuario destino
      await User.findByIdAndUpdate(
        toUserId,
        { $inc: { balance: amount } },
        { session, new: true }
      );

      // Crear registro de transacción
      await Transaction.create(
        [
          {
            fromUser: fromUserId,
            toUser: toUserId,
            amount,
            status: "completed",
          },
        ],
        { session }
      );
    });

    console.log("✅ Transferencia completada");
  } catch (error) {
    console.error("❌ Error en transferencia:", error.message);
    throw error;
  } finally {
    await session.endSession();
  }
};
```

#### **✅ Transacciones en Sequelize:**

```javascript
import { sequelize } from "../config/database.js";

const createUserWithProfile = async (userData, profileData) => {
  const transaction = await sequelize.transaction();

  try {
    // Crear usuario
    const user = await User.create(userData, { transaction });

    // Crear perfil
    const profile = await Profile.create(
      {
        ...profileData,
        userId: user.id,
      },
      { transaction }
    );

    // Si todo sale bien, commit
    await transaction.commit();

    return { user, profile };
  } catch (error) {
    // Si algo falla, rollback
    await transaction.rollback();
    throw new Error(`Error creando usuario: ${error.message}`);
  }
};

// Transacción automática con método estático
const bulkUpdateUsers = async (updates) => {
  return await sequelize.transaction(async (t) => {
    const results = [];

    for (const update of updates) {
      const user = await User.findByPk(update.id, { transaction: t });
      if (user) {
        await user.update(update.data, { transaction: t });
        results.push(user);
      }
    }

    return results;
  });
};
```

---

_🗄️ Actualizado para MongoDB v7.0+ y MySQL v8.0+ | Enero 2025_
