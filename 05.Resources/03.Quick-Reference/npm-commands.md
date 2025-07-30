# 📦 NPM Commands v10.0.0+ - Referencia Rápida

> **🎯 Navegación**: [Instalación](#-instalación-de-paquetes) | [Scripts](#-scripts) | [Versionado](#-versionado) | [Troubleshooting](#-troubleshooting) | [Configuración](#️-configuración)

## 🚀 Instalación de Paquetes

### Comandos Básicos

```bash
# Instalar dependencias desde package.json
npm install
npm i  # Versión corta

# Instalar paquete específico
npm install express
npm i express  # Versión corta

# Instalar versión específica
npm install express@5.1.0
npm install express@latest
npm install express@next

# Instalar como dependencia de desarrollo
npm install --save-dev nodemon
npm i -D nodemon  # Versión corta

# Instalar globalmente
npm install -g nodemon
npm i -g create-react-app

# Instalar sin guardar en package.json
npm install --no-save express
```

### Instalación Múltiple

```bash
# Múltiples paquetes
npm install express mongoose cors helmet

# Múltiples paquetes dev
npm install -D nodemon jest eslint prettier

# Desde diferentes fuentes
npm install express@5.1.0 mongoose@latest cors@^2.8.5
```

### Instalación Específica del Curso

```bash
# Stack completo del curso
npm install express@^5.1.0 mongoose@^8.16.3

# Para proyectos con MySQL
npm install express@^5.1.0 sequelize@^6.37.7 mysql2@^3.9.0

# Herramientas de desarrollo
npm install -D nodemon@^3.1.10 jest@^29.5.0

# Utilidades comunes
npm install cors@^2.8.5 helmet@^7.1.0 bcrypt@^5.1.0 jsonwebtoken@^9.0.0
```

## 📜 Scripts

### Scripts del Curso (package.json)

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "echo 'No build needed'",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "db:migrate": "sequelize-cli db:migrate",
    "db:seed": "sequelize-cli db:seed:all"
  }
}
```

### Ejecutar Scripts

```bash
# Scripts personalizados
npm run dev        # nodemon server.js
npm run test       # jest
npm run lint       # eslint src/

# Scripts con argumentos
npm run test -- --verbose
npm run lint -- --fix

# Scripts especiales (no necesitan 'run')
npm start         # npm run start
npm test          # npm run test
npm install       # Instalar dependencias
```

### Scripts Avanzados

```json
{
  "scripts": {
    "prestart": "echo 'Preparando servidor...'",
    "start": "node server.js",
    "poststart": "echo 'Servidor iniciado'",

    "setup": "npm install && npm run db:setup",
    "db:setup": "npm run db:migrate && npm run db:seed",
    "clean": "rm -rf node_modules package-lock.json",
    "fresh": "npm run clean && npm install"
  }
}
```

## 🔍 Información de Paquetes

```bash
# Ver información de paquete
npm info express
npm view express  # Alias

# Ver versiones disponibles
npm view express versions --json

# Ver paquetes instalados
npm list
npm ls  # Versión corta

# Solo dependencias principales
npm ls --depth=0

# Paquetes globales
npm ls -g --depth=0

# Buscar paquetes
npm search "express middleware"

# Ver paquetes desactualizados
npm outdated

# Ver dependencias específicas
npm ls express
npm ls mongoose
```

## 📈 Versionado

### Actualizar Paquetes

```bash
# Actualizar todos los paquetes (respetando rangos)
npm update

# Actualizar paquete específico
npm update express

# Instalar última versión (ignora rangos)
npm install express@latest

# Ver qué se actualizaría
npm outdated
```

### Versionado Semántico

```bash
# Rangos de versión en package.json
"express": "^5.1.0"     # Compatible: 5.1.0 <= version < 6.0.0
"mongoose": "~8.16.3"   # Compatible: 8.16.3 <= version < 8.17.0
"cors": "2.8.5"         # Exacta: solo 2.8.5
"helmet": "*"           # Cualquier versión (no recomendado)
"bcrypt": ">=5.1.0"     # Mayor o igual a 5.1.0
```

### NPM Version (Para tus paquetes)

```bash
# Incrementar versión
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.1 -> 1.1.0
npm version major   # 1.1.0 -> 2.0.0

# Con mensaje de commit
npm version patch -m "Fix: corrección de bugs"

# Pre-release
npm version prerelease  # 1.0.0 -> 1.0.1-0
npm version prerelease --preid=beta  # 1.0.1-beta.0
```

## 🗑️ Desinstalación

```bash
# Desinstalar paquete
npm uninstall express
npm remove express  # Alias
npm rm express      # Alias corto

# Desinstalar dev dependency
npm uninstall -D nodemon

