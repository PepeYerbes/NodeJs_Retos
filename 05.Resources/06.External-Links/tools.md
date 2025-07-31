# 🛠️ Herramientas y Extensiones - Setup del Desarrollador

> **🎯 Navegación**: [VS Code](#-visual-studio-code) | [Testing APIs](#-testing-de-apis) | [Base de Datos](#-herramientas-de-base-de-datos) | [Git](#-git-y-control-de-versiones) | [Productividad](#-productividad)

## 💻 Visual Studio Code

### **🚀 Extensiones Esenciales para Node.js**

#### **Must-Have (Instalar todas)** ⭐⭐⭐⭐⭐

| Extensión | ID | Uso | Descarga |
|-----------|----|----|----------|
| **ES7+ React/Redux/React-Native snippets** | `dsznajder.es7-react-js-snippets` | Snippets JS modernos | [Instalar](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) |
| **Thunder Client** | `rangav.vscode-thunder-client` | Testing APIs dentro de VS Code | [Instalar](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) |
| **Auto Rename Tag** | `formulahendry.auto-rename-tag` | Renombrar tags HTML automáticamente | [Instalar](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) |
| **Bracket Pair Colorizer 2** | `coenraads.bracket-pair-colorizer-2` | Colorear llaves/paréntesis | [Instalar](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) |
| **GitLens** | `eamodio.gitlens` | Git supercharged | [Instalar](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) |

#### **Code Quality** ⭐⭐⭐⭐⭐

| Extensión | Descripción | Configuración |
|-----------|-------------|---------------|
| **ESLint** | Linter JavaScript | [Setup](#eslint-setup) |
| **Prettier** | Code formatter | [Setup](#prettier-setup) |
| **SonarLint** | Code quality analyzer | Auto-detecta issues |
| **Code Spell Checker** | Spell check en código | Detecta typos |

#### **Node.js Specific** ⭐⭐⭐⭐

| Extensión | Uso | Beneficio |
|-----------|-----|-----------|
| **npm Intellisense** | Autocompletado npm packages | Importaciones rápidas |
| **Path Intellisense** | Autocompletado rutas archivos | Menos errores de path |
| **DotENV** | Syntax highlighting .env | Mejor visualización |
| **REST Client** | Testing APIs con archivos .http | Alternative a Postman |

### **⚙️ Configuración Recomendada**

#### **settings.json**
```json
{
  // General
  "editor.fontSize": 14,
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.5,
  "editor.minimap.enabled": true,
  "editor.wordWrap": "on",
  
  // Formatting
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  
  // ESLint
  "eslint.validate": ["javascript", "javascriptreact", "typescript"],
  "eslint.format.enable": true,
  
  // Node.js specific
  "typescript.preferences.importModuleSpecifier": "relative",
  "javascript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  
  // Files
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 2000,
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/*.log": true
  },
  
  // Explorer
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  
  // Terminal
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.fontFamily": "'Fira Code', monospace"
}
```

#### **ESLint Setup**
```bash
# Instalar ESLint en proyecto
npm install -D eslint

# Configurar ESLint
npx eslint --init

# .eslintrc.json recomendado
{
  "extends": [
    "eslint:recommended",
    "airbnb-base"
  ],
  "env": {
    "node": true,
    "es2022": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

#### **Prettier Setup**
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### **🎨 Temas Recomendados**

| Tema | Estilo | Popular Entre |
|------|--------|---------------|
| **One Dark Pro** | Oscuro elegante | Desarrolladores JS ⭐⭐⭐⭐⭐ |
| **Material Theme** | Material Design | Developers que vienen de Android ⭐⭐⭐⭐ |
| **Dracula Official** | Oscuro vibrante | Desarrolladores que trabajan de noche ⭐⭐⭐⭐ |
| **GitHub Theme** | Claro/Oscuro | Fans de GitHub ⭐⭐⭐ |

### **🔧 Snippets Personalizados**

#### **JavaScript/Node.js Snippets**
```json
// Code > Preferences > Configure User Snippets > javascript.json
{
  "Express Route": {
    "prefix": "exproute",
    "body": [
      "app.$1('$2', async (req, res) => {",
      "  try {",
      "    $3",
      "    res.json({ success: true, data: $4 });",
      "  } catch (error) {",
      "    res.status(500).json({ error: error.message });",
      "  }",
      "});"
    ],
    "description": "Express route with error handling"
  },
  
  "Mongoose Schema": {
    "prefix": "mongoschema",
    "body": [
      "import mongoose from 'mongoose';",
      "",
      "const ${1:name}Schema = new mongoose.Schema({",
      "  $2",
      "}, {",
      "  timestamps: true",
      "});",
      "",
      "export default mongoose.model('$1', ${1:name}Schema);"
    ],
    "description": "Mongoose Schema template"
  },
  
  "Jest Test": {
    "prefix": "jesttest",
    "body": [
      "describe('$1', () => {",
      "  test('$2', async () => {",
      "    $3",
      "    expect($4).toBe($5);",
      "  });",
      "});"
    ],
    "description": "Jest test template"
  }
}
```

---

## 🧪 Testing de APIs

### **📮 Postman** ⭐⭐⭐⭐⭐

#### **Instalación y Setup**
- **[Descargar Postman](https://www.postman.com/downloads/)** (Desktop recomendado)
- **[Postman Web](https://web.postman.co/)** (Navegador)

#### **Features Esenciales para el Curso**
```javascript
// 1. Collections - Organizar requests
Curso NodeJS 2025/
├── 📁 Auth/
│   ├── POST Login
│   ├── POST Register  
│   └── GET Profile
├── 📁 Users/
│   ├── GET All Users
│   ├── POST Create User
│   └── PUT Update User
└── 📁 Environment Variables

// 2. Environment Variables
{
  "baseUrl": "http://localhost:3000",
  "token": "{{authToken}}",
  "userId": "{{currentUserId}}"
}

// 3. Pre-request Scripts (JavaScript)
// Auto-login y setear token
pm.sendRequest({
  url: pm.environment.get("baseUrl") + "/auth/login",
  method: "POST",
  header: {
    "Content-Type": "application/json"
  },
  body: {
    mode: "raw",
    raw: JSON.stringify({
      email: "test@test.com",
      password: "password123"
    })
  }
}, (err, res) => {
  if (!err) {
    const token = res.json().token;
    pm.environment.set("authToken", token);
  }
});

// 4. Tests (JavaScript)  
// Verificar respuesta
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response has token", () => {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('token');
  pm.environment.set("authToken", jsonData.token);
});
```

#### **Templates de Requests**
```http
### Login Request
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "password123"
}

