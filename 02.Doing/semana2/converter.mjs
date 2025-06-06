import inquirer from "inquirer";
import boxen from 'boxen';
import chalk from "chalk";
import { exportCelsiusToFahrenheit, exportFahrenheitToCelsius } from './temperatura.js';

function iniciar() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'tipo',
      message: chalk.green('¿Qué tipo de conversión quieres hacer?'),
      choices: ['Celsius a Fahrenheit', 'Fahrenheit a Celsius']
    },
    {
      type: 'number',
      name: 'grados',
      message: chalk.blue('Ingresa el valor a convertir '),
    }
  ]
  ).then(res => {
    console.log(res);
    const { tipo, grados } = res;

    let msg = '';
    if (tipo === 'Celsius a Fahrenheit') {
      if (grados < -273.15) {
        console.log(chalk.red('⚠️ No existen temperaturas por debajo del cero absoluto'));
      } else {
        msg = `${grados} ºC son ${exportCelsiusToFahrenheit(grados).toFixed(1)} ºF`;
      }
    } else {
      if (grados < -459.67) {
        console.log(chalk.red('⚠️ No existen temperaturas por debajo del cero absoluto'));
      } else {
        msg = `${grados} ºF son ${exportFahrenheitToCelsius(grados).toFixed(1)} ºC`;
      }
    }
    mostrarResultado(msg);
    reanudar();
  });
}

function mostrarResultado(mensaje) {
  console.log(
    chalk.bgHex('#6B6863').bold(
      boxen(mensaje, { padding: 1, margin: 1, borderStyle: 'double' })
    )
  );
}

function reanudar() {
  inquirer.prompt(
    [
      {
        type: 'confirm',
        name: 'reanudar',
        message: chalk.yellow('¿Quieres hacer otra conversión?'),
        default: true,
      }
    ]
  ).then(res => {
    if (res.reanudar) {
      iniciar();
    } else {
      console.log(chalk.green('👋 ¡Gracias por usar el conversor!'));
    }
  });
}

iniciar();
