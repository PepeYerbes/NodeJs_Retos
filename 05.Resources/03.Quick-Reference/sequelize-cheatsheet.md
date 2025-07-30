# ⚡ Sequelize v6.37.7 - Referencia Rápida

## 🔌 Conexión (Sequelize v6 Actualizada)

```javascript
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Configuración moderna con variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,

    // Pool de conexiones optimizado
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    // Configuraciones adicionales
    define: {
      timestamps: true, // createdAt, updatedAt automáticos
      underscored: true, // snake_case en BD
      freezeTableName: true, // No pluralizar nombres de tabla
    },

    // Timezone
    timezone: "+00:00",
  }
);

// Función de conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL conectado con Sequelize v6");

    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("🔄 Modelos sincronizados");
    }
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
```

## 📋 Modelos Modernos (DataTypes v6)

```javascript
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class User extends Model {
  // Métodos de instancia personalizados
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Métodos estáticos
  static async findActiveUsers() {
    return this.findAll({ where: { isActive: true } });
  }
}

User.init(
  {
    // Primary Key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Strings con validaciones
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Nombre no puede estar vacío" },
        len: { args: [2, 50], msg: "Nombre debe tener entre 2-50 caracteres" },
      },
    },

    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    // Email único con validación
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        name: "unique_email",
        msg: "Email ya existe",
      },
      validate: {
        isEmail: { msg: "Email inválido" },
      },
    },

    // Password con getter/setter
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: { args: [6, 255], msg: "Password mínimo 6 caracteres" },
      },
      set(value) {
        // Hash automático (requiere bcrypt)
        const bcrypt = require("bcrypt");
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },

    // Números con validaciones
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 0, msg: "Edad no puede ser negativa" },
        max: { args: 120, msg: "Edad máxima 120" },
        isInt: { msg: "Edad debe ser entero" },
      },
    },

    // Decimales
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },

    // Enums
    role: {
      type: DataTypes.ENUM("user", "admin", "moderator"),
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["user", "admin", "moderator"]],
          msg: "Rol inválido",
        },
      },
    },

    // Booleanos
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    // Fechas
    birthDate: {
      type: DataTypes.DATEONLY, // Solo fecha (YYYY-MM-DD)
      validate: {
        isBefore: {
          args: new Date().toISOString(),
          msg: "Fecha de nacimiento debe ser pasada",
        },
      },
    },

    lastLogin: {
      type: DataTypes.DATE, // Fecha y hora completa
      allowNull: true,
    },

    // JSON (MySQL 5.7+)
    preferences: {
      type: DataTypes.JSON,
      defaultValue: {},
    },

    // TEXT para contenido largo
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Virtual field (no se guarda en BD)
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",

    // Índices
    indexes: [
      { fields: ["email"] },
      { fields: ["firstName", "lastName"] },
      { fields: ["role", "isActive"] },
    ],

    // Hooks
    hooks: {
      beforeCreate: (user) => {
        user.email = user.email.toLowerCase();
      },
      beforeUpdate: (user) => {
        if (user.changed("email")) {
          user.email = user.email.toLowerCase();
        }
      },
    },

    // Scopes
    scopes: {
      active: {
        where: { isActive: true },
      },
      admins: {
        where: { role: "admin" },
      },
      withoutPassword: {
        attributes: { exclude: ["password"] },
      },
    },
  }
);

export default User;
```

## 🔗 Asociaciones y Relaciones

```javascript
// models/index.js - Configurar todas las relaciones
import User from "./User.js";
import Post from "./Post.js";
import Category from "./Category.js";
import Tag from "./Tag.js";

// One-to-Many: Usuario tiene muchos posts
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});

// One-to-One: Usuario tiene un perfil
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Many-to-Many: Posts tienen muchos tags
Post.belongsToMany(Tag, {
  through: "PostTags",
  foreignKey: "postId",
  otherKey: "tagId",
  as: "tags",
});

Tag.belongsToMany(Post, {
  through: "PostTags",
  foreignKey: "tagId",
  otherKey: "postId",
  as: "posts",
});

// Self-reference: Categorías tienen subcategorías
Category.hasMany(Category, {
  foreignKey: "parentId",
  as: "children",
});

Category.belongsTo(Category, {
  foreignKey: "parentId",
  as: "parent",
});

export { User, Post, Category, Tag };
```

## 📊 Operaciones CRUD Avanzadas

