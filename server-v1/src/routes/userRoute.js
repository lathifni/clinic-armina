import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { login, updatePassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/auth/login', login);
userRouter.patch('/user/password', authenticate, updatePassword);

export default userRouter;
