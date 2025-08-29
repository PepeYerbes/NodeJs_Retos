import express from "express";
import { body } from "express-validator";
import { registrarUsuario } from "../controllers/registroController.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

// Validaciones
const validacionesRegistro = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios")
    .escape(),

  body("correo")
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail()
    .notEmpty()
    .withMessage("El correo es obligatorio"),

  body("edad")
    .isInt({ min: 18, max: 99 })
    .withMessage("La edad debe ser un número entre 18 y 99")
    .notEmpty()
    .withMessage("La edad es obligatoria"),

  body("contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("La contraseña debe contener al menos una mayúscula, una minúscula y un número")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .escape(),
];

router.post("/registro", validacionesRegistro, validarCampos, registrarUsuario);

export default router;