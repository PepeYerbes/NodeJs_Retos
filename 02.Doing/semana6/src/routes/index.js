import express from 'express';
import taskRoutes from './src/routes/taskRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

const router = express.Router();

router.use(taskRoutes);
router.use(userRoutes);

export default router;