```javascript
// CREATE - Múltiples opciones
const user1 = await User.create({
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan@test.com",
  age: 25,
});

// Bulk create
const users = await User.bulkCreate(
  [
    { firstName: "Ana", lastName: "García", email: "ana@test.com" },
    { firstName: "Carlos", lastName: "López", email: "carlos@test.com" },
  ],
  {
    validate: true, // Ejecutar validaciones
    returning: true, // Retornar registros creados
  }
);

// CREATE con asociaciones
const userWithPosts = await User.create(
  {
    firstName: "María",
    lastName: "González",
    email: "maria@test.com",
    posts: [
      { title: "Mi primer post", content: "Contenido..." },
      { title: "Segundo post", content: "Más contenido..." },
    ],
  },
  {
    include: [{ model: Post, as: "posts" }],
  }
);

// READ - Consultas básicas
const users = await User.findAll({
  where: {
    isActive: true,
    age: { [Op.gte]: 18 },
  },
  attributes: ["id", "firstName", "lastName", "email"], // Campos específicos
  order: [["createdAt", "DESC"]],
  limit: 10,
  offset: 20,
});

// READ - Con asociaciones
const usersWithPosts = await User.findAll({
  include: [
    {
      model: Post,
      as: "posts",
      where: { isPublished: true },
      required: false, // LEFT JOIN
      attributes: ["id", "title", "createdAt"],
    },
  ],
});

// READ - Agregaciones
const stats = await User.findAll({
  attributes: [
    "role",
    [sequelize.fn("COUNT", sequelize.col("id")), "totalUsers"],
    [sequelize.fn("AVG", sequelize.col("age")), "averageAge"],
    [sequelize.fn("MAX", sequelize.col("createdAt")), "lastRegistration"],
  ],
  group: ["role"],
  having: sequelize.where(sequelize.fn("COUNT", sequelize.col("id")), ">", 5),
});

// UPDATE - Diferentes opciones
const [affectedRows] = await User.update(
  { isActive: false },
  {
    where: {
      lastLogin: { [Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
    returning: true, // PostgreSQL only
  }
);

// UPDATE - Instancia específica
const user = await User.findByPk(1);
user.firstName = "Nuevo Nombre";
await user.save();

// DELETE - Soft delete
await User.destroy({
  where: { id: [1, 2, 3] },
});

// DELETE - Paranoid (soft delete automático)
// En el modelo: paranoid: true
const user = await User.destroy({ where: { id: 1 } }); // Marca deletedAt
const user = await User.restore({ where: { id: 1 } }); // Restaura
```

## 🔍 Operadores y Consultas Complejas

```javascript
import { Op } from "sequelize";

// Operadores básicos
const users = await User.findAll({
  where: {
    age: { [Op.gt]: 18 }, // Mayor que
    role: { [Op.in]: ["admin", "moderator"] }, // En array
    email: { [Op.like]: "%@gmail.com" }, // LIKE
    firstName: { [Op.iLike]: "%juan%" }, // ILIKE (case insensitive)
    createdAt: {
      [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")],
    },
  },
});

// Operadores lógicos
const complexQuery = await User.findAll({
  where: {
    [Op.and]: [
      { isActive: true },
      {
        [Op.or]: [{ role: "admin" }, { age: { [Op.gte]: 21 } }],
      },
    ],
  },
});

// Consultas con subconsultas
const usersWithActivePosts = await User.findAll({
  where: {
    id: {
      [Op.in]: sequelize.literal(
        "(SELECT DISTINCT userId FROM posts WHERE isPublished = true)"
      ),
    },
  },
});

// Raw queries cuando sea necesario
const [results, metadata] = await sequelize.query(
  "SELECT u.*, COUNT(p.id) as postCount FROM users u LEFT JOIN posts p ON u.id = p.userId GROUP BY u.id",
  { type: sequelize.QueryTypes.SELECT }
);
```

## ✅ Validaciones Avanzadas

```javascript
// Validaciones personalizadas
const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      validate: {
        // Validación asíncrona
        async isUniqueEmail(email) {
          const user = await User.findOne({ where: { email } });
          if (user && user.id !== this.id) {
            throw new Error("Email ya existe");
          }
        },
      },
    },

    age: {
      type: DataTypes.INTEGER,
      validate: {
        // Validación condicional
        conditionalValidation(value) {
          if (this.role === "admin" && value < 18) {
            throw new Error("Administradores deben ser mayores de edad");
          }
        },
      },
    },
  },
  {
    // Validaciones a nivel de modelo
    validate: {
      // Validación que usa múltiples campos
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error(
            "Latitude y longitude deben ser proporcionados juntos"
          );
        }
      },
    },
  }
);
```

