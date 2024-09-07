import express from 'express';
import errorrHandling from '../controllers/errorHandlingController.js';
import userRouter from './userRoute.js';

const route = express.Router();

export default route;

route.use('/api', userRouter);
