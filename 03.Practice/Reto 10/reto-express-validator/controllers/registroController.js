import { sendSuccessResponse } from "../utils/responseHelper.js";

export const registrarUsuario = (req, res) => {
  try {
    const { nombre, correo, edad } = req.body;
    sendSuccessResponse(res, { nombre, correo, edad }, "Usuario registrado con éxito", 201);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error al registrar usuario",
    });
  }
};