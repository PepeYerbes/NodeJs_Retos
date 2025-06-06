/**
 * Genera un mensaje personalizado según la edad de la persona.
 *
 * @param {string} nombre - Nombre de la persona (no se utiliza en el mensaje actual).
 * @param {number} edad - Edad de la persona.
 * @returns {string} Mensaje acorde al rango de edad.
 *
 * - Si la edad es menor de 18: "Eres menor de edad"
 * - Si la edad es menor de 30: "Estas en tus mejores años"
 * - Si la edad es menor de 60: "Con experiencia y juventud"
 * - Si la edad es 60 o más: "Sabiduría acumulada"
 */
export default function saludar(nombre, edad) {
  if (edad < 18) {
    return "Eres menor de edad";
  } if (edad < 30) {
    return "Estas en tus mejores años"
  } if (edad < 60) {
    return "Con experiencia y juventud"
  } else {
    return "Sabiduría acumulada"
  }
}