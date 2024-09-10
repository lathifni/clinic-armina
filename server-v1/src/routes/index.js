import express from 'express';
import userRouter from './userRoute.js';
import layananKategoriRouter from './layananKategoriRoute.js';

const route = express.Router();

export default route;

route.use('/api', userRouter);
route.use('/api', layananKategoriRouter);
