import { Libro, Autor, Reseña } from "../models/index.js";

const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      include: [{ model: Autor, as: "autor" }],
    });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id, {
      include: [
        { model: Autor, as: "autor" },
        { model: Reseña, as: "reseñas" },
      ],
    });
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearLibro = async (req, res) => {
  try {
    const { titulo, año, genero, autorId } = req.body;

    // Validar que el autor exista
    const autor = await Autor.findByPk(autorId);
    if (!autor) {
      return res.status(400).json({ error: "Autor no encontrado" });
    }

    const libro = await Libro.create({ titulo, año, genero, autorId });
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, año, genero, autorId } = req.body;

    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    // Validar que el autor exista si se proporciona
    if (autorId) {
      const autor = await Autor.findByPk(autorId);
      if (!autor) {
        return res.status(400).json({ error: "Autor no encontrado" });
      }
    }

    await libro.update({ titulo, año, genero, autorId });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    await libro.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
};