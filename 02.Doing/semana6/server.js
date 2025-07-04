import express from 'express';
import taskRoutes from './src/routes/taskRoutes.js';
import { logger } from './src/middleware/logger.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});