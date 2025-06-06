/**
 * Aplicación interactiva que solicita al usuario su nombre, edad y color favorito,
 * genera un mensaje personalizado según la edad y muestra el nombre en arte ASCII
 * usando figlet y el color seleccionado con chalk.
 *
 * - Utiliza inquirer para la entrada de datos por consola.
 * - Utiliza chalk para colorear la salida.
 * - Utiliza figlet para mostrar el nombre en arte ASCII.
 * - Usa la función saludar para generar un mensaje acorde a la edad.
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import saludar from './saludo.js';
import figlet from 'figlet';

// Solicita datos al usuario y muestra resultados personalizados.
inquirer.prompt([
  {
    type: 'input',
    name: 'nombre',
    message: '¿Cuál es tu nombre?'
  },
  {
    type: 'input',
    name: 'edad',
    message: '¿Cuál es tu edad?'
  },
  {
    type: 'list',
    name: 'color',
    message: '¿Cuál es tu color favorito?',
    choices: ['red', 'blue', 'yellow', 'green', 'cyan']
  }
]).then(answers => {
  // Genera el mensaje personalizado según la edad.
  let msjToShow = saludar(answers.nombre, answers.edad);

  // Muestra el nombre en arte ASCII con el color seleccionado.
  figlet(answers.nombre, function (err, data) {
    if (err) {
      console.log("Algo salió mal...");
      return;
    }
    console.log(chalk[answers.color](data));
  });

  // Muestra el mensaje personalizado con el color seleccionado.
  console.log(chalk[answers.color](msjToShow));
});