# Desinstalar global
npm uninstall -g create-react-app

# Desinstalar sin actualizar package.json
npm uninstall --no-save express
```

## 🛠️ Troubleshooting

### Limpiar y Reinstalar

```bash
# Limpiar caché de npm
npm cache clean --force

# Verificar caché
npm cache verify

# Reinstalar desde cero
rm -rf node_modules package-lock.json
npm install

# En Windows
rmdir /s node_modules
del package-lock.json
npm install
```

### Problemas Comunes

```bash
# Error de permisos (macOS/Linux)
sudo npm install -g paquete

# Cambiar registry (para problemas de conectividad)
npm config set registry https://registry.npmjs.org/

# Ver configuración actual
npm config list

# Resolver vulnerabilidades
npm audit
npm audit fix
npm audit fix --force  # Cuidado con este comando

# Verificar integridad de paquetes
npm install --package-lock-only
```

### Debug de NPM

```bash
# Modo verbose para más información
npm install --verbose

# Logs de npm
npm config get logs-max
npm config set logs-max 0  # Deshabilitar logs

# Ver logs de errores
cat ~/.npm/_logs/*.log  # macOS/Linux
type %APPDATA%\npm-cache\_logs\*.log  # Windows
```

## ⚙️ Configuración

### Configuración Global

```bash
# Ver toda la configuración
npm config list
npm config list -l  # Incluye defaults

# Configuraciones importantes
npm config set init-author-name "Tu Nombre"
npm config set init-author-email "tu@email.com"
npm config set init-license "MIT"

# Configurar registry
npm config set registry https://registry.npmjs.org/

# Configurar proxy (si es necesario)
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### .npmrc (Configuración por proyecto)

```bash
# .npmrc en la raíz del proyecto
registry=https://registry.npmjs.org/
save-exact=true
engine-strict=true
```

### Configuración del Curso

```bash
# Configuración recomendada para el curso
npm config set init-version "1.0.0"
npm config set init-license "MIT"
npm config set save-exact false  # Permitir rangos de versión
npm config set engine-strict true  # Respetar engines en package.json
```

## 📊 NPX (Node Package Execute)

```bash
# Ejecutar paquetes sin instalar
npx create-react-app mi-app
npx sequelize-cli init
npx jest --init

# Ejecutar versión específica
npx express-generator@4 mi-app

# Ejecutar desde URL
npx https://gist.github.com/user/script.js

# Ver qué haría sin ejecutar
npx --dry-run create-react-app mi-app

# Forzar descarga (ignorar caché local)
npx --yes create-react-app mi-app
```

## 🚀 Comandos para Desarrollo del Curso

### Setup Inicial

```bash
# Crear proyecto nuevo
mkdir mi-proyecto && cd mi-proyecto
npm init -y

# Modificar package.json para ES6
npm pkg set type="module"
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.start="node server.js"

# Instalar stack básico
npm install express@^5.1.0
npm install -D nodemon@^3.1.10
```

### Stack MongoDB (Mongoose)

```bash
npm install mongoose@^8.16.3 cors@^2.8.5 helmet@^7.1.0
npm install bcrypt@^5.1.0 jsonwebtoken@^9.0.0
npm install -D jest@^29.5.0 supertest@^6.3.0
```

### Stack MySQL (Sequelize)

```bash
npm install sequelize@^6.37.7 mysql2@^3.9.0
npm install -D sequelize-cli@^6.6.0
npx sequelize-cli init
```

### Verificación Final

```bash
# Verificar que todo esté instalado
npm ls --depth=0

# Verificar vulnerabilidades
npm audit

# Test de funcionamiento
npm run dev
```

## 📋 Cheatsheet de Comandos Frecuentes

```bash
# Los 10 comandos más usados en el curso
npm init -y                    # Crear package.json
npm install                    # Instalar dependencias
npm install express            # Instalar paquete
npm install -D nodemon         # Instalar dev dependency
npm run dev                    # Ejecutar desarrollo
npm start                      # Ejecutar producción
npm test                       # Ejecutar tests
npm outdated                   # Ver actualizaciones
npm update                     # Actualizar paquetes
npm cache clean --force        # Limpiar caché
```

### Quick Commands para Copy-Paste

```bash
# Resetear proyecto
rm -rf node_modules package-lock.json && npm install

# Setup curso básico
npm init -y && npm pkg set type="module" && npm install express nodemon

# Instalar stack completo MongoDB
npm install express mongoose cors helmet bcrypt jsonwebtoken

# Instalar stack completo MySQL
npm install express sequelize mysql2 cors helmet bcrypt jsonwebtoken
```

---

_📦 Actualizado para NPM v10.0.0+ y curso NodeJS 2025 | Enero 2025_
