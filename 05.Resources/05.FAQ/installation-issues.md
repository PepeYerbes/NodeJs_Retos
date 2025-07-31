# 🛠️ Problemas de Instalación - Curso NodeJS 2025

> **🎯 Navegación**: [Node.js](#-instalación-de-nodejs) | [npm](#-problemas-con-npm) | [Dependencias](#-errores-de-dependencias) | [Variables de Entorno](#-variables-de-entorno) | [Permisos](#-problemas-de-permisos)

## 🔍 Diagnóstico Rápido

### **Ejecuta este comando primero:**
```bash
echo "=== DIAGNÓSTICO INSTALACIÓN ===" && \
echo "Node.js: $(node --version 2>/dev/null || echo '❌ NO INSTALADO')" && \
echo "npm: v$(npm --version 2>/dev/null || echo '❌ NO INSTALADO')" && \
echo "OS: $(uname -s 2>/dev/null || echo $OS)" && \
echo "Directorio: $(pwd)" && \
echo "================================"
```

---

## 🟢 Instalación de Node.js

### **❌ Problema: "Node.js no instalado" o versión incorrecta**

#### **Síntomas:**
```bash
node --version
# bash: node: command not found
# O versión menor a v22.16.0
```

#### **✅ Solución por Sistema Operativo:**

**macOS:**
```bash
# Opción 1: Homebrew (Recomendado)
brew install node@22

# Opción 2: Descarga directa
# Ir a https://nodejs.org y descargar LTS
# Ejecutar el instalador .pkg

# Verificar instalación
node --version  # Debe mostrar v22.16.0+
npm --version   # Debe mostrar v10.0.0+
```

**Windows:**
```powershell
# Opción 1: Chocolatey
choco install nodejs --version=22.16.0

# Opción 2: Winget
winget install OpenJS.NodeJS

# Opción 3: Descarga directa
# https://nodejs.org → Descargar .msi → Ejecutar
```

**Linux (Ubuntu/Debian):**
```bash
# Opción 1: NodeSource Repository (Recomendado)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Opción 2: Snap
sudo snap install node --classic

# Verificar
node --version
npm --version
```

**Linux (CentOS/RHEL):**
```bash
# Usar NodeSource
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install nodejs npm
```

### **❌ Problema: "Múltiples versiones de Node.js"**

#### **✅ Solución: Usar nvm (Node Version Manager)**

**Instalar nvm:**
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reiniciar terminal o ejecutar:
source ~/.bashrc  # o ~/.zshrc en macOS

# Windows: Usar nvm-windows
# Descargar desde: https://github.com/coreybutler/nvm-windows
```

**Usar nvm:**
```bash
# Instalar Node.js v22.16.0
nvm install 22.16.0

# Usar esa versión
nvm use 22.16.0

# Establecer como default
nvm alias default 22.16.0

# Listar versiones instaladas
nvm list
```

---

## 📦 Problemas con npm

### **❌ Problema: "npm command not found"**

```bash
npm --version
# bash: npm: command not found
```

#### **✅ Solución:**
```bash
# npm viene con Node.js, si no está disponible:

# macOS con Homebrew
brew install npm

# Linux
sudo apt install npm  # Ubuntu/Debian
sudo yum install npm   # CentOS/RHEL

# Windows: Reinstalar Node.js desde nodejs.org
```

### **❌ Problema: "npm cache errors"**

#### **Síntomas:**
```bash
npm install
# npm ERR! cache corruption
# npm ERR! unexpected end of file
```

#### **✅ Solución:**
```bash
# Limpiar cache completamente
npm cache clean --force

# Verificar cache
npm cache verify

# Si persiste, limpiar manualmente
rm -rf ~/.npm  # macOS/Linux
# En Windows: C:\Users\%USERNAME%\AppData\Roaming\npm-cache
```

### **❌ Problema: "npm install extremadamente lento"**

#### **✅ Soluciones:**

**1. Cambiar registry:**
```bash
# Verificar registry actual
npm config get registry

# Cambiar a registry oficial
npm config set registry https://registry.npmjs.org/

# Para China: usar cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install  # En lugar de npm install
```

**2. Configurar proxy (si estás en red corporativa):**
```bash
npm config set proxy http://proxy.empresa.com:8080
npm config set https-proxy http://proxy.empresa.com:8080

# Eliminar proxy si no es necesario
npm config delete proxy
npm config delete https-proxy
```

---

## 🔧 Errores de Dependencias

### **❌ Problema: "Cannot find module 'express'"**

#### **Síntomas:**
```bash
node server.js
# Error: Cannot find module 'express'
```

#### **✅ Solución:**
```bash
# 1. Verificar que estás en el directorio correcto
ls -la
# Debe existir package.json

# 2. Instalar dependencias
npm install

# 3. Si package.json no existe, crearlo
npm init -y

# 4. Instalar Express específicamente
npm install express@^5.1.0
```

### **❌ Problema: "Module version mismatch"**

#### **Síntomas:**
```bash
Error: The module was compiled against a different Node.js version
```

#### **✅ Solución:**
```bash
# Rebuildir módulos nativos
npm rebuild

# Si persiste, reinstalar node_modules
rm -rf node_modules package-lock.json
npm install

# Para módulos específicos (ej: bcrypt)
npm uninstall bcrypt
npm install bcrypt
```

### **❌ Problema: "peer deps warnings"**

#### **Síntomas:**
```bash
npm WARN eslint@8.0.0 requires a peer of @eslint/eslintrc@^1.0.0
```

#### **✅ Solución:**
```bash
# Instalar peer dependencies manualmente
npm install @eslint/eslintrc@^1.0.0

# O ignorar warnings (si no afecta funcionalidad)
npm install --legacy-peer-deps

# Verificar qué peer deps faltan
npm ls --depth=0
```

---

## ⚙️ Variables de Entorno

### **❌ Problema: "Variables de entorno no funcionan"**

#### **Síntomas:**
```javascript
console.log(process.env.PORT); // undefined
```

#### **✅ Solución:**

**1. Verificar archivo .env:**
```bash
# Crear .env en la raíz del proyecto
cat > .env << EOF
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/miapp
JWT_SECRET=mi_secreto_super_seguro
EOF
```

**2. Instalar y configurar dotenv:**
```bash
npm install dotenv
```

```javascript
// Al inicio de server.js
import dotenv from 'dotenv';
dotenv.config();

// Ahora funciona
console.log(process.env.PORT); // 3000
```

**3. Verificar que .env no esté en .gitignore (para desarrollo local):**
```bash
# .gitignore debe contener:
.env
node_modules/
```

### **❌ Problema: ".env no se carga"**

#### **✅ Solución:**
```bash
# Verificar ubicación del .env
ls -la | grep .env
# Debe estar en la raíz del proyecto

# Verificar contenido
cat .env
# No debe tener espacios: PORT=3000 ✅, PORT = 3000 ❌

# Verificar encoding
file .env  # Debe ser ASCII o UTF-8

# Si usas Windows, verificar line endings
dos2unix .env  # Convertir CRLF a LF
```

---

## 🔐 Problemas de Permisos

### **❌ Problema: "Permission denied" en npm install**

#### **Síntomas (macOS/Linux):**
```bash
npm install -g nodemon
# Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

#### **✅ Solución (Recomendada - cambiar directorio npm):**
```bash
# 1. Crear directorio para paquetes globales
mkdir ~/.npm-global

# 2. Configurar npm para usar ese directorio
npm config set prefix '~/.npm-global'

# 3. Agregar a PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 4. Ahora instalar globalmente
npm install -g nodemon
```

#### **❌ Solución NO recomendada (sudo):**
```bash
# Funciona pero puede causar problemas
sudo npm install -g nodemon
```

### **❌ Problema: "ENOSPC" en Linux**

#### **Síntomas:**
```bash
npm install
# Error: ENOSPC: no space left on device, watch
```

#### **✅ Solución:**
```bash
# Aumentar límite de file watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Reiniciar proyecto
npm run dev
```

---

## 🐳 Problemas con Docker (Bonus)

### **❌ Problema: "Node.js app no funciona en Docker"**

#### **✅ Dockerfile correcto:**
```dockerfile
FROM node:22.16.0-alpine

WORKDIR /app

# Copiar package files primero para cache layers
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]
```

#### **✅ .dockerignore:**
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.DS_Store
```

---

## 🔄 Reset Completo (Solución Nuclear)

### **Cuando todo falla, empezar de cero:**

```bash
# 1. Backup de tu código (solo archivos .js, .json importantes)
mkdir ~/backup-proyecto
cp server.js ~/backup-proyecto/
cp package.json ~/backup-proyecto/
cp -r src/ ~/backup-proyecto/ 2>/dev/null || true

# 2. Limpiar completamente
rm -rf node_modules package-lock.json .npm
npm cache clean --force

# 3. Reinstalar Node.js si es necesario
# (usar métodos de arriba)

# 4. Recrear proyecto
npm init -y
npm install express@^5.1.0

# 5. Restaurar código
cp ~/backup-proyecto/server.js ./
# Modificar package.json según necesites

# 6. Probar
npm run dev
```

---

## 📊 Checklist de Verificación Post-Instalación

### ✅ **Lista de Verificación Completa:**

```bash
# [ ] Node.js versión correcta
node --version  # v22.16.0+

# [ ] npm versión correcta  
npm --version   # v10.0.0+

# [ ] Puede crear proyecto
mkdir test-proyecto && cd test-proyecto
npm init -y

# [ ] Puede instalar express
npm install express@^5.1.0

# [ ] Puede ejecutar código
echo 'console.log("✅ Todo funciona!")' > test.js
node test.js

# [ ] Variables de entorno funcionan
echo 'console.log("PORT:", process.env.PORT || "3000")' > env-test.js
PORT=4000 node env-test.js

# [ ] Cleanup
cd .. && rm -rf test-proyecto
```

---

## 🆘 Ayuda Adicional

### **Si nada de esto funciona:**

1. **Información a recopilar:**
```bash
# Sistema operativo
uname -a  # Linux/macOS
systeminfo | findstr /B /C:"OS Name"  # Windows

# Versiones instaladas
which node npm
node --version
npm --version

# Configuración npm
npm config list

# Variables de entorno relevantes
echo $PATH
echo $NODE_PATH