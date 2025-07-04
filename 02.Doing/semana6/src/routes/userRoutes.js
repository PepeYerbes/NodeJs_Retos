import express from 'express';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/userController.js';

const router = express.Router();

router.get('/user', obtenerUsuarios);
router.get('/user/:id', obtenerUsuarioPorId);
router.post('/user/', crearUsuario);
router.put('/user/:id', actualizarUsuario);
router.delete('/user/:id', eliminarUsuario);

export default router;