### Protected Request  
GET {{baseUrl}}/profile
Authorization: Bearer {{token}}

### Create User
POST {{baseUrl}}/users
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### **⚡ Thunder Client (VS Code)** ⭐⭐⭐⭐⭐

#### **Ventajas sobre Postman**
- ✅ Integrado en VS Code
- ✅ Más rápido y ligero
- ✅ Git-friendly (requests como archivos)
- ✅ Soporte para variables de entorno

#### **Setup Básico**
```json
// thunder-client-env.json
{
  "default": {
    "baseUrl": "http://localhost:3000",
    "token": "",
    "userId": "507f1f77bcf86cd799439011"
  },
  "production": {
    "baseUrl": "https://mi-api.herokuapp.com",
    "token": "",
    "userId": ""
  }
}
```

### **🔧 REST Client (VS Code Extension)** ⭐⭐⭐⭐

#### **Archivos .http**
```http
### Variables
@baseUrl = http://localhost:3000
@token = your-jwt-token-here

### Login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "test@test.com", 
  "password": "password123"
}

### Get Profile (usar token de arriba)
GET {{baseUrl}}/profile
Authorization: Bearer {{token}}

### Create User
POST {{baseUrl}}/users
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

---

## 🗄️ Herramientas de Base de Datos

### **🍃 MongoDB Tools**

#### **MongoDB Compass** ⭐⭐⭐⭐⭐
- **[Descargar](https://www.mongodb.com/products/compass)** - GUI oficial
- **Features clave**:
  - ✅ Visual query builder
  - ✅ Schema analysis  
  - ✅ Performance insights
  - ✅ Import/Export data

#### **MongoDB Atlas** ⭐⭐⭐⭐⭐
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Cloud database
- **Free Tier**: 512MB storage
- **Perfect para**: Desarrollo y proyectos pequeños

#### **Studio 3T** ⭐⭐⭐⭐
- **[Descargar](https://studio3t.com/)** - GUI avanzada (pago)
- **Free Trial**: 30 days
- **Features premium**: Query auto-completion, SQL to MongoDB

#### **Robo 3T** ⭐⭐⭐
- **[Descargar](https://robomongo.org/)** - GUI gratuita ligera
- **Best for**: Queries rápidas y debugging

### **🐘 MySQL Tools**

#### **MySQL Workbench** ⭐⭐⭐⭐⭐
- **[Descargar](https://dev.mysql.com/downloads/workbench/)** - Oficial gratuito
- **Features**:
  - ✅ Visual database design
  - ✅ SQL editor con syntax highlighting
  - ✅ Database administration
  - ✅ Migration wizard

#### **phpMyAdmin** ⭐⭐⭐⭐
- **[Web-based](https://www.phpmyadmin.net/)** - Interfaz web
- **Best for**: Shared hosting environments

#### **DBeaver** ⭐⭐⭐⭐⭐
- **[Descargar](https://dbeaver.io/)** - Universal database tool
- **Supports**: MySQL, PostgreSQL, MongoDB, SQLite
- **Free Community Edition**

### **🔧 Database Management VS Code Extensions**

| Extensión | Base de Datos | Rating |
|-----------|---------------|---------|
| **MongoDB for VS Code** | MongoDB | ⭐⭐⭐⭐⭐ |
| **MySQL** | MySQL | ⭐⭐⭐⭐ |
| **SQLite** | SQLite | ⭐⭐⭐⭐ |
| **Database Client** | Multiple | ⭐⭐⭐⭐ |

---

## 📊 Git y Control de Versiones

### **🐙 GitHub Desktop** ⭐⭐⭐⭐
- **[Descargar](https://desktop.github.com/)** - GUI oficial de GitHub
- **Best for**: Principiantes en Git
- **Features**: Visual diffs, branch management, PR management

### **🌳 GitKraken** ⭐⭐⭐⭐⭐
- **[Descargar](https://www.gitkraken.com/)** - GUI premium con free tier
- **Features avanzadas**: 
  - ✅ Visual commit history
  - ✅ Interactive rebase
  - ✅ Merge conflict resolution
  - ✅ Integration con GitHub, GitLab, Bitbucket

### **⚡ Lazygit** ⭐⭐⭐⭐
- **[GitHub](https://github.com/jesseduffield/lazygit)** - Terminal UI para Git
- **Installation**:
```bash
# macOS
brew install lazygit

