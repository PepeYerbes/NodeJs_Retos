# ✅ Rúbrica de Revisión – Proyecto Integrador: API E-commerce con Express.js

Este documento será usado durante la revisión en vivo del proyecto final.
**Marca con una palomita (✅), tache (❌) o advertencia (⚠️)** según el cumplimiento de cada punto.

---

## 🧭 Paso a paso del flujo de revisión

1. **Presentación breve del proyecto (máx 5 minutos):**

   - ¿Qué hace tu API?
   - ¿Cómo está estructurada?
   - ¿Qué endpoints clave implementaste?

2. **Verificación de requisitos previos:**

   - Base de datos conectada y funcional
   - Al menos 10 registros por entidad (Productos, Usuarios, Categorías aunque no se usen todas las categorías en los productos)
   - Servidor Express corriendo correctamente
   - Endpoints listos para probar en Postman o similar

3. **Prueba de funcionalidades principales:**

   - Registro/login
   - Endpoints públicos (productos, categorías)
   - Endpoints protegidos (carrito, órdenes)
   - Relaciones entre modelos

4. **Revisión de código:**

   - Organización por capas
   - Validaciones y middlewares
   - Uso de JWT y protección de rutas

5. **Verificación de retos clave y extras (no ponderan, pero deben estar presentes)**

---

## 📋 Checklist de Revisión

| Categoría                       | Criterio                                                                        | Cumple |
| ------------------------------- | ------------------------------------------------------------------------------- | ------ |
| **Funcionalidad de Endpoints**  | Registro/Login funcional con JWT                                                |        |
|                                 | Productos: GET público, POST/PUT/DELETE (requiere token)                        |        |
|                                 | Carrito de compras funcional (agregar, actualizar, eliminar)                    |        |
|                                 | Usuarios: CRUD básico, acceso restringido por token                             |        |
|                                 | Órdenes: creación, listado por usuario                                          |        |
| **Relaciones y datos**          | Productos asociados a categorías                                                |        |
|                                 | Órdenes asociadas a usuarios y productos                                        |        |
|                                 | Al menos 10 registros por entidad principal                                     |        |
|                                 | Datos consistentes (FK válidas, sin campos vacíos)                              |        |
| **Seguridad y validación**      | Middleware de validación (`express-validator`) en rutas clave                   |        |
|                                 | Middleware de autenticación con JWT                                             |        |
|                                 | Manejo correcto de errores (400–500)                                            |        |
| **Paginación**                  | Listado de usuarios y productos con paginación implementada                     |        |
| **Organización del código**     | Separación clara por carpetas: `models`, `controllers`, `routes`, `middlewares` |        |
|                                 | Código modular, funciones separadas, uso de helpers si aplica                   |        |
| **Presentación de la demo**     | Explicación clara del flujo                                                     |        |
|                                 | Pruebas funcionales en vivo con Postman                                         |        |
| **Retos requeridos**            | ✅ Reto 8 – Validación con Express Validator                                    |        |
|                                 | ✅ Reto 9 – JWT y autenticación protegida                                       |        |
|                                 | ✅ Reto 10 – Documentación básica en `README.md`                                |        |
|                                 | ✅ Reto 11 – Flujo completo de compra (registro → carrito → orden)              |        |
| **Funcionalidades adicionales** | Uso de `bcrypt` para encriptar contraseñas                                      |        |
|                                 | Manejo de roles en modelo de usuario (admin/cliente)                            |        |
|                                 | Documentación básica en `README.md`                                             |        |

---

## 📝 Notas del Revisor

(Usa este espacio para observaciones importantes o recomendaciones)

```
[Espacio para notas del revisor...]
```

---

## 💡 Recomendaciones generales

- Recuerda usar variables de entorno (`.env`) para claves sensibles.
- Puedes agregar Swagger u OpenAPI para documentar tu API.
- No es necesario implementar frontend, pero puedes mostrarlo si ayuda a explicar el flujo.

---

**📊 Puntuación Final**: **\_** / 100 puntos
**🎯 Estado**: ⭐ Excelente | ✅ Aprobado | ⚠️ Requiere ajustes | ❌ No aprobado
**📅 Fecha de revisión**: \***\*\_\_\_\*\***
**👨‍🏫 Revisor**: \***\*\_\_\_\*\***
