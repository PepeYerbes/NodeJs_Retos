const express = require('express');
const { program } = require('commander');
const crypto = require('crypto');


const app = express();

let port = 0;
const portDev = 3000;
const portQA = 3001;
const portProduction = 3002;

// Configurar el CLI
program
  .option('--dev', 'Modo desarrollo')
  .option('--qa', 'Modo QA')
  .option('--production', 'Modo producción')
  .option('--generate-password <length>', 'Generar una contraseña', parseInt);

program.parse(process.argv);
const options = program.opts();

// Asignar el puerto según el argumento
if (options.dev) {
  port = portDev;
} else if (options.qa) {
  port = portQA;
} else if (options.production) {
  port = portProduction;
} else {
  port = portDev; // Valor por defecto
}

app.get('/', (req, res) => {
  res.send('¡Hola estudiantes de ISC07!');
});

app.get('/admin', (req, res) => {
  res.send('Hola, admin!');
});


app.get('/generatePassword', (req, res) => {
  // Generar una contraseña si se solicita
  if (options.generatePassword) {
    const length = options.generatePassword;
    const password = crypto.randomBytes(length).toString('hex').slice(0, length);
    console.log(`Generated password: ${password}`);
    res.send(`Generated password: ${password}`);
  } else {
    res.send('No password length provided.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  // Mostrar argumentos de línea de comandos
  console.log('Argumentos de línea de comandos:', process.argv);
});