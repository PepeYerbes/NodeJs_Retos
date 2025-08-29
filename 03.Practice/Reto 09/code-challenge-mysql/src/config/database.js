import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Desactiva logs de consultas SQL
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL conectado");
    await sequelize.sync({ alter: true }); // Sincroniza modelos, 'alter' ajusta tablas si es necesario
  } catch (error) {
    console.error("Error de conexión:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };