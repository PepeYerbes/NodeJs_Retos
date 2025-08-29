import express from 'express';
import librosRoutes from './librosRoutes.js';
import autoresRoutes from './autoresRoutes.js';

const router = express.Router();

router.use('/libros', librosRoutes);
router.use('/autores', autoresRoutes);

export default router;