import express from 'express';
import userRouter from './userRoute.js';
import layananKategoriRouter from './layananKategoriRoute.js';
import tentangRouter from './tentangRoute.js';
import errorrHandling from '../controllers/errorHandlingController.js';

const route = express.Router();

route.use('/api', userRouter);
route.use('/api', layananKategoriRouter);
route.use('/api', tentangRouter);

route.use('*', errorrHandling);
route.use('*', (req, res) => {
    res.status(404).json({
        errors: ['Page Not Found'],
        message: 'Internal Server Error',
        data: null,
    });
});

export default route;
