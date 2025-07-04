import express from "express";
import { encontrarMayor, ValidarNumeros } from "./utils/encontrarMayor.js";

const app = express();
const PORT = 3000;

app.get("/mayor", (req, res) => {
const { numeros } = req.query;

if (!numeros) {
return res.status(400).json({
error: "El parámetro 'numeros' es requerido",
ejemplo: "?numeros=5,3,9,1"
    });
}

const listaNumeros = ValidarNumeros(numeros);
if (!listaNumeros) {
return res.status(400).json({
error: "El parámetro 'numeros' debe contener solo números separados por comas"
    });
}

const mayor = encontrarMayor(listaNumeros);

res.json({
    numeros: listaNumeros,
    mayor
});
});

app.listen(PORT, () => {
console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
