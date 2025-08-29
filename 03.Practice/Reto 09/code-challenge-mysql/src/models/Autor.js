import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Autor = sequelize.define(
  "Autor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "autores",
    timestamps: false,
  }
);

export default Autor;