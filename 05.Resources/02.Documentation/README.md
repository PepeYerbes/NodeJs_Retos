# 📚 Documentación del Curso - NodeJS 2025

> **⚡ Acceso Rápido**: [Glosario](#-glosario) | [HTTP Codes](#-códigos-http) | [Best Practices](#-mejores-prácticas) | [Cheat Sheets](#-guías-rápidas)

## 🗂️ Recursos Disponibles

### 📖 **Referencias Principales**

- 📚 **[Glosario de Términos](Glosario%20de%20Términos%20-%20Curso%20NodeJS.md)** - _5 min_
  > Definiciones de conceptos clave del curso
- 🔢 **[Códigos de Estado HTTP](Códigos%20de%20Estado%20HTTP%20-%20Curso%20Node.md)** - _10 min_
  > Guía completa de códigos HTTP con ejemplos prácticos
- ⭐ **[Mejores Prácticas](Best-Practices.md)** - _15 min_
  > Estándares y convenciones del curso

### ⚡ **Guías Rápidas**

- 🔍 **[Búsqueda por Término](#búsqueda-rápida)**
- 📋 **[Códigos HTTP Más Usados](#códigos-más-frecuentes)**
- 🎯 **[Patrones Comunes](#patrones-frecuentes)**

---

## 🔍 Búsqueda Rápida

### Por Categoría

| Categoría         | Términos Clave                | Enlace                                                                                                 |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| **APIs**          | REST, Endpoint, CRUD          | [Ver términos](Glosario%20de%20Términos%20-%20Curso%20NodeJS.md#api-application-programming-interface) |
| **Base de Datos** | ORM, ODM, Sequelize, Mongoose | [Ver términos](Glosario%20de%20Términos%20-%20Curso%20NodeJS.md#orm-object-relational-mapping)         |
| **HTTP**          | Códigos, Métodos, Middleware  | [Ver códigos](Códigos%20de%20Estado%20HTTP%20-%20Curso%20Node.md)                                      |
| **Node.js**       | Express, npm, Async/Await     | [Ver términos](Glosario%20de%20Términos%20-%20Curso%20NodeJS.md#nodejs)                                |

### Códigos Más Frecuentes

```
✅ 200 OK - Éxito general
✅ 201 Created - Recurso creado
❌ 400 Bad Request - Datos inválidos
❌ 401 Unauthorized - Sin autenticación
❌ 404 Not Found - Recurso no existe
❌ 500 Internal Error - Error del servidor
```

---

## 🎯 Patrones Frecuentes

### Estructura CRUD Típica

```javascript
// Patrón estándar del curso
GET    /usuarios     → 200 + lista
POST   /usuarios     → 201 + usuario creado
GET    /usuarios/:id → 200 + usuario | 404
PUT    /usuarios/:id → 200 + actualizado | 404
DELETE /usuarios/:id → 204 | 404
```

### Manejo de Errores Estándar

```javascript
// Patrón usado en todo el curso
try {
  const resultado = await operacion();
  res.status(200).json({ data: resultado });
} catch (error) {
  res.status(500).json({ error: error.message });
}
```

---

## 📊 Progreso de Aprendizaje

| Concepto               | Archivo                                                                                       | Completado |
| ---------------------- | --------------------------------------------------------------------------------------------- | ---------- |
| **Términos Básicos**   | [Glosario A-F](Glosario%20de%20Términos%20-%20Curso%20NodeJS.md#a)                            | ⬜         |
| **Términos Avanzados** | [Glosario G-W](Glosario%20de%20Términos%20-%20Curso%20NodeJS.md#g)                            | ⬜         |
| **Códigos 2xx-3xx**    | [HTTP Éxito](Códigos%20de%20Estado%20HTTP%20-%20Curso%20Node.md#2xx---respuestas-exitosas-)   | ⬜         |
| **Códigos 4xx-5xx**    | [HTTP Errores](Códigos%20de%20Estado%20HTTP%20-%20Curso%20Node.md#4xx---errores-del-cliente-) | ⬜         |
| **Best Practices**     | [Mejores Prácticas](Best-Practices.md)                                                        | ⬜         |

---

## 🔗 Enlaces Externos Útiles

| Recurso                                                    | Descripción                     | Nivel |
| ---------------------------------------------------------- | ------------------------------- | ----- |
| [MDN HTTP](https://developer.mozilla.org/es/docs/Web/HTTP) | Documentación oficial HTTP      | 📚    |
| [Express Docs](https://expressjs.com/es/)                  | Documentación oficial Express   | 📚    |
| [Mongoose Docs](https://mongoosejs.com/docs/)              | Documentación oficial Mongoose  | 📚    |
| [Sequelize Docs](https://sequelize.org/docs/v6/)           | Documentación oficial Sequelize | 📚    |

---

_📅 Actualizado: Julio 2025 | 🎯 100+ términos definidos | ✅ Ejemplos prácticos_
