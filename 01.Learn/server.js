const express = require('express');
const app = express();

let port = 3000;

// Invertir el orden de las letras.
// Reemplazar vocales por números:
// a → 4
// e → 3
// i → 1
// o → 0
// u → _
// Añadir 2 caracteres especiales aleatorios al final.
function codificar(mensaje) {
  const reemplazos = {
    "a": "4",
    "e": "3",
    "i": "1",
    "o": "0",
    "u": "_",
  }

  const invertido = mensaje.split("").reverse().join("");
  const convertido = invertido
    .replace(/[aeiou]/gi, letra => reemplazos[letra.toLowerCase()] || letra);
  const caracteresExtra = "!@#$%^&*";
  const extra1 = caracteresExtra[Math.floor(Math.random() * caracteresExtra.length)];
  const extra2 = caracteresExtra[Math.floor(Math.random() * caracteresExtra.length)];

  return convertido + extra1 + extra2;
}

function generatePassword() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const limiteCarecteres = 6;

  let password = "";
  for (let i = 0; i < limiteCarecteres; i++) {
    let random = Math.floor(Math.random() * caracteres.length);
    password = password + caracteres[random];
  }
  return password;
}

app.get("/", (req, res) => {
  res.send("Hola!");
});

app.get("/home", (req, res) => {
  res.send("Hola desde home!");
});

app.get("/password", (req, res) => {
  res.send(generatePassword());
});

// http://localhost:3000/enigma?mensaje=hola
app.get("/enigma", (req, res) => {
  //console.log(req.query.mensaje);
  res.send(codificar(req.query.mensaje));
});

app.listen(port, () => {
  console.log("Servidor iniciado");
});