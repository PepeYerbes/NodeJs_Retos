const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware para parsear JSON
app.use(express.json());

// Usamos las rutas definidas
app.use('/', routes);

// Manejador de errores
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Algo salió mal!');
});

// Iniciamos el servidor
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});