# Windows (scoop)
scoop install lazygit

# Linux
sudo apt install lazygit
```

### **🔧 Git Aliases Útiles**
```bash
# ~/.gitconfig
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    tree = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
    pushup = push --set-upstream origin HEAD
```

### **📝 Git Extensions para VS Code**

| Extensión | Descripción | Rating |
|-----------|-------------|---------|
| **GitLens** | Git history, blame, y más | ⭐⭐⭐⭐⭐ |
| **Git History** | Visual git log | ⭐⭐⭐⭐ |
| **Git Graph** | Interactive git graph | ⭐⭐⭐⭐ |
| **GitHub Pull Requests** | Manage PRs desde VS Code | ⭐⭐⭐⭐ |

---

## 🚀 Productividad

### **🔍 Búsqueda y Navegación**

#### **Alfred (macOS)** ⭐⭐⭐⭐⭐
- **[Descargar](https://www.alfredapp.com/)** - Launcher con workflows
- **Workflows útiles**:
  - **Kill Process**: Terminar procesos por puerto
  - **NPM Search**: Buscar packages npm
  - **Stack Overflow**: Buscar preguntas directamente

#### **Everything (Windows)** ⭐⭐⭐⭐⭐
- **[Descargar](https://www.voidtools.com/)** - Búsqueda instantánea de archivos

#### **Raycast (macOS)** ⭐⭐⭐⭐⭐
- **[Descargar](https://www.raycast.com/)** - Alfred alternativo moderno
- **Extensions**: GitHub, Jira, Figma, etc.

### **📝 Note Taking**

#### **Notion** ⭐⭐⭐⭐⭐
- **[Notion](https://www.notion.so/)** - All-in-one workspace
- **Templates para desarrolladores**:
  - Project management
  - Code snippets library
  - Learning resources

#### **Obsidian** ⭐⭐⭐⭐⭐
- **[Obsidian](https://obsidian.md/)** - Knowledge management
- **Best for**: Technical documentation, personal wiki

#### **Markdown editors**
- **[Typora](https://typora.io/)** - WYSIWYG markdown editor ⭐⭐⭐⭐
- **[Mark Text](https://marktext.app/)** - Free alternative ⭐⭐⭐⭐

### **⏰ Time Management**

#### **RescueTime** ⭐⭐⭐⭐
- **[RescueTime](https://www.rescuetime.com/)** - Automatic time tracking
- **Reports**: Tiempo en coding vs distracciones

#### **Toggl Track** ⭐⭐⭐⭐⭐
- **[Toggl](https://toggl.com/track/)** - Manual time tracking
- **Projects**: Separar tiempo por proyectos del curso

### **🎯 Focus**

#### **Cold Turkey** ⭐⭐⭐⭐⭐
- **[Cold Turkey](https://getcoldturkey.com/)** - Website/app blocker
- **Scheduled blocks**: Bloquear redes sociales durante coding

#### **Freedom** ⭐⭐⭐⭐
- **[Freedom](https://freedom.to/)** - Cross-platform blocker
- **Sync**: Bloqueo en todos tus dispositivos

---

## 🔧 Terminal y Command Line

### **🖥️ Terminal Mejorado**

#### **Windows Terminal** ⭐⭐⭐⭐⭐
- **[Microsoft Store](https://aka.ms/terminal)** - Terminal moderno para Windows
- **Features**: Tabs, GPU acceleration, themes

#### **iTerm2 (macOS)** ⭐⭐⭐⭐⭐
- **[Descargar](https://iterm2.com/)** - Terminal replacement
- **Features**: Split panes, search, autocomplete

#### **Hyper** ⭐⭐⭐⭐
- **[Descargar](https://hyper.is/)** - Cross-platform terminal
- **Built with**: Electron y Web Technologies

### **🔧 Shell Enhancements**

#### **Oh My Zsh** ⭐⭐⭐⭐⭐
```bash
# Instalar Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Plugins recomendados para Node.js
plugins=(git node npm nvm docker yarn)

