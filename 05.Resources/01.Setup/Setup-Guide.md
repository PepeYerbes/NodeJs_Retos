# 🛠️ Guía de Configuración - Curso NodeJS

> **🚀 Navegación Rápida**: [Requisitos](#-requisitos-del-sistema) | [Instalación](#-instalación-paso-a-paso) | [Verificación](#-verificación-completa) | [Problemas](#-solución-de-problemas-específicos-del-curso)

## 📖 Índice de Contenidos

- [📋 Requisitos del Sistema](#-requisitos-del-sistema)
  - [💻 Sistemas Operativos](#sistemas-operativos-compatibles)
  - [⚙️ Especificaciones](#especificaciones-mínimas)
  - [📦 Software Base](#software-base-requerido)
- [🚀 Instalación Paso a Paso](#-instalación-paso-a-paso)
  - [1️⃣ Node.js y npm](#1-nodejs-y-npm)
  - [2️⃣ VS Code](#2-editor-de-código---vs-code)
  - [3️⃣ MongoDB](#3-mongodb-para-proyectos-con-mongodb)
  - [4️⃣ MySQL](#4-mysql-para-proyectos-con-mysql)
  - [5️⃣ Git](#5-git-control-de-versiones)
- [✅ Verificación](#-verificación-completa)
- [🚨 Problemas Comunes](#-solución-de-problemas-específicos-del-curso)
- [📞 Soporte](#-soporte-del-curso)

---

## 📋 Requisitos del Sistema

### 💻 Sistemas Operativos Compatibles

| SO                 | Versión Mínima | Recomendada           | Estado |
| ------------------ | -------------- | --------------------- | ------ |
| 🪟 **Windows**     | 10 (64-bit)    | **Windows 11 22H2+**  | ✅     |
| 🍎 **macOS**       | 10.15 Catalina | **macOS 14 Sonoma+**  | ✅     |
| 🐧 **Ubuntu**      | 18.04 LTS      | **Ubuntu 22.04 LTS+** | ✅     |
| 📦 **Debian**      | 10 Buster      | **Debian 12+**        | ✅     |
| 🎩 **RHEL/CentOS** | 8              | **Rocky Linux 9+**    | ✅     |

> **⚡ Mejor Experiencia**: Usar la **última versión** de tu SO garantiza:
>
> - 🚀 Mejor rendimiento y estabilidad
> - 🔒 Parches de seguridad actualizados
> - 🛠️ Compatibilidad completa con herramientas del curso
> - 📱 Soporte para las últimas funcionalidades

### ⚙️ Especificaciones Mínimas

| Componente            | Mínimo            | Recomendado       | Óptimo         |
| --------------------- | ----------------- | ----------------- | -------------- |
| 💾 **RAM**            | 4 GB              | 8 GB              | 16 GB          |
| 💿 **Almacenamiento** | 2 GB libre        | 5 GB libre        | 10 GB SSD      |
| ⚡ **Procesador**     | Dual-core 2.0 GHz | Quad-core 2.5 GHz | 8-core 3.0 GHz |
| 🌐 **Internet**       | Banda ancha       | Fibra óptica      | -              |

### 📦 Software Base Requerido

| Software | Versión Mínima | Recomendada |
| -------- | -------------- | ----------- |
| Node.js  | v18.0.0        | v22.16.0    |
| npm      | v8.0.0         | v10.0.0+    |
| Git      | v2.20.0        | v2.40.0+    |

## 🚀 Instalación por Sistema Operativo

### Windows

```bash
# Usando Chocolatey (recomendado)
choco install nodejs git

# O descargar desde nodejs.org
```

### macOS

```bash
# Usando Homebrew (recomendado)
brew install node git

# O descargar desde nodejs.org
```

### Linux (Ubuntu/Debian)

```bash
# Usando NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

### Versiones Recomendadas (Actualizadas 2025)

- **Node.js**: v22.16.0+ (LTS) ✅
- **npm**: v10.0.0+
- **Express**: v5.1.0+ ✅
- **MongoDB**: v7.0+ (si usas MongoDB)
- **MySQL**: v8.0+ (si usas MySQL)

### Hardware Mínimo

- 8GB RAM (16GB recomendado para proyectos grandes)
- 5GB espacio libre en disco
- Conexión a internet estable

---

## 🚀 Instalación Paso a Paso

### 1. Node.js y npm

#### Windows & macOS

1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión **LTS** (v22.16.0 o superior)
3. Ejecuta el instalador y sigue las instrucciones
4. Reinicia tu terminal

#### Linux (Ubuntu/Debian)

```bash
# Instalar Node.js v22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version    # Debe mostrar v22.16.0+
npm --version     # Debe mostrar v10.0.0+
```

#### macOS con Homebrew

```bash
brew install node@22
brew link node@22 --force
```

### 2. Editor de Código - VS Code

#### Instalación

1. Descarga [Visual Studio Code](https://code.visualstudio.com/)
2. Instala siguiendo las instrucciones del SO

#### Extensiones Esenciales para el Curso

```
🔧 Desarrollo:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer 2

🌐 APIs y Testing:
- Thunder Client (Postman integrado)
- REST Client

📄 Documentación:
- Markdown All in One
- GitLens

🗄️ Bases de Datos:
- MongoDB for VS Code
- MySQL (si usas MySQL)

📦 Package Management:
- npm Intellisense
- Version Lens
```

#### Configuración Optimizada para Node.js

Archivo: `settings.json` (Ctrl/Cmd + Shift + P → "Preferences: Open Settings JSON")

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "onFocusChange",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "javascript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.mjs": "javascript"
  }
}
```

### 3. MongoDB (Para proyectos con MongoDB)

#### Windows

1. Descarga [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Ejecuta el instalador
3. Instala MongoDB Compass (GUI incluida)

#### macOS

```bash
# Con Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Iniciar servicio
brew services start mongodb/brew/mongodb-community
```

#### Linux

```bash
# Ubuntu/Debian - MongoDB 7.0
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Verificación MongoDB

```bash
mongosh
# Debe conectar sin errores
# Probar comando: show dbs
```

### 4. MySQL (Para proyectos con MySQL)

#### Windows & macOS

1. Descarga [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
2. Ejecuta el instalador
3. Configura usuario root con contraseña segura

#### Linux

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

#### Verificación MySQL

```bash
mysql -u root -p
# Ingresa tu contraseña
# Probar comando: SHOW DATABASES;
```

### 5. Git (Control de Versiones)

#### Windows

1. Descarga [Git for Windows](https://gitforwindows.org/)
2. Instala con configuración por defecto

#### macOS

```bash
# Con Homebrew
brew install git
```

#### Linux

```bash
sudo apt install git
```

#### Configuración Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
git config --global init.defaultBranch main
```

---

## ✅ Verificación Completa

### Script de Verificación del Curso

Crea y ejecuta este archivo para verificar todo:

```javascript
// verificacion-curso.js
import { execSync } from "child_process";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

console.log("🔍 Verificando configuración del Curso NodeJS...\n");

// Verificar Node.js
const nodeVersion = process.version;
console.log("✅ Node.js:", nodeVersion);
if (parseInt(nodeVersion.split(".")[0].slice(1)) < 22) {
  console.log("⚠️  Recomendado: Node.js v22.16.0+");
}

// Verificar npm
try {
  const npmVersion = execSync("npm --version", { encoding: "utf8" }).trim();
  console.log("✅ npm: v" + npmVersion);
} catch (error) {
  console.log("❌ npm no encontrado");
}

// Verificar Express (global o local)
try {
  const expressVersion = require("express/package.json").version;
  console.log("✅ Express disponible: v" + expressVersion);
} catch (error) {
  console.log("⚠️  Express no instalado globalmente (normal)");
}

// Verificar Git
try {
  const gitVersion = execSync("git --version", { encoding: "utf8" }).trim();
  console.log("✅ Git:", gitVersion);
} catch (error) {
  console.log("❌ Git no encontrado");
}

// Verificar MongoDB
try {
  execSync("mongosh --version", { encoding: "utf8" });
  console.log("✅ MongoDB Shell disponible");
} catch (error) {
  console.log("⚠️  MongoDB no instalado (opcional)");
}

// Verificar MySQL
try {
  execSync("mysql --version", { encoding: "utf8" });
  console.log("✅ MySQL disponible");
} catch (error) {
  console.log("⚠️  MySQL no instalado (opcional)");
}

console.log("\n🎯 Configuración específica del curso:");
console.log("📦 Dependencias principales del curso:");
console.log("   - express: ^5.1.0");
console.log("   - mongoose: ^8.16.3 (MongoDB)");
console.log("   - sequelize: ^6.37.7 (MySQL)");
console.log("   - nodemon: ^3.1.10");
console.log("   - dotenv: ^17.2.0");

console.log("\n✨ ¡Listo para el Curso NodeJS 2025!");
```

```bash
node verificacion-curso.js
```

---

## 🚨 Solución de Problemas Específicos del Curso

### Error con Express v5.1.0

```bash
# Si tienes problemas con Express 5.x
npm uninstall express
npm install express@^5.1.0
```

### Error con módulos ES6 (type: "module")

```json
// Verificar package.json
{
  "type": "module", // ✅ Necesario para import/export
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### Error de permisos en npm (macOS/Linux)

```bash
# Configurar npm para directorio local
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Agregar a ~/.bashrc o ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### MongoDB no conecta en la última versión

```javascript
// Configuración actualizada para Mongoose 8.x
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/miapp", {
  // Las opciones deprecadas ya no son necesarias en v8
});
```

### MySQL con Sequelize 6.37.7

```javascript
// Configuración actualizada
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Desactivar logs SQL en desarrollo
});
```

---

## 🎯 Estructura de Proyecto del Curso

### Template Base (que usaremos en el curso)

```
mi-proyecto-node/
├── .env                    # Variables de entorno
├── .gitignore             # Archivos a ignorar
├── package.json           # Dependencias y scripts
├── server.js              # Servidor principal
└── src/
    ├── config/
    │   └── database.js    # Configuración DB
    ├── controllers/       # Lógica de negocio
    ├── middlewares/       # Middlewares personalizados
    ├── models/           # Modelos de datos
    └── routes/           # Definición de rutas
```

### Scripts npm del curso

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "echo \"No tests yet\" && exit 1"
  }
}
```

---

## 📞 Soporte del Curso

### Antes de Pedir Ayuda

1. ✅ Ejecuta el script de verificación
2. ✅ Revisa esta guía completa
3. ✅ Verifica las versiones específicas del curso
4. ✅ Incluye información del error completo

### Canales de Soporte

- 💬 **Discord**: [Inadaptados Server](https://discord.gg/5EqsTkGcgm)
- 📚 **GitHub**: Issues en este repositorio
- 🤝 **Peer Support**: Canal #ayuda-curso-nodejs

---

_Guía actualizada para Node.js v22.16.0 y dependencias 2025_
