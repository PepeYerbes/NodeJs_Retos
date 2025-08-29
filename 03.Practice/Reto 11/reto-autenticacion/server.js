import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import perfilRoutes from "./routes/perfil.js";

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "🔑 Servidor de autenticación JWT funcionando",
    endpoints: {
      login: "POST /api/auth/login",
      perfil: "GET /api/perfil",
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});