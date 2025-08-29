import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

// Función para leer usuarios del archivo JSON
const leerUsuarios = async () => {
  try {
    const rutaUsuarios = path.join(process.cwd(), "data", "usuarios.json");
    const data = await fs.readFile(rutaUsuarios, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo usuarios:", error);
    return [];
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Validar que se enviaron los campos requeridos
    if (!correo || !contraseña) {
      return res.status(400).json({
        success: false,
        error: "Correo y contraseña son requeridos",
      });
    }

    // Leer usuarios del archivo
    const usuarios = await leerUsuarios();

    // Buscar usuario por correo y contraseña
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contraseña === contraseña
    );

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      });
    }

    // Generar token JWT
    const payload = {
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    // Respuesta exitosa
    res.json({
      success: true,
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};