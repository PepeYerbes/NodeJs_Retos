/**
 * Conversor interactivo de temperaturas entre Celsius y Fahrenheit.
 *
 * - Solicita al usuario el tipo de conversión y el valor a convertir usando inquirer.
 * - Valida que no se ingresen temperaturas menores al cero absoluto.
 * - Muestra el resultado en consola con estilos usando chalk y boxen.
 * - Permite realizar múltiples conversiones en una misma sesión.
 *
 * Para ejecutar:
 *   node convert.mjs
 */

// Importa inquirer para interacción por consola.
import inquirer from "inquirer";
// Importa boxen para mostrar resultados enmarcados.
import boxen from "boxen";
// Importa chalk para colorear la salida en consola.
import chalk from "chalk";
// Importa las funciones de conversión desde el módulo temperatura.js.
import {
  convertCelsiusToFahrenheit,
  convertFahrenheitToCelsius
} from './temperatura.js'

/**
 * Función principal que inicia el flujo de preguntas y conversión.
 */
function iniciar() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'tipo',
      message: chalk.red('¿Qué tipo de conversión quieres hacer?'),
      choices: ['Celsius a Fahrenheit', 'Fahrenheit a Celsius']
    },
    {
      type: 'number',
      name: 'grados',
      message: chalk.red('Ingresa el valor a convertir: '),
    }
  ]).then(res => {
    const { tipo, grados } = res;
    let resultado = 0;
    let mensaje = '';

    // Conversión de Celsius a Fahrenheit
    if (tipo === 'Celsius a Fahrenheit') {
      if (grados < -273.15) {
        // Validación del cero absoluto en Celsius
        console.log(chalk.red('⚠️ No existen temperaturas por debajo del cero absoluto (-273.15ºC)'));
      } else {
        resultado = convertCelsiusToFahrenheit(grados).toFixed(1);
        mensaje = `🌡️ ${grados}ºC son ${resultado}ºF`;
        mostrarResultado(mensaje);
      }
    } else {
      // Conversión de Fahrenheit a Celsius
      if (grados < -459.67) {
        // Validación del cero absoluto en Fahrenheit
        console.log(chalk.red('⚠️ No existen temperaturas por debajo del cero absoluto (-459.67ºF)'));
      } else {
        resultado = convertFahrenheitToCelsius(grados).toFixed(1);
        mensaje = `🌡️ ${grados}ºF son ${resultado}ºC`;
        mostrarResultado(mensaje);
      }
    }
    reanudar();
  });
}

/**
 * Muestra el resultado de la conversión en consola con estilos.
 * @param {string} mensaje - Mensaje a mostrar.
 */
function mostrarResultado(mensaje) {
  console.log(
    chalk.bgHex('#6B6863').bold(
      boxen(
        mensaje,
        { padding: 1, margin: 1, borderStyle: 'double' }
      )
    )
  );
}

/**
 * Pregunta al usuario si desea realizar otra conversión.
 * Si responde afirmativamente, reinicia el flujo.
 */
function reanudar() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'reanudar',
      message: chalk.yellow('¿Quieres hacer otra conversión?'),
      default: true,
    }
  ]).then(res => {
    if (res.reanudar) {
      iniciar();
    } else {
      console.log(chalk.green('👋 ¡Gracias por usar el conversor!'));
    }
  });
}

// Inicia la aplicación.
iniciar();