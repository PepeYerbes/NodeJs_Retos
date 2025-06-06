import saludar from './saludo.js'
import chalk from 'chalk';
import inquirer from 'inquirer';

inquirer.prompt([
  {
    type: 'input',
    name: 'nombre',
    message: '¿Cuál es tu nombre?'
  },
  {
    type: 'list',
    message: '¿Cuál es tu color favorito?',
    name: 'color',
    choices: ['Rojo', 'Azul', 'Amarillo', 'Verde']
  }
]).then(respuestas => {
  console.log(chalk.red(saludar(respuestas.nombre)));
  console.log(`Tu color favorito es: ${respuestas.color}`);
});
