import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    login,
    setRefreshToken,
    updatePassword,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/auth/login', login);
userRouter.patch('/user/password', authenticate, updatePassword);
userRouter.get('user/refresh', setRefreshToken);

export default userRouter;
