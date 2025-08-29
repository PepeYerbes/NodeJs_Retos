import express from 'express';
import { crearAutor, obtenerAutores } from '../controllers/autoresController.js';

const router = express.Router();

router.post('/', crearAutor);
router.get('/', obtenerAutores);

export default router;