const express = require("express");
const app = express();
const contarObjetos = require("./controllers/contar.js");

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Servidor ejecutándose en http://localhost:${PORT}`)});

app.use(express.json());

app.post("/contar", contarObjetos.contarPropiedades);

app.get("/", (req, res) => {
    res.send("Bienvenido al servicio de conteo de propiedades de objetos");
    });
