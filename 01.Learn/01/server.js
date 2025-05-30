const express = require('express');
const app = express();

let port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola inadaptados!');
});

app.get('/admin', (req, res) => {
  res.send('Hola, admin!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});