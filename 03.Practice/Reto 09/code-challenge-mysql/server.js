import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", routes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});