# Temas populares
ZSH_THEME="powerlevel10k/powerlevel10k" # Requires installation
```

#### **Starship** ⭐⭐⭐⭐⭐
- **[Starship](https://starship.rs/)** - Cross-shell prompt
- **Auto-detects**: Git, Node.js, npm, etc.

### **📦 Package Managers**

#### **Homebrew (macOS/Linux)** ⭐⭐⭐⭐⭐
```bash
# Instalar Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Herramientas útiles para developers
brew install git node tree htop wget curl
```

#### **Scoop (Windows)** ⭐⭐⭐⭐⭐
```powershell
# Instalar Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Herramientas básicas
scoop install git nodejs python
```

#### **Chocolatey (Windows)** ⭐⭐⭐⭐
```powershell
# Instalar Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar herramientas
choco install nodejs git vscode postman
```

---

## 🎨 Design y Mockups

### **🎨 Design Tools**

#### **Figma** ⭐⭐⭐⭐⭐
- **[Figma](https://www.figma.com/)** - Web-based design tool
- **Free tier**: 3 proyectos, unlimited personal files
- **Best for**: UI mockups, prototyping

#### **Canva** ⭐⭐⭐⭐
- **[Canva](https://www.canva.com/)** - Easy graphic design
- **Templates**: Social media, presentations, logos

### **📐 Wireframing**

#### **Balsamiq** ⭐⭐⭐⭐
- **[Balsamiq](https://balsamiq.com/)** - Rapid wireframing
- **30-day free trial**

#### **Draw.io** ⭐⭐⭐⭐⭐
- **[app.diagrams.net](https://app.diagrams.net/)** - Free diagramming
- **Use cases**: Database schemas, API flows, architecture

---

## 📊 Monitoring y Analytics

### **🔍 Application Monitoring**

#### **New Relic** ⭐⭐⭐⭐
- **[New Relic](https://newrelic.com/)** - APM para Node.js
- **Free tier**: 100 GB/month

#### **Sentry** ⭐⭐⭐⭐⭐
- **[Sentry](https://sentry.io/)** - Error tracking
- **Free tier**: 5,000 errors/month

### **📈 Performance**

#### **Lighthouse** ⭐⭐⭐⭐⭐
- **Built into Chrome DevTools**
- **Command line**: `npm install -g lighthouse`

#### **WebPageTest** ⭐⭐⭐⭐
- **[webpagetest.org](https://www.webpagetest.org/)** - Free performance testing

---

## 🎯 Setup Checklist

### **✅ Día 1 - Esenciales**
- [ ] VS Code + extensiones básicas
- [ ] Node.js v22.16.0
- [ ] Git configurado
- [ ] Postman o Thunder Client
- [ ] Terminal mejorado

### **✅ Semana 1 - Desarrollo**
- [ ] ESLint + Prettier configurados
- [ ] MongoDB Compass (si usas MongoDB)
- [ ] MySQL Workbench (si usas MySQL)
- [ ] GitHub account configurado
- [ ] Environment variables setup

### **✅ Semana 2 - Optimización**
- [ ] Snippets personalizados
- [ ] Git aliases
- [ ] Tema y fonts preferidos
- [ ] Keyboard shortcuts memorizados

### **✅ Mes 1 - Avanzado**
- [ ] Monitoring tools setup
- [ ] Testing tools configurados
- [ ] CI/CD básico
- [ ] Deployment tools listos

---

## 💰 Presupuesto de Herramientas

### **🆓 Completamente Gratis**
- VS Code + todas las extensiones mencionadas
- Postman (free tier)
- MongoDB Atlas (512MB free)
- GitHub (repos públicos unlimited)
- Heroku (free tier discontinued, pero alternativas gratis)

### **💸 Freemium (Free tier generoso)**
- **Figma**: 3 proyectos gratis
- **Notion**: Personal use gratis
- **Sentry**: 5,000 errors/mes gratis
- **New Relic**: 100GB/mes gratis

### **💰 Premium Recomendado (Opcional)**
- **GitKraken**: $4.95/mes (GUI Git avanzada)
- **MongoDB Atlas**: $9/mes (cluster dedicado)
- **Heroku**: $7/mes (hobby dyno)

### **🎓 Student Discounts**
- **GitHub Pro**: Gratis con Student Pack
- **Heroku**: Credits con Student Pack
- **MongoDB Atlas**: Credits con Student Pack
- **[GitHub Student Developer Pack](https://education.github.com/pack)**

---

*🛠️ Herramientas verificadas para 2025 | 🔄 Última actualización: Enero 2025 | 💻 100% compatibles con el curso*