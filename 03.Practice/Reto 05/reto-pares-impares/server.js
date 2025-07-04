import express from "express";
import { separarParesImpares, parsearNumeros } from "./utils/separarParesImpares.js";

const app = express();
const PORT = 3000;

app.get("/filtrar", (req, res) => {
  const { numeros, only, unique } = req.query;

  if (!numeros) {
    return res.status(400).json({
      error: "El parámetro 'numeros' es requerido",
      ejemplo: "?numeros=1,2,3,4,5"
    });
  }

  const listaNumeros = parsearNumeros(numeros, unique === "true");
  if (!listaNumeros) {
    return res.status(400).json({
      error: "El parámetro 'numeros' debe contener solo números separados por comas"
    });
  }

  const { pares, impares } = separarParesImpares(listaNumeros);

  const respuesta = { original: listaNumeros };
  if (only === "pares") respuesta.pares = pares;
  else if (only === "impares") respuesta.impares = impares;
  else {
    respuesta.pares = pares;
    respuesta.impares = impares;
  }

  res.json(respuesta);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
