import Autor from "./Autor.js";
import Libro from "./Libro.js";
import Reseña from "./Reseña.js";

// Definir relaciones
Autor.hasMany(Libro, { foreignKey: "autorId", as: "libros" });
Libro.belongsTo(Autor, { foreignKey: "autorId", as: "autor" });

Libro.hasMany(Reseña, { foreignKey: "libroId", as: "reseñas" });
Reseña.belongsTo(Libro, { foreignKey: "libroId", as: "libro" });

export { Autor, Libro, Reseña };