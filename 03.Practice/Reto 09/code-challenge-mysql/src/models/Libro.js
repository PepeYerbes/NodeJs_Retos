import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Libro = sequelize.define(
  "Libro",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "autores",
        key: "id",
      },
    },
  },
  {
    tableName: "libros",
    timestamps: false,
  }
);

export default Libro;