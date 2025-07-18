import express from 'express';

import categoryRoutes from './categoryRoutes.js';

const router = express.Router();

router.use(categoryRoutes);

export default router;