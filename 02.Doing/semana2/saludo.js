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
