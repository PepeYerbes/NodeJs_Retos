# 📁 Templates - Proyectos Base del Curso NodeJS

> **🎯 Acceso Rápido**: [Express Básico](#-express-básico) | [Uso](#-cómo-usar-los-templates) | [Estructura](#-estructura-de-templates) | [Personalización](#-personalización)

## 📋 Templates Disponibles

| Template                              | Descripción             | Stack Incluido             | Estado          |
| ------------------------------------- | ----------------------- | -------------------------- | --------------- |
| [**express-basic**](#-express-básico) | Servidor Express básico | Express v5.1.0 + ES6       | ✅ Completo     |
| express-mongoose                      | Express + MongoDB       | Express + Mongoose + Auth  | 🔄 Próximamente |
| express-sequelize                     | Express + MySQL         | Express + Sequelize + Auth | 🔄 Próximamente |
| express-full-stack                    | Full Stack completo     | Express + BD + Frontend    | 🔄 Próximamente |

---

## 🚀 Express Básico

### 📂 **Ubicación**: `express-basic/`

**Template de inicio perfecto para comenzar proyectos del curso**

#### ✨ **¿Qué Incluye?**

- ✅ Servidor Express v5.1.0 configurado
- ✅ ES6 Modules habilitado (`"type": "module"`)
- ✅ Middleware básico (JSON, CORS, etc.)
- ✅ Estructura de carpetas recomendada
- ✅ Scripts de desarrollo y producción
- ✅ Variables de entorno configuradas
- ✅ Manejo básico de errores

#### 📁 **Estructura del Template**

```
express-basic/
├── 📄 package.json        # Configuración con dependencias del curso
├── 🖥️ server.js          # Servidor Express listo para usar
├── ⚙️ .env.example        # Variables de entorno de ejemplo
└── 📚 README.md           # Instrucciones específicas del template
```

#### 🛠️ **Stack Tecnológico**

- **Node.js**: v22.16.0+
- **Express**: v5.1.0
- **Dev Tools**: nodemon

#### 🎯 **Ideal Para**

- ✅ Primeros proyectos del curso
- ✅ APIs REST básicas
- ✅ Prototipos rápidos
- ✅ Aprender fundamentos de Express

---

## 🚀 Cómo Usar los Templates

### **Opción 1: Copia Manual (Recomendado)**

```bash
# 1. Navegar a la carpeta donde quieres crear tu proyecto
cd ~/mis-proyectos

# 2. Copiar el template
cp -r /ruta/al/curso/05.Resources/04.Templates/express-basic mi-nuevo-proyecto

# 3. Entrar al proyecto
cd mi-nuevo-proyecto

# 4. Configurar variables de entorno
cp .env.example .env

# 5. Instalar dependencias
npm install

# 6. Iniciar desarrollo
npm run dev
```

### **Opción 2: Comando Rápido**

```bash
# Un solo comando para copiar y configurar
cp -r express-basic ../../../mi-proyecto && cd ../../../mi-proyecto && cp .env.example .env && npm install && npm run dev
```

### **Para Windows (PowerShell)**

```powershell
# Copiar template
Copy-Item -Recurse "express-basic" -Destination "C:\mis-proyectos\mi-nuevo-proyecto"
cd "C:\mis-proyectos\mi-nuevo-proyecto"

# Configurar
Copy-Item ".env.example" -Destination ".env"
npm install
npm run dev
```

---

## 📊 Verificación Post-Instalación

### ✅ **Checklist Rápido**

- [ ] El servidor inicia en `http://localhost:3000`
- [ ] Ves el mensaje: `🚀 Servidor corriendo en puerto 3000`
- [ ] Al visitar `http://localhost:3000` ves la respuesta JSON
- [ ] Los logs muestran las peticiones (gracias a morgan)
- [ ] No hay errores en la consola

### 🧪 **Test Básico**

```bash
# Con el servidor corriendo, en otra terminal:
curl http://localhost:3000
# Debería responder: {"message": "¡Servidor Express funcionando!"}

# O abrir en el navegador:
open http://localhost:3000  # macOS
start http://localhost:3000 # Windows
```

---

## 🎨 Personalización

### **Modificar el Template para tu Proyecto**

#### 1. **Cambiar el Puerto**

```javascript
// server.js
const PORT = process.env.PORT || 3000; // Cambiar 3000 por tu puerto
```

#### 2. **Agregar Nuevas Rutas**

```javascript
// server.js - Agregar después de la ruta existente
app.get("/usuarios", (req, res) => {
  res.json({ usuarios: [] });
});

app.post("/usuarios", (req, res) => {
  res.status(201).json({ mensaje: "Usuario creado" });
});
```

#### 3. **Configurar Base de Datos**

```bash
# Para MongoDB
npm install mongoose
# Luego seguir la estructura del curso

# Para MySQL
npm install sequelize mysql2
# Luego seguir la estructura del curso
```

#### 4. **Agregar Autenticación**

```bash
npm install bcrypt jsonwebtoken
# Implementar según las lecciones del curso
```

---

## 🔧 Troubleshooting

### **Problemas Comunes**

#### ❌ **Error: Cannot use import statement**

```bash
# Verificar que package.json tenga:
"type": "module"
```

#### ❌ **Puerto ya en uso**

```bash
# Cambiar puerto en .env
PORT=3001

# O terminar proceso existente
lsof -ti:3000 | xargs kill  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

#### ❌ **Dependencias faltantes**

```bash
# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Tips de Uso

### **Para Estudiantes**

1. **Usa el template básico** para tus primeros proyectos
2. **Personaliza gradualmente** según aprendas nuevos conceptos
3. **No modifiques el template original** - siempre copia primero
4. **Compara tu código** con el template si algo no funciona

### **Para Instructores**

1. **Template como base** para ejercicios en clase
2. **Referencia** para mostrar buenas prácticas
3. **Punto de partida** para proyectos más complejos

---

## 🔗 Enlaces Relacionados

### **Documentación del Curso**

- [📋 Requisitos del Sistema](../01.Setup/System-Requirements.md)
- [🛠️ Guía de Instalación](../01.Setup/Setup-Guide.md)
- [⚡ Express Cheatsheet](../03.Quick-Reference/express-cheatsheet.md)

### **Templates Relacionados**

- [🔍 Ver todos los templates disponibles](#-templates-disponibles)
- [📝 Solicitar nuevo template](https://github.com/inadaptados/curso-nodejs/issues)

---

### **Tiempo de Setup**

- **Con template**: ~2 minutos ⚡
- **Desde cero**: ~15-20 minutos 🐌

---

_📁 Templates actualizados para el curso 2025 | ⚡ Setup en 2 minutos | 🎯 100% compatibles con el contenido del curso_