## 🔧 Hooks Avanzados

```javascript
// Hooks a nivel de modelo
User.addHook("beforeCreate", "hashPassword", async (user) => {
  if (user.password) {
    const bcrypt = await import("bcrypt");
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.addHook("beforeUpdate", async (user) => {
  if (user.changed("password")) {
    const bcrypt = await import("bcrypt");
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.addHook("afterCreate", async (user) => {
  // Crear perfil automáticamente
  await Profile.create({ userId: user.id });

  // Enviar email de bienvenida
  await sendWelcomeEmail(user.email);
});

User.addHook("beforeDestroy", async (user) => {
  // Eliminar datos relacionados
  await Post.destroy({ where: { userId: user.id } });
});

// Hooks globales
sequelize.addHook("beforeConnect", (config) => {
  console.log("Conectando a la base de datos...");
});
```

## 📊 Transacciones

```javascript
// Transacción automática
await sequelize.transaction(async (t) => {
  const user = await User.create(
    {
      firstName: "Juan",
      email: "juan@test.com",
    },
    { transaction: t }
  );

  await Post.create(
    {
      title: "Mi post",
      userId: user.id,
    },
    { transaction: t }
  );

  // Si cualquier operación falla, se hace rollback automático
});

// Transacción manual
const t = await sequelize.transaction();
try {
  const user = await User.create(
    {
      firstName: "Ana",
      email: "ana@test.com",
    },
    { transaction: t }
  );

  await Profile.create(
    {
      userId: user.id,
      bio: "Mi biografía",
    },
    { transaction: t }
  );

  await t.commit();
} catch (error) {
  await t.rollback();
  throw error;
}
```

## 📈 Migraciones y Seeders

```javascript
// migrations/001-create-users.js
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Añadir índices
    await queryInterface.addIndex('users', ['email']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};

// seeders/001-demo-users.js
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        email: 'admin@test.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
```

## 🔧 Optimización y Performance

```javascript
// Eager loading vs Lazy loading
// ❌ N+1 queries
const users = await User.findAll();
for (const user of users) {
  const posts = await user.getPosts(); // Query por cada usuario
}

// ✅ Eager loading
const users = await User.findAll({
  include: [{ model: Post, as: "posts" }], // Solo 1 query
});

// Paginación eficiente
const { count, rows } = await User.findAndCountAll({
  limit: 10,
  offset: 20,
  distinct: true, // Para includes
  include: [{ model: Post, as: "posts" }],
});

// Usar índices apropiados
// En migración:
await queryInterface.addIndex("posts", ["userId", "isPublished"]);

// Consultas raw para performance crítica
const results = await sequelize.query(
  "SELECT * FROM users WHERE complex_calculation(age, salary) > :threshold",
  {
    replacements: { threshold: 1000 },
    type: QueryTypes.SELECT,
  }
);
```

## 🚫 Errores Comunes y Soluciones

```javascript
// ❌ No sincronizar modelos
// Modelo definido pero tabla no existe

// ✅ Sincronizar en desarrollo
await sequelize.sync({ force: true }); // Recrear tablas
await sequelize.sync({ alter: true }); // Alterar tablas existentes

// ❌ Asociaciones mal definidas
User.hasMany(Post); // Falta alias y foreign key
Post.belongsTo(User);

// ✅ Asociaciones correctas
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

// ❌ No usar transacciones para operaciones críticas
await User.create(userData);
await Profile.create(profileData); // Si falla, User queda huérfano

// ✅ Usar transacciones
await sequelize.transaction(async (t) => {
  const user = await User.create(userData, { transaction: t });
  await Profile.create({ ...profileData, userId: user.id }, { transaction: t });
});
```

## 📊 Monitoreo y Debugging

```javascript
// Logging detallado
const sequelize = new Sequelize(config, {
  logging: (sql, timing) => {
    console.log(`[${timing}ms] ${sql}`);
  },
});

// Benchmark queries
const start = Date.now();
const users = await User.findAll();
console.log(`Query took ${Date.now() - start}ms`);

// Explain plans (MySQL)
const explain = await sequelize.query(
  "EXPLAIN SELECT * FROM users WHERE age > 25"
);
console.log(explain);
```

---

_Actualizado para Sequelize v6.37.7 y MySQL v8.0 - Enero 2025_
