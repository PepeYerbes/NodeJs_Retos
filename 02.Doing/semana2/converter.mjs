/**
 * Conversor interactivo de temperaturas entre Celsius, Fahrenheit y Kelvin.
 *
 * Características:
 * - Solicita al usuario el tipo de conversión y el valor a convertir usando inquirer.
 * - Valida que no se ingresen temperaturas menores al cero absoluto para Celsius y Fahrenheit.
 * - Muestra el resultado en consola con estilos usando chalk y boxen.
 * - Permite realizar múltiples conversiones en una misma sesión.
 *
 * Para ejecutar:
 *   node converter.mjs
 */

// Importa inquirer para interacción por consola.
import inquirer from "inquirer";
// Importa boxen para mostrar resultados enmarcados.
import boxen from 'boxen';
// Importa chalk para colorear la salida en consola.
import chalk from "chalk";
// Importa las funciones de conversión desde el módulo temperatura.js.
import {
  exportCelsiusToFahrenheit,
  exportFahrenheitToCelsius,
  exportCelsiusToKelvin,
  exportFahrenheitToKelvin
} from './temperatura.js';

/**
 * Función principal que inicia el flujo de preguntas y conversión.
 * Muestra un menú para seleccionar el tipo de conversión y solicita el valor numérico.
 * Realiza la conversión seleccionada, valida los límites físicos y muestra el resultado.
 * Al finalizar, pregunta si el usuario desea realizar otra conversión.
 */
function iniciar() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'tipo',
      message: chalk.green('¿Qué tipo de conversión quieres hacer?'),
      choices: [
        'Celsius a Fahrenheit',
        'Fahrenheit a Celsius',
        'Celsius a Kelvin',
        'Fahrenheit a Kelvin'
      ]
    },
    {
      type: 'number',
      name: 'grados',
      message: chalk.blue('Ingresa el valor a convertir '),
    }
  ]
  ).then(res => {
    // Extrae el tipo de conversión y el valor ingresado
    const { tipo, grados } = res;

    let msg = '';
    // Conversión de Celsius a Fahrenheit
    if (tipo === 'Celsius a Fahrenheit') {
      if (grados < -273.15) {
        // Validación del cero absoluto en Celsius
        console.log(chalk.red('⚠️ No existen temperaturas por debajo del cero absoluto'));
      } else {
        msg = `🌡️ ${grados} ºC son ${exportCelsiusToFahrenheit(grados).toFixed(1)} ºF`;
      }
    }
    // Conversión de Fahrenheit a Celsius
    else if (tipo === 'Fahrenheit a Celsius') {
      if (grados < -459.67) {
        // Validación del cero absoluto en Fahrenheit
        console.log(chalk.red('⚠️ No existen temperaturas por debajo del cero absoluto'));
      } else {
        msg = `🌡️ ${grados} ºF son ${exportFahrenheitToCelsius(grados).toFixed(1)} ºC`;
      }
    }
    // Conversión de Celsius a Kelvin (no requiere validación extra)
    else if (tipo === 'Celsius a Kelvin') {
      msg = `🌡️ ${grados} ºC son ${exportCelsiusToKelvin(grados).toFixed(1)} ºK`;
    }
    // Conversión de Fahrenheit a Kelvin (no requiere validación extra)
    else if (tipo === 'Fahrenheit a Kelvin') {
      msg = `🌡️ ${grados} ºF son ${exportFahrenheitToKelvin(grados).toFixed(1)} ºK`;
    }
    // Si hay mensaje, mostrar el resultado estilizado
    if (msg !== '') { mostrarResultado(msg); }
    // Preguntar si desea realizar otra conversión
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
      boxen(mensaje, { padding: 1, margin: 1, borderStyle: 'double' })
    )
  );
}

/**
 * Pregunta al usuario si desea realizar otra conversión.
 * Si responde afirmativamente, reinicia el flujo.
 * Si responde negativamente, finaliza la aplicación con un mensaje de despedida.
 */
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

// Inicia la aplicación llamando a la función principal.
iniciar();