import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api', routes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});