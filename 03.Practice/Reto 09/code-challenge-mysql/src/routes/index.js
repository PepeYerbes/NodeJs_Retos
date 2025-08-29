import express from "express";
import librosRoutes from "./librosRoutes.js";

const router = express.Router();

router.use("/libros", librosRoutes);

export default router;