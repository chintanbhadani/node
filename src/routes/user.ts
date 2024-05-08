import { Router } from 'express';
import { signUp } from '../controllers/auth';
import { getAllUsers } from '../controllers/user';

const userRoutes = Router();

userRoutes.post('/user', getAllUsers);

export default userRoutes;
