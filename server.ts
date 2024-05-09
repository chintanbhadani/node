import express from 'express';
import cors from 'cors';
import appRoutes from './src/routes';
import dotenv from 'dotenv';
import { customError } from './src/utils/respose';
import { logger } from './src/utils/logger';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(customError);
app.use(appRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  logger.info(`Application is running on ${PORT}`);
});
