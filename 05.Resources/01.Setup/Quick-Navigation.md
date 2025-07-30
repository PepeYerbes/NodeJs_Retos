# ⚡ Navegación Rápida - Setup

## 🎯 Accesos Directos

### 📋 **Verificación Previa**

```bash
# ¿Todo instalado?
node --version && npm --version && git --version
```

- ✅ **Todo OK** → [Continuar con el curso](#)
- ❌ **Faltan cosas** → [Setup Guide](Setup-Guide.md)
- 🚨 **Errores** → [Troubleshooting](Troubleshooting-Setup.md)

### 🚀 **Instalación Express por SO**

| Sistema     | Comando Rápido                       |
| ----------- | ------------------------------------ |
| **Windows** | `npm install -g express@^5.1.0`      |
| **macOS**   | `sudo npm install -g express@^5.1.0` |
| **Linux**   | `sudo npm install -g express@^5.1.0` |

### 🔧 **Comandos de Emergencia**

```bash
# Resetear npm
rm -rf node_modules package-lock.json && npm install

# Verificar configuración
npm config list

# Limpiar caché npm
npm cache clean --force
```

### 📱 **Enlaces Útiles**

- [📋 Requisitos](System-Requirements.md)
- [🛠️ Setup Completo](Setup-Guide.md)
- [🚨 Problemas](Troubleshooting-Setup.md)
- [💬 Discord](https://discord.gg/5EqsTkGcgm)
