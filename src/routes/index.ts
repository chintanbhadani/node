import { Router } from 'express';
import authRouter from './auth';
import userRoutes from './user';

const appRoutes = Router();

appRoutes.use('/auth', authRouter);
appRoutes.use('/user', userRoutes);

export default appRoutes;
