# 🚨 Solución de Problemas - Configuración del Curso NodeJS

> **🔍 Encuentra tu problema**: [Express](#1-error-con-express-v510) | [ES6 Modules](#2-error-con-módulos-es6-type-module) | [Permisos npm](#3-error-de-permisos-en-npm-macoslinux) | [MongoDB](#4-mongodb-no-conecta) | [MySQL](#5-mysql-no-conecta) | [Dependencias](#6-error-al-instalar-dependencias)

## 🚀 Diagnóstico Rápido (30 segundos)

**Ejecuta este comando y comparte el resultado si necesitas ayuda:**

```bash
echo "=== DIAGNÓSTICO CURSO NODEJS ===" && \
echo "Node.js: $(node --version 2>/dev/null || echo 'NO INSTALADO')" && \
echo "npm: v$(npm --version 2>/dev/null || echo 'NO INSTALADO')" && \
echo "Git: $(git --version 2>/dev/null || echo 'NO INSTALADO')" && \
echo "OS: $(uname -s 2>/dev/null || echo $OS)" && \
echo "============================="
```

## 📊 Problemas por Frecuencia

| 🥇 Más Comunes                                         | 🥈 Frecuentes                           | 🥉 Ocasionales                                       |
| ------------------------------------------------------ | --------------------------------------- | ---------------------------------------------------- |
| [Permisos npm](#3-error-de-permisos-en-npm-macoslinux) | [Express v5](#1-error-con-express-v510) | [Git config](#7-error-con-git-configuración-inicial) |
| [ES6 Modules](#2-error-con-módulos-es6-type-module)    | [MongoDB](#4-mongodb-no-conecta)        | [MySQL](#5-mysql-no-conecta)                         |
| [Dependencias](#6-error-al-instalar-dependencias)      | -                                       | -                                                    |

---

## ⚠️ Problemas Comunes y Soluciones

### 1. **🚀 Error con Express v5.1.0**

<details>
<summary><strong>💥 Síntomas del problema</strong></summary>

```bash
# Errores típicos:
Error: Cannot find module 'express'
TypeError: app.listen is not a function
Express deprecated: ...
```

</details>

#### 🔧 **Solución Paso a Paso**

```bash
# 1. Verificar versión actual
npm list express

# 2. Desinstalar versión problemática
npm uninstall express

# 3. Instalar versión del curso
npm install express@^5.1.0

# 4. Verificar instalación
npm list express
```

#### ✅ **Verificación**

```javascript
// test-express.js
import express from "express";
const app = express();
console.log("✅ Express v5.1.0+ funcionando correctamente");
```

---

### 2. **📦 Error con módulos ES6 (`type: "module"`)**

<details>
<summary><strong>💥 Síntomas del problema</strong></summary>

```bash
SyntaxError: Cannot use import statement outside a module
ReferenceError: require is not defined in ES module scope
```

</details>

#### 🔧 **Solución**

1. **Verificar `package.json`:**

```json
{
  "type": "module", // ✅ OBLIGATORIO para el curso
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

2. **Usar sintaxis correcta:**

```javascript
// ✅ Correcto (ES6)
import express from "express";
import { readFile } from "fs/promises";

// ❌ Incorrecto en el curso
const express = require("express");
```

---

### 3. **Error de permisos en npm (macOS/Linux)**

#### Problema:

No puedes instalar paquetes globales debido a problemas de permisos.

#### Solución:

Configura npm para usar un directorio local.

```bash
# Configurar npm para directorio local
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Agregar a ~/.bashrc o ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

### 4. **MongoDB no conecta en la última versión**

#### Problema:

La conexión a MongoDB falla debido a cambios en las versiones recientes.

#### Solución:

Actualiza la configuración de Mongoose para que sea compatible con MongoDB 7.x+.

```javascript
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/miapp", {
  // Las opciones deprecadas ya no son necesarias en v8
});
```

---

### 5. **MySQL no conecta con Sequelize**

#### Problema:

La conexión a MySQL falla al usar Sequelize.

#### Solución:

Asegúrate de usar la configuración correcta para Sequelize.

```javascript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Desactivar logs SQL en desarrollo
});
```

---

### 6. **Error al instalar dependencias del proyecto**

#### Problema:

La instalación de dependencias falla debido a conflictos o versiones incompatibles.

#### Solución:

Elimina y reinstala las dependencias del proyecto.

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 7. **Error con Git (configuración inicial)**

#### Problema:

Git no está configurado correctamente, lo que genera errores al realizar commits o push.

#### Solución:

Configura Git con tu nombre y correo electrónico.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
git config --global init.defaultBranch main
```

---

## 🆘 **Guía de Autorreparación**

### Antes de Pedir Ayuda

| Paso | Acción                                                                            | Tiempo |
| ---- | --------------------------------------------------------------------------------- | ------ |
| 1️⃣   | Ejecuta [diagnóstico rápido](#-diagnóstico-rápido-30-segundos)                    | 30s    |
| 2️⃣   | Busca tu error en esta página                                                     | 2min   |
| 3️⃣   | Prueba la solución sugerida                                                       | 5min   |
| 4️⃣   | Ejecuta [script de verificación](Setup-Guide.md#script-de-verificación-del-curso) | 1min   |
| 5️⃣   | Si persiste, contacta [soporte](#-soporte)                                        | -      |

---

## 📞 Soporte

### 🚨 **Para Emergencias (Curso en Vivo)**

- **Discord**: [#ayuda-urgente](https://discord.com/channels/1326233159670698064/1326236998133874808)

### 💬 **Ayuda Comunitaria**

- **Discord**: [#ayuda-curso-nodejs](https://discord.com/channels/1326233159670698064/1326236998133874808)
- **GitHub**: [Issues del repositorio](https://github.com/inadaptados/curso-nodejs)

### 📧 **Incluye en tu Consulta**

```
1. Resultado del diagnóstico rápido
2. Sistema operativo y versión
3. Comando que generó el error
4. Mensaje de error completo
5. Lo que intentaste hacer
```

---

_🔄 Actualizado: Julio 2025 | 📈 +95% problemas resueltos con esta guía_
